import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { useAuthStore } from "@/stores/authStore";
import { styles } from "./style";

type HeaderType = "showAuth" | "showClose" | "showBack";

interface HeaderProps {
  type: HeaderType;
  title?: string;
}

export function Header({ type, title }: HeaderProps) {
  const { top } = useSafeAreaInsets();

  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const mapAction: Record<HeaderType, () => void> = {
    showAuth: () => {
      router.push("/(auth)");
    },
    showClose: () => {
      router.back();
    },
    showBack: () => {
      router.back();
    },
  };

  const mapTypeToIcon: Record<HeaderType, keyof typeof Ionicons.glyphMap> = {
    showAuth: isAuthenticated ? "log-out-outline" : "log-in-outline",
    showClose: "close-outline",
    showBack: "arrow-back-outline",
  };

  const mapButtonText: Record<Exclude<HeaderType, "showClose">, string> = {
    showBack: "Back",
    showAuth: isAuthenticated ? "Logout" : "Login",
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: top + 16 }]}>
      {type !== "showClose" && !!title && (
        <Text style={styles.headerTitle}>{title}</Text>
      )}
      <TouchableOpacity
        onPress={mapAction[type]}
        style={styles.buttonContainer}
      >
        <Ionicons name={mapTypeToIcon[type]} size={24} color="black" />
        {type !== "showClose" && (
          <Text style={styles.buttonText}>{mapButtonText[type]}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
