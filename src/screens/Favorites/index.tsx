import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";

import { FooterLoader } from "@/components/common/FooterLoader";
import { ListItem } from "@/components/common/ListItem";
import { ScreenError } from "@/components/common/ScreenError";
import { ScreenLoader } from "@/components/common/ScreenLoader";

import { useFavorites } from "@/hooks/favorites/useFavorites";
import { useFavoriteWord } from "@/hooks/favorites/useFavoriteWord";

import { useAuthStore } from "@/stores/authStore";

import { styles } from "./style";

export function FavoritesScreen() {
  const [removingWord, setRemovingWord] = useState<string | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { removeFromFavorites, isRemoving } = useFavoriteWord();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useFavorites();

  function handleRemoveFromFavorites(word: string) {
    setRemovingWord(word);
    removeFromFavorites(word);
  }

  function renderFooter() {
    if (isFetchingNextPage) {
      return <FooterLoader />;
    }
    return null;
  }

  if (!isAuthenticated) {
    return (
      <ScreenError
        hasTabBar={true}
        title="You are not logged in"
        description="Please login to see your favorites"
        buttonLabel="Login"
        onButtonPress={() => router.push("/(auth)")}
        icon="noAuth"
      />
    );
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <ScreenError
        hasTabBar={true}
        title="Error loading favorites"
        description="Check your internet connection and try again"
        buttonLabel="Try again"
        onButtonPress={() => refetch()}
        isLoading={isRefetching}
        icon="error"
      />
    );
  }

  const favorites = data?.pages.flatMap((page) => page) ?? [];

  if (favorites.length === 0) {
    return (
      <ScreenError
        hasTabBar={true}
        title="No favorites found"
        description="Add some words to your favorites to see them here"
        buttonLabel="Go to Words List"
        onButtonPress={() => router.push("/(tabs)")}
      />
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <ListItem
          type="favorite"
          item={item}
          onItemPress={() => router.push(`/word/${item.word}`)}
          onIconPress={handleRemoveFromFavorites}
          isLoading={removingWord === item.word && isRemoving}
        />
      )}
      ListFooterComponent={renderFooter}
    />
  );
}
