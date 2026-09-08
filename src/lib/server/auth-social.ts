import { createServerFn } from "@tanstack/react-start";
import { socialSignInAvailable } from "@/lib/auth/native-oauth";

export const getSocialSignIn = createServerFn({ method: "GET" }).handler(() => socialSignInAvailable());
