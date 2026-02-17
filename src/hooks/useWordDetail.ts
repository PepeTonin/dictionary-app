import { useQuery } from "@tanstack/react-query";

import { getWordDetail } from "@/services/apis/wordDetail";

export function useWordDetail(word: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["word", word],
    queryFn: async () => await getWordDetail(word),
  });
  return { data, isLoading, error };
}
