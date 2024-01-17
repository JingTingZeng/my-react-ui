import React from "react";

interface ButtonProps {
  style: "primary" | "secondary";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  style = "primary",
  disabled = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={"btn btn-" + style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
