const API_BASE = import.meta.env.VITE_API_BASE;

export const createShare = (token, payload) =>
  fetch(`${API_BASE}/api/share`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  }).then(r => r.json());

export const listMyShares = (token) =>
  fetch(`${API_BASE}/api/share`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());

export const revokeShareLink = (token, id) =>
  fetch(`${API_BASE}/api/share/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.json());
