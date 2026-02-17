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
    height: 42,
    width: 120,
    backgroundColor: "lightgray",
    borderRadius: 8,
    gap: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  sectionContainer: {
    gap: 4,
  },
  sectionItemContainer: {
    gap: 2,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 2,
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
