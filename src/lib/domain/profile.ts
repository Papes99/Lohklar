export function cleanProfileName(raw: string): string | null {
  const name = raw.replace(/\s+/g, " ").trim();
  if (name.length < 1 || name.length > 80) return null;
  return name;
}

export function providerLabel(providerId: string): string | null {
  if (providerId === "grok-google" || providerId === "google") return "Google";
  if (providerId === "grok-x" || providerId === "twitter") return "X";
  if (providerId === "credential" || providerId === "email") return "E-Mail";
  return null;
}
