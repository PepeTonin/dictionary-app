import { getWords } from "@/services/supabase/words";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useWords() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
  };
}
