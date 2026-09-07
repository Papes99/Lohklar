/** Admin identities — only these see platform-wide Nutzung. */
export const ADMIN_GOOGLE_EMAIL = "juliankerl1999@gmail.com";
export const ADMIN_X_HANDLE = "kerlwerk";
export const ADMIN_X_ACCOUNT_ID = "2340176679";
export const ADMIN_X_PROVIDERS = ["grok-x", "twitter"] as const;

export type AdminAccount = {
  providerId: string;
  accountId: string;
};

function norm(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

function handle(value: string | null | undefined): string {
  return norm(value).replace(/^@/, "");
}

export function isAdminIdentity(input: {
  email?: string | null;
  name?: string | null;
  accounts?: AdminAccount[] | null;
}): boolean {
  const email = norm(input.email);
  if (email === ADMIN_GOOGLE_EMAIL) return true;

  const xAccounts = (input.accounts ?? []).filter((account) =>
    (ADMIN_X_PROVIDERS as readonly string[]).includes(account.providerId),
  );
  if (xAccounts.some((account) => account.accountId === ADMIN_X_ACCOUNT_ID)) return true;

  if (xAccounts.length === 0) return false;
  const local = handle(email.split("@")[0]);
  return handle(input.name) === ADMIN_X_HANDLE || local === ADMIN_X_HANDLE;
}
