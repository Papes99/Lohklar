import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 20_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  browserClient ??= makeQueryClient();
  return browserClient;
}
