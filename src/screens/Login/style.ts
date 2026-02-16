import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    gap: 32,
    paddingHorizontal: 16,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  buttonsContainer: {
    gap: 8,
  },
});
