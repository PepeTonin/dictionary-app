import { useQuery } from "@tanstack/react-query";

import { isFavoriteWord } from "@/services/supabase/favorites";

export function useIsWordFavorite(word: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["isFavorite", word],
    queryFn: async () => await isFavoriteWord(word),
  });

  return {
    isFavorite: data ?? false,
    isLoading,
    error,
    refetch,
  };
}
