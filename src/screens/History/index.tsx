import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FooterLoader } from "@/components/common/FooterLoader";
import { ListItem } from "@/components/common/ListItem";
import { ScreenError } from "@/components/common/ScreenError";
import { ScreenLoader } from "@/components/common/ScreenLoader";

import { useHistory } from "@/hooks/history/useHistory";
import { useMutationHistory } from "@/hooks/history/useMutationHistory";

import { styles } from "./style";

export function HistoryScreen() {
  const router = useRouter();

  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHistory();

  const { clearHistory, removeFromHistory, isRemoving, isClearing } =
    useMutationHistory();

  const [removingWord, setRemovingWord] = useState<string | null>(null);

  function handleRemoveFromHistory(word: string) {
    setRemovingWord(word);
    removeFromHistory(word);
  }

  function renderFooter() {
    if (isFetchingNextPage) {
      return <FooterLoader />;
    }
    return null;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <ScreenError
        hasTabBar={true}
        title="Error loading history"
        description="Check your internet connection and try again"
        buttonLabel="Try again"
        onButtonPress={() => refetch()}
        isLoading={isRefetching}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <ScreenError
        hasTabBar={true}
        title="No history found"
        description="The words you view will appear here"
        buttonLabel="Go to Words List"
        onButtonPress={() => router.push("/(tabs)")}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => clearHistory()}
        style={[styles.clearButton, isClearing && styles.loadingClearButton]}
        disabled={isClearing}
      >
        {isClearing ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <Ionicons name="trash-outline" size={16} color="red" />
        )}
        <Text style={styles.clearButtonText}>Clear history</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <ListItem
            type="history"
            item={{
              id: item.id,
              word: item.word,
              created_at: item.viewed_at,
            }}
            onItemPress={() => router.push(`/word/${item.word}`)}
            onIconPress={handleRemoveFromHistory}
            isLoading={removingWord === item.word && isRemoving}
          />
        )}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
