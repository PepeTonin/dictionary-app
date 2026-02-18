import { PasswordValidationErrors, validatePassword } from "../password";

describe("utils - password", () => {
  describe("validatePassword", () => {
    it("should return an error if the password is less than 8 characters long and return isValid as false", () => {
      const input = "1234567";
      const expected =
        PasswordValidationErrors.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG;

      const result = validatePassword(input);

      expect(result.errors).toContain(expected);
      expect(result.isValid).toBe(false);
    });

    it("should return an error if the password does not contain at least one uppercase letter and return isValid as false", () => {
      const input = "123abcd";
      const expected =
        PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER;

      const result = validatePassword(input);

      expect(result.errors).toContain(expected);
      expect(result.isValid).toBe(false);
    });

    it("should return an error if the password does not contain at least one lowercase letter and return isValid as false", () => {
      const input = "ABC1234";
      const expected =
        PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_LOWERCASE_LETTER;

      const result = validatePassword(input);

      expect(result.errors).toContain(expected);
      expect(result.isValid).toBe(false);
    });

    it("should return an error if the password does not contain at least one number and return isValid as false", () => {
      const input = "ABCdefgh";
      const expected =
        PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER;

      const result = validatePassword(input);

      expect(result.errors).toContain(expected);
      expect(result.isValid).toBe(false);
    });

    it("should return isValid as true if the password is valid", () => {
      const input = "ABCdef123";
      const result = validatePassword(input);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it("should return isValid as false for this list of passwords", () => {
      const invalidPasswords = [
        "Abc123",
        "A1b2C3",
        "aB3dE1",
        "Xy9K2",
        "abcdefg1",
        "senha123",
        "password9",
        "minhasenha1",
        "teste1234",
        "ABCDEFG1",
        "SENHA1234",
        "PASSWORD9",
        "TESTE12345",
        "QWERTY12",
        "SenhaForte",
        "PasswordTest",
        "MinhaSenha",
        "TesteSenhaA",
        "AbcdefGh",
        "1234567",
        "abcdefgh",
        "ABCDEFGH",
        "abc12345",
        "ABC12345",
      ];

      invalidPasswords.forEach((password) => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(false);
      });
    });

    it("should return isValid as true for this list of passwords", () => {
      const validPasswords = [
        "Abc12345",
        "Senha123",
        "TesteSenha1",
        "MinhaSenha9",
        "Password1",
        "Qwerty123",
        "DevTest2024",
        "NodeJs123",
        "Frontend9",
        "Backend123A",
      ];

      validPasswords.forEach((password) => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(true);
      });
    });
  });
});
