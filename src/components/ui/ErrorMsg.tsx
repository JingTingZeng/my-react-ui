import React from "react";

const ErrorMsg = ({ message }: { message: string | undefined }) => {
  return (
    <div className="pl-2 font-bold text-red-500 rounded-md">{message}</div>
  );
};

export default ErrorMsg;
