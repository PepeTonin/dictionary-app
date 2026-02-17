import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
    gap: 16,
  },
  wordContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  wordHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "lightgray",
  },
  favoriteButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    alignSelf: "flex-end",
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  sectionContainer: {
    gap: 4,
  },
  sectionItemContainer: {
    gap: 2,
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  large: {
    fontSize: 16,
  },
  regular: {
    fontSize: 14,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
