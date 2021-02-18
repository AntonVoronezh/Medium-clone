import React from "react";

export const ErrorMessage = ({ errors }) => {
  const messages = Object.keys(errors).map((name) => {
    const mess = errors[name].join(" ");
    return `${name} ${mess}`;
  });

  return (
      <ul className='error-messages'>
        {messages.map(item =>
            (
                <li key={item}>{item}</li>
            )
        )}
      </ul>
  );
};
