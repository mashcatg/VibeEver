import React, { useState, useEffect } from "react";
import VerticalTextSwap from "./VerticalTextSwap";

const CircularButton = ({
  children,
  onClick = () => {},
  indicator = "",
  size = "",
  bg_color,
  hover_bg_color,
  text_color,
  text_hover_color,
  isGroupHover = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(isGroupHover);

  // Update internal hover state when isGroupHover prop changes
  useEffect(() => {
    setIsHovered(isGroupHover);
  }, [isGroupHover]);

  // Function to handle special cases like "white"
  const getBgColorClass = (color) => {
    if (color === "white") return "bg-white";
    if (color === "neutral-default") return "bg-neutral-default";
    if (color === "primary") return "bg-primary";
    if (color === "blue-50") return "bg-blue-50";
    if (color === "purple-50") return "bg-purple-50";
    if (color === "neutral-50") return "bg-neutral-50";
    if (color === "social-linkedin") return "bg-social-linkedin";
    return `bg-${color}`;
  };

  // Function to handle hover background color
  const getHoverBgColorClass = (color) => {
    if (color === "white") return "after:bg-white";
    if (color === "black") return "after:bg-black";
    if (color === "neutral-default") return "after:bg-neutral-default";
    if (color === "neutral-border") return "after:bg-neutral-border";
    if (color === "primary") return "after:bg-primary";
    if (color === "blue-200") return "after:bg-blue-200";
    if (color === "purple-200") return "after:bg-purple-200";
    if (color === "neutral-200") return "after:bg-neutral-200";
    return `after:bg-${color}`;
  };

  // Function to handle text colors
  const getTextColorClass = (color) => {
    if (color === "white") return "text-white";
    if (color === "blue-700") return "text-blue-700";
    if (color === "blue-900") return "text-blue-900";
    if (color === "purple-700") return "text-purple-700";
    if (color === "purple-900") return "text-purple-900";
    if (color === "neutral-700") return "text-neutral-700";
    if (color === "neutral-900") return "text-neutral-900";
    return `text-${color}`;
  };

  return (
    <button
      onClick={onClick}
      className={`group relative flex justify-center items-center rounded-full ${getBgColorClass(bg_color)} ${
        isHovered ? getTextColorClass(text_hover_color) : getTextColorClass(text_color)
      } transition-all duration-300 ease-in-out p-4 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full ${getHoverBgColorClass(
        hover_bg_color
      )} after:rounded-full after:transition-all after:duration-300 after:ease-in-out ${isHovered ? `after:scale-100` : `after:scale-0`} ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      onMouseEnter={() => !isGroupHover && setIsHovered(true)}
      onMouseLeave={() => !isGroupHover && setIsHovered(false)}
    >
      {indicator && (
        <span className="absolute z-10 top-0 right-0 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-footnote font-bold transition-all duration-300 ease-in-out group-hover:bg-primary-dark group-hover:scale-110">
          {indicator}
        </span>
      )}
      <span className={`relative z-10 ${isHovered ? getTextColorClass(text_hover_color) : getTextColorClass(text_color)}`}>{children}</span>
    </button>
  );
};

// Update the CSS to ensure SVG path fills change with text color
const additionalStyles = `
  /* Make SVG fill color follow text color */
  button svg path {
    fill: currentColor;
    transition: fill 0.3s ease-in-out;
  }
`;

// Insert styles into the document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = additionalStyles;
  document.head.appendChild(styleElement);
}

const ExpandedIconButton = ({
  text,
  textColor = "text-body",
  icon,
  size = "3rem",
  bgColor = "neutral-default",
  buttonBgColor = "white",
  buttonHoverBgColor = "primary",
  buttonTextColor = "text-body",
  buttonTextHoverColor = "white",
  onClick = () => {},
  className = "",
  circleBtnClassName = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle text colors
  const getTextColorClass = (color) => {
    if (color === "text-body") return "text-text-body";
    if (color === "neutral-subtle") return "text-neutral-subtle";
    return `text-${color}`;
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-3 pl-5 pr-1 py-1 bg-${bgColor} rounded-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VerticalTextSwap>
        <p className={`font-semibold uppercase ${getTextColorClass(textColor)}`}>{text}</p>
      </VerticalTextSwap>

      <CircularButton
        size={size}
        bg_color={buttonBgColor}
        hover_bg_color={buttonHoverBgColor}
        text_color={buttonTextColor}
        text_hover_color={buttonTextHoverColor}
        isGroupHover={isHovered}
        className={circleBtnClassName}
      >
        {icon}
      </CircularButton>
    </button>
  );
};

export { CircularButton, ExpandedIconButton };
