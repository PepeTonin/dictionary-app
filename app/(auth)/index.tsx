import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Sign up"
        onPress={() => {
          router.push("/(auth)/register");
        }}
      />
      <Button
        title="Forgot password"
        onPress={() => {
          router.push("/(auth)/forgot-password");
        }}
      />
    </View>
  );
}
