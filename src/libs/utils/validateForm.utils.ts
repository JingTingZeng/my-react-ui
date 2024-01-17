import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

export default class ValidateForm {

  static findInputError(errors: FieldErrors<FieldValues>, name: string): FieldError {
    return Object.keys(errors)
      .filter(error => error.includes(name))
      .reduce((prev, key) => ({ ...prev, ...errors[key] }), {} as FieldError)
  }

  static isFormInvalid(error: FieldError): boolean {
    return Object.keys(error).length > 0
  }
}