import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clearButton: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 16,
    height: 26,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
  },
  loadingClearButton: {
    opacity: 0.5,
  },
  contentContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
