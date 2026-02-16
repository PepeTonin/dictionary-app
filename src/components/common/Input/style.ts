import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    borderRadius: 8,
    gap: 8,
  },
  inputWithErrorContainer: {
    borderColor: "red",
  },
  input: {
    paddingVertical: 10,
    flex: 1,
  },
  errorMessageContainer: {
    height: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
});
