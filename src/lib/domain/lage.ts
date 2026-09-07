import type { Clinic } from "./types.ts";

export type LageKind = "wasser" | "insel" | "laendlich" | "stadt" | "kurort" | "gebirge";

const MISSING = /^angabe liegt nicht vor\.?$/i;

/** Nur Stadt + offizielle Lagezeile — nicht Diagnosetext (sonst trifft „seelische“ Wasser). */
const WATER =
  /ostsee|nordsee|bodensee|chiemsee|starnberger|m[uü]ritz|alster|schwielow|ratzeburg|seelage|seeufer|seepark|am see|binnensee|[a-zäöüß]see\b|see(?:n|ufer|lage|park)?\b|\bmeer\b|meeres|strand|d[uü]ne|\binsel\b|borkum|norderney|usedom|r[uü]gen|f[oö]hr|fehmarn|hiddensee|amrum|\bsylt\b|hafenlage|\bf[oö]rde\b|\bhaff\b|\bteich\b|\bweiher\b|flussufer|rheinufer|\belbe\b|\bweser\b|\bmosel\b|\bdonau\b|\bspree\b|\btrave\b|\bhavel\b|wannsee|malente|g[oö]hren|heringsdorf|travem[uü]nde|k[uü]hlungsborn|warnem[uü]nde|ostseebad|nordseebad|holsteinische schweiz|cuxhaven|k[uü]ste|seelandschaft|seenplatte/i;

const ISLAND =
  /nordseeinsel|ostseeinsel|\binsel\b|borkum|norderney|usedom|\br[uü]gen\b|f[oö]hr|fehmarn|hiddensee|amrum|\bsylt\b|juist|langeoog|spiekeroog|wangerooge/i;

const RURAL =
  /l[äa]ndlich|\bdorf\b|waldlage|waldrand|waldlandschaft|waldn[äa]he|schwarzwald|\brh[oö]n\b|\bharz\b|\beifel\b|sauerland|allg[äa]u|h[uü]gelland|ortsrand|luftkurort|\bheide\b|spreewald|vogelsberg|odenwald|weserberg|teutoburg|westerwald|hunsr[uü]ck|steigerwald|th[uü]ringer wald|fichtelgebirge|erzgebirge|s[äa]chsische schweiz|mecklenburgische seen|parkähnliche|ruhige hanglage|bauernhof|therapiehof|naturpark|bayerischer wald|pf[aä]lzerwald|spessart|schw[aä]bischen wald|brilon-wald/i;

const SPA =
  /kurort|kurstadt|heilbad|staatsbad|kneipp|heilklima|luftkurort|heilklimatisch|reizklima|kurgebiet|kurpark|sprudelhof|moorbad|kneippkurort/i;

const MOUNTAIN =
  /alpen|gebirge|h[oö]henmeter|schwarzwald|\bharz\b|\brh[oö]n\b|\beifel\b|allg[äa]u|sauerland|fichtel|teutoburg|westerwald|hunsr[uü]ck|erzgebirge|th[uü]ringer wald|odenwald|vogelsberg|voralpen|chiemgau|berchtesgaden|mittelgebirge|hochebene|bayerischer wald|pf[aä]lzerwald|spessart|schw[aä]bischen wald/i;

const CITY_KW =
  /stadtzentrum|gro[ßs]stadt|innenstadt|metropole|innenstadtnah|stadtmitte|stadtgebiet|kiez\b|stadtteil|st[äa]dtisch|stadtnahe/i;

const BIG_CITIES = new Set([
  "Berlin",
  "Hamburg",
  "München",
  "Köln",
  "Frankfurt",
  "Stuttgart",
  "Düsseldorf",
  "Dortmund",
  "Essen",
  "Leipzig",
  "Dresden",
  "Bremen",
  "Hannover",
  "Nürnberg",
  "Duisburg",
  "Bochum",
  "Wuppertal",
  "Bielefeld",
  "Bonn",
  "Münster",
  "Karlsruhe",
  "Mannheim",
  "Augsburg",
  "Wiesbaden",
  "Braunschweig",
  "Kiel",
  "Magdeburg",
  "Freiburg",
  "Erfurt",
  "Mainz",
  "Rostock",
  "Kassel",
  "Saarbrücken",
  "Potsdam",
  "Oldenburg",
  "Osnabrück",
  "Aachen",
  "Lübeck",
  "Chemnitz",
  "Halle",
  "Krefeld",
  "Oberhausen",
  "Hagen",
  "Hamm",
  "Ludwigshafen",
  "Leverkusen",
  "Heidelberg",
  "Darmstadt",
  "Regensburg",
  "Würzburg",
  "Göttingen",
  "Ulm",
  "Paderborn",
  "Heilbronn",
  "Wolfsburg",
  "Pforzheim",
  "Koblenz",
  "Erlangen",
  "Trier",
  "Jena",
  "Gera",
  "Zwickau",
  "Cottbus",
  "Schwerin",
  "Flensburg",
  "Ingolstadt",
  "Offenbach",
  "Gießen",
  "Kaiserslautern",
  "Salzgitter",
  "Gütersloh",
  "Hildesheim",
  "Siegen",
]);

export function lageLabel(id: "egal" | LageKind): string {
  if (id === "wasser") return "Am Wasser";
  if (id === "insel") return "Insel";
  if (id === "laendlich") return "Ländlich / Wald";
  if (id === "stadt") return "Städtisch";
  if (id === "kurort") return "Kurort / Heilklima";
  if (id === "gebirge") return "Mittelgebirge / Alpenrand";
  return "Keine Vorgabe";
}

export function clinicLageLine(clinic: Pick<Clinic, "city" | "steckbrief">): string {
  const bullet = clinic.steckbrief.besonderheiten.bullets[0]?.trim() ?? "";
  if (!bullet || MISSING.test(bullet)) return clinic.city;
  return `${clinic.city} ${bullet}`;
}

function isBigCity(city: string): boolean {
  const head = city.split(/[-,/]/)[0]?.trim() ?? city;
  const bare = head.replace(/\s*\(.*\)$/, "").trim();
  return BIG_CITIES.has(head) || BIG_CITIES.has(bare) || BIG_CITIES.has(city);
}

export function clinicLageTags(clinic: Pick<Clinic, "city" | "steckbrief">): LageKind[] {
  const text = clinicLageLine(clinic);
  const tags: LageKind[] = [];
  if (WATER.test(text)) tags.push("wasser");
  if (ISLAND.test(text)) tags.push("insel");
  if (RURAL.test(text)) tags.push("laendlich");
  if (CITY_KW.test(text) || isBigCity(clinic.city)) tags.push("stadt");
  if (SPA.test(text)) tags.push("kurort");
  if (MOUNTAIN.test(text)) tags.push("gebirge");
  return tags;
}

export function clinicHasLage(clinic: Pick<Clinic, "city" | "steckbrief">, kind: LageKind): boolean {
  return clinicLageTags(clinic).includes(kind);
}

export function lageSearchLabels(kind: LageKind): string[] {
  if (kind === "wasser") return ["Am Wasser", "See", "Ostsee", "Nordsee", "Seelage"];
  if (kind === "insel") return ["Insel", "Nordseeinsel", "Ostseeinsel"];
  if (kind === "laendlich") return ["Ländlich", "Waldlage", "Wald"];
  if (kind === "stadt") return ["Städtisch", "Großstadt"];
  if (kind === "kurort") return ["Kurort", "Heilklima", "Heilbad"];
  return ["Gebirge", "Mittelgebirge", "Alpenrand"];
}
