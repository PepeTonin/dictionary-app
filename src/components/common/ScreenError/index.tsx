import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "react-native";

import { Button } from "@/components/common/Button";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./style";

const DEFAULT_PADDING = 16;

type Icon = "noAuth" | "error";

interface ScreenErrorProps {
  hasTabBar: boolean;
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonPress?: () => void;
  isLoading?: boolean;
  icon?: Icon;
}

export function ScreenError({
  hasTabBar,
  title,
  description,
  buttonLabel,
  onButtonPress,
  isLoading = false,
  icon = "error",
}: ScreenErrorProps) {
  const { bottom } = useSafeAreaInsets();

  function getPaddingBottom() {
    if (hasTabBar) {
      return DEFAULT_PADDING;
    }
    return bottom + DEFAULT_PADDING;
  }

  const mapIcon: Record<Icon, React.ReactNode> = {
    noAuth: <FontAwesome5 name="user-alt-slash" size={24} color="black" />,
    error: <MaterialIcons name="error" size={24} color="black" />,
  };

  return (
    <View style={[styles.container, { paddingBottom: getPaddingBottom() }]}>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          {mapIcon[icon]}
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
      {buttonLabel && onButtonPress && (
        <Button
          type="primary"
          label={buttonLabel}
          onPress={onButtonPress}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}
