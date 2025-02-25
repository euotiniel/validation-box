import type { UsernameValidationOptions, UserValidationOptions, EmailValidationOptions, PasswordValidationOptions, AgeValidationOptions } from "../types";
import {
  validateUsername,
  validateUser,
  validateEmail,
  validatePassword,
  validateAge,
} from "../validators/generics";


// Creating specific types for each validation
type ValidatorFunction<T = any, O = {}> = (value: T, options?: O) => boolean;

// The `validator` encapsulates all validation functions with correct typing
export const validator = {
  username: (options?: UsernameValidationOptions) => ({ fn: validateUsername as ValidatorFunction<string>, options }),
  user: (options?: UserValidationOptions) => ({ fn: validateUser as ValidatorFunction<string>, options }),
  email: (options?: EmailValidationOptions) => ({ fn: validateEmail as ValidatorFunction<string>, options }),
  password: (options?: PasswordValidationOptions) => ({ fn: validatePassword as ValidatorFunction<string>, options }),
  age: (options?: AgeValidationOptions) => ({ fn: validateAge as ValidatorFunction<number>, options }),
};

type SchemaRules = Record<string, { fn: ValidatorFunction; options?: any }>;

export class vboxSchema<T extends SchemaRules> {
  private rules: T;

  constructor(rules: T) {
    this.rules = rules;
  }

  validate(data: Record<string, any>) {
    const results: Record<string, boolean | undefined> = {};

    for (const field in this.rules) {
      if (this.rules[field]) {
        const { fn, options } = this.rules[field];
        results[field] = fn(data[field], options);
      }
    }

    return results;
  }
}
