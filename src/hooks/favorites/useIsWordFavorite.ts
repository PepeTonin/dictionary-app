import { useQuery } from "@tanstack/react-query";

import { TEN_MINUTES } from "@/constants/times";
import { isFavoriteWord } from "@/services/supabase/favorites";

export function useIsWordFavorite(word: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["isFavorite", word],
    queryFn: async () => await isFavoriteWord(word),
    staleTime: TEN_MINUTES,
    cacheTime: TEN_MINUTES,
  });

  return {
    isFavorite: data ?? false,
    isLoading,
    error,
    refetch,
  };
}
