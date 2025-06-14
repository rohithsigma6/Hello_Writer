import React from "react";
import { join } from "../misc";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, children, type, fullWidth = false, className = "", disabled = false }: ButtonProps) => {

   const _defaultClasses = `py-[18px] font-poppins text-[16px] rounded-[16px] min-w-[160px] ${className} ' disabled:text-gray-500 disabled:hover:bg-none'`;

  const fullWidthClass = fullWidth ? "w-full" : "";

  const classNames = join(fullWidthClass, _defaultClasses);
  return (
    <button disabled={disabled} type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
