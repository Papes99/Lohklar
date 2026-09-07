import { createFileRoute } from "@tanstack/react-router";
import { KiWorkspace } from "@/components/ki/workspace";

export const Route = createFileRoute("/app/ki")({
  component: KiPage,
});

function KiPage() {
  return <KiWorkspace />;
}
