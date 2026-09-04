import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LohlotseRail, MobileRail } from "@/components/lohlotse/rail";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WartezeitSchaetzung } from "@/components/wait/wartezeit-schaetzung";
import {
  PERSONAL_MERGE_HEADING,
  splitUnits,
  type LohlotsePayload,
} from "@/lib/domain/lohlotse";
import type { ClinicWithWait } from "@/lib/domain/types";
import {
  applyLohlotseMerge,
  dismissLohlotseOffer,
  getLohlotseWorkspace,
  sendLohlotseMessage,
  setLohlotseClinic,
  undoLohlotseMerge,
  type LohlotseMessage,
  type LohlotseWorkspace,
} from "@/lib/server/lohlotse";
import { listClinics } from "@/lib/server/clinics";

export function LohlotseWorkspace({
  folderId,
  onSwitchPerson,
}: {
  folderId: string;
  onSwitchPerson: () => void;
}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const [railOpen, setRailOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const workspaceQuery = useQuery({
    queryKey: ["lohlotse", folderId],
    queryFn: () => getLohlotseWorkspace({ data: folderId }),
  });
  const clinicsQuery = useQuery({
    queryKey: ["clinics"],
    queryFn: () => listClinics(),
  });

  const workspace = workspaceQuery.data;
  const clinics = clinicsQuery.data ?? [];
  const clinic =
    clinics.find((item) => item.id === workspace?.clinicId) ??
    null;

  const send = useMutation({
    mutationFn: (content: string) =>
      sendLohlotseMessage({
        data: { folderId, content, clinicId: workspace?.clinicId ?? null },
      }),
    onSuccess: (result) => {
      setDraft("");
      queryClient.setQueryData(["lohlotse", folderId], result.workspace);
      void queryClient.invalidateQueries({ queryKey: ["folder", folderId] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Nachricht fehlgeschlagen.");
    },
  });

  const apply = useMutation({
    mutationFn: (messageId: string) =>
      applyLohlotseMerge({ data: { folderId, messageId } }),
    onSuccess: (next) => {
      queryClient.setQueryData(["lohlotse", folderId], next);
      toast.success(`In den persönlichen Steckbrief von ${next.clientName} übernommen.`);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Übernahme fehlgeschlagen.");
    },
  });
  const dismiss = useMutation({
    mutationFn: (messageId: string) =>
      dismissLohlotseOffer({ data: { folderId, messageId } }),
    onSuccess: (next) => queryClient.setQueryData(["lohlotse", folderId], next),
  });
  const undo = useMutation({
    mutationFn: () => undoLohlotseMerge({ data: { folderId } }),
    onSuccess: (next) => {
      queryClient.setQueryData(["lohlotse", folderId], next);
      toast.success("Übernahme rückgängig.");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Rückgängig nicht möglich.");
    },
  });
  const setClinic = useMutation({
    mutationFn: (clinicId: string | null) =>
      setLohlotseClinic({ data: { folderId, clinicId } }),
    onSuccess: (next) => queryClient.setQueryData(["lohlotse", folderId], next),
  });

  const messages = workspace?.messages ?? [];
  const latestHighlights =
    [...messages].reverse().find((item) => item.payload?.highlights?.length)?.payload?.highlights ??
    [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, send.isPending]);

  if (workspaceQuery.isError) {
    return (
      <div className="space-y-3">
        <p>Dieser Fallordner ist nicht verfügbar. Bitte eine Person mit Durchlauf wählen.</p>
        <Button type="button" onClick={onSwitchPerson}>
          Person wählen
        </Button>
      </div>
    );
  }
  if (workspaceQuery.isPending || !workspace) {
    return <p className="text-ink-muted">Lohlotse wird geladen…</p>;
  }

  const rail = (
    <LohlotseRail
      clientName={workspace.clientName}
      personal={workspace.personal}
      clinic={clinic}
      clinics={clinics}
      matches={workspace.matches}
      highlights={latestHighlights}
      onSelectClinic={(id) => setClinic.mutate(id)}
    />
  );

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Lohlotse</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">{workspace.clientName}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Ein Faden, ein Name. Keine Diagnose, keine Therapieentscheidung, keine Aufnahmezusage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" type="button" onClick={onSwitchPerson}>
            Andere Person
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/app/fallordner/$folderId" params={{ folderId }}>
              Fallordner
            </Link>
          </Button>
        </div>
      </header>

      {workspace.lastMerge && !workspace.lastMerge.undone ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-lg)] bg-primary-soft px-4 py-3 text-sm">
          <p>
            Übernommen in „{PERSONAL_MERGE_HEADING[workspace.lastMerge.field]}“ von{" "}
            {workspace.clientName}.
          </p>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={undo.isPending}
            onClick={() => undo.mutate()}
          >
            Rückgängig
          </Button>
        </div>
      ) : null}

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <section
          className="flex min-h-[32rem] flex-col rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]"
          aria-label="Chat mit dem Lohlotsen"
        >
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <Intro name={workspace.clientName} personal={workspace.personal} hasClinic={Boolean(clinic)} />
            ) : (
              messages.map((message) => (
                <Bubble
                  key={message.id}
                  message={message}
                  name={workspace.clientName}
                  clinic={clinic}
                  clinics={clinics}
                  applying={apply.isPending}
                  dismissing={dismiss.isPending}
                  onApply={() => apply.mutate(message.id)}
                  onDismiss={() => dismiss.mutate(message.id)}
                />
              ))
            )}
            {send.isPending ? (
              <p className="text-sm text-ink-muted">Lohlotse formuliert…</p>
            ) : null}
            <div ref={endRef} />
          </div>
          <form
            className="border-t border-line p-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (draft.trim().length < 2 || send.isPending) return;
              send.mutate(draft);
            }}
          >
            <label htmlFor="lohlotse-input" className="sr-only">
              Nachricht an den Lohlotsen
            </label>
            <Textarea
              id="lohlotse-input"
              rows={3}
              className="min-h-24 text-base"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Frage zu ${workspace.clientName}…`}
            />
            <Button type="submit" className="mt-2 w-full" disabled={send.isPending}>
              Senden
            </Button>
          </form>
        </section>

        <div className="hidden lg:block">{rail}</div>
        <MobileRail open={railOpen} onToggle={() => setRailOpen((value) => !value)}>
          {rail}
        </MobileRail>
      </div>
    </div>
  );
}

function Intro({
  name,
  personal,
  hasClinic,
}: {
  name: string;
  personal: LohlotseWorkspace["personal"];
  hasClinic: boolean;
}) {
  const note = splitUnits(personal.passt)[0];
  return (
    <AssistantFrame heading="🧭 Überblick">
      <li>Weiter mit {name}?</li>
      {note ? <li>Persönlich notiert: {note}</li> : <li>Der persönliche Steckbrief ist angelegt und wartet auf Kriterien.</li>}
      <li>
        {hasClinic
          ? "Offiziellen Steckbrief gegen die Wahlkriterien halten."
          : "Klinik wählen oder nennen, dann öffnet die Leiste den offiziellen Steckbrief."}
      </li>
    </AssistantFrame>
  );
}

function Bubble({
  message,
  name,
  clinic,
  clinics,
  applying,
  dismissing,
  onApply,
  onDismiss,
}: {
  message: LohlotseMessage;
  name: string;
  clinic: ClinicWithWait | null;
  clinics: ClinicWithWait[];
  applying: boolean;
  dismissing: boolean;
  onApply: () => void;
  onDismiss: () => void;
}) {
  if (message.role === "user") {
    return (
      <div className="ml-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Fachkraft</p>
        <p className="mt-1 rounded-[var(--radius-md)] bg-primary-soft px-3 py-2 text-sm text-ink">
          {message.content}
        </p>
      </div>
    );
  }
  const payload = message.payload;
  const heading = payload?.heading ?? "🧭 Überblick";
  const bullets = payload?.bullets?.length
    ? payload.bullets
    : message.content
        .split("\n")
        .map((line) => line.replace(/^[-•–]\s*/, "").trim())
        .filter((line) => line && !line.startsWith("🧭") && !line.startsWith("🏥") && !line.startsWith("⏳") && !line.startsWith("📋") && !line.startsWith("⚠️") && !line.startsWith("Quellen:"));
  const waitClinic =
    clinics.find((item) => item.id === payload?.clinicId) ?? clinic;
  return (
    <div className="mr-4 space-y-3">
      <AssistantFrame heading={heading}>
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </AssistantFrame>
      {payload?.showWait && waitClinic?.wait ? (
        <WartezeitSchaetzung estimate={waitClinic.wait} />
      ) : payload?.showWait ? (
        <p className="text-sm text-ink-muted">
          Rechenweg über „Rechenweg ansehen“ in der Wartezeit-Komponente.
        </p>
      ) : null}
      {payload?.sources.length ? (
        <p className="text-xs text-ink-muted">Quelle: {payload.sources.join(" · ")}</p>
      ) : null}
      {payload?.offer?.status === "open" ? (
        <MergeCard
          name={name}
          payload={payload}
          applying={applying}
          dismissing={dismissing}
          onApply={onApply}
          onDismiss={onDismiss}
        />
      ) : null}
    </div>
  );
}

function AssistantFrame({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Lohlotse</p>
      <div className="mt-1 rounded-[var(--radius-md)] bg-bg-subtle px-3 py-3 text-ink">
        <p className="font-display text-xl tracking-tight" data-lohlotse-heading={heading}>
          {heading}
        </p>
        <ul className="mt-2 space-y-1.5 text-base">{children}</ul>
      </div>
    </div>
  );
}

function MergeCard({
  name,
  payload,
  applying,
  dismissing,
  onApply,
  onDismiss,
}: {
  name: string;
  payload: LohlotsePayload;
  applying: boolean;
  dismissing: boolean;
  onApply: () => void;
  onDismiss: () => void;
}) {
  const offer = payload.offer;
  if (!offer) return null;
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium">
        In den persönlichen Steckbrief von {name} übernehmen?
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-ink-muted">
        Vorschau · {PERSONAL_MERGE_HEADING[offer.field]}
      </p>
      <p className="mt-1 text-sm text-ink">{offer.text}</p>
      <p className="mt-2 text-sm text-ink-muted">
        Soll ich das als Arbeitsnotiz in den persönlichen Steckbrief von {name} übernehmen?
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" size="sm" disabled={applying} onClick={onApply}>
          Übernehmen
        </Button>
        <Button type="button" size="sm" variant="secondary" disabled={dismissing} onClick={onDismiss}>
          Verwerfen
        </Button>
      </div>
    </div>
  );
}
