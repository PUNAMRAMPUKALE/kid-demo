const KEY = "kid.currentChildId";
export function getChildId() { return localStorage.getItem(KEY) ?? ""; }
export function setChildId(id: string) { localStorage.setItem(KEY, id); }
