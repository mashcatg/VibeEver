const Tooltip = ({ text, bg_color, text_color, arrow_position, className }) => {
  // Function to handle arrow position
  const getArrowPositionClass = (position) => {
    switch (position) {
      // top
      case "top":
        return "-top-1.5 left-1/2 transform -translate-x-1/2 rotate-0";
      case "top-left":
        return "-top-1.5 left-[0.59rem] transform -translate-x-1/2 rotate-0";

      // bottom
      case "bottom":
        return "-bottom-1.5 left-1/2 transform -translate-x-1/2 rotate-180";

      // left
      case "left":
        return "-left-1.5 top-1/2 transform -translate-y-1/2 rotate-30";

      // right
      case "right":
        return "-right-1.5 top-1/2 transform -translate-y-1/2 rotate-90";
      default:
        return "-top-1.5 left-1/2 transform -translate-x-1/2 rotate-0"; // Default to top
    }
  };

  // Function to handle bg color
  const getBgColorClass = (color) => {
    if (color === "blue-50") return "bg-blue-50";
    if (color === "purple-50") return "bg-purple-50";
    if (color === "neutral-50") return "bg-neutral-50";
    return `bg-${color}`;
  };

  // Function to handle text color
  const getTextColorClass = (color) => {
    if (color === "blue-400") return "text-blue-400";
    if (color === "purple-400") return "text-purple-400";
    if (color === "neutral-400") return "text-neutral-400";
    return `text-${color}`;
  };

  // Function to handle get fill color
  const getFillColorClass = (color) => {
    if (color === "blue-50") return "fill-blue-50";
    if (color === "purple-50") return "fill-purple-50";
    if (color === "neutral-50") return "fill-neutral-50";
    return `fill-${color}`;
  };
  return (
    <div
      className={`absolute z-[1] rounded-sm w-max ${getBgColorClass(
        bg_color
      )} opacity-0 group-hover:opacity-100 transition-all duration-600 ease-in-out ${className} pointer-events-none`}
    >
      <div className="px-1.5 relative">
        <div className={`absolute ${getArrowPositionClass(arrow_position)}`}>
          <svg viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2">
            <path
              d="M2.8006 0.500002C3.1855 -0.166665 4.14775 -0.166666 4.53265 0.500001L7.13073 5C7.51563 5.66667 7.0345 6.5 6.2647 6.5L1.06855 6.5C0.298749 6.5 -0.182377 5.66667 0.202523 5L2.8006 0.500002Z"
              //   fill="currentColor"
              className={getFillColorClass(bg_color)}
            />
          </svg>
        </div>
        <span className={`text-caption leading-caption uppercase font-semibold ${getTextColorClass(text_color)}`}>{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
