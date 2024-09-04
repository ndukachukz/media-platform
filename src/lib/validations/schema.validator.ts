export class ValidationSchema<T> {
  rules: Array<{
    field: keyof T;
    validations: Array<(value: any) => string | null>;
  }>;

  constructor(
    rules: Array<{
      field: keyof T;
      validations: Array<(value: any) => string | null>;
    }>
  ) {
    this.rules = rules;
  }

  validate(data: T): Array<string> {
    const errors: Array<string> = [];

    for (const rule of this.rules) {
      const value = data[rule.field];
      for (const validation of rule.validations) {
        const error = validation(value);
        if (error) {
          errors.push(error);
        }
      }
    }

    return errors;
  }
}
