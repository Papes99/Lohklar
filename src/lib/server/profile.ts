import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { isAdminIdentity } from "@/lib/domain/admin";
import { cleanProfileName, providerLabel } from "@/lib/domain/profile";

export type AccountProfile = {
  name: string;
  email: string | null;
  image: string | null;
  admin: boolean;
  providers: string[];
};

async function loadProfile(userId: string): Promise<AccountProfile | null> {
  const sql = await getSql();
  const users = await sql<{ name: string; email: string | null; image: string | null }>`
    select name, email, image from "user" where id = ${userId}
  `;
  const row = users[0];
  if (!row) return null;
  const accounts = await sql<{ providerId: string; accountId: string }>`
    select "providerId", "accountId" from "account" where "userId" = ${userId}
  `;
  const providers = [
    ...new Set(
      accounts
        .map((account) => providerLabel(account.providerId))
        .filter((label): label is string => Boolean(label)),
    ),
  ];
  return {
    name: row.name,
    email: row.email,
    image: row.image,
    admin: isAdminIdentity({
      email: row.email,
      name: row.name,
      accounts,
    }),
    providers,
  };
}

export const getProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<AccountProfile> => {
    const profile = await loadProfile(context.userId);
    if (!profile) {
      return {
        name: "",
        email: null,
        image: null,
        admin: false,
        providers: [],
      };
    }
    return profile;
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string } | undefined) => {
    const name = cleanProfileName(typeof input?.name === "string" ? input.name : "");
    if (!name) throw new Error("Name fehlt oder ist zu lang.");
    return { name };
  })
  .handler(async ({ context, data }): Promise<AccountProfile> => {
    const sql = await getSql();
    await sql`
      update "user"
      set name = ${data.name}, "updatedAt" = now()
      where id = ${context.userId}
    `;
    const profile = await loadProfile(context.userId);
    if (!profile) throw new Error("Profil nicht gefunden.");
    return profile;
  });
