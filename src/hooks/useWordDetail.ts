import { dictionaryClient } from "@/services/apis/dictionaryClient";
import type { WordDetailResponse } from "@/types/wordDetail";
import { useQuery } from "@tanstack/react-query";

export function useWordDetail(word: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["word", word],
    queryFn: async () => {
      const { data } = await dictionaryClient.get<WordDetailResponse[]>(
        `/${word}`,
      );
      return data;
    },
  });
  return { data, isLoading, error };
}
