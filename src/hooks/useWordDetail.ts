import { useQuery } from "@tanstack/react-query";

import { TEN_MINUTES } from "@/constants/times";
import { getWordDetail } from "@/services/apis/wordDetail";

export function useWordDetail(word: string) {
  const { data, isLoading, error, refetch, isRefetching, isSuccess } = useQuery(
    {
      queryKey: ["word", word],
      queryFn: async () => await getWordDetail(word),
      staleTime: TEN_MINUTES,
      cacheTime: TEN_MINUTES,
    },
  );

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    canRefetch: !isSuccess,
  };
}
