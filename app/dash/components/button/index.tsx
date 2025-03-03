import React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  type = "submit",
  label,
  variant = "primary",
  onClick,
}) => {
  const buttonStyles: Record<string, string> = {
    primary:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-hidden dark:focus:ring-blue-800",
    secondary:
      "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-hidden bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
  };

  return (
    <button type={type} className={buttonStyles[variant]} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
