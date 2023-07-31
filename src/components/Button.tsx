interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
