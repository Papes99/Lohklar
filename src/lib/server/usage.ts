import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { sanitizeUsage, type UsageKind } from "@/lib/domain/usage";

export async function insertUsageEvent(
  sql: Sql,
  args: {
    userId: string;
    kind: UsageKind;
    clinicId?: string | null;
    meta?: string;
  },
): Promise<void> {
  const clean = sanitizeUsage({
    kind: args.kind,
    clinicId: args.clinicId,
    meta: args.meta,
  });
  if (!clean) return;
  await sql.query(
    `insert into usage_events (id, user_id, kind, clinic_id, meta, created_at)
     values ($1,$2,$3,$4,$5,now())`,
    [crypto.randomUUID(), args.userId, clean.kind, clean.clinicId, clean.meta ?? ""],
  );
}

export const recordUsageEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { kind: string; clinicId?: string | null; meta?: string }) => input)
  .handler(async ({ context, data }) => {
    const clean = sanitizeUsage(data);
    if (!clean) return { ok: false as const };
    const sql = await getSql();
    await insertUsageEvent(sql, {
      userId: context.userId,
      kind: clean.kind,
      clinicId: clean.clinicId,
      meta: clean.meta,
    });
    return { ok: true as const };
  });
