import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: (width - 32) / 3,
    paddingVertical: 10,
  },
  sideContainer: {
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
  },
  word: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
