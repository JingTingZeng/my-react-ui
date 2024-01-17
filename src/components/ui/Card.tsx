import React from "react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="p-5 rounded-3xl border border-solid border-slate-200 bg-slate-200 dark:border-slate-200 dark:bg-slate-700">
      <div className="text-3xl font-bold mb-6">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
