import React from "react";

interface ButtonProps {
  labelText: string;
  className?: string;
  labelTextClassName?: string;
  showIcon?: boolean;
  style?: "filled" | "tonal" | "elevated" | "text" | "outlined";
  stateProp?: "enabled" | "disabled";
  onClick?: () => void;
}

export const Button = ({
  labelText,
  className = "",
  labelTextClassName = "",
  showIcon = false,
  style = "filled",
  stateProp = "enabled",
  onClick,
}: ButtonProps): JSX.Element => {
  const isDisabled = stateProp === "disabled";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`rounded-full px-6 py-2 flex items-center justify-center gap-2
        ${style === "filled" && !isDisabled ? "bg-m-3black text-m-3white" : ""}
        ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
        ${className}`}
    >
      {showIcon && <span className="w-4 h-4 bg-white rounded-full" />}
      <span className={`font-m3-label-large ${labelTextClassName}`}>
        {labelText}
      </span>
    </button>
  );
};
        
