import React from "react";
import "./Error.scss";

type ErrorType = {
  message: string;
};

const Error: React.FC<ErrorType> = ({ message }) => {
  return (
    <div className="Error">
      <span className="ErrorMessage">{message}</span>
    </div>
  );
};

export default Error;
