import { isFavoriteWord } from "@/services/supabase/words";
import { useQuery } from "@tanstack/react-query";

export function useIsWordFavorite(word: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["isFavorite", word],
    queryFn: () => isFavoriteWord(word),
    enabled: !!word,
    // staleTime: 1000 * 60 * 5, // todo: review app requests caching logic
  });

  return {
    isFavorite: data ?? false,
    isLoading,
    error,
    refetch,
  };
}
