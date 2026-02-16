import { Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { styles } from "./style";

interface WordItemProps {
  word: string;
  index: number;
}

export function WordItem({ word, index }: WordItemProps) {
  const router = useRouter();
  return (
    <View
      style={[styles.container, (index - 1) % 3 !== 0 && styles.sideContainer]}
    >
      <TouchableOpacity onPress={() => router.push(`/word/${word}`)}>
        <Text numberOfLines={1} style={styles.word}>
          {word}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
