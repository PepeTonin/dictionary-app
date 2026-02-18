import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  getLocalHistory,
  getLocalHistoryPaginated,
  HistoryItemLocal,
} from "@/services/storage/historyStorage";
import { getHistory as getServerHistory } from "@/services/supabase/history";
import { HistoryResponse } from "@/services/supabase/models/history";

import { useAuthStore } from "@/stores/authStore";

const HISTORY_PAGE_LIMIT = 30;

function toHistoryResponse(item: HistoryItemLocal): HistoryResponse {
  return {
    id: `local-${item.word.toLowerCase()}`,
    word: item.word,
    viewed_at: item.viewedAt,
  };
}

function sortByViewedAt(items: HistoryResponse[]): HistoryResponse[] {
  return items.sort(
    (a, b) => new Date(b.viewed_at).getTime() - new Date(a.viewed_at).getTime(),
  );
}

function mergeFullHistory(
  serverItems: HistoryResponse[],
  localItems: HistoryItemLocal[],
): HistoryResponse[] {
  const map = new Map<string, HistoryResponse>();

  for (const item of serverItems) {
    const key = item.word.toLowerCase();
    map.set(key, { id: item.id, word: item.word, viewed_at: item.viewed_at });
  }

  for (const item of localItems) {
    const key = item.word.toLowerCase();
    const existing = map.get(key);

    if (!existing || new Date(item.viewedAt) > new Date(existing.viewed_at)) {
      map.set(key, {
        id: existing?.id ?? `local-${key}`,
        word: item.word,
        viewed_at: item.viewedAt,
      });
    }
  }

  return sortByViewedAt(Array.from(map.values()));
}

function mergeServerPageWithLocal(
  serverItems: HistoryResponse[],
  localItems: HistoryItemLocal[],
): HistoryResponse[] {
  const map = new Map<string, HistoryResponse>();

  for (const item of serverItems) {
    const key = item.word.toLowerCase();
    map.set(key, { id: item.id, word: item.word, viewed_at: item.viewed_at });
  }

  for (const item of localItems) {
    const key = item.word.toLowerCase();
    const existing = map.get(key);

    if (existing && new Date(item.viewedAt) > new Date(existing.viewed_at)) {
      map.set(key, { ...existing, viewed_at: item.viewedAt });
    }
  }

  return sortByViewedAt(Array.from(map.values()));
}

async function fetchHistoryPage(
  isAuthenticated: boolean,
  pageParam: number,
): Promise<HistoryResponse[]> {
  if (!isAuthenticated) {
    return getLocalHistoryPaginated(pageParam, HISTORY_PAGE_LIMIT).map(
      toHistoryResponse,
    );
  }

  const [serverItems, localItems] = await Promise.all([
    getServerHistory({ page: pageParam, limit: HISTORY_PAGE_LIMIT }),
    Promise.resolve(getLocalHistory()),
  ]);

  if (pageParam === 1) {
    return mergeFullHistory(serverItems, localItems);
  }

  return mergeServerPageWithLocal(serverItems, localItems);
}

export function useHistory() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["history", isAuthenticated],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchHistoryPage(isAuthenticated, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < HISTORY_PAGE_LIMIT) {
        return undefined;
      }
      return allPages.length + 1;
    },
    refetchOnWindowFocus: true,
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["history"] });
  }, [queryClient]);

  const history = data?.pages.flatMap((page) => page) ?? [];

  return {
    data: history,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    invalidate,
  };
}
