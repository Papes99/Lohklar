import { createServerFn } from "@tanstack/react-start";
import { CLINIC_SEED } from "@/lib/domain/clinic-seed";
import { computeWaitEstimate } from "@/lib/domain/wait-time";
import type { Clinic } from "@/lib/domain/types";

export async function loadClinics(): Promise<Clinic[]> {
  return CLINIC_SEED;
}

export const listClinics = createServerFn({ method: "GET" }).handler(async () => {
  const clinics = await loadClinics();
  return clinics.map((clinic) => ({
    ...clinic,
    wait: computeWaitEstimate(clinic, { peers: clinics }),
  }));
});

export const getClinic = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const clinics = await loadClinics();
    const clinic = clinics.find((item) => item.id === id);
    if (!clinic) return null;
    return { ...clinic, wait: computeWaitEstimate(clinic, { peers: clinics }) };
  });
