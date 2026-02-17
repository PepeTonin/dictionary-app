import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  highlightedText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  dateText: {
    fontSize: 16,
    color: "gray",
  },
  bold: {
    fontWeight: "bold",
  },
});
