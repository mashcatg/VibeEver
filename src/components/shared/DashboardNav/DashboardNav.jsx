import { useState, useRef } from "react";
import { CircularButton } from "../../ui/Button";
import UserCard from "../../ui/UserCard";
import { useAuth } from "../../../Providers/AuthProvider";

const DashboardNav = ({ open_mobile_sidebar, set_open_mobile_sidebar }) => {
  const search_ref = useRef(null);
  const [is_search_hovered, set_is_search_hovered] = useState(false);
  const [is_search_focused, set_is_search_focused] = useState(false);

  const {user}= useAuth()
 console.log(user);
  return (
    <div className="flex items-center justify-between gap-6 mb-10">
      {/* Mobile menu toggle button */}
      <button className="md:hidden flex items-center justify-center p-2 rounded-md" onClick={() => set_open_mobile_sidebar(!open_mobile_sidebar)}>
        <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open_mobile_sidebar ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      <div>
        <form
          className={`hidden sm:flex gap-4 justify-between w-full ${is_search_focused ? "max-w-[29.875rem]" : "max-w-[20.5625rem]"} bg-white border-2 ${
            is_search_hovered ? "border-neutral-200" : "border-neutral-default"
          } pl-3 pr-1 py-1 rounded-full transition-all duration-300`}
          onMouseEnter={() => set_is_search_hovered(true)}
          onMouseLeave={() => set_is_search_hovered(false)}
          onClick={() => {
            set_is_search_focused(true);
            search_ref.current.focus();
          }}
        >
          <input
            ref={search_ref}
            type="text"
            name="search"
            onFocus={() => set_is_search_focused(true)}
            onBlur={() => set_is_search_focused(false)}
            autoComplete="off"
            defaultValue={is_search_focused ? "UI Kit" : ""}
            placeholder="Search assets & templates..."
            className={`px-2.5 w-full font-semibold text-text-body ${
              is_search_hovered ? "placeholder:text-neutral-border" : "placeholder:text-neutral-caption"
            } placeholder:font-normal outline-0 placeholder:transition-all placeholder:duration-300`}
          />

          <CircularButton
            size="3rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="neutral-caption"
            text_hover_color="text-body"
            className="border-2 border-neutral-default"
            isGroupHover={is_search_hovered}
          >
            <svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path
                d="M16.2824 13.833L13.1666 10.7177C13.0259 10.5771 12.8353 10.499 12.6353 10.499H12.1259C12.9884 9.39596 13.501 8.00859 13.501 6.49937C13.501 2.90909 10.5914 0 7.00048 0C3.40959 0 0.5 2.90909 0.5 6.49937C0.5 10.0896 3.40959 12.9987 7.00048 12.9987C8.50996 12.9987 9.89756 12.4863 11.0008 11.6239V12.1332C11.0008 12.3332 11.0789 12.5238 11.2195 12.6644L14.3354 15.7797C14.6292 16.0734 15.1042 16.0734 15.3948 15.7797L16.2793 14.8954C16.5731 14.6017 16.5731 14.1267 16.2824 13.833ZM7.00048 10.499C4.79094 10.499 3.00018 8.71165 3.00018 6.49937C3.00018 4.29021 4.78781 2.49976 7.00048 2.49976C9.21001 2.49976 11.0008 4.28708 11.0008 6.49937C11.0008 8.70852 9.21314 10.499 7.00048 10.499Z"
                fill="#A398B9"
              />
            </svg>
          </CircularButton>
        </form>
      </div>

      <div>
        <UserCard className="bg-neutral-subtle" name={user?.fullName} image={user?.image} mail={user?.email} />
      </div>
    </div>
  );
};

export default DashboardNav;
