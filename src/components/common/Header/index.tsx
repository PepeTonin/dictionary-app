import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

import { useAuthStore } from "@/stores/authStore";

import { styles } from "./style";

type HeaderType = "showAuth" | "showClose" | "showBack";

interface HeaderProps {
  type: HeaderType;
  title?: string;
}

export function Header({ type, title }: HeaderProps) {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { isAuthenticated, logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);

  const mapAction: Record<HeaderType, () => void> = {
    showAuth: async () => {
      if (!isAuthenticated) {
        router.push("/(auth)");
        return;
      }
      try {
        setIsLoading(true);
        await logout();
        Toast.success("Logout successful");
      } catch {
        Toast.error("Failed to logout");
      } finally {
        setIsLoading(false);
      }
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
        disabled={isLoading}
        onPress={mapAction[type]}
        style={styles.buttonContainer}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Ionicons name={mapTypeToIcon[type]} size={24} color="black" />
        )}
        {type !== "showClose" && (
          <Text style={styles.buttonText}>{mapButtonText[type]}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
