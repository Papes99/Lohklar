import type { HouseSpec } from "./katalog-houses.ts";
import { COVER_PHOTO_IDS } from "./katalog-cover-ids.ts";
import { houseOffersKlinikStattStrafe, houseOffersMpu } from "./katalog-programme.ts";
import { aufnahmeAngabe } from "./katalog-aufnahme.ts";
import { steckExtra } from "./katalog-steck-extra.ts";
import type {
  ChipStatus,
  Clinic,
  ClinicPhoto,
  OfficialSteckbrief,
  PhotoSlot,
  PhotoSource,
  SteckBlock,
  Zulassung,
} from "./types.ts";
import { emptySteckBlock } from "./types.ts";

const AS_OF = "09.2026";

/** Unique photos per house. Copies of the same file are omitted; the caption matches the motif. */
const PHOTO_UNIQUE: Partial<Record<string, { file: string; slot: PhotoSlot; label: string }[]>> = {
  "ck-alsterufer": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-auwald": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bergstrasse": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bergzabern": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-berus": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-borkum": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-bramstedt": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-burgklinik": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-eifelhoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-elbingerode": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-elbmarsch": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-erlengrund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eusserthal": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-flechtingen": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-fredeburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-glotterbad": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-haffkueste": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-hainberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-heiligenfeld": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-landelin": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-lichtblick": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-mainbogen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-motzen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-muenchwies": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-nauheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-nordlicht": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-osterholz": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-ratingen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-richelsdorf": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-roseneck": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-rosenhoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-rothaar": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-seehof": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
    { file: "besonderheit.jpg", slot: "besonderheit", label: "Besonderheit" },
  ],
  "ck-seewiesen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-sonnenberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-spreeaue": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-teutoburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-waldschloesschen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-waren": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-weserblick": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-achertal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-aggerblick": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-altenpost": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-bussmannshof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-doerenhof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eschenburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-fachklinik-meckenheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-freiolsheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-johannesbad-adaption-dortmund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-kaisberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-daun-rosenberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-klosterwald": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-mecklenburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-odenwald": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-ptk-liebenwerda": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-rhein-haardt": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-schweriner-see": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-toenisstein": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-wied": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-wigbertshoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-release": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-salus-castrop": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-salus-friedberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-salus-lindow": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-spielwigge": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-tauwetter": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vielbach": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-berghof-2": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-berghofklinik": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-wiehengebirge": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-weihersmuehle": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-alpenblick": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-asklepios-bad-schwartau": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-asklepios-fuerstenhof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-bavaria-kreischa": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-bergisch-land": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-dekimed": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-freiburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-kinzigtal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-ortenau-add": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-schoemberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-diessen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eifelklinik": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-groenenbach": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-haussee": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-heiligenfeld-bad-woerishofen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-rothenfelde": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-schoenen-moos": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-tennstedt": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-zfpg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mittelrhein": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-oexen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-park-lippspringe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-park-schwalbach": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-park-steben": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-parkland": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-rosenberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-schaufling": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-schlossklinik-buchau": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-petersen-rostock": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-hildesheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-waldschloss-dd": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-alpenland": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-boeddiger": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-bornheim-schloss": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eichelsdorf": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-eschenberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-friedrichshof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-hirtenstein": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-weitenau": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-kraichtal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-loerrach-bwlv": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-ludwigsmuehle": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-daun-adaption": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-dormagen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-roemhild": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-waldsee": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-pirna-adaption": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-willich": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-wiesengrund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-berleburg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-carolabad": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-celenus-schweizerwiese": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-diana": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-drv-frankenhausen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-drv-hellbachtal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-drv-kurhessen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-drv-lipperland": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-drv-wingertsberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-enzensberg": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-franziska": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-ginsterhof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-heilbrunn": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-hermannsborn": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-hoppegarten": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-inntal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-irmingard": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-kandertal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-koenigstuhl": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-korso": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-lahnhoehe": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-luisenklinik": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-marbachtal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-bad-bertrich": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-berka-ilmtal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-bernkastel": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-hohenfeld": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-kinzigtal-soden": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-muehlengrund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-psm-duerkheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-pyrmont-psm": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-saale-koesen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-salze": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-schlangenbad": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-median-wismar": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-bad-wildungen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-bliestal": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-reichshof": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-seepark": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-mediclin-vogelsang": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-panorama": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-passauer-wolf-bad-gogging": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-roswitha": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-schoen-bad-arolsen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-schoen-tk-muenchen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-segeberg-psom": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-taunus-nauheim": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-dahlen": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-vitrea-damp": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-isargrund": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-salza": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-udersleben": [{ file: "aussen.jpg", slot: "aussen", label: "Außenansicht" }],
  "ck-fehmarn": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-kieferngarten": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
  ],
  "ck-kompass-hof": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-prop-laim": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
  ],
  "ck-suedergellersen": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
    { file: "umgebung.jpg", slot: "umgebung", label: "Umgebung / Lage" },
  ],
  "ck-wolkersdorf": [
    { file: "aussen.jpg", slot: "aussen", label: "Außenansicht" },
    { file: "zimmer.jpg", slot: "zimmer_bad", label: "Zimmer / Bad" },
  ],
};

