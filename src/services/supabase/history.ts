import { GetHistoryParams, HistoryResponse } from "./models/history";
import { HistoryErrors } from "./models/historyErrors";

import { supabaseClient } from "./client";

type GetAuthenticatedUserParams = {
  throwError: boolean;
};

async function getAuthenticatedUser({
  throwError,
}: GetAuthenticatedUserParams) {
  const {
    data: { user },
    error: authError,
  } = await supabaseClient.auth.getUser();

  if (authError || !user) {
    if (throwError) {
      throw new Error(HistoryErrors.USER_NOT_AUTHENTICATED);
    }
    return null;
  }

  return user;
}

export async function addToHistory(word: string) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { error } = await supabaseClient.from("history").upsert(
    {
      user_id: user!.id,
      word,
      viewed_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,word",
      ignoreDuplicates: false,
    },
  );

  if (error) {
    throw new Error(HistoryErrors.GENERIC_ERROR);
  }

  return true;
}

export async function getHistory({ page, limit }: GetHistoryParams) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { data, error } = await supabaseClient
    .from("history")
    .select("id, word, viewed_at")
    .eq("user_id", user!.id)
    .order("viewed_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(HistoryErrors.GENERIC_ERROR);
  }

  return data as HistoryResponse[];
}

export async function removeFromHistory(word: string) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { error } = await supabaseClient
    .from("history")
    .delete()
    .eq("user_id", user!.id)
    .eq("word", word);

  if (error) {
    throw new Error(HistoryErrors.GENERIC_ERROR);
  }

  return true;
}

export async function clearHistory() {
  const user = await getAuthenticatedUser({ throwError: true });

  const { error } = await supabaseClient
    .from("history")
    .delete()
    .eq("user_id", user!.id);

  if (error) {
    throw new Error(HistoryErrors.GENERIC_ERROR);
  }

  return true;
}
