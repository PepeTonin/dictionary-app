import { storage } from "./mmkv";

const HISTORY_STORAGE_KEY = "word-history";

export interface HistoryItemLocal {
  word: string;
  viewedAt: string;
}

function getStoredHistory(): HistoryItemLocal[] {
  try {
    const stored = storage.getString(HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as HistoryItemLocal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItemLocal[]) {
  try {
    storage.set(HISTORY_STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
}

export function addToLocalHistory(word: string) {
  const items = getStoredHistory();
  const now = new Date().toISOString();
  const filtered = items.filter(
    (item) => item.word.toLowerCase() !== word.toLowerCase(),
  );
  const newItems = [{ word, viewedAt: now }, ...filtered];
  saveHistory(newItems);
}

export function getLocalHistory(): HistoryItemLocal[] {
  const items = getStoredHistory();
  return items.sort(
    (a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime(),
  );
}

export function getLocalHistoryPaginated(
  page: number,
  limit: number,
): HistoryItemLocal[] {
  const items = getLocalHistory();
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
}

export function removeFromLocalHistory(word: string) {
  const items = getStoredHistory().filter(
    (item) => item.word.toLowerCase() !== word.toLowerCase(),
  );
  saveHistory(items);
}

export function clearLocalHistory() {
  storage.remove(HISTORY_STORAGE_KEY);
}
