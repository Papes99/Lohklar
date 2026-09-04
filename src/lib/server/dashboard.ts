import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { CLINIC_SEED } from "@/lib/domain/clinic-seed";
import {
  catalogPhotoStats,
  periodRange,
  type DashboardPeriod,
} from "@/lib/domain/usage";
import { indicationLabel, type Indication, type WaitEstimate } from "@/lib/domain/types";
import { coerceWaitEstimate, summarizeWaitEstimates } from "@/lib/domain/wait-time";

export type DashboardStats = {
  period: DashboardPeriod;
  fromYmd: string;
  klaromatStarts: number;
  runsCompleted: number;
  runsDraft: number;
  foldersNew: number;
  runsFollowup: number;
  documents: number;
  exports: number;
  clinicViews: number;
  topClinics: { id: string; name: string; count: number }[];
  indications: { id: Indication; label: string; count: number }[];
  lohlotseChats: number;
  lohlotseMessages: number;
  lohlotseThreadsNamed: number;
  lohlotseThreadsUnnamed: number;
  steckbriefMerges: number;
  waitShown: number;
  waitRechenweg: number;
  photosWithImage: number;
  photosPlaceholder: number;
  regionalSearches: number;
  sessionsDesktop: number;
  sessionsMobile: number;
  sessionsNew: number;
  sessionsReturning: number;
  wait: WaitEstimate | null;
};

function n(value: unknown): number {
  return Number(value ?? 0);
}

async function optional<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

