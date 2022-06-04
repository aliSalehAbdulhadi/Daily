/* eslint-disable jsx-a11y/label-has-associated-control */

import { ErrorMessage, Field } from "formik";
import {
  FieldPropsInterface,
  RootState,
  useAppSelector,
} from "../../interfaces/interfaces";

function FormField({
  autoComplete = "",
  className = "",
  label,
  name,
  type,
  value,
  placeholder,
}: FieldPropsInterface) {
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  if (type === "textarea") {
    return (
      <div className={className}>
        <label htmlFor={name} className={`text-sm font-medium`}>
          {label}
        </label>
        <Field
          as="textarea"
          autoComplete={autoComplete}
          className={`my-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-slate-400`}
          name={name}
          placeholder={placeholder}
          rows={5}
        />
        <ErrorMessage
          className="text-sm text-red-600"
          component="div"
          name={name}
        />
      </div>
    );
  }
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`ml-3 block text-xs font-Comfortaa md:text-sm whitespace-nowrap font-medium placeholder-slate-400`}
      >
        {label}
      </label>
      <Field
        autoComplete={autoComplete}
        className={`my-1 p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-3xl py-3 placeholder-white mt-3 font-Comfortaa ${
          dark ? "bg-textDark" : "bg-secondaryLight"
        } ${dark ? "text-textLight" : "text-textDark"}`}
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
