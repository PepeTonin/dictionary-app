import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Toast } from "toastify-react-native";

import { validateEmail } from "@/utils/email";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

import { useAuthStore } from "@/stores/authStore";

import { styles } from "./style";

export function LoginScreen() {
  const router = useRouter();

  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(text: string) {
    setEmailErrorMessage("");
    setEmail(text);
  }

  async function handleRegister() {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailErrorMessage("Invalid email");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      Toast.success("Login successful");
      router.dismissTo("/(tabs)");
    } catch {
      Toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  const shouldDisableButton = !email || !password;

  return (
    <KeyboardAwareScrollView
      extraKeyboardSpace={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>Fill the fields below to login</Text>
      </View>
      <View style={styles.inputsContainer}>
        <Input
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          errorMessage={emailErrorMessage}
          hasError={!!emailErrorMessage}
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          type="primary"
          label="Login"
          onPress={handleRegister}
          disabled={shouldDisableButton}
          isLoading={isLoading}
        />
        <Button
          type="ghost"
          label="Don't have an account? Register"
          onPress={() => router.push("/(auth)/register")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
