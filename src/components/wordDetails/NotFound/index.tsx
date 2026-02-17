import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/common/Button";

import { styles } from "./style";

interface NotFoundProps {
  word: string;
  response: AxiosResponse<{ title: string; message: string }>;
}

export function NotFound({ word, response }: NotFoundProps) {
  const router = useRouter();
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
      <Button type="primary" label="Back" onPress={router.back} />
    </View>
  );
}
