import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AntragswegPanel } from "@/components/antragsweg/antragsweg-panel";
import { Ergebnisdokument } from "@/components/dokument/ergebnisdokument";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import { formatDeDate, formatRunStatus } from "@/lib/format";
import { indicationLabel } from "@/lib/domain/types";
import {
  getFolder,
  renameFolder,
  updateSteckbrief,
  type FolderDetail,
} from "@/lib/server/cases";
import { listClinics } from "@/lib/server/clinics";
import { cn } from "@/lib/utils";

type FolderSearch = { tab?: Tab };

export const Route = createFileRoute("/app/fallordner/$folderId")({
  validateSearch: (search: Record<string, unknown>): FolderSearch => ({
    tab:
      search.tab === "laeufe" ||
      search.tab === "dokumente" ||
      search.tab === "steckbrief" ||
      search.tab === "lohlotse" ||
      search.tab === "antragsweg"
        ? search.tab
        : undefined,
  }),
  component: FolderPage,
});

type Tab = "laeufe" | "dokumente" | "steckbrief" | "lohlotse" | "antragsweg";

function FolderPage() {
  const { folderId } = Route.useParams();
  const { tab: tabSearch } = Route.useSearch();
  const [tab, setTab] = useState<Tab>(tabSearch ?? "laeufe");
  const [activeRun, setActiveRun] = useState<string | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);

  const folderQuery = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolder({ data: folderId }),
  });
  const clinicsQuery = useQuery({
    queryKey: ["clinics"],
    queryFn: () => listClinics(),
  });

  const folder = folderQuery.data;
  useEffect(() => {
    if (!folder || activeRun) return;
    const last = folder.runs[folder.runs.length - 1];
    if (last) setActiveRun(last.id);
  }, [folder, activeRun]);

  if (folderQuery.isPending) {
    return <p className="text-ink-muted">Fallordner wird geladen…</p>;
  }
  if (!folder) {
    return <p>Fallordner nicht gefunden.</p>;
  }

  const run = folder.runs.find((item) => item.id === activeRun) ?? folder.runs.at(-1);
  const topWait = run?.matches[0]?.wait;
  const tabs: { id: Tab; label: string }[] = [
    { id: "laeufe", label: "Durchläufe" },
    { id: "dokumente", label: "Dokumente" },
    { id: "antragsweg", label: "Antragsweg" },
    { id: "steckbrief", label: "Persönlicher Steckbrief" },
    { id: "lohlotse", label: "Lohlotse" },
  ];

  return (
    <div className="space-y-6">
      <header className="no-print flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Fallordner
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">{folder.clientName}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {folder.fileRef ? `Aktenzeichen ${folder.fileRef} · ` : ""}
            {run
              ? `${indicationLabel(run.answers.indication)} · ${folder.runs.length} ${
                  folder.runs.length === 1 ? "Durchlauf" : "Durchläufe"
                }`
              : "Kein Lauf"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" type="button" onClick={() => setRenameOpen(true)}>
            Umbenennen
          </Button>
          <Button asChild>
            <Link to="/app/klar-o-mat" search={{ folder: folderId }}>
              Neuer Durchlauf
            </Link>
          </Button>
        </div>
      </header>
      {topWait ? (
        <div className="no-print">
          <WartezeitSchaetzung estimate={topWait} variant="chip" />
        </div>
      ) : null}

      <div role="tablist" aria-label="Fallordner" className="no-print flex flex-wrap gap-1 rounded-[var(--radius-lg)] bg-bg-subtle p-1">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={cn(
              "min-h-11 flex-1 rounded-[var(--radius-md)] px-3 text-sm font-medium",
              tab === item.id ? "bg-surface text-ink shadow-[var(--shadow-border)]" : "text-ink-muted",
            )}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "laeufe" ? (
        <section>
          <h2 className="font-display text-2xl tracking-tight">Durchläufe</h2>
          {folder.runs.length === 0 ? (
            <div className="mt-4 rounded-[var(--radius-xl)] bg-surface p-5 shadow-[var(--shadow-border)]">
              <p>Dieser Ordner hat keinen Durchlauf. Starten Sie jetzt Durchlauf 1.</p>
              <Button className="mt-4" asChild>
                <Link to="/app/klar-o-mat" search={{ folder: folderId }}>
                  Durchlauf 1 starten
                </Link>
              </Button>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead>
                  <tr className="text-ink-muted">
                    <th className="py-2 pr-3 font-medium">Datum</th>
                    <th className="py-2 pr-3 font-medium">Label</th>
                    <th className="py-2 pr-3 font-medium">Top-Treffer</th>
                    <th className="py-2 pr-3 font-medium">Status</th>
                    <th className="py-2 font-medium">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {folder.runs.map((item) => {
                    const top = clinicsQuery.data?.find(
                      (clinic) => clinic.id === item.matches[0]?.clinicId,
                    );
                    return (
                      <tr key={item.id} className="border-t border-line">
                        <td className="py-3 pr-3">{formatDeDate(item.createdAt)}</td>
                        <td className="py-3 pr-3">{item.label.trim() || `Durchlauf ${item.runNumber}`}</td>
                        <td className="py-3 pr-3">{top?.name ?? "—"}</td>
                        <td className="py-3 pr-3">
                          <Badge tone={item.status === "entwurf" ? "warn" : "ok"}>
                            {formatRunStatus(item.status)}
                          </Badge>
                        </td>
                        <td className="py-3">
                          {item.status === "entwurf" && !item.document ? (
                            <Button size="sm" asChild>
                              <Link
                                to="/app/klar-o-mat"
                                search={{ run: item.id }}
                                onClick={() => setActiveRun(item.id)}
                              >
                                {item.matches.length > 0 ? "Dokument öffnen" : "Fortsetzen"}
                              </Link>
                            </Button>
                          ) : item.document ? (
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => {
                                setActiveRun(item.id);
                                setTab("dokumente");
                              }}
                            >
                              Dokument öffnen
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => setActiveRun(item.id)}
                            >
                              Öffnen
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : null}

      {tab === "dokumente" ? (
        run?.document ? (
          <Ergebnisdokument
            run={{ ...run, document: run.document }}
            clientName={folder.clientName}
          />
        ) : (
          <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
            <p>Noch keine Häuser in diesem Dokument.</p>
            <Button className="mt-4" asChild>
              <Link to="/app/klar-o-mat" search={{ run: run?.id }}>
                Zurück zur Trefferliste
              </Link>
            </Button>
          </div>
        )
      ) : null}

      {tab === "antragsweg" ? (
        <AntragswegPanel folderId={folder.id} clientName={folder.clientName} />
      ) : null}

      {tab === "steckbrief" ? (
        <PersonalEditor folder={folder} />
      ) : null}

      {tab === "lohlotse" ? (
        <div className="rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)]">
          <h2 className="font-display text-2xl tracking-tight">Lohlotse</h2>
          <p className="mt-2 text-ink-muted">
            Der Lohlotse hat einen eigenen Menüpunkt. Der Faden bleibt bei {folder.clientName}.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/app/lohlotse" search={{ folder: folderId }}>
              Zum Lohlotse für {folder.clientName}
            </Link>
          </Button>
        </div>
      ) : null}

      {renameOpen ? (
        <RenameModal
          folder={folder}
          onClose={() => setRenameOpen(false)}
        />
      ) : null}
    </div>
  );
}

function RenameModal({
  folder,
  onClose,
}: {
  folder: FolderDetail;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(folder.clientName);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await renameFolder({ data: { folderId: folder.id, clientName: name } });
      toast.success("Ordner umbenannt.");
      await queryClient.invalidateQueries({ queryKey: ["folder", folder.id] });
      await queryClient.invalidateQueries({ queryKey: ["folders"] });
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Umbenennen fehlgeschlagen.");
      setSaving(false);
    }
  }

  return (
    <Modal titleId="rename-title" title="Ordner umbenennen">
      <p className="mt-2 text-sm text-ink-muted">
        Der Name steht auf Dokumenten und im Lohlotse.
      </p>
      <div className="mt-4 space-y-2">
        <label htmlFor="rename-name" className="text-sm font-medium">
          Name *
        </label>
        <Input id="rename-name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="ghost" type="button" onClick={onClose}>
          Abbrechen
        </Button>
        <Button type="button" disabled={saving || name.trim().length < 2} onClick={() => void save()}>
          Speichern
        </Button>
      </div>
    </Modal>
  );
}

function PersonalEditor({
  folder,
}: {
  folder: FolderDetail;
}) {
  const [passt, setPasst] = useState(folder.steckbrief.passt);
  const [passtNicht, setPasstNicht] = useState(folder.steckbrief.passtNicht);
  const [offeneFragen, setOffeneFragen] = useState(folder.steckbrief.offeneFragen);
  const [rueckmeldungen, setRueckmeldungen] = useState(folder.steckbrief.rueckmeldungen);
  const [criterion, setCriterion] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(nextPasst = passt) {
    setSaving(true);
    try {
      await updateSteckbrief({
        data: {
          folderId: folder.id,
          passt: nextPasst,
          passtNicht,
          offeneFragen,
          rueckmeldungen,
        },
      });
      toast.success("Persönlicher Steckbrief gespeichert.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.");
    } finally {
      setSaving(false);
    }
  }

  function addCriterion() {
    const text = criterion.trim();
    if (!text) return;
    const next = passt.trim() ? `${passt.trim()}\n${text}` : text;
    setPasst(next);
    setCriterion("");
    void save(next);
  }

  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl tracking-tight">Persönlich für {folder.clientName}</h2>
      <p className="text-sm text-ink-muted">
        Samen sichtbar, nicht leer. Arbeitsnotizen nur in diesem Fallordner.
      </p>
      <Field id="passt" label="Was passt" value={passt} onChange={setPasst} />
      <div className="flex flex-wrap gap-2">
        <Input
          value={criterion}
          placeholder="Wahlkriterium"
          aria-label="Wahlkriterium"
          onChange={(event) => setCriterion(event.target.value)}
        />
        <Button type="button" variant="secondary" onClick={addCriterion}>
          Wahlkriterium hinzufügen
        </Button>
        <Button type="button" variant="ghost" asChild>
          <Link to="/app/lohlotse" search={{ folder: folder.id }}>
            Im Lohlotse ergänzen
          </Link>
        </Button>
      </div>
      <Field id="passt-nicht" label="Was nicht passt" value={passtNicht} onChange={setPasstNicht} />
      <Field id="fragen" label="Offene Fragen" value={offeneFragen} onChange={setOffeneFragen} />
      <Field
        id="rueck"
        label="Rückmeldungen der Klient:in"
        value={rueckmeldungen}
        onChange={setRueckmeldungen}
      />
      <Button type="button" disabled={saving} onClick={() => void save()}>
        {saving ? "Speichert…" : "Speichern"}
      </Button>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
