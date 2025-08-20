// utils/fileUtils.js
export function getFileCategory(filename = "") {
  const ext = filename.split(".").pop().toLowerCase();

  // Document types
  if ([
    "pdf", "doc", "docx", "txt",
    "ppt", "pptx", "xls", "xlsx"
  ].includes(ext)) {
    return "document";
  }

  // Image types
  if ([
    "jpg", "jpeg", "png", "gif",
    "webp", "svg"
  ].includes(ext)) {
    return "image";
  }

  // Media types
  if ([
    "mp4", "mov", "avi", "mkv",
    "mp3", "wav"
  ].includes(ext)) {
    return "media";
  }

  // Everything else
  return "other";
}
