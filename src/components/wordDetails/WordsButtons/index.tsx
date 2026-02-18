import { useRouter } from "expo-router";
import { StyleProp, View, ViewStyle } from "react-native";

import { Button } from "@/components/common/Button";

import { useNextWord, usePreviousWord } from "@/hooks/useWords";

import { styles } from "./style";

interface WordsButtonsProps {
  wordItem: { word: string; id?: string };
  style?: StyleProp<ViewStyle>;
}

export function WordsButtons({ wordItem, style }: WordsButtonsProps) {
  const { word, id } = wordItem;
  const router = useRouter();

  const numberWordId = id ? parseInt(id) : undefined;

  const { data: nextWord, isLoading: isLoadingNextWord } = useNextWord({
    word,
    id: numberWordId,
  });

  const { data: previousWord, isLoading: isLoadingPreviousWord } =
    usePreviousWord({
      word,
      id: numberWordId,
    });

  function handlePreviousWord() {
    if (!previousWord || isLoadingPreviousWord) return;
    router.replace(`/word/${previousWord.word}?id=${previousWord.id}`);
  }

  function handleNextWord() {
    if (!nextWord || isLoadingNextWord) return;
    router.replace(`/word/${nextWord.word}?id=${nextWord.id}`);
  }

  return (
    <View style={[styles.container, style]}>
      <Button
        type="outline"
        label="Previous Word"
        onPress={handlePreviousWord}
        fullWidth={false}
        isLoading={isLoadingPreviousWord}
      />
      <Button
        type="primary"
        label="Next Word"
        onPress={handleNextWord}
        fullWidth={false}
        isLoading={isLoadingNextWord}
      />
    </View>
  );
}
