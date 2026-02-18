import { getWordById, getWordId, getWords } from "@/services/supabase/words";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useWords() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["words"],
    queryFn: async ({ pageParam = 1 }) => {
      return getWords({ page: pageParam, limit: 75 });
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  };
}

async function getCurrentWordId(word: string) {
  const wordId = await getWordId(word);
  if (!wordId) {
    throw new Error("Word not found");
  }
  return wordId.id;
}

export function useNextWord(wordItem: { word: string; id?: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["nextWord", wordItem.word],
    queryFn: async () => {
      let wordId = wordItem.id;
      if (!wordId) {
        wordId = await getCurrentWordId(wordItem.word);
      }
      return await getWordById(wordId + 1);
    },
  });

  return {
    data,
    isLoading,
  };
}

export function usePreviousWord(wordItem: { word: string; id?: number }) {
  const { data, isLoading } = useQuery({
    queryKey: ["previousWord", wordItem.word],
    queryFn: async () => {
      let wordId = wordItem.id;
      if (!wordId) {
        wordId = await getCurrentWordId(wordItem.word);
      }
      return await getWordById(wordId - 1);
    },
  });

  return {
    data,
    isLoading,
  };
}