export type ClinicDraft = Omit<
  Clinic,
  "steckbrief" | "zulassung" | "datenstand" | "durationKurzWeeks" | "aufnahmeModus"
> & {
  durationKurzWeeks?: number | null;
  aufnahmeModus?: string;
};

function block(bullets: string[], chips: [string, ChipStatus][]): SteckBlock {
  const cleaned = lines(bullets);
  return {
    bullets: cleaned.length ? cleaned.slice(0, 8) : ["Angabe liegt nicht vor."],
    chips: chips.length
      ? chips.map(([label, status]) => ({ label, status }))
      : [{ label: "Angabe", status: "unbekannt" }],
  };
}

/** Leere und doppelte Stichpunkte streichen; Punkt nur ergänzen, wo er fehlt. */
function lines(...parts: Array<string | string[] | false | null | undefined>): string[] {
  const out: { text: string; tokens: Set<string> }[] = [];
  for (const part of parts) {
    if (!part) continue;
    const items = Array.isArray(part) ? part : [part];
    for (const raw of items) {
      const text = raw.replace(/\s+/g, " ").trim();
      if (!text) continue;
      const closed = /[.!?]$/.test(text) ? text : `${text}.`;
      const tokens = new Set(
        closed
          .toLowerCase()
          .replace(/[^a-zäöüß0-9]+/g, " ")
          .split(" ")
          .filter((word) => word.length > 3),
      );
      const idx = out.findIndex((item) => tokenSubset(item.tokens, tokens));
      if (idx >= 0) {
        if (closed.length > out[idx].text.length) out[idx] = { text: closed, tokens };
        continue;
      }
      out.push({ text: closed, tokens });
    }
  }
  return out.map((item) => item.text);
}

function tokenSubset(a: Set<string>, b: Set<string>): boolean {
  if (!a.size || !b.size) return false;
  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  for (const token of smaller) if (!larger.has(token)) return false;
  return true;
}

function profile(partial: Partial<OfficialSteckbrief>): OfficialSteckbrief {
  const empty = emptySteckBlock();
  return {
    indikation: partial.indikation ?? empty,
    kontraindikation: partial.kontraindikation ?? empty,
    settingDauer: partial.settingDauer ?? empty,
    wohnenAlltag: partial.wohnenAlltag ?? empty,
    kinderFamilie: partial.kinderFamilie ?? empty,
    therapie: partial.therapie ?? empty,
    medizin: partial.medizin ?? empty,
    sozialdienst: partial.sozialdienst ?? empty,
    kostentraeger: partial.kostentraeger ?? empty,
    besonderheiten: partial.besonderheiten ?? empty,
    aufnahmeunterlagen: partial.aufnahmeunterlagen ?? empty,
  };
}

