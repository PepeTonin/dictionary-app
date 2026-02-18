import { ActivityIndicator, View } from "react-native";

import { styles } from "./style";

export function ScreenLoader() {
  return (
    <View testID="screen-loader-container" style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
