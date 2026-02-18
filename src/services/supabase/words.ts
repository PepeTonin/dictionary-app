import { GetWordsParams, WordResponse } from "./models/words";

import { supabaseRestClient } from "./client";

export async function getWords({ page, limit }: GetWordsParams) {
  const response = await supabaseRestClient.get<WordResponse[]>("/words", {
    params: {
      limit,
      offset: (page - 1) * limit,
    },
  });
  return response.data;
}
