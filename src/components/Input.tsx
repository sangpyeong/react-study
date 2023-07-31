import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        {...rest}
        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
      />
    </div>
  );
};

export default Input;
