const API_BASE = import.meta.env.VITE_API_BASE;

// List files in a folder
export const listFiles = (token, folder = null) =>
  fetch(`${API_BASE}/api/files?folder=${folder || ""}`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Upload file
export const uploadFile = (token, file, folder = null) => {
  const fd = new FormData();
  fd.append("file", file);
  if (folder) fd.append("folder", folder);
  return fetch(`${API_BASE}/api/files/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  }).then((r) => r.json());
};

// Download file
export const downloadFile = (token, id) =>
  fetch(`${API_BASE}/api/files/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Move file
export const moveFile = (token, id, folder = null) =>
  fetch(`${API_BASE}/api/files/${id}/move`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ folder }),
  }).then((r) => r.json());

// Soft delete (move to trash)
export const removeFile = (token, id, type = "file") => {
  const endpoint =
    type === "folder"
      ? `${API_BASE}/api/folders/${id}`
      : `${API_BASE}/api/files/${id}/trash`;

  return fetch(endpoint, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
};

// List all trashed items
export const listTrash = (token) =>
  fetch(`${API_BASE}/api/trash`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

// Restore from trash
export const restoreItem = (token, id, type = "file") => {
  const endpoint =
    type === "folder"
      ? `${API_BASE}/api/trash/folders/${id}/restore`
      : `${API_BASE}/api/trash/${id}/restore`;

  return fetch(endpoint, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
};

// Permanently delete
export const permanentlyDeleteItem = (token, id, type = "file") => {
  const endpoint =
    type === "folder"
      ? `${API_BASE}/api/trash/folders/${id}`
      : `${API_BASE}/api/trash/${id}`;

  return fetch(endpoint, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
};
