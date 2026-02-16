import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
  },
  primaryContainer: {
    backgroundColor: "gray",
  },
  ghostContainer: {
    backgroundColor: "transparent",
  },
  disabledContainer: {
    opacity: 0.5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryLabel: {
    color: "white",
  },
  ghostLabel: {
    color: "black",
  },
});
