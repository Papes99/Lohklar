import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { composeKiFallback, KI_SYSTEM_PROMPT, sanitizeKiReply } from "@/lib/domain/ki";
import { loadClinics } from "./clinics";

export type KiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

function asIso(value: string | Date): string {
  if (typeof value === "string") return value;
  return value.toISOString();
}

function mapMessage(row: {
  id: string;
  role: string;
  content: string;
  created_at: string | Date;
}): KiMessage {
  return {
    id: row.id,
    role: row.role === "assistant" ? "assistant" : "user",
    content: row.content,
    createdAt: asIso(row.created_at),
  };
}

async function grokOnce(
  apiKey: string,
  body: Record<string, unknown>,
  timeoutMs: number,
): Promise<string | null> {
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as { choices: { message: { content: string } }[] };
    return payload.choices[0]?.message.content?.trim() ?? null;
  } catch {
    return null;
  }
}

async function askGrok(args: {
  catalog: string;
  history: { role: string; content: string }[];
}): Promise<string | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;

  const system = `${KI_SYSTEM_PROMPT}

Klinikatalog (Namen und Orte zur Orientierung — ohne Wartezeit-Zahlen):
${args.catalog}`;

  const body: Record<string, unknown> = {
    model: "grok-4.5",
    temperature: 0.4,
    max_tokens: 900,
    messages: [
      { role: "system", content: system },
      ...args.history.map((row) => ({
        role: row.role === "assistant" ? "assistant" : "user",
        content: row.content,
      })),
    ],
  };

  const first = await grokOnce(apiKey, body, 12000);
  if (first) return first;
  return grokOnce(apiKey, body, 8000);
}

async function loadMessages(userId: string): Promise<KiMessage[]> {
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    role: string;
    content: string;
    created_at: string | Date;
  }>`
    select id, role, content, created_at
    from ki_messages
    where user_id = ${userId}
    order by created_at asc
  `;
  return rows.map(mapMessage);
}

export const listKiMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    return loadMessages(context.userId);
  });

export const sendKiMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { content: string }) => input)
  .handler(async ({ context, data }) => {
    const content = data.content.trim();
    if (content.length < 2) throw new Error("Bitte eine Frage schreiben.");
    if (content.length > 4000) throw new Error("Die Nachricht ist zu lang (höchstens 4000 Zeichen).");

    const sql = await getSql();
    const userMsgId = crypto.randomUUID();
    await sql.query(
      `insert into ki_messages (id, user_id, role, content, created_at)
       values ($1,$2,'user',$3,now())`,
      [userMsgId, context.userId, content],
    );

    const history = await sql<{ role: string; content: string }>`
      select role, content from ki_messages
      where user_id = ${context.userId}
      order by created_at desc
      limit 20
    `;
    const chronological = [...history].reverse();

    const clinics = await loadClinics();
    const catalog = clinics
      .slice(0, 80)
      .map(
        (item) =>
          `- ${item.id} ${item.name} (${item.city}, ${item.stateName}): ${item.indicationAreas.join("/")}`,
      )
      .join("\n");

    const grokText = await askGrok({ catalog, history: chronological });
    const reply = sanitizeKiReply(grokText ?? composeKiFallback(content));

    const assistantId = crypto.randomUUID();
    const now = new Date().toISOString();
    await sql.query(
      `insert into ki_messages (id, user_id, role, content, created_at)
       values ($1,$2,'assistant',$3,now())`,
      [assistantId, context.userId, reply],
    );

    return {
      userMessage: {
        id: userMsgId,
        role: "user" as const,
        content,
        createdAt: now,
      },
      assistantMessage: {
        id: assistantId,
        role: "assistant" as const,
        content: reply,
        createdAt: now,
      },
      messages: await loadMessages(context.userId),
    };
  });

export const clearKiMessages = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await sql.query(`delete from ki_messages where user_id = $1`, [context.userId]);
    return [] as KiMessage[];
  });
