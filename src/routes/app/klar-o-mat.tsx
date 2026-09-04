import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MatchHitList } from "@/components/klaromat/hit-list";
import { PersonDialog } from "@/components/klaromat/person-dialog";
import { KlaromatWizard } from "@/components/klaromat/wizard";
import {
  completeRun,
  createDraftDocument,
  getRun,
  listFolders,
  saveDraft,
} from "@/lib/server/cases";
import { listClinics } from "@/lib/server/clinics";

type Search = { run?: string; folder?: string };

export const Route = createFileRoute("/app/klar-o-mat")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    run: typeof search.run === "string" ? search.run : undefined,
    folder: typeof search.folder === "string" ? search.folder : undefined,
  }),
  component: KlaromatPage,
});

function KlaromatPage() {
  const { run: runId, folder } = Route.useSearch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [editNeed, setEditNeed] = useState(false);

  const foldersQuery = useQuery({
    queryKey: ["folders"],
    queryFn: () => listFolders(),
    enabled: !runId,
  });
  const runQuery = useQuery({
    queryKey: ["run", runId],
    queryFn: () => getRun({ data: runId! }),
    enabled: Boolean(runId),
  });
  const clinicsQuery = useQuery({
    queryKey: ["clinics"],
    queryFn: () => listClinics(),
    enabled: Boolean(runId),
  });

  if (!runId) {
    if (foldersQuery.isPending) {
      return <p className="text-ink-muted">Fallordner werden geladen…</p>;
    }
    return <PersonDialog folders={foldersQuery.data ?? []} preselectedFolderId={folder} />;
  }

  if (runQuery.isPending) {
    return <p className="text-ink-muted">Durchlauf wird geladen…</p>;
  }
  const run = runQuery.data;
  if (!run) {
    return <p>Dieser Durchlauf ist nicht vorhanden.</p>;
  }

  if (run.documentId) {
    return <Navigate to="/app/fallordner/$folderId" params={{ folderId: run.folderId }} />;
  }

  const showHits = run.matches.length > 0 && !editNeed;

  const currentRun = run;

  async function onCreate(clinicIds: string[]) {
    setCreating(true);
    try {
      const result = await createDraftDocument({ data: { runId: currentRun.id, clinicIds } });
      await queryClient.invalidateQueries({ queryKey: ["folder", result.folderId] });
      await navigate({
        to: "/app/fallordner/$folderId",
        params: { folderId: result.folderId },
        search: { tab: "dokumente" },
      });
    } finally {
      setCreating(false);
    }
  }

  if (showHits) {
    return (
      <MatchHitList
        clientName={run.folder.clientName}
        answers={run.answers}
        matches={run.matches}
        clinics={clinicsQuery.data ?? []}
        creating={creating}
        onCreateDocument={(ids) => void onCreate(ids)}
        onAdjustNeed={() => setEditNeed(true)}
      />
    );
  }

  if (run.status !== "entwurf") {
    return (
      <p className="text-ink-muted">
        Dieser Durchlauf ist abgeschlossen. Starten Sie einen neuen Lauf über die Personwahl.
      </p>
    );
  }

  return (
    <KlaromatWizard
      clientName={run.folder.clientName}
      runNumber={run.runNumber}
      label={run.label}
      createdAt={run.createdAt}
      initialAnswers={run.answers}
      onExit={() => void navigate({ to: "/app/fallordner/$folderId", params: { folderId: run.folderId } })}
      onSaveDraft={async (answers) => {
        await saveDraft({ data: { runId: run.id, answers } });
      }}
      onComplete={async (answers) => {
        await completeRun({ data: { runId: run.id, answers } });
        setEditNeed(false);
        await runQuery.refetch();
      }}
    />
  );
}
