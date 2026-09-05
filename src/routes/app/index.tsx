import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashBoard, type DashSearch } from "@/components/dashboard/dash-board";
import { isCatalogLogFilter } from "@/lib/domain/catalog-log";
import { berlinTodayYmd, parseYmd, type DashView } from "@/lib/domain/usage";
import { getDashboard } from "@/lib/server/dashboard";

type AppSearch = {
  view?: DashView;
  date?: string;
  log?: DashSearch["log"];
};

function parseSearch(search: Record<string, unknown>): AppSearch {
  const view: DashView | undefined =
    search.view === "day" || search.view === "month" || search.view === "year" ? search.view : undefined;
  const date =
    typeof search.date === "string" && parseYmd(search.date) ? search.date : undefined;
  const log = isCatalogLogFilter(search.log) && search.log !== "alle" ? search.log : undefined;
  return { view, date, log };
}

function resolvedSearch(search: AppSearch): DashSearch {
  return {
    view: search.view ?? "month",
    date: search.date ?? berlinTodayYmd(),
    log: search.log,
  };
}

export const Route = createFileRoute("/app/")({
  validateSearch: (search: Record<string, unknown>): AppSearch => parseSearch(search),
  component: DashboardPage,
});

function DashboardPage() {
  const raw = Route.useSearch();
  const search = resolvedSearch(raw);
  const navigate = useNavigate({ from: "/app/" });
  const query = useQuery({
    queryKey: ["dashboard", search.view, search.date],
    queryFn: () => getDashboard({ data: { view: search.view, date: search.date } }),
  });

  useEffect(() => {
    if (!raw.view || !raw.date) {
      void navigate({
        search: { view: search.view, date: search.date, log: search.log },
        replace: true,
      });
    }
  }, [navigate, raw.date, raw.view, search.date, search.log, search.view]);

  if (query.isError) {
    return <p className="text-sm text-ink-muted">Die Übersicht konnte nicht geladen werden.</p>;
  }
  if (query.isPending || !query.data) {
    return <p className="text-sm text-ink-muted">Zahlen werden geladen…</p>;
  }

  return (
    <DashBoard
      data={query.data}
      search={search}
      onSearch={(next) => {
        void navigate({ search: { view: next.view, date: next.date, log: next.log } });
      }}
    />
  );
}
