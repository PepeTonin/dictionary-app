import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { formatDateToUS } from "@/utils/date";

import { styles } from "./style";

export interface ListItemData {
  id: string | number;
  word: string;
  created_at: string;
}

interface ListItemProps {
  type: "favorite" | "history";
  item: ListItemData;
  onItemPress: () => void;
  onIconPress: (word: string) => void;
  isLoading: boolean;
}

export function ListItem({
  type,
  item,
  onItemPress,
  onIconPress,
  isLoading,
}: ListItemProps) {
  const mapIconName: Record<
    ListItemProps["type"],
    keyof typeof Ionicons.glyphMap
  > = {
    favorite: "heart-dislike-sharp",
    history: "close-outline",
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onItemPress}
      disabled={isLoading}
    >
      <View style={styles.textContainer}>
        <Text style={styles.highlightedText}>{item.word}</Text>
        <Text style={styles.dateText}>
          Added on:{" "}
          <Text style={styles.bold}>{formatDateToUS(item.created_at)}</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onIconPress(item.word)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="red" />
        ) : (
          <Ionicons name={mapIconName[type]} size={32} color="red" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
