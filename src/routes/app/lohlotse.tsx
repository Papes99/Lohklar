import { createFileRoute, Navigate } from "@tanstack/react-router";

/** Lohlotse entfernt — Redirect zur fallunabhängigen Lohklar KI. */
export const Route = createFileRoute("/app/lohlotse")({
  component: () => <Navigate to="/app/ki" replace />,
});
