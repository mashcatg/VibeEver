import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Select = ({ options = ["Graphics", "Color", "Toast", "Logos"], value = "Graphics", onChange = () => {}, icon = null }) => {
  const [is_open, set_is_open] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  // Calculate and update dropdown position
  useEffect(() => {
    if (is_open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [is_open]);

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    if (!is_open) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest(".select-container") && !e.target.closest("#select-dropdown-portal")) {
        set_is_open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [is_open]);

  const handleOptionSelect = (option) => {
    onChange(option);
    set_is_open(false);
  };

  return (
    <div className="select-container relative">
      <div
        ref={buttonRef}
        className={`${is_open ? "rounded-t-lg rounded-b-none" : "rounded-[10rem]"} ${is_open && "border-b-0"} border border-neutral-default bg-white`}
      >
        <button onClick={() => set_is_open(!is_open)} className="py-3 px-5 text-text-body font-semibold flex items-center gap-2.5">
          {icon || (
            <svg viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4">
              <path
                d="M10.1429 13.7143H8.85714C8.68665 13.7143 8.52313 13.7745 8.40257 13.8817C8.28202 13.9888 8.21429 14.1342 8.21429 14.2857V15.4286C8.21429 15.5801 8.28202 15.7255 8.40257 15.8326C8.52313 15.9398 8.68665 16 8.85714 16H10.1429C10.3134 16 10.4769 15.9398 10.5974 15.8326C10.718 15.7255 10.7857 15.5801 10.7857 15.4286V14.2857C10.7857 14.1342 10.718 13.9888 10.5974 13.8817C10.4769 13.7745 10.3134 13.7143 10.1429 13.7143ZM6.28571 13.7143H5C4.8295 13.7143 4.66599 13.7745 4.54543 13.8817C4.42487 13.9888 4.35714 14.1342 4.35714 14.2857V15.4286C4.35714 15.5801 4.42487 15.7255 4.54543 15.8326C4.66599 15.9398 4.8295 16 5 16H6.28571C6.45621 16 6.61972 15.9398 6.74028 15.8326C6.86084 15.7255 6.92857 15.5801 6.92857 15.4286V14.2857C6.92857 14.1342 6.86084 13.9888 6.74028 13.8817C6.61972 13.7745 6.45621 13.7143 6.28571 13.7143ZM14 13.7143H12.7143C12.5438 13.7143 12.3803 13.7745 12.2597 13.8817C12.1392 13.9888 12.0714 14.1342 12.0714 14.2857V15.4286C12.0714 15.5801 12.1392 15.7255 12.2597 15.8326C12.3803 15.9398 12.5438 16 12.7143 16H14C14.1705 16 14.334 15.9398 14.4546 15.8326C14.5751 15.7255 14.6429 15.5801 14.6429 15.4286V14.2857C14.6429 14.1342 14.5751 13.9888 14.4546 13.8817C14.334 13.7745 14.1705 13.7143 14 13.7143ZM17.8571 6.85714H16.5714C16.4009 6.85714 16.2374 6.91735 16.1169 7.02451C15.9963 7.13167 15.9286 7.27702 15.9286 7.42857V8.57143C15.9286 8.72298 15.9963 8.86833 16.1169 8.97549C16.2374 9.08265 16.4009 9.14286 16.5714 9.14286H17.8571C18.0276 9.14286 18.1912 9.08265 18.3117 8.97549C18.4323 8.86833 18.5 8.72298 18.5 8.57143V7.42857C18.5 7.27702 18.4323 7.13167 18.3117 7.02451C18.1912 6.91735 18.0276 6.85714 17.8571 6.85714ZM17.8571 10.2857H16.5714C16.4009 10.2857 16.2374 10.3459 16.1169 10.4531C15.9963 10.5602 15.9286 10.7056 15.9286 10.8571V12C15.9286 12.1516 15.9963 12.2969 16.1169 12.4041C16.2374 12.5112 16.4009 12.5714 16.5714 12.5714H17.8571C18.0276 12.5714 18.1912 12.5112 18.3117 12.4041C18.4323 12.2969 18.5 12.1516 18.5 12V10.8571C18.5 10.7056 18.4323 10.5602 18.3117 10.4531C18.1912 10.3459 18.0276 10.2857 17.8571 10.2857ZM17.8571 13.7143H16.5714C16.4009 13.7143 16.2374 13.7745 16.1169 13.8817C15.9963 13.9888 15.9286 14.1342 15.9286 14.2857V15.4286C15.9286 15.5801 15.9963 15.7255 16.1169 15.8326C16.2374 15.9398 16.4009 16 16.5714 16H17.8571C18.0276 16 18.1912 15.9398 18.3117 15.8326C18.4323 15.7255 18.5 15.5801 18.5 15.4286V14.2857C18.5 14.1342 18.4323 13.9888 18.3117 13.8817C18.1912 13.7745 18.0276 13.7143 17.8571 13.7143ZM17.8571 3.42857H16.5714C16.4009 3.42857 16.2374 3.48878 16.1169 3.59594C15.9963 3.7031 15.9286 3.84845 15.9286 4V5.14286C15.9286 5.29441 15.9963 5.43975 16.1169 5.54692C16.2374 5.65408 16.4009 5.71429 16.5714 5.71429H17.8571C18.0276 5.71429 18.1912 5.65408 18.3117 5.54692C18.4323 5.43975 18.5 5.29441 18.5 5.14286V4C18.5 3.84845 18.4323 3.7031 18.3117 3.59594C18.1912 3.48878 18.0276 3.42857 17.8571 3.42857ZM17.8571 0H1.78571C1.44472 0 1.1177 0.120408 0.876577 0.334735C0.635459 0.549062 0.5 0.839753 0.5 1.14286L0.5 15.4286C0.5 15.5801 0.567729 15.7255 0.688289 15.8326C0.808848 15.9398 0.972361 16 1.14286 16H2.42857C2.59907 16 2.76258 15.9398 2.88314 15.8326C3.0037 15.7255 3.07143 15.5801 3.07143 15.4286V2.28571H17.8571C18.0276 2.28571 18.1912 2.22551 18.3117 2.11835C18.4323 2.01118 18.5 1.86584 18.5 1.71429V0.571429C18.5 0.419876 18.4323 0.274531 18.3117 0.167368C18.1912 0.0602039 18.0276 0 17.8571 0Z"
                className="fill-text-body"
              />
            </svg>
          )}

          <span>{value}</span>

          <svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-2 ml-3">
            <path
              d="M5.29402 7.2071C5.6845 7.59763 6.31862 7.59763 6.7091 7.2071L11.7071 2.20821C12.0976 1.81767 12.0976 1.18344 11.7071 0.792903C11.3167 0.402366 10.6825 0.402366 10.2921 0.792903L6 5.0857L1.70793 0.796027C1.31745 0.40549 0.683327 0.40549 0.292854 0.796027C-0.0976181 1.18657 -0.0976181 1.8208 0.292854 2.21134L5.2909 7.21022L5.29402 7.2071Z"
              fill="#372F46"
            />
          </svg>
        </button>
      </div>

      {is_open &&
        createPortal(
          <div
            id="select-dropdown-portal"
            style={{
              position: "absolute",
              top: `${dropdownPosition.top - 1}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              zIndex: 9999999,
            }}
            className="bg-white rounded-b-lg border-t-0 border border-neutral-default flex flex-col gap-0.5 overflow-hidden"
          >
            {options.map(
              (option, index) =>
                option !== value && (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`uppercase text-caption leading-caption ${
                      value === option ? "text-text-body" : "text-neutral-subtitle"
                    } font-semibold text-left p-2 hover:bg-neutral-subtle transition-all duration-300`}
                  >
                    {option}
                  </button>
                )
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Select;
