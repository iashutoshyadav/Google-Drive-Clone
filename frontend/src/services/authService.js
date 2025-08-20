const API_BASE = import.meta.env.VITE_API_BASE;

async function handleResponse(res) {
  if (!res.ok) {
    let msg = "Request failed";
    try {
      const j = await res.json();
      msg = j.message || msg;
    } catch {
    }
    throw new Error(msg);
  }
  return res.json();
}

// --- Auth Services ---

export async function signup(payload) {
  try {
    return await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse);
  } catch (err) {
    return { error: true, message: err.message };
  }
}

export async function login(payload) {
  try {
    return await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse);
  } catch (err) {
    return { error: true, message: err.message };
  }
}

export async function me(token) {
  try {
    return await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(handleResponse);
  } catch (err) {
    return { error: true, message: err.message };
  }
}
