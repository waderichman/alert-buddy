import { Severity } from "@/lib/types";

export const severityPalette: Record<
  Severity,
  { backgroundColor: string; color: string }
> = {
  critical: { backgroundColor: "rgba(239,68,68,0.16)", color: "#fca5a5" },
  breaking: { backgroundColor: "rgba(255,107,44,0.18)", color: "#ffb36a" },
  developing: { backgroundColor: "rgba(45,212,191,0.15)", color: "#7dd3fc" }
};
