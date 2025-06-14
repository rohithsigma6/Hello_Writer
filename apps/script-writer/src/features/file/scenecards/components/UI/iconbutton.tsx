import React, { FC } from "react";
import { join } from "../../utils/misc";
const Variants = {
  info: "bg-[#4D4D5A] ",
  error: "bg-red-500 hover:bg-red-700",
  warning: "bg-yellow-500 hover:bg-yellow-700",
};

interface IconbuttonProps {
  children: React.ReactNode;
  onClick?: () => void;
  theme?: "info" | "error" | "warning";
  className?: string;
}

const Iconbutton: FC<IconbuttonProps> = ({ children, onClick, theme = "info", className = "" }) => {
  const _defaultClasses = `border border-[#00000036] p-1 bg-white duration-500 text-[#2C3E50] ${className}`;

  const color = Variants[theme];

  const classNames = join(_defaultClasses, color);

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Iconbutton;
