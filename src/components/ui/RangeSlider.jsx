import { useState, useRef, useEffect } from "react";

const RangeSlider = ({ min = 0, max = 100, minValue, maxValue, onChange, step }) => {
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef(null);

  console.log(max);

  // Calculate intelligent step based on range if not provided
  const getStep = () => {
    if (step !== undefined) return step;

    const range = max - min;
    if (range <= 100) return 1;
    if (range <= 1000) return 5;
    if (range <= 10000) return 50;
    if (range <= 100000) return 500;
    return 1000;
  };

  const calculatedStep = getStep();

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  const handleMouseDown = (type) => {
    if (type === "min") setIsDraggingMin(true);
    else setIsDraggingMax(true);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingMin && !isDraggingMax) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    let value = (percentage / 100) * (max - min) + min;

    // Round to nearest step
    value = Math.round(value / calculatedStep) * calculatedStep;

    // Ensure value stays within bounds
    value = Math.max(min, Math.min(max, value));

    if (isDraggingMin && value < maxValue) {
      onChange(value, maxValue);
    } else if (isDraggingMax && value > minValue) {
      onChange(minValue, value);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  // Touch support for mobile
  const handleTouchMove = (e) => {
    if (!isDraggingMin && !isDraggingMax) return;

    const touch = e.touches[0];
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    let value = (percentage / 100) * (max - min) + min;

    value = Math.round(value / calculatedStep) * calculatedStep;
    value = Math.max(min, Math.min(max, value));

    if (isDraggingMin && value < maxValue) {
      onChange(value, maxValue);
    } else if (isDraggingMax && value > minValue) {
      onChange(minValue, value);
    }
  };

  const handleTouchEnd = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDraggingMin, isDraggingMax, minValue, maxValue]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  // Format large numbers with commas
  const formatValue = (value) => {
    return value.toLocaleString("en-US");
  };

  return (
    <div className="relative w-full py-2">
      {/* Track background */}
      <div ref={sliderRef} className="relative h-2 bg-neutral-default rounded-full cursor-pointer">
        {/* Active range */}
        <div
          className="absolute h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />

        {/* Min thumb */}
        <Thumb percentage={minPercentage} onMouseDownHandler={() => handleMouseDown("min")}>
          {/* Min value tooltip */}
          <ToolTip value={formatValue(minValue)} />
        </Thumb>

        {/* Max thumb */}
        <Thumb percentage={maxPercentage} onMouseDownHandler={() => handleMouseDown("max")}>
          {/* Max value tooltip */}
          <ToolTip value={formatValue(maxValue)} />
        </Thumb>
      </div>
    </div>
  );
};

const ToolTip = ({ value }) => {
  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap shadow-md border border-neutral-border">
      ${value}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary" />
    </div>
  );
};

const Thumb = ({ percentage, children, onMouseDownHandler }) => {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-3 border-primary rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
      style={{ left: `${percentage}%` }}
      onMouseDown={onMouseDownHandler}
      onTouchStart={onMouseDownHandler}
    >
      {children}
    </div>
  );
};

export default RangeSlider;
