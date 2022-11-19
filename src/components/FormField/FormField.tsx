import { ErrorMessage, Field } from 'formik';
import { useEffect } from 'react';
import { FieldPropsInterface } from '../../interfaces/interfaces';
import { Dark } from '../../utilities/globalImports';

function FormField({
  autoComplete = '',
  className = '',
  classNameField = '',
  label,
  name,
  type,
  value,
  placeholder,
}: FieldPropsInterface) {
  const dark = Dark();
  useEffect(() => {
    document.getElementsByName('milestoneForm')[0]?.focus();
  });

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label htmlFor={name} className={`text-sm font-medium`}>
          {label}
        </label>
        <Field
          as="textarea"
          autoComplete={autoComplete}
          className={`my-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md  ${
            dark ? 'text-textLight' : 'text-textDark'
          }`}
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
        className={`ml-3 block text-xs font-Comfortaa md:text-sm whitespace-nowrap font-medium`}
      >
        {label}
      </label>
      <Field
        autoComplete="off"
        className={classNameField}
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
