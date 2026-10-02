const j = async (res) => {
  let data = null;
  try { data = await res.json(); } catch { /* non-json */ }
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data;
};
export const api = {
  get: (p) => fetch(`/api${p}`).then(j),
  post: (p, body) => fetch(`/api${p}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then(j),
};

/* ---------------- admin ---------------- */
export const auth = {
  get token() { return localStorage.getItem("ppcmi_admin") || ""; },
  set token(v) { v ? localStorage.setItem("ppcmi_admin", v) : localStorage.removeItem("ppcmi_admin"); },
};
const H = (extra = {}) => ({ Authorization: `Bearer ${auth.token}`, ...extra });
// Optional: when the website (Vercel) and the Laravel backend live on different addresses, uploads go straight to the
// backend (Vercel's proxy limits large request bodies). Set VITE_BACKEND_URL at build time; leave empty otherwise.
const BACKEND = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
const adminFetch = async (path, opts = {}, direct = false) => {
  const res = await fetch(`${direct ? BACKEND : ""}/api/admin${path}`, opts);
  if (res.status === 401 && !path.startsWith("/login")) { auth.token = ""; window.dispatchEvent(new Event("ppcmi-logout")); }
  return j(res);
};
export const admin = {
  login: (email, password) => adminFetch("/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) }),
  get: (p) => adminFetch(p, { headers: H() }),
  post: (p, body) => adminFetch(p, { method: "POST", headers: H({ "content-type": "application/json" }), body: JSON.stringify(body) }),
  put: (p, body) => adminFetch(p, { method: "PUT", headers: H({ "content-type": "application/json" }), body: JSON.stringify(body) }),
  del: (p) => adminFetch(p, { method: "DELETE", headers: H() }),
  upload: (file) => { const f = new FormData(); f.append("file", file); return adminFetch("/upload", { method: "POST", headers: H(), body: f }, true); },
  uploadMany: (files, category) => { const f = new FormData(); f.append("category", category); [...files].forEach((x) => f.append("files[]", x)); return adminFetch("/gallery/upload", { method: "POST", headers: H(), body: f }, true); },
  async csv(path, name) {
    const res = await fetch(`/api/admin${path}`, { headers: H() });
    const a = document.createElement("a"); a.href = URL.createObjectURL(await res.blob()); a.download = name; a.click();
  },
};
