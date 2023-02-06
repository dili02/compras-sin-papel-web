import { ButtonHTMLAttributes, useState } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  isDisabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isDisabled,
  ...props
}) => {
  return (
    <button
      className={`button ${
        isDisabled ? `button--disabled ${className}` : className
      }`}
      {...props}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
