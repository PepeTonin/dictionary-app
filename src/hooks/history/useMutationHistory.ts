import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addToLocalHistory,
  clearLocalHistory,
  removeFromLocalHistory,
} from "@/services/storage/historyStorage";
import {
  addToHistory as addToServerHistory,
  clearHistory as clearServerHistory,
  removeFromHistory as removeFromServerHistory,
} from "@/services/supabase/history";

import { useAuthStore } from "@/stores/authStore";

export function useMutationHistory() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const addMutation = useMutation({
    mutationFn: async (word: string) => {
      addToLocalHistory(word);
      if (isAuthenticated) {
        await addToServerHistory(word);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (word: string) => {
      removeFromLocalHistory(word);
      if (isAuthenticated) {
        await removeFromServerHistory(word);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      clearLocalHistory();
      if (isAuthenticated) {
        await clearServerHistory();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });

  return {
    addToHistory: addMutation.mutate,
    removeFromHistory: removeMutation.mutate,
    clearHistory: clearMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    isClearing: clearMutation.isPending,
    isLoading:
      addMutation.isPending ||
      removeMutation.isPending ||
      clearMutation.isPending,
  };
}
