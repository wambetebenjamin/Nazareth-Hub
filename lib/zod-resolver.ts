import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

/**
 * Minimal zod resolver for react-hook-form. The STEP 3 stack pins react-hook-form
 * and zod but not @hookform/resolvers, so the bridge lives here.
 */
export function zodResolver<T extends FieldValues>(schema: ZodType<T>): Resolver<T> {
  return async (values) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) {
      return { values: result.data, errors: {} as FieldErrors };
    }
    const errors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) {
        errors[key] = {
          type: issue.code,
          message: issue.message,
          ref: undefined,
        };
      }
    }
    return { values: {} as T, errors };
  };
}