function aufnahmeunterlagenFrom(spec: HouseSpec): SteckBlock {
  const extra = aufnahmeAngabe(spec.id);
  const unterlagenListe = spec.aufnahmeUnterlagen ?? extra?.unterlagen;
  const entgiftungspflicht =
    spec.entgiftungspflicht !== undefined ? spec.entgiftungspflicht : extra?.entgiftungspflicht;
  const bearbeitung = spec.bearbeitungszeitHinweis ?? extra?.bearbeitungszeitHinweis;
  const bullets: string[] = [];
  if (unterlagenListe?.length) {
    bullets.push(...unterlagenListe.slice(0, 5));
  } else {
    bullets.push("Unterlagenliste: Angabe liegt nicht vor.");
  }
  if (entgiftungspflicht === true) {
    bullets.push("Entgiftungsnachweis: das Haus fordert ihn öffentlich vor der Aufnahme.");
  } else if (entgiftungspflicht === false) {
    bullets.push("Entgiftungsnachweis: öffentlich nicht als Aufnahmebedingung ausgewiesen.");
  } else {
    bullets.push("Entgiftungspflicht: Angabe liegt nicht vor.");
  }
  if (bearbeitung) {
    bullets.push(bearbeitung);
  } else {
    bullets.push(
      "Bearbeitungszeit der Unterlagenprüfung: Angabe liegt nicht vor. Die Wartezeit steht nur in der Wartezeit-Komponente.",
    );
  }
  bullets.push("Keine Aufnahmezusage. Stand der öffentlichen Quelle.");
  const unterlagen: ChipStatus = unterlagenListe?.length ? "vorhanden" : "unbekannt";
  const entgiftung: ChipStatus =
    entgiftungspflicht === true
      ? "vorhanden"
      : entgiftungspflicht === false
        ? "nicht_angeboten"
        : "unbekannt";
  const bearbeitungChip: ChipStatus = bearbeitung ? "vorhanden" : "unbekannt";
  return block(bullets, [
    ["Unterlagenliste", unterlagen],
    ["Entgiftungspflicht", entgiftung],
    ["Bearbeitungszeit", bearbeitungChip],
  ]);
}

function flag(value: boolean | null, ja: string, nein: string): string {
  if (value === null) return `${ja.split(":")[0]}: kein Suchtauftrag in diesem Haus.`;
  return value ? ja : nein;
}

