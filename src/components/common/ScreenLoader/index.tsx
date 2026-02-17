import { ActivityIndicator, View } from "react-native";

import { styles } from "./style";

export function ScreenLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
