import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { WORDS_LIST_NUM_COLUMNS } from "@/constants/wordsList";

import { styles } from "./style";

interface WordItemProps {
  word: string;
  index: number;
}

export function WordItem({ word, index }: WordItemProps) {
  const router = useRouter();

  const isMiddleColumn = (index - 1) % WORDS_LIST_NUM_COLUMNS === 0;

  return (
    <View style={[styles.container, !isMiddleColumn && styles.sideContainer]}>
      <TouchableOpacity
        style={styles.pressableContainer}
        onPress={() => router.push(`/word/${word}`)}
      >
        <Text numberOfLines={1} style={styles.word}>
          {word}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
