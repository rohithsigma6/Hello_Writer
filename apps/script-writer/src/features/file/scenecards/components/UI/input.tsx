import React from "react";

type InputProps = {
  label: string;
  name: string;
  required?: boolean;
  id: string;
  type?: string;
};

const Input = ({ label, name, required = false, id, type = "text" }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={label}
        required={required}
      />
    </div>
  );
};

export default Input;
