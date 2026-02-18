import { GetWordsParams, WordByIdResponse, WordResponse } from "./models/words";

import { supabaseClient, supabaseRestClient } from "./client";

export async function getWords({ page, limit }: GetWordsParams) {
  const response = await supabaseRestClient.get<WordResponse[]>("/words", {
    params: {
      limit,
      offset: (page - 1) * limit,
    },
  });
  return response.data;
}

export async function getWordId(word: string) {
  const { data, error } = await supabaseClient
    .from("words")
    .select("id")
    .eq("word", word)
    .single();

  if (error) {
    return null;
  }

  return data as WordByIdResponse;
}

export async function getWordById(id: number) {
  const { data, error } = await supabaseClient
    .from("words")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }

  return data as WordByIdResponse;
}
