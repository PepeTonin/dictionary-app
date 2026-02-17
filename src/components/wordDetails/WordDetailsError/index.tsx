import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/common/Button";

import { styles } from "./style";

interface WordDetailsErrorProps {
  word: string;
  canRefetch: boolean;
  refetch: () => Promise<any>;
  isRefetching: boolean;
}

export function WordDetailsError({
  word,
  canRefetch,
  refetch,
  isRefetching,
}: WordDetailsErrorProps) {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  async function handleButtonPress() {
    if (canRefetch) {
      await refetch();
      return;
    }
    router.back();
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom + 16 }]}>
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{word}</Text>
        <Text>No data found for this word</Text>
      </View>
      <Button
        type="primary"
        label={canRefetch ? "Try again" : "Back"}
        onPress={handleButtonPress}
        isLoading={isRefetching}
      />
    </View>
  );
}
