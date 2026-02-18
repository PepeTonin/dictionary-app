import { capitalizeFirstLetter } from "../string";

describe("utils - string", () => {
  describe("capitalizeFirstLetter", () => {
    it("should capitalize the first letter of the word", () => {
      expect(capitalizeFirstLetter("hello")).toBe("Hello");
      expect(capitalizeFirstLetter("HELLO")).toBe("HELLO");
      expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
      expect(capitalizeFirstLetter("hello-world")).toBe("Hello-world");
    });

    it("should return an empty string if the word is empty", () => {
      expect(capitalizeFirstLetter("")).toBe("");
    });
  });
});
