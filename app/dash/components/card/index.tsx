import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
};

export default Card;