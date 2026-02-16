import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewRef,
} from "react-native-keyboard-controller";
import { Toast } from "toastify-react-native";

import { validateEmail } from "@/utils/email";
import { validatePassword } from "@/utils/password";

import { useAuthStore } from "@/stores/authStore";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { styles } from "./style";

export function RegisterScreen() {
  const router = useRouter();

  const { register } = useAuthStore();

  const keyboardAwareScrollViewRef = useRef<KeyboardAwareScrollViewRef>(null);

  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsMessages, setErrorsMessages] = useState<string[]>([]);
  const [passwordsErrorMessage, setPasswordsErrorMessage] =
    useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  function handleEmailChange(text: string) {
    setEmailErrorMessage("");
    setEmail(text);
  }

  function handlePasswordChange(text: string) {
    setErrorsMessages([]);
    setPasswordsErrorMessage("");
    setPassword(text);
  }

  function handleConfirmPasswordChange(text: string) {
    setPasswordsErrorMessage("");
    setConfirmPassword(text);
  }

  async function handleRegister() {
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      setEmailErrorMessage("Invalid email");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (passwordValidation.errors.length > 0) {
      keyboardAwareScrollViewRef.current?.scrollToEnd();
      setErrorsMessages(passwordValidation.errors);
      return;
    }

    if (confirmPassword !== password) {
      setPasswordsErrorMessage("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password);
      Toast.success("Registration successful");
      router.dismissTo("/(auth)");
    } catch {
      Toast.error("Registration failed, try again later");
    } finally {
      setIsLoading(false);
    }
  }

  const shouldDisableButton = !email || !password || !confirmPassword;

  return (
    <KeyboardAwareScrollView
      ref={keyboardAwareScrollViewRef}
      extraKeyboardSpace={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.description}>
          Fill the fields below to register
        </Text>
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
          onChangeText={handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
          errorMessage={passwordsErrorMessage}
          hasError={!!passwordsErrorMessage || errorsMessages.length > 0}
        />
        <Input
          type="password"
          label="Confirm Your Password"
          placeholder="********"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
          errorMessage={passwordsErrorMessage}
          hasError={!!passwordsErrorMessage}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          type="primary"
          label="Register"
          onPress={handleRegister}
          disabled={shouldDisableButton}
          isLoading={isLoading}
        />
        <Button
          type="ghost"
          label="Already have an account? Login"
          onPress={() => router.dismissTo("/(auth)")}
        />
      </View>
      {errorsMessages.length > 0 && (
        <View style={styles.errorsMessagesContainer}>
          {errorsMessages.map((error, index) => (
            <Text key={index} style={styles.errorMessage}>
              • {error}
            </Text>
          ))}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}
