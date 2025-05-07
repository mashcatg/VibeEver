import React from "react";
import { useState } from "react";

const Input = ({ label = "Enter", placeholder = "Type...", type = "text", id = "", name = "", is_required = false, className, rows = 4 }) => {
  const [is_search_focused, set_is_search_focused] = useState(false);
  const [input_value, set_input_value] = useState("");
  return (
    <div
      className={`relative py-6 px-7 bg-neutral-subtle ${
        type === "textarea" ? "rounded-4xl" : "rounded-full"
      } leading-caption text-xl transition-all duration-300 ease-in-out hover:border-neutral-default border-2 ${
        is_search_focused ? "border-neutral-default" : "border-white"
      } ${className}`}
      onFocus={() => set_is_search_focused(true)}
      onBlur={() => !input_value && set_is_search_focused(false)}
      onClick={() => {
        set_is_search_focused(true);
        document.getElementById(id).focus();
      }}
    >
      <label
        className={`text-xl absolute left-5 transform px-2.5 transition-all duration-400 ease-in-out ${
          is_search_focused
            ? "bg-white text-neutral-subtitle top-0 translate-y-[-50%] ml-4"
            : `bg-transparent text-neutral-caption ml-0 ${type === "textarea" ? "top-11" : "top-1/2"} translate-y-[-50%]`
        } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[59%] before:bg-neutral-subtle`}
      >
        <span className="relative">{label}</span>
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={is_required}
          placeholder={placeholder}
          onChange={(e) => set_input_value(e.target.value)}
          className={`w-full min-h-[8.4375rem] outline-0 text-text-body placeholder:text-neutral-caption transition-all duration-400 ease-in-out resize-none ${
            is_search_focused ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          required={is_required}
          placeholder={placeholder}
          onChange={(e) => set_input_value(e.target.value)}
          className={`w-full outline-0 text-text-body placeholder:text-neutral-caption transition-all duration-400 ease-in-out ${
            is_search_focused ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

export default Input;
