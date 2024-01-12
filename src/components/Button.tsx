import React from "react";

interface ButtonProps {
  style: "primary" | "secondary" | "third";
  children: string;
  onClick: () => void;
}

const Button = ({ style, children, onClick }: ButtonProps) => {
  return (
    <div className={"btn" + style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
