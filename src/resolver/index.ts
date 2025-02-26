import { vboxSchema } from "../schemas";

export class vboxResolver {
  static validate(schema: vboxSchema<any>, data: Record<string, any>) {
    const result = schema.validate(data);

    return {
      success: result.success,
      values: result.success ? data : {},
      errors: Object.keys(result.errors || {}).reduce((acc, key) => {
        const error = result.errors?.[key];
        acc[key] = {
          message: Array.isArray(error) ? error.join(", ") : error || "Invalid value",
        };
        return acc;
      }, {} as Record<string, { message: string }>)
    };
  }
}