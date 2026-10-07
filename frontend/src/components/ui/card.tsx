import React from "react";

interface CardProps {
  children: React.ReactNode;
  additionalClasses?: string;
}

const Card = ({ children, additionalClasses = "" }: CardProps) => {
  return (
    <div className={`rounded-[10px] p-[1vw] flex ${additionalClasses}`}>
      {children}
    </div>
  );
};

export default Card;