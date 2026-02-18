import { useInfiniteQuery } from "@tanstack/react-query";

import { TEN_MINUTES } from "@/constants/times";
import { getFavorites } from "@/services/supabase/favorites";

const FAVORITES_LIMIT = 30;

export function useFavorites() {
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
    queryKey: ["favorites"],
    queryFn: async ({ pageParam = 1 }) => {
      return getFavorites({ page: pageParam, limit: FAVORITES_LIMIT });
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
    refetchOnWindowFocus: true,
    staleTime: TEN_MINUTES,
    cacheTime: TEN_MINUTES,
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
