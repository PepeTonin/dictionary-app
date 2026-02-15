import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Word() {
  const { word } = useLocalSearchParams<{ word: string }>();

  return (
    <View>
      <Text>{word}</Text>
    </View>
  );
}
