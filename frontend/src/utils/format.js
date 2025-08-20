// Small helpers used across the UI
import { format } from "date-fns";
import pretty from "filesize";

export function formatBytes(n) {
  if (n == null) return "–";
  try { return pretty(n); } catch { return `${n} B`; }
}

export function formatTime(dt) {
  if (!dt) return "–";
  try { return format(new Date(dt), "p, d LLL"); } catch { return "–"; }
}

// Rough file-type bucket by mime
export function bucketByType(file) {
  const mime = file?.mime || "";
  if (mime.startsWith("image/")) return "images";
  if (mime.startsWith("video/") || mime.startsWith("audio/")) return "media";
  if (mime.startsWith("application/pdf") || mime.startsWith("text/") || mime.includes("document") || mime.includes("sheet")) return "documents";
  return "others";
}
