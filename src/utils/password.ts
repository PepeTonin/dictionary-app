export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export enum PasswordValidationErrors {
  PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG = "Password must be at least 8 characters long",
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER = "Password must contain at least one uppercase letter",
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_LOWERCASE_LETTER = "Password must contain at least one lowercase letter",
  PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER = "Password must contain at least one number",
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push(
      PasswordValidationErrors.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS_LONG,
    );
  }

  if (!/[A-Z]/.test(password)) {
    errors.push(
      PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_UPPERCASE_LETTER,
    );
  }

  if (!/[a-z]/.test(password)) {
    errors.push(
      PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_LOWERCASE_LETTER,
    );
  }

  if (!/[0-9]/.test(password)) {
    errors.push(
      PasswordValidationErrors.PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_NUMBER,
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
