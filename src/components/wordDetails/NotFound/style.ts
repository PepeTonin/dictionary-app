import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  wordContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "lightgray",
  },
  wordText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textsContainer: {
    gap: 8,
    flex: 1,
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageText: {
    fontSize: 16,
    textAlign: "center",
  },
  tryAgainText: {
    fontSize: 16,
    textAlign: "center",
  },
});