export const getDashboard = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { period?: DashboardPeriod } | undefined) => {
    const period = input?.period;
    if (period === "woche" || period === "monat" || period === "jahr") return { period };
    return { period: "woche" as const };
  })
  .handler(async ({ context, data }): Promise<DashboardStats> => {
    const sql = await getSql();
    const userId = context.userId;
    const period = data.period;
    const range = periodRange(period);
    const from = range.from.toISOString();

    const counts = await sql<{
      starts: number;
      completed: number;
      drafts: number;
      folders: number;
      followup: number;
      documents: number;
      regional: number;
    }>`
      select
        (select count(*)::int from runs where user_id = ${userId} and created_at >= ${from}) as starts,
        (select count(*)::int from runs
          where user_id = ${userId} and created_at >= ${from}
            and coalesce(status, 'fertig') in ('fertig', 'exportiert')) as completed,
        (select count(*)::int from runs
          where user_id = ${userId} and created_at >= ${from}
            and coalesce(status, 'fertig') = 'entwurf') as drafts,
        (select count(*)::int from case_folders
          where user_id = ${userId} and created_at >= ${from}) as folders,
        (select count(*)::int from runs
          where user_id = ${userId} and created_at >= ${from} and run_number > 1) as followup,
        (select count(*)::int from result_documents d
          join runs r on r.id = d.run_id
          where d.user_id = ${userId} and r.created_at >= ${from}) as documents,
        (select count(*)::int from runs
          where user_id = ${userId} and created_at >= ${from}
            and jsonb_typeof(answers->'states') = 'array'
            and jsonb_array_length(answers->'states') > 0) as regional
    `;

    const eventCounts = await optional(
      () =>
        sql<{
          clinic_views: number;
          wait_shown: number;
          wait_rechenweg: number;
          exports: number;
          desktop: number;
          mobile: number;
          sess_new: number;
          sess_ret: number;
        }>`
      select
        count(*) filter (where kind = 'clinic_view')::int as clinic_views,
        count(*) filter (where kind = 'wait_shown')::int as wait_shown,
        count(*) filter (where kind = 'wait_rechenweg')::int as wait_rechenweg,
        count(*) filter (where kind = 'document_export')::int as exports,
        count(*) filter (where kind = 'session' and meta like 'desktop%')::int as desktop,
        count(*) filter (where kind = 'session' and meta like 'mobile%')::int as mobile,
        count(*) filter (where kind = 'session' and meta like '%|new')::int as sess_new,
        count(*) filter (where kind = 'session' and meta like '%|returning')::int as sess_ret
      from usage_events
      where user_id = ${userId} and created_at >= ${from}
    `,
      [],
    );

    const indications = await sql<{ indication: string; n: number }>`
      select answers->>'indication' as indication, count(*)::int as n
      from runs
      where user_id = ${userId} and created_at >= ${from}
      group by 1
      order by n desc
    `;

    const top = await optional(
      () =>
        sql<{ clinic_id: string; n: number }>`
      select clinic_id, count(*)::int as n
      from usage_events
      where user_id = ${userId}
        and kind = 'clinic_view'
        and created_at >= ${from}
        and clinic_id is not null
      group by clinic_id
      order by n desc
      limit 5
    `,
      [],
    );

    const lotse = await optional(
      () =>
        sql<{
          chats: number;
          messages: number;
          named: number;
          unnamed: number;
        }>`
      select
        (select count(distinct thread_id)::int from lohlotse_messages
          where user_id = ${userId} and created_at >= ${from}) as chats,
        (select count(*)::int from lohlotse_messages
          where user_id = ${userId} and created_at >= ${from}) as messages,
        (select count(*)::int from lohlotse_threads t
          join case_folders f on f.id = t.folder_id
          where t.user_id = ${userId} and t.created_at >= ${from}
            and length(trim(f.client_name)) >= 2) as named,
        (select count(*)::int from lohlotse_threads t
          join case_folders f on f.id = t.folder_id
          where t.user_id = ${userId} and t.created_at >= ${from}
            and length(trim(f.client_name)) < 2) as unnamed
    `,
      [],
    );

    const merges = await optional(
      () =>
        sql<{ n: number }>`
      select count(*)::int as n from lohlotse_merges
      where user_id = ${userId} and created_at >= ${from} and undone = false
    `,
      [{ n: 0 }],
    );
    const waitRows = await optional(
      () =>
        sql<{ wait: unknown }>`
      select m.value->'wait' as wait
      from runs r
      cross join lateral jsonb_array_elements(r.matches) as m(value)
      where r.user_id = ${userId}
        and r.created_at >= ${from}
        and m.value->'wait' is not null
    `,
      [],
    );

    const photos = catalogPhotoStats(CLINIC_SEED);
    const names = new Map(CLINIC_SEED.map((clinic) => [clinic.id, clinic.name]));
    const row = counts[0];
    const events = eventCounts[0];
    const lotseRow = lotse[0];

    return {
      period,
      fromYmd: range.fromYmd,
      klaromatStarts: n(row?.starts),
      runsCompleted: n(row?.completed),
      runsDraft: n(row?.drafts),
      foldersNew: n(row?.folders),
      runsFollowup: n(row?.followup),
      documents: n(row?.documents),
      exports: n(events?.exports),
      clinicViews: n(events?.clinic_views),
      topClinics: top.map((item) => ({
        id: item.clinic_id,
        name: names.get(item.clinic_id) ?? item.clinic_id,
        count: n(item.n),
      })),
      indications: indications
        .filter((item) => item.indication)
        .map((item) => ({
          id: item.indication as Indication,
          label: indicationLabel(item.indication as Indication),
          count: n(item.n),
        })),
      lohlotseChats: n(lotseRow?.chats),
      lohlotseMessages: n(lotseRow?.messages),
      lohlotseThreadsNamed: n(lotseRow?.named),
      lohlotseThreadsUnnamed: n(lotseRow?.unnamed),
      steckbriefMerges: n(merges[0]?.n),
      waitShown: n(events?.wait_shown),
      waitRechenweg: n(events?.wait_rechenweg),
      photosWithImage: photos.withImage,
      photosPlaceholder: photos.placeholder,
      regionalSearches: n(row?.regional),
      sessionsDesktop: n(events?.desktop),
      sessionsMobile: n(events?.mobile),
      sessionsNew: n(events?.sess_new),
      sessionsReturning: n(events?.sess_ret),
      wait: summarizeWaitEstimates(
        waitRows
          .map((item) => coerceWaitEstimate(parseWait(item.wait)))
          .filter((item): item is WaitEstimate => Boolean(item)),
      ),
    };
  });

function parseWait(value: unknown): WaitEstimate | null {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as WaitEstimate;
    } catch {
      return null;
    }
  }
  return value as WaitEstimate;
}