function roomCopy(
  spec: HouseSpec,
  alltag?: string[],
): { bullets: string[]; chips: [string, ChipStatus][] } {
  const extra = alltag?.length ? alltag : ["Alltag und Hausregeln: Angabe liegt nicht vor."];
  if (spec.setting === "tagesklinik") {
    return {
      bullets: [
        "Setting Tagesklinik: keine Übernachtung, daher keine Klinikzimmer.",
        "Zimmerart: Einbett-, Zweibett- und Mehrbettzimmer werden in diesem Setting nicht angeboten.",
        "Alltag: strukturierter Tagesplan, Anreise täglich.",
      ],
      chips: [
        ["Einbettzimmer", "nicht_angeboten"],
        ["Zweibettzimmer", "nicht_angeboten"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  const room =
    spec.room !== "unbekannt"
      ? spec.room
      : spec.setting === "adaption" || spec.indicationAreas.includes("psychosomatik")
        ? "einbett-mehrheit"
        : "zweibett";
  if (room === "einbett") {
    return {
      bullets: [
        "Wohnen: Einbettzimmer als Regelfall. Zweibett nur in Ausnahmefällen. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Einbettzimmer", "vorhanden"],
        ["Zweibettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (room === "einbett-mehrheit") {
    return {
      bullets: [
        "Wohnen: überwiegend Einbettzimmer. Zweibett nach Verfügbarkeit. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Einbettzimmer", "vorhanden"],
        ["Zweibettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (room === "zweibett") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel. Einbettzimmer nach Verfügbarkeit. Keine Mehrbettzimmer.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Einbettzimmer", "eingeschraenkt"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (room === "kein-einbett") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel. Einbettzimmer und Mehrbettzimmer nicht angeboten.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Einbettzimmer", "nicht_angeboten"],
        ["Mehrbettzimmer", "nicht_angeboten"],
      ],
    };
  }
  if (room === "zweibett-plus") {
    return {
      bullets: [
        "Wohnen: Zweibettzimmer als Regel, Mehrbett möglich. Einbettzimmer nach Verfügbarkeit.",
        ...extra,
      ],
      chips: [
        ["Zweibettzimmer", "vorhanden"],
        ["Mehrbettzimmer", "eingeschraenkt"],
        ["Einbettzimmer", "eingeschraenkt"],
      ],
    };
  }
  return {
    bullets: [
      "Wohnen: Zimmerart (Einbett / Zweibett / Mehrbett) — Angabe liegt nicht vor.",
      ...extra,
    ],
    chips: [
      ["Einbettzimmer", "unbekannt"],
      ["Zweibettzimmer", "unbekannt"],
      ["Mehrbettzimmer", "unbekannt"],
    ],
  };
}

function settingLine(spec: HouseSpec): string {
  if (spec.setting === "tagesklinik") return "Setting: Tagesklinik.";
  if (spec.setting === "beides") return "Setting: stationär, mit Tagesklinikoption.";
  if (spec.setting === "adaption") return "Setting: Adaption nach der Entwöhnung.";
  return "Setting: vollstationär.";
}

function genderLine(spec: HouseSpec): string {
  if (spec.genderSetting === "frauen") return "Das Haus ist frauenspezifisch.";
  if (spec.genderSetting === "maenner") return "Das Haus ist männerspezifisch.";
  return "Das Haus nimmt Frauen und Männer auf.";
}

function photo(
  slot: PhotoSlot,
  path: string | null,
  label: string,
  alt: string,
  source: PhotoSource = "oeffentlich",
): ClinicPhoto {
  return {
    slot,
    imagePath: path,
    caption: label,
    alt: path ? alt : `${label}: Foto nicht verfügbar`,
    source: path ? source : "fehlt",
    asOf: AS_OF,
  };
}

function photos(spec: HouseSpec): ClinicPhoto[] {
  const dir = `/clinics/${spec.id}`;
  const unique = PHOTO_UNIQUE[spec.id];
  if (unique?.length) {
    return unique.map((item) =>
      photo(item.slot, `${dir}/${item.file}`, item.label, `${item.label} der ${spec.name} in ${spec.city}`),
    );
  }
  if (COVER_PHOTO_IDS.has(spec.id)) {
    return [
      photo("aussen", `${dir}/aussen.jpg`, "Außenansicht", `Außenansicht der ${spec.name} in ${spec.city}`),
    ];
  }
  return [
    photo("aussen", null, "Außenansicht", `Außenansicht der ${spec.name} in ${spec.city}`),
    photo("zimmer_bad", null, "Zimmer / Bad", `Patientenzimmer der ${spec.name}`),
    photo("umgebung", null, "Umgebung / Lage", `Außenanlagen der ${spec.name} in ${spec.city}`),
  ];
}

function zulassungFrom(traegerArt: string, ahb: boolean, heilverfahren: boolean): Zulassung {
  const drv: ChipStatus =
    traegerArt === "drv" || traegerArt === "kirche" || traegerArt === "gemeinnuetzig"
      ? "vorhanden"
      : "unbekannt";
  return {
    drv,
    gkv: heilverfahren ? "vorhanden" : "unbekannt",
    ahb: ahb ? "vorhanden" : "nicht_angeboten",
    beihilfe: "unbekannt",
  };
}

export function toDraft(spec: HouseSpec): ClinicDraft {
  return {
    id: spec.id,
    name: spec.name,
    shortName: spec.shortName,
    city: spec.city,
    stateCode: spec.stateCode,
    stateName: spec.stateName,
    traeger: spec.traeger,
    traegerArt: spec.traegerArt,
    address: `${spec.street}, ${spec.plz} ${spec.city}`,
    phone: spec.phone,
    email: spec.email,
    website: spec.website,
    indicationAreas: spec.indicationAreas,
    substances: spec.substances,
    therapyForms: spec.therapyForms,
    durationWeeksMin: spec.durationWeeksMin,
    durationWeeksMax: spec.durationWeeksMax,
    genderSetting: spec.genderSetting,
    setting: spec.setting,
    ahb: spec.ahb,
    heilverfahren: spec.heilverfahren,
    barrierefrei: spec.barrierefrei,
    angehoerigenarbeit: spec.angehoerigenarbeit,
    kinderbetreuung: spec.kinderbetreuung,
    substitution: spec.substitution,
    gluecksspiel: spec.gluecksspiel,
    trauma: spec.trauma,
    jungeErwachsene: spec.jungeErwachsene,
    mpu: houseOffersMpu(spec.id),
    klinikStattStrafe: houseOffersKlinikStattStrafe(spec.id),
    placesEstimate: spec.placesEstimate,
    occupancyIndex: spec.occupancyIndex,
    waitBaseDays: spec.waitBaseDays,
    waitVarianceDays: spec.waitVarianceDays,
    sortOrder: spec.sortOrder,
    photos: photos(spec),
  };
}

export function buildSteckbrief(spec: HouseSpec): OfficialSteckbrief {
  const extra = steckExtra(spec.id);
  const psycho = spec.indicationAreas.includes("psychosomatik");
  const dual = spec.indicationAreas.includes("dual");
  const alltag = spec.alltag ?? extra?.alltag;
  const contra = spec.kontraindikationen ?? extra?.kontraindikationen;
  const sozial = spec.sozialdienstLeistungen ?? extra?.sozialdienstLeistungen;
  const wahl = spec.wahlleistungenHinweis ?? extra?.wahlleistungenHinweis;
  const mitbehandlung = spec.mitbehandlungHinweis ?? extra?.mitbehandlungHinweis;
  const room = roomCopy(spec, alltag);
  const mpu = houseOffersMpu(spec.id);
  const klinikStattStrafe = houseOffersKlinikStattStrafe(spec.id);
  const dauer =
    spec.durationWeeksMin === spec.durationWeeksMax
      ? `${spec.durationWeeksMin} Wochen`
      : `${spec.durationWeeksMin}–${spec.durationWeeksMax} Wochen`;

  const verfahren = spec.therapyForms.map((item) => item.trim()).filter(Boolean);
  const verfahrenLine =
    verfahren.length > 0
      ? `Verfahren im Haus: ${verfahren.join(", ")}.`
      : "Therapieverfahren: Angabe liegt nicht vor.";

  const indikationBullets = lines(
    spec.fokus,
    psycho ? "Auftrag: psychosomatische Rehabilitation." : null,
    spec.indicationAreas.includes("sucht") ? "Auftrag: medizinische Rehabilitation Abhängigkeit." : null,
    dual ? "Auftrag: Dualdiagnose, soweit das Haus das öffentlich führt." : null,
    flag(spec.alkohol, "Alkohol: Aufnahme vorgesehen.", "Alkohol: nicht der Aufnahmeauftrag."),
    flag(spec.drogen, "Illegale Drogen: Aufnahme vorgesehen.", "Illegale Drogen: nicht der Aufnahmeauftrag."),
    flag(
      spec.medikamente,
      "Medikamente: Aufnahme bei Medikamentenabhängigkeit vorgesehen.",
      "Medikamente: nicht der Aufnahmeauftrag.",
    ),
    spec.gluecksspiel ? "Glücksspiel / nicht stoffgebundene Sucht: im Auftrag vorgesehen." : null,
  );

  return profile({
    indikation: block(indikationBullets, [
      ["Psychosomatik", psycho ? "vorhanden" : "nicht_angeboten"],
      ["Dualdiagnose", dual ? "vorhanden" : "nicht_angeboten"],
      ["Alkohol", spec.alkohol === true ? "vorhanden" : spec.alkohol === false ? "nicht_angeboten" : "unbekannt"],
      ["Drogen", spec.drogen === true ? "vorhanden" : spec.drogen === false ? "nicht_angeboten" : "unbekannt"],
      [
        "Medikamente",
        spec.medikamente === true ? "vorhanden" : spec.medikamente === false ? "nicht_angeboten" : "unbekannt",
      ],
    ]),
    kontraindikation: block(
      lines(
        contra,
        contra?.length
          ? null
          : "Akute Selbst- oder Fremdgefährdung, unbehandelter Entzug und fehlende Kostenzusage schließen die Aufnahme aus.",
        "Das Haus entscheidet nach den vorliegenden Unterlagen, nicht Lohklar.",
        spec.genderSetting === "frauen"
          ? "Männer werden nicht aufgenommen."
          : spec.genderSetting === "maenner"
            ? "Frauen werden nicht aufgenommen."
            : "Keine geschlechtsspezifische Aufnahmesperre.",
      ),
      [
        ["Offener Entzug", "nicht_angeboten"],
        ["Akute Krise", "nicht_angeboten"],
      ],
    ),
    settingDauer: block(
      lines(
        settingLine(spec),
        `Regeldauer: ${dauer}, nach Kostenzusage.`,
        spec.ahb ? "AHB ist vorgesehen." : "AHB ist nicht der Schwerpunkt.",
        spec.heilverfahren ? "Heilverfahren nach Kostenzusage." : "Heilverfahren: Angabe liegt nicht vor.",
        spec.jungeErwachsene ? "Angebot auch für junge Erwachsene, soweit ausgewiesen." : null,
      ),
      [
        ["Stationär", spec.setting === "tagesklinik" ? "nicht_angeboten" : "vorhanden"],
        ["Tagesklinik", spec.setting === "tagesklinik" || spec.setting === "beides" ? "vorhanden" : "nicht_angeboten"],
        ["AHB", spec.ahb ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    wohnenAlltag: block(room.bullets, room.chips),
    kinderFamilie: block(
      lines(
        genderLine(spec),
        spec.angehoerigenarbeit
          ? "Angehörigenarbeit ist vorgesehen."
          : "Angehörigenarbeit: Angabe liegt nicht vor oder nicht Regelangebot.",
        spec.kinderbetreuung
          ? "Kinderbetreuung bzw. Mutter-Kind-Platz nach Absprache."
          : "Keine Regel-Kinderbetreuung im Haus.",
        spec.jungeErwachsene ? "Junge Erwachsene: ausgewiesenes Angebot." : null,
      ),
      [
        [
          spec.genderSetting === "frauen"
            ? "Frauenspezifisch"
            : spec.genderSetting === "maenner"
              ? "Männerspezifisch"
              : "Gemischt",
          "vorhanden",
        ],
        ["Angehörige", spec.angehoerigenarbeit ? "vorhanden" : "unbekannt"],
        ["Kinderbetreuung", spec.kinderbetreuung ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    therapie: block(
      lines(
        extra?.therapieHinweise,
        verfahrenLine,
        spec.trauma ? "Traumafokus nach interner Einschätzung, nicht automatisch." : "Kein ausgewiesener Traumaschwerpunkt.",
        spec.gluecksspiel
          ? "Glücksspiel / nicht stoffgebundene Sucht ist im Konzept vorgesehen."
          : "Glücksspielmodul: nicht ausgewiesen.",
        "Lohklar wählt keine Therapie und sagt keine Aufnahme zu.",
      ),
      [
        ["Einzeltherapie", spec.therapyForms.some((t) => /einzel/i.test(t)) ? "vorhanden" : "unbekannt"],
        ["Gruppentherapie", spec.therapyForms.some((t) => /gruppe/i.test(t)) ? "vorhanden" : "unbekannt"],
        ["Trauma", spec.trauma ? "eingeschraenkt" : "unbekannt"],
        ["Glücksspiel", spec.gluecksspiel ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    medizin: block(
      lines(
        "Ärztliche Leitung und pflegerische Versorgung sind vorgehalten.",
        spec.substitution ? `Substitution: ${spec.substMittel}.` : `Substitution: ${spec.substMittel}.`,
        mitbehandlung
          ? mitbehandlung
          : "Mitbehandlung somatischer Erkrankungen im üblichen Reha-Rahmen; Grenzen entscheidet das Haus.",
        spec.barrierefrei ? "Barrierefreiheit ist öffentlich ausgewiesen." : null,
      ),
      [
        ["Substitution", spec.substitution ? "vorhanden" : "nicht_angeboten"],
        ["Ärztliche Leitung", "vorhanden"],
        ["Barrierefrei", spec.barrierefrei ? "vorhanden" : "unbekannt"],
      ],
    ),
    sozialdienst: block(
      lines(
        sozial?.length
          ? sozial
          : "Klinik-Sozialdienst: Kostenzusage, Entlassplanung, weiterführende Hilfen.",
        "Lohklar vermittelt nicht und schreibt nicht an den Kostenträger.",
        mpu
          ? "MPU-Vorbereitung / Fahreignung ist im Haus vorgesehen. Die MPU selbst führt Lohklar nicht durch."
          : null,
        klinikStattStrafe
          ? "Anerkennung nach §§ 35/36 BtMG (Klinik statt Strafe / Therapie statt Strafe). Die Entscheidung trifft Staatsanwaltschaft bzw. Gericht, nicht Lohklar."
          : null,
      ),
      [
        ["Sozialdienst", "vorhanden"],
        ["Nachsorgeplanung", "vorhanden"],
        ["MPU-Vorbereitung", mpu ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    kostentraeger: block(
      lines(
        `Träger laut öffentlicher Angabe: ${spec.traeger}.`,
        spec.ahb || spec.heilverfahren
          ? "Zugang über DRV und/oder GKV nach Kostenzusage."
          : "Zugang nach Kostenzusage des zuständigen Trägers.",
        "Gesetzliche Zuzahlung: 10 € je Kalendertag, höchstens 28 Tage im Jahr. Befreiung möglich.",
        wahl
          ? /wahlleistung/i.test(wahl)
            ? wahl
            : `Wahlleistungen: ${wahl}`
          : "Wahlleistungen und Zuschläge: Angabe liegt nicht vor.",
        "Beihilfe: Angabe liegt nicht vor.",
      ),
      [
        ["DRV", spec.traegerArt === "privat" ? "unbekannt" : "vorhanden"],
        ["GKV", spec.heilverfahren ? "vorhanden" : "unbekannt"],
        ["AHB", spec.ahb ? "vorhanden" : "nicht_angeboten"],
        ["Wahlleistungen", wahl ? "vorhanden" : "unbekannt"],
        ["Einbett-Zuschlag", spec.room === "einbett" || spec.room === "einbett-mehrheit" ? "nicht_angeboten" : "unbekannt"],
        ["Beihilfe", "unbekannt"],
      ],
    ),
    besonderheiten: block(
      lines(spec.lage, spec.facts, extra?.factsExtra),
      [
        [spec.stateName, "vorhanden"],
        ["Junge Erwachsene", spec.jungeErwachsene ? "vorhanden" : "nicht_angeboten"],
        ["Barrierefrei", spec.barrierefrei ? "vorhanden" : "unbekannt"],
        ["MPU-Vorbereitung", mpu ? "vorhanden" : "nicht_angeboten"],
        ["Klinik statt Strafe", klinikStattStrafe ? "vorhanden" : "nicht_angeboten"],
      ],
    ),
    aufnahmeunterlagen: aufnahmeunterlagenFrom(spec),
  });
}

export function finishClinic(row: ClinicDraft, steckbrief: OfficialSteckbrief): Clinic {
  return {
    ...row,
    durationKurzWeeks: row.durationKurzWeeks ?? Math.min(row.durationWeeksMin, 4),
    aufnahmeModus: row.aufnahmeModus ?? "rollierend nach Kostenzusage",
    zulassung: zulassungFrom(row.traegerArt, row.ahb, row.heilverfahren),
    datenstand: {
      geprueft: "2026-09-01",
      quellen: "Öffentliche Klinikwebsite und Trägerangaben, Stand 09.2026. Kein Live-Abruf.",
    },
    steckbrief,
  };
}
