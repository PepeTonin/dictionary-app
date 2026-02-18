import {
  favoriteWord,
  removeFavoriteWord,
} from "@/services/supabase/favorites";
import { FavoriteErrors } from "@/services/supabase/models/favoriteErros";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";

export function useFavoriteWord() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (word: string) => await favoriteWord(word),
    onSuccess: () => {
      Toast.success("Word added to favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["isFavorite"] });
    },
    onError: (error: Error) => {
      if (error.message === FavoriteErrors.USER_NOT_AUTHENTICATED) {
        Toast.error("You need to be logged in to add a word to favorites");
        return;
      }
      if (error.message === FavoriteErrors.WORD_ALREADY_IN_FAVORITES) {
        Toast.error("Word already in favorites");
        return;
      }
      Toast.error("Error adding word to favorites");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (word: string) => await removeFavoriteWord(word),
    onSuccess: () => {
      Toast.success("Word removed from favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["isFavorite"] });
    },
    onError: (error: Error) => {
      if (error.message === FavoriteErrors.USER_NOT_AUTHENTICATED) {
        Toast.error("You need to be logged in");
        return;
      }
      Toast.error(FavoriteErrors.GENERIC_ERROR);
    },
  });

  return {
    addToFavorites: addMutation.mutate,
    removeFromFavorites: removeMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isLoading: addMutation.isPending || removeMutation.isPending,
  };
}
