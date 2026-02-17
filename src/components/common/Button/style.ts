import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
  },
  fullWidthContainer: {
    width: "100%",
  },
  flexContainer: {
    flex: 1,
  },
  primaryContainer: {
    backgroundColor: "gray",
  },
  ghostContainer: {
    backgroundColor: "transparent",
  },
  outlineContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
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
  outlineLabel: {
    color: "black",
  },
});
