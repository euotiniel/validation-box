import type {
  UsernameValidationOptions,
  UserValidationOptions,
  EmailValidationOptions,
  PasswordValidationOptions,
  AgeValidationOptions,
  ValidationResult,
  BaseValidationOptions,
} from "../types";

import {
  validateUsername,
  validateUser,
  validateEmail,
  validatePassword,
  validateAge,
} from "../validators/generics";

// Enhanced types for better type safety
type ValidatorFunction<T = any, O = {}> = (
  value: T,
  options?: O
) => ValidationResult;
type TransformFunction = (value: any) => any;

interface SchemaField {
  fn: ValidatorFunction;
  options?: BaseValidationOptions;
  transform?: TransformFunction[];
}

type SchemaRules = Record<string, SchemaField>;

export class vboxSchema<T extends SchemaRules> {
  private rules: T;
  private validateAll: boolean;
  private showErrors: boolean;

  constructor(
    rules: T,
    options?: {
      validateAll?: boolean;
      showErrors?: boolean;
    }
  ) {
    this.rules = rules;
    this.validateAll = options?.validateAll ?? false;
    this.showErrors = options?.showErrors ?? true;
  }

  private transformValue(value: any, transforms?: TransformFunction[]): any {
    if (!transforms) return value;
    return transforms.reduce((acc, transform) => transform(acc), value);
  }

  validate(data: Record<string, any>): { success: boolean; data?: Record<string, any>; errors?: Record<string, string | string[]> } {
    const validatedData: Record<string, any> = {};
    const errors: Record<string, string | string[]> = {}; // 🔹 Pode ser string ou array
    let isValid = true;

    for (const field in this.rules) {
      const rule = this.rules[field];
      const value = data[field];
      const options = rule.options || {};

      // Required field validation
      if (options.required && (value === undefined || value === null || value === '')) {
        isValid = false;
        const message = options.messages?.required || `${field} is required`;
        errors[field] = message; // 🔹 Retorna string
        if (!this.validateAll) break;
        continue;
      }

      // Skip empty optional fields
      if (!options.required && (value === undefined || value === null || value === '')) {
        continue;
      }

      // Transform value
      const transformedValue = this.transformValue(value, rule.transform);

      // Validate
      const validation = rule.fn(transformedValue, options);

      if (validation.valid) {
        validatedData[field] = transformedValue;
      } else {
        isValid = false;
        const errorMessages = validation.errors || [];
        errors[field] = errorMessages.length === 1 ? errorMessages[0] : errorMessages; // 🔹 String ou array
        if (!this.validateAll) break;
      }
    }

    return {
      success: isValid,
      data: isValid ? validatedData : undefined,
      errors: !isValid && this.showErrors ? errors : undefined
    };
  }

  // Method to add custom validation rule
  addRule(field: string, rule: SchemaField) {
    this.rules[field as keyof T] = rule as T[keyof T];
    return this;
  }

  // Method to extend schema with another schema
  extend(schema: vboxSchema<any>) {
    return new vboxSchema({ ...this.rules, ...schema["rules"] });
  }

  // Method to resolve validation for form data
  resolve(data: Record<string, any>, returnAllErrors: boolean = false) {
    const result = this.validate(data);

    return {
      values: result.success ? data : {},
      errors: result.errors
        ? Object.keys(result.errors).reduce((acc: Record<string, any>, key) => {
            const errorMessages = result.errors?.[key] || [];
            acc[key] = {
              type: "manual",
              messages: returnAllErrors ? errorMessages : [errorMessages[0]],
            };
            return acc;
          }, {})
        : {},
    };
  }
}

// Enhanced validator with more options
export const validator = {
  username: (options?: UsernameValidationOptions) => ({
    fn: validateUsername as ValidatorFunction<string>,
    options,
  }),
  user: (options?: UserValidationOptions) => ({
    fn: validateUser as ValidatorFunction<string>,
    options,
  }),
  email: (options?: EmailValidationOptions) => ({
    fn: validateEmail as ValidatorFunction<string>,
    options,
  }),
  password: (options?: PasswordValidationOptions) => ({
    fn: validatePassword as ValidatorFunction<string>,
    options,
  }),
  age: (options?: AgeValidationOptions) => ({
    fn: validateAge as ValidatorFunction<number>,
    options,
  }),
};
