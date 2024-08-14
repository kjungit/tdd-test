import React from "react";
interface InputFiledProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  cyId: string;
}
export default function InputField({
  placeholder,
  name,
  value,
  onChange,
  className,
  cyId,
}: InputFiledProps) {
  return (
    <input
      data-cy={cyId}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      autoFocus
    />
  );
}
