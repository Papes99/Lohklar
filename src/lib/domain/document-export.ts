import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
  type ISectionOptions,
} from "docx";
import { formatDeDate } from "@/lib/format";
import { documentFooterLines, type DocumentBody, type DocumentHouse } from "./document";
import { coerceWaitEstimate } from "./wait-time";

export type ExportMeta = {
  clientName: string;
  label: string;
  dateIso: string;
};

const INK = "1A2420";
const MUTED = "5C6661";
const PRIMARY = "245C4A";

export function documentFileStem(meta: ExportMeta): string {
  const name = meta.clientName
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  const label = meta.label
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  return `Lohklar-${name || "Ergebnis"}${label ? `-${label}` : ""}`;
}

export async function buildDocxBlob(body: DocumentBody, meta: ExportMeta): Promise<Blob> {
  const children: Paragraph[] = [
    p(["Lohklar · founded by Kerlwerk"], { muted: true, small: true, caps: true }),
    p(["Ergebnisdokument"], { heading: HeadingLevel.TITLE }),
    p(
      [
        meta.clientName,
        " · ",
        meta.label,
        " · ",
        formatDeDate(meta.dateIso),
      ],
      { bold: true },
    ),
    spacer(),
    p(["Bedarfe"], { heading: HeadingLevel.HEADING_1 }),
    p([body.needsText]),
    spacer(),
    p(["Rangfolge der Häuser"], { heading: HeadingLevel.HEADING_1 }),
  ];

  body.houses.forEach((house, index) => {
    children.push(
      p([`${index + 1}. ${house.clinicName} — ${house.location}`]),
    );
  });
  if (body.houses.length === 0) {
    children.push(p(["Keine Häuser in diesem Dokument."]));
  }

  for (const [index, house] of body.houses.entries()) {
    children.push(spacer());
    children.push(
      p([`${index + 1}  ${house.clinicName}`], { heading: HeadingLevel.HEADING_2 }),
    );
    children.push(p([house.location], { muted: true }));
    const image = await maybeImage(house);
    if (image) children.push(image);
    children.push(p(["Passung"], { muted: true, small: true, caps: true }));
    children.push(p([house.fitSentence]));
    children.push(p(["Merkmale"], { muted: true, small: true, caps: true }));
    for (const feature of house.features) {
      children.push(p([`• ${feature}`]));
    }
    children.push(p(["Wartezeit-Schätzung"], { muted: true, small: true, caps: true }));
    const wait = coerceWaitEstimate(house.wait);
    if (wait) {
      children.push(p([wait.label], { bold: true }));
      children.push(p([`Unsicherheit ${wait.uncertainty}`]));
      children.push(p([wait.disclaimer], { muted: true, small: true }));
      children.push(
        p([`Nicht gemeint: ${wait.notMeaning.join("; ")}`], { muted: true, small: true }),
      );
    }
    children.push(p(["Besonderheiten"], { muted: true, small: true, caps: true }));
    children.push(p([house.specials]));
    children.push(p(["Hinweise zum Haus"], { muted: true, small: true, caps: true }));
    children.push(p([house.hints]));
  }

  if (body.extras.length > 0) {
    children.push(spacer());
    children.push(p(["Eigene Absätze und To-dos"], { heading: HeadingLevel.HEADING_1 }));
    for (const extra of body.extras) {
      const mark = extra.kind === "todo" ? (extra.done ? "☑ " : "☐ ") : "";
      children.push(p([`${mark}${extra.title}`], { bold: true }));
      if (extra.text) children.push(p([extra.text]));
    }
  }

  children.push(spacer());
  children.push(p(["Eigene Notizen der Fachkraft"], { heading: HeadingLevel.HEADING_1 }));
  children.push(
    p([body.staffNotes.trim() ? body.staffNotes : "Keine eigenen Notizen."]),
  );
  children.push(spacer());
  for (const line of documentFooterLines(body)) {
    children.push(p([line], { muted: true, small: true }));
  }

  const section: ISectionOptions = {
    properties: {
      page: {
        margin: { top: 720, bottom: 720, left: 720, right: 720 },
      },
    },
    children,
  };

  const doc = new Document({
    creator: "Lohklar",
    title: `Ergebnisdokument · ${meta.clientName}`,
    description: "Orientierung, keine Diagnose.",
    sections: [section],
  });
  return Packer.toBlob(doc);
}

function p(
  parts: string[],
  opts: {
    heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel];
    bold?: boolean;
    muted?: boolean;
    small?: boolean;
    caps?: boolean;
  } = {},
): Paragraph {
  const size = opts.small ? 18 : opts.heading === HeadingLevel.TITLE ? 48 : 22;
  return new Paragraph({
    heading: opts.heading,
    spacing: { after: opts.heading ? 120 : 80 },
    children: [
      new TextRun({
        text: parts.join(""),
        bold: opts.bold || Boolean(opts.heading),
        color: opts.muted ? MUTED : opts.heading ? PRIMARY : INK,
        size,
        font: opts.heading ? "Georgia" : "Calibri",
        allCaps: opts.caps,
      }),
    ],
    alignment: AlignmentType.LEFT,
  });
}

function spacer(): Paragraph {
  return new Paragraph({ spacing: { after: 200 }, children: [] });
}

async function maybeImage(house: DocumentHouse): Promise<Paragraph | null> {
  if (!house.photo || typeof window === "undefined") return null;
  try {
    const res = await fetch(house.photo.path);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const type = house.photo.path.endsWith(".png") ? "png" : "jpg";
    return new Paragraph({
      spacing: { after: 120 },
      children: [
        new ImageRun({
          type,
          data: buf,
          transformation: { width: 180, height: 112 },
          altText: {
            title: house.clinicName,
            description: house.photo.alt,
            name: house.clinicId,
          },
        }),
      ],
    });
  } catch {
    return null;
  }
}
