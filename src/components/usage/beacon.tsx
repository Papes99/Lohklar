import { useEffect } from "react";
import {
  emitSessionUsage,
  markUsageSubscribed,
  takePendingUsage,
  type UsageKind,
} from "@/lib/domain/usage";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { recordUsageEvent } from "@/lib/server/usage";

export function UsageBeacon() {
  const { user } = useCurrentUserState();

  useEffect(() => {
    if (!user) return;

    const send = (detail: { kind?: UsageKind; clinicId?: string | null; meta?: string }) => {
      if (!detail.kind) return;
      void recordUsageEvent({
        data: {
          kind: detail.kind,
          clinicId: detail.clinicId,
          meta: detail.meta,
        },
      }).catch(() => undefined);
    };

    const onUsage = (event: Event) => {
      send((event as CustomEvent<{ kind?: UsageKind; clinicId?: string; meta?: string }>).detail ?? {});
    };

    markUsageSubscribed(true);
    window.addEventListener("lohklar-usage", onUsage);
    for (const item of takePendingUsage()) send(item);
    emitSessionUsage();
    return () => {
      window.removeEventListener("lohklar-usage", onUsage);
      markUsageSubscribed(false);
    };
  }, [user?.id]);

  return null;
}
