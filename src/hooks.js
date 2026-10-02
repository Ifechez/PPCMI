import { useEffect, useState, useCallback } from "react";
import { api } from "./api.js";

export function useFetch(path, initial = null) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    setLoading(true);
    api.get(path).then((d) => live && (setData(d), setError(""))).catch((e) => live && setError(e.message)).finally(() => live && setLoading(false));
    return () => { live = false; };
  }, [path]);
  return { data, loading, error };
}

export function useForm(initial) {
  const [v, setV] = useState(initial);
  const bind = useCallback((k) => ({ value: v[k] ?? "", onChange: (e) => setV((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value })) }), [v]);
  return [v, setV, bind];
}

export const fmtDate = (s, opts = { day: "numeric", month: "long", year: "numeric" }) => {
  if (!s) return "";
  const d = new Date(String(s).length <= 10 ? s + "T12:00:00" : String(s).replace(" ", "T") + "Z");
  return isNaN(d) ? s : d.toLocaleDateString("en-GB", opts);
};
export const readTime = (t = "") => `${Math.max(1, Math.round(t.split(/\s+/).length / 200))} min read`;
