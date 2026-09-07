import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  clearKiMessages,
  listKiMessages,
  sendKiMessage,
  type KiMessage,
} from "@/lib/server/ki";

export function KiWorkspace() {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const messagesQuery = useQuery({
    queryKey: ["ki-messages"],
    queryFn: () => listKiMessages(),
  });

  const send = useMutation({
    mutationFn: (content: string) => sendKiMessage({ data: { content } }),
    onSuccess: (result) => {
      setDraft("");
      queryClient.setQueryData(["ki-messages"], result.messages);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Nachricht fehlgeschlagen.");
    },
  });

  const clear = useMutation({
    mutationFn: () => clearKiMessages(),
    onSuccess: (messages) => {
      queryClient.setQueryData(["ki-messages"], messages);
      toast.success("Chat geleert.");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Löschen fehlgeschlagen.");
    },
  });

  const messages = messagesQuery.data ?? [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, send.isPending]);

  if (messagesQuery.isError) {
    return (
      <p className="text-ink-muted">
        Lohklar KI konnte nicht geladen werden. Bitte später erneut versuchen.
      </p>
    );
  }

  if (messagesQuery.isPending) {
    return <p className="text-ink-muted">Lohklar KI wird geladen…</p>;
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
            Lohklar KI
          </p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Orientierung fragen</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Freie Fragen zu Katalog, Klar-o-Mat, Fallarbeit und App-Nutzung. Kein Fallordner,
            keine Diagnosen, keine Aufnahmezusagen.
          </p>
        </div>
        {messages.length > 0 ? (
          <Button
            type="button"
            variant="secondary"
            disabled={clear.isPending}
            onClick={() => clear.mutate()}
          >
            Chat leeren
          </Button>
        ) : null}
      </header>

      <p className="rounded-[var(--radius-lg)] bg-primary-soft px-4 py-3 text-sm text-ink">
        Nur Orientierung. Keine Diagnose, keine Therapieentscheidung, keine Betten, keine Garantie.
        Wartezeiten nur über die Wartezeit-Komponente in den Steckbriefen.
      </p>

      <section
        className="flex min-h-[28rem] flex-col rounded-[var(--radius-xl)] bg-surface shadow-[var(--shadow-border)]"
        aria-label="Chat mit Lohklar KI"
      >
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="mr-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                Lohklar KI
              </p>
              <div className="mt-1 rounded-[var(--radius-md)] bg-bg-subtle px-3 py-3 text-ink">
                <p>
                  Stellen Sie frei Fragen zur Orientierung — zum Beispiel zu Steckbriefen, Klar-o-Mat
                  oder Fallarbeit. Antworten sind Orientierungshilfe, keine medizinische Beratung.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => <Bubble key={message.id} message={message} />)
          )}
          {send.isPending ? (
            <p className="text-sm text-ink-muted">Lohklar KI formuliert…</p>
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
          <label htmlFor="ki-input" className="sr-only">
            Nachricht an Lohklar KI
          </label>
          <Textarea
            id="ki-input"
            rows={3}
            className="min-h-24 text-base"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Fragen Sie frei zur Orientierung … Keine Diagnosen."
          />
          <Button type="submit" className="mt-2 w-full" disabled={send.isPending}>
            Senden
          </Button>
        </form>
      </section>
    </div>
  );
}

function Bubble({ message }: { message: KiMessage }) {
  if (message.role === "user") {
    return (
      <div className="ml-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Fachkraft</p>
        <p className="mt-1 whitespace-pre-wrap rounded-[var(--radius-md)] bg-primary-soft px-3 py-2 text-sm text-ink">
          {message.content}
        </p>
      </div>
    );
  }
  return (
    <div className="mr-4">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">Lohklar KI</p>
      <div className="mt-1 whitespace-pre-wrap rounded-[var(--radius-md)] bg-bg-subtle px-3 py-3 text-ink">
        {message.content}
      </div>
    </div>
  );
}
