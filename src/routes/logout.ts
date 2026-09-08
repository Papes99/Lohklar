import { createFileRoute } from "@tanstack/react-router";
import { logoutResponse } from "@/lib/auth/logout.server";

export const Route = createFileRoute("/logout")({
  server: {
    handlers: {
      GET: ({ request }) => logoutResponse(request),
    },
  },
});
