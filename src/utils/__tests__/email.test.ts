import { validateEmail } from "../email";

describe("utils - email", () => {
  describe("validateEmail", () => {
    it("should return true for this list of valid emails", () => {
      const validEmails = [
        "test@example.com",
        "test@example.com.br",
        "te.st@example.com.br",
        "test@example.com.br",
        "te.st@example.com",
        "test@exam.ple.com.br",
        "test_@exam.ple.com.br",
        "test.test@exam.ple.com.br",
        "test.123@exam.ple.com.br",
        "test123@exam.ple.com.br",
      ];

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it("should return false for this list of invalid emails", () => {
      const invalidEmails = [
        "test@example",
        "te.st@",
        "@example.com.br",
        "email",
        "Abc.example.com",
      ];

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });
});
