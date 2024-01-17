import React from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import ValidateForm from "../../libs/utils/validateForm.utils";
import ErrorMsg from "./ErrorMsg";

interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  validation?: RegisterOptions<FieldValues, string>;
  multiLine?: boolean;
  min?: number | undefined;
  max?: number | undefined;
}

const Input = ({
  label,
  type,
  id,
  placeholder,
  validation,
  multiLine = false,
  min,
  max,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = ValidateForm.findInputError(errors, label);
  const isInvalid = ValidateForm.isFormInvalid(inputError);

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-bold capitalize">
          {label}
        </label>
      </div>
      {multiLine ? (
        <textarea
          id={id}
          className="input h-32"
          placeholder={placeholder}
          {...register(label, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          className="input"
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          {...register(label, validation)}
        />
      )}
      {isInvalid && <ErrorMsg message={inputError.message}></ErrorMsg>}
    </div>
  );
};

export default Input;
