import { useWords } from "@/hooks/useWords";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWords();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        numColumns={3}
        data={data?.pages.flatMap((page) => page.map((word) => word)) || []}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/word/${item.word}`)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "red",
              padding: 10,
            }}
          >
            <Text>{item.word}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
