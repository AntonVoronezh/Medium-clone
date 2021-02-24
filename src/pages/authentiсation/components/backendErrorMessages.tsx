import React from "react";

interface IProps {
  errors: string[];
}

export const BackendErrorMessages = ({ errors }: IProps): JSX.Element => {
  const messages = Object.keys(errors).map((name): string => {
    const mess = errors[name].join(" ");
    return `${name} ${mess}`;
  });

  return (
    <ul className="error-messages">
      {messages.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
