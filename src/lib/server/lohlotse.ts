import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  composeLohlotseReply,
  headingLabel,
  isMergeConfirm,
  parseLohlotsePayload,
  payloadToContent,
  resolveClinicMention,
  sanitizeLohlotsePayload,
  wantsPersonalSave,
  type LohlotsePayload,
} from "@/lib/domain/lohlotse";
import { indicationLabel } from "@/lib/domain/types";
import { loadClinics } from "./clinics";

import { askGrok, officialDump } from "./lohlotse-llm";
import {
  buildWorkspace,
  getOwnedFolder,
  getOwnedThread,
  insertAssistant,
  lastMerge,
  loadMatches,
  loadPersonal,
  persistMerge,
} from "./lohlotse-data";
export type {
  LohlotseMessage,
  LohlotseMatch,
  LohlotseMergeRecord,
  LohlotseWorkspace,
} from "./lohlotse-data";

export const getLastLohlotseFolder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; client_name: string }>`
      select f.id, f.client_name
      from lohlotse_threads t
      join case_folders f on f.id = t.folder_id
      where t.user_id = ${context.userId}
        and f.user_id = ${context.userId}
        and exists (select 1 from runs r where r.folder_id = f.id)
      order by t.last_opened_at desc
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return { folderId: row.id, clientName: row.client_name };
  });

export const getLohlotseWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }) => {
    return buildWorkspace(folderId, context.userId);
  });

export const listLohlotseMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((folderId: string) => folderId)
  .handler(async ({ context, data: folderId }) => {
    const workspace = await buildWorkspace(folderId, context.userId);
    return {
      threadId: folderId,
      clientName: workspace.clientName,
      messages: workspace.messages,
    };
  });

export const setLohlotseClinic = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; clinicId: string | null }) => input)
  .handler(async ({ context, data }) => {
    const { threadId } = await getOwnedThread(data.folderId, context.userId);
    const sql = await getSql();
    await sql.query(
      `update lohlotse_threads set clinic_id = $1, last_opened_at = now()
       where id = $2 and user_id = $3`,
      [data.clinicId, threadId, context.userId],
    );
    return buildWorkspace(data.folderId, context.userId);
  });

export const sendLohlotseMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; content: string; clinicId?: string | null }) => input)
  .handler(async ({ context, data }) => {
    const content = data.content.trim();
    if (content.length < 2) throw new Error("Bitte eine Frage oder einen Hinweis schreiben.");
    if (content.length > 4000) throw new Error("Die Nachricht ist zu lang (höchstens 4000 Zeichen).");

    const { threadId, clientName, clinicId: storedClinicId } = await getOwnedThread(
      data.folderId,
      context.userId,
    );
    const sql = await getSql();
    const userMsgId = crypto.randomUUID();
    await sql.query(
      `insert into lohlotse_messages (id, thread_id, user_id, role, content, created_at)
       values ($1,$2,$3,'user',$4,now())`,
      [userMsgId, threadId, context.userId, content],
    );

    const personal = await loadPersonal(data.folderId, context.userId);
    const openRows = await sql<{ id: string; payload: unknown }>`
      select id, payload from lohlotse_messages
      where thread_id = ${threadId} and user_id = ${context.userId} and role = 'assistant'
      order by created_at desc
      limit 8
    `;
    const openRow = openRows.find((row) => parseLohlotsePayload(row.payload)?.offer?.status === "open");
    const openPayload = openRow ? parseLohlotsePayload(openRow.payload) : null;
    if (isMergeConfirm(content) && openRow && openPayload?.offer) {
      const confirm = await persistMerge({
        folderId: data.folderId,
        userId: context.userId,
        messageId: openRow.id,
        payload: openPayload,
        offer: openPayload.offer,
        personal,
        clientName,
      });
      const saved = await insertAssistant(threadId, context.userId, confirm);
      const now = new Date().toISOString();
      return {
        userMessage: {
          id: userMsgId,
          role: "user" as const,
          content,
          createdAt: now,
          payload: null,
        },
        assistantMessage: {
          id: saved.id,
          role: "assistant" as const,
          content: payloadToContent(confirm),
          createdAt: saved.createdAt,
          payload: confirm,
        },
        workspace: await buildWorkspace(data.folderId, context.userId),
      };
    }

    const history = await sql<{ role: string; content: string }>`
      select role, content from lohlotse_messages
      where thread_id = ${threadId} and user_id = ${context.userId}
      order by created_at desc
      limit 16
    `;
    const chronological = [...history].reverse();
    const run = await loadMatches(data.folderId, context.userId);
    const clinics = await loadClinics();
    const currentClinicId = data.clinicId ?? storedClinicId;
    const mentioned = resolveClinicMention(content, clinics, currentClinicId);
    const clinic = mentioned ?? clinics.find((item) => item.id === currentClinicId) ?? null;
    if (clinic && clinic.id !== storedClinicId) {
      await sql.query(
        `update lohlotse_threads set clinic_id = $1 where id = $2 and user_id = $3`,
        [clinic.id, threadId, context.userId],
      );
    }

    const catalog = clinics
      .map((item) => `- ${item.id} ${item.name} (${item.city}, ${item.stateName}): ${item.indicationAreas.join("/")}`)
      .join("\n");

    const top = run.matches
      .slice(0, 5)
      .map((item) => {
        const house = clinics.find((c) => c.id === item.clinicId);
        return `${house?.name ?? item.clinicId} (Passung ${item.score})`;
      })
      .join("; ");

    const folderContext = [
      `Arbeitsname im Fallordner: ${clientName}`,
      `Persönlicher Steckbrief — Was passt / Passung, die wir prüfen: ${personal.passt}\nWas nicht passt: ${personal.passtNicht}\nOffene Fragen: ${personal.offeneFragen}\nRückmeldungen: ${personal.rueckmeldungen}`,
      run.answers
        ? `Letzter Klar-o-Mat-Lauf ${run.runNumber}: ${indicationLabel(run.answers.indication)}. Region ${run.answers.states.join(", ") || "offen"}. Setting ${run.answers.genderSetting}, ${run.answers.setting}. Bedarf: ${run.answers.bedarfe.join(", ") || "nicht näher"}. Hinweise: ${run.answers.notes || "—"}`
        : "Noch kein Lauf.",
      top ? `Aktuelle Arbeitsauswahl: ${top}` : "Keine Treffer gespeichert.",
      "Wartezeit nur über die Wartezeit-Komponente. Keine Zahlen, keine Wochen/Tage im Fließtext.",
    ].join("\n");

    const local = composeLohlotseReply({
      clientName,
      message: content,
      personal,
      clinics,
      matches: run.matches,
      currentClinicId: clinic?.id ?? currentClinicId,
    });

    const grokText = await askGrok({
      clientName,
      catalog,
      folderContext,
      official: clinic ? officialDump(clinic) : "",
      history: chronological,
    });
    const parsed = parseLohlotsePayload(grokText);
    const merged: LohlotsePayload = parsed
      ? {
          ...local,
          ...parsed,
          mode: parsed.mode ?? local.mode ?? "free",
          prose: parsed.prose?.trim() ? parsed.prose : local.prose,
          headingKey: parsed.headingKey ?? (parsed.mode === "free" ? null : local.headingKey),
          heading: headingLabel(
            parsed.headingKey ?? (parsed.mode === "free" ? null : local.headingKey),
          ),
          bullets: parsed.bullets.length ? parsed.bullets : local.bullets,
          highlights: parsed.highlights.length ? parsed.highlights : local.highlights,
          clinicId:
            parsed.clinicId && clinics.some((item) => item.id === parsed.clinicId)
              ? parsed.clinicId
              : clinic?.id ?? local.clinicId,
          offer: parsed.offer ?? (wantsPersonalSave(content) || local.offer ? local.offer : null),
          showWait: parsed.showWait || local.showWait,
        }
      : local;

    const payload = sanitizeLohlotsePayload(merged, content, local);

    const saved = await insertAssistant(threadId, context.userId, payload);
    await sql.query(
      `update case_folders set updated_at = now() where id = $1 and user_id = $2`,
      [data.folderId, context.userId],
    );

    return {
      userMessage: {
        id: userMsgId,
        role: "user" as const,
        content,
        createdAt: saved.createdAt,
        payload: null,
      },
      assistantMessage: {
        id: saved.id,
        role: "assistant" as const,
        content: payloadToContent(payload),
        createdAt: saved.createdAt,
        payload,
      },
      workspace: await buildWorkspace(data.folderId, context.userId),
    };
  });

export const applyLohlotseMerge = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; messageId: string }) => input)
  .handler(async ({ context, data }) => {
    const { threadId, clientName } = await getOwnedThread(data.folderId, context.userId);
    const sql = await getSql();
    const messages = await sql<{ payload: unknown }>`
      select m.payload
      from lohlotse_messages m
      join lohlotse_threads t on t.id = m.thread_id
      where m.id = ${data.messageId}
        and m.user_id = ${context.userId}
        and t.folder_id = ${data.folderId}
    `;
    const payload = parseLohlotsePayload(messages[0]?.payload);
    const offer = payload?.offer;
    if (!offer || offer.status === "applied") {
      throw new Error("Kein übernahmefähiger Vorschlag.");
    }
    const personal = await loadPersonal(data.folderId, context.userId);
    const confirm = await persistMerge({
      folderId: data.folderId,
      userId: context.userId,
      messageId: data.messageId,
      payload: payload!,
      offer,
      personal,
      clientName,
    });
    await insertAssistant(threadId, context.userId, confirm);
    return buildWorkspace(data.folderId, context.userId);
  });

export const dismissLohlotseOffer = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string; messageId: string }) => input)
  .handler(async ({ context, data }) => {
    await getOwnedFolder(data.folderId, context.userId);
    const sql = await getSql();
    const messages = await sql<{ payload: unknown }>`
      select m.payload
      from lohlotse_messages m
      join lohlotse_threads t on t.id = m.thread_id
      where m.id = ${data.messageId}
        and m.user_id = ${context.userId}
        and t.folder_id = ${data.folderId}
    `;
    const payload = parseLohlotsePayload(messages[0]?.payload);
    if (payload?.offer) {
      const next: LohlotsePayload = { ...payload, offer: { ...payload.offer, status: "dismissed" } };
      await sql.query(
        `update lohlotse_messages set payload = $1::jsonb where id = $2 and user_id = $3`,
        [JSON.stringify(next), data.messageId, context.userId],
      );
    }
    return buildWorkspace(data.folderId, context.userId);
  });

export const undoLohlotseMerge = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { folderId: string }) => input)
  .handler(async ({ context, data }) => {
    await getOwnedFolder(data.folderId, context.userId);
    const merge = await lastMerge(data.folderId, context.userId);
    if (!merge || merge.undone) throw new Error("Nichts zum Rückgängigmachen.");
    const sql = await getSql();
    const personal = await loadPersonal(data.folderId, context.userId);
    const restored = { ...personal, [merge.field]: merge.beforeText };
    await sql.query(
      `update personal_steckbriefe
       set passt = $1, passt_nicht = $2, offene_fragen = $3, rueckmeldungen = $4, updated_at = now()
       where folder_id = $5 and user_id = $6`,
      [
        restored.passt,
        restored.passtNicht,
        restored.offeneFragen,
        restored.rueckmeldungen,
        data.folderId,
        context.userId,
      ],
    );
    await sql.query(
      `update lohlotse_merges set undone = true where id = $1 and user_id = $2`,
      [merge.id, context.userId],
    );
    return buildWorkspace(data.folderId, context.userId);
  });
