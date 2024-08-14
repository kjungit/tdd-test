import React from "react";

interface ButtonProps {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "white" | "gray";
  label?: string;
  onClick?: () => void;
  cyId: string;
}

export default function Button({
  size = "sm",
  color = "white",
  label,
  onClick,
  cyId,
}: ButtonProps) {
  const buttonSize = {
    xs: `w-10 h-8 rounded-md `,
    sm: `w-14 h-10 rounded-md `,
    md: `w-16 h-12 rounded-md`,
    lg: `w-20 h-14 rounded-lg`,
  };
  const buttonColor = {
    white: `bg-white text-black hover:bg-gray-300`,
    gray: `bg-yellow-600 text-white hover:bg-yellow-700`,
  };
  return (
    <button
      data-cy={cyId}
      className={`${buttonColor[color]} ${buttonSize[size]} font-semibold`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
