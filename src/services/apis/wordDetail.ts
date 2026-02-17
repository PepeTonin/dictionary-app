import { dictionaryClient } from "./dictionaryClient";
import type { WordDetailResponse } from "./models/wordDetail";

export async function getWordDetail(word: string) {
  const response = await dictionaryClient.get<WordDetailResponse[]>(`/${word}`);
  return response.data;
}
