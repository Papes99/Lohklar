/**
 * Sign-in providers.
 *
 * Production: Better Auth social Google (`GOOGLE_CLIENT_ID` / `SECRET`).
 * Live preview: Grok broker via `grok-google` only. X is not offered.
 */
export type GrokProvider = {
  providerId: string;
  idp: string;
  label: string;
};

export const GROK_PROVIDERS: readonly GrokProvider[] = [
  { providerId: "grok-google", idp: "google", label: "Google" },
];
