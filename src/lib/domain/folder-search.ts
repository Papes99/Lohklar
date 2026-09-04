/** Tippfehler-tolerante Suche über Arbeitsnamen. Nur Client-Filter, keine URLs. */

export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cur = row[j]!;
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, prev + cost);
      prev = cur;
    }
  }
  return row[b.length]!;
}

function tokenHits(queryToken: string, nameToken: string): boolean {
  if (!queryToken || !nameToken) return false;
  if (nameToken.startsWith(queryToken) || queryToken.startsWith(nameToken)) return true;
  return levenshtein(queryToken, nameToken) <= 2;
}

export function scoreName(query: string, name: string): number {
  const q = normalizeName(query);
  const n = normalizeName(name);
  if (!q) return 1;
  if (!n) return 0;
  if (n === q) return 100;
  if (n.startsWith(q)) return 80;
  if (n.includes(q)) return 60;
  const nameTokens = n.split(" ").filter(Boolean);
  const queryTokens = q.split(" ").filter(Boolean);
  if (queryTokens.length > 1) {
    const allHit = queryTokens.every((qt) => nameTokens.some((nt) => tokenHits(qt, nt)));
    if (allHit) return 52;
  }
  if (nameTokens.some((token) => token.startsWith(q) || q.startsWith(token))) return 55;
  for (const token of nameTokens) {
    const tokenDistance = levenshtein(q, token);
    if (tokenDistance <= 2) return Math.max(12, 48 - tokenDistance * 8);
  }
  const compact = n.replace(/\s+/g, "");
  const compactDistance = levenshtein(q, compact);
  if (compactDistance <= 2) return Math.max(12, 40 - compactDistance * 8);
  const distance = levenshtein(q, n);
  const longest = Math.max(q.length, n.length);
  if (distance <= 2 || distance / longest <= 0.34) return Math.max(10, 50 - distance * 8);
  return 0;
}

export function filterFolders<T extends { clientName: string }>(
  folders: T[],
  query: string,
): T[] {
  return folders
    .map((folder) => ({ folder, score: scoreName(query, folder.clientName) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.folder.clientName.localeCompare(b.folder.clientName, "de"))
    .map((row) => row.folder);
}
