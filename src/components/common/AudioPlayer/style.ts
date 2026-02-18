import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressWrapper: {
    flex: 1,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});
