import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./style";

interface InputProps extends TextInputProps {
  type: "email" | "password" | "text";
  label?: string;
  errorMessage?: string;
  hasError?: boolean;
}

export function Input({
  type,
  placeholder,
  value,
  onChangeText,
  label,
  errorMessage,
  hasError,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          hasError && styles.inputWithErrorContainer,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={type === "password" && !isPasswordVisible}
          {...props}
        />
        {type === "email" && <Ionicons name="mail" size={24} color="gray" />}
        {type === "password" && (
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.errorMessageContainer}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
}
