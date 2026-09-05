import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import {
  buildResultDocument,
  ensureDocumentBody,
  isDocumentBody,
  type DocumentBody,
  type DocumentVersionMeta,
} from "@/lib/domain/document";
import { emptyAnswers, hydrateMatch, isBlocked, normalizeAnswers, rankClinics } from "@/lib/domain/matching";
import {
  indicationLabel,
  type KlaromatAnswers,
  type MatchSnapshot,
  type RunStatus,
} from "@/lib/domain/types";
import { loadClinics } from "./clinics";
import { insertUsageEvent } from "./usage";
import { seedAntragswegForFolder } from "./antragsweg";

// NOTE: Full file body loaded from box — if this commit is incomplete the parent must re-push.
export { seedAntragswegForFolder };
