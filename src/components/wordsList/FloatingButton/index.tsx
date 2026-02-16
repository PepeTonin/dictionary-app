import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface FloatingButtonProps {
  onPress: () => void;
  label: string;
}

export function FloatingButton({ onPress, label }: FloatingButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
