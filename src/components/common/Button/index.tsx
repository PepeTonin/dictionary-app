import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { styles } from "./style";

interface ButtonProps extends TouchableOpacityProps {
  type: "primary" | "ghost";
  label: string;
  isLoading?: boolean;
}

export function Button({
  type = "primary",
  label,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const showDisabledUi = isLoading || disabled;

  const mapTypeToStyleContainer: Record<
    ButtonProps["type"],
    StyleProp<ViewStyle>
  > = {
    primary: styles.primaryContainer,
    ghost: styles.ghostContainer,
  };

  const mapTypeToStyleLabel: Record<
    ButtonProps["type"],
    StyleProp<TextStyle>
  > = {
    primary: styles.primaryLabel,
    ghost: styles.ghostLabel,
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        mapTypeToStyleContainer[type],
        showDisabledUi && styles.disabledContainer,
      ]}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={type === "primary" ? "white" : "black"}
        />
      ) : (
        <Text style={[styles.label, mapTypeToStyleLabel[type]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
