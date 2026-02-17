import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface FloatingButtonProps {
  onPress: () => void;
  label: string;
}

export function FloatingButton({ onPress, label }: FloatingButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AntDesign name="to-top" size={16} color="white" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
