import React from "react";

interface Props {
  message: string;
}

export const Error: React.FC<Props> = ({ message }) => {
  return (
    <div>
      Something went wrong. Please try again.
      {message}
    </div>
  );
};
