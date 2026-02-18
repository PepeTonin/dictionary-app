import { AxiosResponse } from "axios";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WordsButtons } from "@/components/wordDetails/WordsButtons";

import { styles } from "./style";

interface NotFoundProps {
  id?: string;
  word: string;
  response: AxiosResponse<{ title: string; message: string }>;
}

export function NotFound({ word, response, id }: NotFoundProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom + 16 }]}>
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{word}</Text>
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.errorText}>{response.data.title}</Text>
        <Text style={styles.messageText}>{response.data.message}</Text>
        <Text style={styles.tryAgainText}>Try looking for another word.</Text>
      </View>
      <WordsButtons wordItem={{ word, id }} />
    </View>
  );
}
