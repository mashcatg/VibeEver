import hero_bg from "../../../assets/images/hero-bg.png";
import { CircularButton } from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const Hero = ({ selected, set_selected }) => {
  const [is_search_hovered, set_is_search_hovered] = useState(false);
  const [is_search_focused, set_is_search_focused] = useState(false);
  const [is_select_open, set_is_select_open] = useState(false);
  const [is_more_open, set_is_more_open] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/categories");
      setCategories(response.data.categories || []);
      set_selected(response.data.categories[0]?.name || "SELECT");
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Options for the select component
  const selectOptions = categories.map((category) => category.name).slice(9);

  // Handler for selection change
  const handleSelectChange = (value) => {
    set_selected(value);
    set_is_select_open(false);
  };

  // Handle outside click to close select dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        set_is_select_open(false);
      }
    };

    // Add event listener when dropdown is open
    if (is_select_open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [is_select_open]);

  console.log(selected);

  return (
    <section className="bg-primary rounded-4xl">
      <div
        className="flex flex-col items-center justify-center pt-20 sm:pt-[10rem] pb-20 sm:pb-[7.6875rem] text-center text-white rounded-4xl"
        style={{
          backgroundImage: `url(${hero_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl sm:text-7xl md:text-[6.875rem] max-w-4xl font-semibold uppercase leading-12 sm:leading-18 md:leading-24">
          Creative Marketplace
        </h1>

        <h4 className="py-8 sm:py-10 text-2xl sm:text-h4">For Designers and Brands</h4>

        <div
          className={`w-[95%] sm:w-fit mx-auto flex items-center justify-center gap-5 bg-white rounded-full border-4 ${
            is_search_focused ? "border-neutral-border" : is_search_hovered ? "border-neutral-200" : "border-neutral-default"
          } py-1 pr-1 pl-5 transition-all duration-300 ease-in-out mb-10`}
          onMouseEnter={() => set_is_search_hovered(true)}
          onMouseLeave={() => set_is_search_hovered(false)}
        >
          <div className="flex items-center justify-center gap-2.5">
            {/* category selector */}
            <div className="relative border-r-2 border-neutral-default" ref={selectRef}>
              <button
                onClick={() => set_is_select_open(!is_select_open)}
                className={`flex items-center justify-center gap-2.5 pr-5 ${
                  is_search_focused ? "text-text-body" : is_search_hovered ? "text-neutral-border" : "text-neutral-caption"
                } transition-all duration-300 ease-in-out`}
              >
                <svg viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 hidden sm:block">
                  <path
                    d="M10.1429 13.7143H8.85714C8.68665 13.7143 8.52313 13.7745 8.40257 13.8817C8.28202 13.9888 8.21429 14.1342 8.21429 14.2857V15.4286C8.21429 15.5801 8.28202 15.7255 8.40257 15.8326C8.52313 15.9398 8.68665 16 8.85714 16H10.1429C10.3134 16 10.4769 15.9398 10.5974 15.8326C10.718 15.7255 10.7857 15.5801 10.7857 15.4286V14.2857C10.7857 14.1342 10.718 13.9888 10.5974 13.8817C10.4769 13.7745 10.3134 13.7143 10.1429 13.7143ZM6.28571 13.7143H5C4.8295 13.7143 4.66599 13.7745 4.54543 13.8817C4.42487 13.9888 4.35714 14.1342 4.35714 14.2857V15.4286C4.35714 15.5801 4.42487 15.7255 4.54543 15.8326C4.66599 15.9398 4.8295 16 5 16H6.28571C6.45621 16 6.61972 15.9398 6.74028 15.8326C6.86084 15.7255 6.92857 15.5801 6.92857 15.4286V14.2857C6.92857 14.1342 6.86084 13.9888 6.74028 13.8817C6.61972 13.7745 6.45621 13.7143 6.28571 13.7143ZM14 13.7143H12.7143C12.5438 13.7143 12.3803 13.7745 12.2597 13.8817C12.1392 13.9888 12.0714 14.1342 12.0714 14.2857V15.4286C12.0714 15.5801 12.1392 15.7255 12.2597 15.8326C12.3803 15.9398 12.5438 16 12.7143 16H14C14.1705 16 14.334 15.9398 14.4546 15.8326C14.5751 15.7255 14.6429 15.5801 14.6429 15.4286V14.2857C14.6429 14.1342 14.5751 13.9888 14.4546 13.8817C14.334 13.7745 14.1705 13.7143 14 13.7143ZM17.8571 6.85714H16.5714C16.4009 6.85714 16.2374 6.91735 16.1169 7.02451C15.9963 7.13167 15.9286 7.27702 15.9286 7.42857V8.57143C15.9286 8.72298 15.9963 8.86833 16.1169 8.97549C16.2374 9.08265 16.4009 9.14286 16.5714 9.14286H17.8571C18.0276 9.14286 18.1912 9.08265 18.3117 8.97549C18.4323 8.86833 18.5 8.72298 18.5 8.57143V7.42857C18.5 7.27702 18.4323 7.13167 18.3117 7.02451C18.1912 6.91735 18.0276 6.85714 17.8571 6.85714ZM17.8571 10.2857H16.5714C16.4009 10.2857 16.2374 10.3459 16.1169 10.4531C15.9963 10.5602 15.9286 10.7056 15.9286 10.8571V12C15.9286 12.1516 15.9963 12.2969 16.1169 12.4041C16.2374 12.5112 16.4009 12.5714 16.5714 12.5714H17.8571C18.0276 12.5714 18.1912 12.5112 18.3117 12.4041C18.4323 12.2969 18.5 12.1516 18.5 12V10.8571C18.5 10.7056 18.4323 10.5602 18.3117 10.4531C18.1912 10.3459 18.0276 10.2857 17.8571 10.2857ZM17.8571 13.7143H16.5714C16.4009 13.7143 16.2374 13.7745 16.1169 13.8817C15.9963 13.9888 15.9286 14.1342 15.9286 14.2857V15.4286C15.9286 15.5801 15.9963 15.7255 16.1169 15.8326C16.2374 15.9398 16.4009 16 16.5714 16H17.8571C18.0276 16 18.1912 15.9398 18.3117 15.8326C18.4323 15.7255 18.5 15.5801 18.5 15.4286V14.2857C18.5 14.1342 18.4323 13.9888 18.3117 13.8817C18.1912 13.7745 18.0276 13.7143 17.8571 13.7143ZM17.8571 3.42857H16.5714C16.4009 3.42857 16.2374 3.48878 16.1169 3.59594C15.9963 3.7031 15.9286 3.84845 15.9286 4V5.14286C15.9286 5.29441 15.9963 5.43975 16.1169 5.54692C16.2374 5.65408 16.4009 5.71429 16.5714 5.71429H17.8571C18.0276 5.71429 18.1912 5.65408 18.3117 5.54692C18.4323 5.43975 18.5 5.29441 18.5 5.14286V4C18.5 3.84845 18.4323 3.7031 18.3117 3.59594C18.1912 3.48878 18.0276 3.42857 17.8571 3.42857ZM17.8571 0H1.78571C1.44472 0 1.1177 0.120408 0.876577 0.334735C0.635459 0.549062 0.5 0.839753 0.5 1.14286L0.5 15.4286C0.5 15.5801 0.567729 15.7255 0.688289 15.8326C0.808848 15.9398 0.972361 16 1.14286 16H2.42857C2.59907 16 2.76258 15.9398 2.88314 15.8326C3.0037 15.7255 3.07143 15.5801 3.07143 15.4286V2.28571H17.8571C18.0276 2.28571 18.1912 2.22551 18.3117 2.11835C18.4323 2.01118 18.5 1.86584 18.5 1.71429V0.571429C18.5 0.419876 18.4323 0.274531 18.3117 0.167368C18.1912 0.0602039 18.0276 0 17.8571 0Z"
                    className={`transition-all duration-300 ease-in-out`}
                  />
                </svg>

                <p
                  className={`${
                    is_search_focused ? "text-text-body" : is_search_hovered ? "text-neutral-border" : "text-neutral-caption"
                  } font-semibold transition-all duration-300 ease-in-out uppercase`}
                >
                  {selected}
                </p>
              </button>

              <div
                className={`absolute mt-2 left-0 w-full min-w-32 bg-white rounded-b-lg border border-neutral-default flex flex-col gap-0.5 overflow-hidden z-10 transition-all duration-300 ease-in-out`}
                style={{
                  maxHeight: is_select_open ? "625rem" : "0rem",
                  opacity: is_select_open ? 1 : 0,
                  transform: `translateY(${is_select_open ? "0" : "-0.5rem"})`,
                }}
              >
                <div>
                  {selectOptions.map(
                    (option, index) =>
                      selected !== option && (
                        <button
                          key={index}
                          onClick={() => handleSelectChange(option)}
                          className={`uppercase text-caption leading- text-neutral-subtitle font-semibold text-left p-2 hover:bg-neutral-subtle transition-all duration-300 w-full`}
                        >
                          {option}
                        </button>
                      )
                  )}
                </div>
              </div>
            </div>

            <input
              type="text"
              name="hero_search"
              id="hero_search"
              placeholder="Search assets & templates..."
              className={`$${
                is_search_hovered ? "placeholder:text-neutral-border" : "placeholder:text-neutral-caption"
              } outline-0 text-text-body font-semibold placeholder:font-normal pl-2.5 w-full ${
                is_search_focused ? "sm:w-[25rem]" : "sm:w-[14.6875rem]"
              }              
              transition-all duration-300 ease-in-out placeholder:transition-all placeholder:duration-300 placeholder:ease-in-out`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => set_is_search_focused(true)}
              onBlur={() => set_is_search_focused(false)}
            />
          </div>

          <CircularButton
            size="4rem"
            bg_color={is_search_focused ? "primary" : "white"}
            hover_bg_color={is_search_focused ? "primary" : is_search_hovered ? "neutral-200" : "neutral-border"}
            text_color={is_search_focused ? "" : "neutral-caption"}
            text_hover_color={is_search_focused ? "" : is_search_hovered ? "neutral-subtitle" : "text-body"}
            className="border-2 border-neutral-default"
            isGroupHover={is_search_hovered}
            onClick={() => {
              if (searchValue.trim()) {
                navigate(`/products?search=${encodeURIComponent(searchValue.trim())}${selected ? `&category=${encodeURIComponent(selected)}` : ""}`);
              }
            }}
          >
            <svg viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path
                d="M16.2824 13.833L13.1666 10.7177C13.0259 10.5771 12.8353 10.499 12.6353 10.499H12.1259C12.9884 9.39596 13.501 8.00859 13.501 6.49937C13.501 2.90909 10.5914 0 7.00048 0C3.40959 0 0.5 2.90909 0.5 6.49937C0.5 10.0896 3.40959 12.9987 7.00048 12.9987C8.50996 12.9987 9.89756 12.4863 11.0008 11.6239V12.1332C11.0008 12.3332 11.0789 12.5238 11.2195 12.6644L14.3354 15.7797C14.6292 16.0734 15.1042 16.0734 15.3948 15.7797L16.2793 14.8954C16.5731 14.6017 16.5731 14.1267 16.2824 13.833ZM7.00048 10.499C4.79094 10.499 3.00018 8.71165 3.00018 6.49937C3.00018 4.29021 4.78781 2.49976 7.00048 2.49976C9.21001 2.49976 11.0008 4.28708 11.0008 6.49937C11.0008 8.70852 9.21314 10.499 7.00048 10.499Z"
                fill="#A398B9"
              />
            </svg>
          </CircularButton>
        </div>

        <div className="max-w-[28.125rem] w-[94%] sm:w-full mx-auto flex items-center justify-center gap-2.5 flex-wrap">
          {categories.slice(0, 9).map((item, index) => (
            <button
              key={index}
              className="flex w-min items-center justify-center rounded-full border-[0.0625rem] border-white px-2 py-1 group hover:bg-white transition-all duration-300 ease-in-out"
              onClick={() => {
                handleSelectChange(item.name);
              }}
            >
              <span className="block w-max uppercase text-white font-semibold text-caption leading-caption group-hover:text-text-body transition-all duration-300 ease-in-out">
                {item.name}
              </span>
            </button>
          ))}

          {categories.length > 9 && (
            <div className="relative">
              <button
                className="flex w-min items-center justify-center rounded-full border-[0.0625rem] border-white p-1 group hover:bg-white transition-all duration-300 ease-in-out"
                onClick={() => set_is_more_open(!is_more_open)}
              >
                <svg
                  className="w-[1.0625rem] h-4 group-hover:text-text-body transition-all duration-300 ease-in-out"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3.5" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="8.5" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="13.5" cy="8" r="1.5" fill="currentColor" />
                </svg>
              </button>

              <div
                className={`absolute mt-2 left-1/2 -translate-x-1/2 w-fit bg-white border sm:border-0 border-gray-200 rounded-md flex flex-col gap-0.5 z-10 transition-all duration-300 ease-in-out`}
                style={{
                  maxHeight: is_more_open ? "625rem" : "0rem",
                  opacity: is_more_open ? 1 : 0,
                  transform: `translateY(${is_more_open ? "0" : "-0.5rem"})`,
                }}
              >
                <div className="relative">
                  <svg viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 absolute -top-1.5 left-1/2 -translate-x-1/2">
                    <path
                      d="M2.8006 0.500002C3.1855 -0.166665 4.14775 -0.166666 4.53265 0.500001L7.13073 5C7.51563 5.66667 7.0345 6.5 6.2647 6.5L1.06855 6.5C0.298749 6.5 -0.182377 5.66667 0.202523 5L2.8006 0.500002Z"
                      fill="#fff"
                    />
                  </svg>
                </div>
                <div className="overflow-hidden rounded-md border-[0.0625rem] border-neutral-default">
                  {selectOptions.map(
                    (option, index) =>
                      selected !== option && (
                        <button
                          key={index}
                          onClick={() => {
                            handleSelectChange(option);
                            set_is_more_open(false);
                          }}
                          className={`uppercase text-caption leading- text-neutral-subtitle font-semibold text-left px-3 py-2 hover:bg-neutral-subtle transition-all duration-300 w-max`}
                        >
                          {option}
                        </button>
                      )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
