export const required =
  (msg = "Bu kisim bos birakilamaz") =>
  (v) =>
    Boolean(v?.trim()) ? null : msg;

export const isEmail =
  (msg = "Gecersiz email") =>
  (v) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ? null : msg;

export const minLen = (n, msg) => (v) =>
  v.length < n ? msg || `Karakter uzunlugu minimum ${n} kadar olmali.` : null;

export const maxLen = (n, msg) => (v) =>
  v.length > n ? msg || `Karakter uzunlugu maximum ${n} kadar olmali.` : null;
