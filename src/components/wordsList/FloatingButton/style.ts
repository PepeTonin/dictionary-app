import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "absolute",
    bottom: 16,
    right: 32,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 99,
    zIndex: 10,
    opacity: 0.7,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
