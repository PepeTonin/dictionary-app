import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();

  return (
    <View>
      <Text>Register</Text>
      <Button
        title="Login"
        onPress={() => {
          router.dismissTo("/(auth)");
        }}
      />
    </View>
  );
}
