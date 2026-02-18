import { FavoriteErrors } from "./models/favoriteErros";
import { GetWordsParams } from "./models/words";

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
      throw new Error(FavoriteErrors.USER_NOT_AUTHENTICATED);
    }
    return null;
  }

  return user;
}

export async function favoriteWord(word: string) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { data, error } = await supabaseClient
    .from("favorites")
    .insert({
      user_id: user!.id,
      word: word,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(FavoriteErrors.WORD_ALREADY_IN_FAVORITES);
    }
    throw new Error(FavoriteErrors.GENERIC_ERROR);
  }

  return data;
}

export async function removeFavoriteWord(word: string) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { error } = await supabaseClient
    .from("favorites")
    .delete()
    .eq("user_id", user!.id)
    .eq("word", word);

  if (error) {
    throw new Error(FavoriteErrors.GENERIC_ERROR);
  }

  return true;
}

export async function isFavoriteWord(word: string) {
  const user = await getAuthenticatedUser({ throwError: false });

  if (!user) {
    return false;
  }

  const { data, error } = await supabaseClient
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("word", word)
    .maybeSingle();

  if (error) {
    return false;
  }

  return data !== null;
}

export async function getFavorites({ page, limit }: GetWordsParams) {
  const user = await getAuthenticatedUser({ throwError: true });

  const { data, error } = await supabaseClient
    .from("favorites")
    .select("id, word, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(FavoriteErrors.GENERIC_ERROR);
  }

  return data;
}
