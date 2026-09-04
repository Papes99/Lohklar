import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LohlotsePicker } from "@/components/lohlotse/picker";
import { LohlotseWorkspace } from "@/components/lohlotse/workspace";
import { listFolders } from "@/lib/server/cases";
import { getLastLohlotseFolder } from "@/lib/server/lohlotse";

type Search = { folder?: string };

export const Route = createFileRoute("/app/lohlotse")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    folder: typeof search.folder === "string" && search.folder ? search.folder : undefined,
  }),
  component: LohlotsePage,
});

function LohlotsePage() {
  const { folder } = Route.useSearch();
  const navigate = useNavigate();
  const lastQuery = useQuery({
    queryKey: ["lohlotse-last"],
    queryFn: () => getLastLohlotseFolder(),
  });
  const foldersQuery = useQuery({
    queryKey: ["folders"],
    queryFn: () => listFolders(),
  });

  function choose(folderId: string) {
    void navigate({ to: "/app/lohlotse", search: { folder: folderId } });
  }

  if (folder) {
    return (
      <LohlotseWorkspace
        folderId={folder}
        onSwitchPerson={() => {
          void navigate({ to: "/app/lohlotse", search: { folder: undefined } });
        }}
      />
    );
  }

  if (lastQuery.isPending || foldersQuery.isPending) {
    return <p className="text-ink-muted">Fallordner werden geladen…</p>;
  }

  return (
    <LohlotsePicker
      last={lastQuery.data ?? null}
      folders={foldersQuery.data ?? []}
      onChoose={choose}
    />
  );
}
