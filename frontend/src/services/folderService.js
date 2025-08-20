const API_BASE = import.meta.env.VITE_API_BASE;

async function authGet(token, url) {
  const res = await fetch(url, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status}`);
  }
  return res.json();
}

async function authJSON(token, url, method, body) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`${method} ${url} failed: ${res.status}`);
  }
  return res.json();
}

export const listFolder = (token, id = null) =>
  authGet(token, `${API_BASE}/api/folders${id ? `/${id}` : ""}`);

export const createFolder = (token, payload) =>
  authJSON(token, `${API_BASE}/api/folders`, "POST", payload);

export const renameFolder = (token, id, name) =>
  authJSON(token, `${API_BASE}/api/folders/${id}`, "PATCH", { name });

export const deleteFolder = (token, id) =>
  fetch(`${API_BASE}/api/folders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  }).then(async (res) => {
    if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
    return res.json();
  });
