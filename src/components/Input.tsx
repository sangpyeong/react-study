import React, {
  InputHTMLAttributes,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string; // 추가할 prop: input 요소에 추가될 클래스 이름
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-medium">{label}</label>}
        <input
          {...rest}
          ref={inputRef}
          className={`w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none ${className}`}
        />
      </div>
    );
  }
);

export default Input;
