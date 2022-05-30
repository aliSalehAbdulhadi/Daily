/* eslint-disable jsx-a11y/label-has-associated-control */

import { ErrorMessage, Field } from "formik";
import { FieldPropsInterface } from "../interfaces/interfaces";

function FormField({
  autoComplete = "",
  className = "",
  label,
  name,
  type,
  value,
  placeholder,
}: FieldPropsInterface) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`block text-sm font-medium placeholder-slate-400 `}
      >
        {label}
      </label>
      <Field
        autoComplete={autoComplete}
        className={`my-1 p-2 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-tl-md rounded-br-md placeholder-slate-400 `}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage
        className="text-sm text-red-600"
        component="div"
        name={name}
      />
    </div>
  );
}

export default FormField;
