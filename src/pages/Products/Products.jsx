import FeaturedProducts from "../../components/shared/FeaturedProducts/FeaturedProducts";
import SectionHead from "../../components/ui/SectionHead";
import { useState, useEffect } from "react";
import { CircularButton } from "../../components/ui/Button";
import LeftRightIconSwap from "../../components/ui/LeftRightIconSwap";
import Tooltip from "../../components/ui/Tooltip";
import Select from "../../components/ui/Select";
import useAxios from "../../Hooks/useAxios";
import toast, { LoaderIcon } from "react-hot-toast";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required Swiper modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [is_filter_shown, set_is_filter_shown] = useState(false);
  const [is_search_hovered, set_is_search_hovered] = useState(false);
  const [selected, set_selected] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(120);
  const [selectedTag, setSelectedTag] = useState("");
  const axios = useAxios();
  
  // Reference to the swiper instance for tags
  const [tagSwiper, setTagSwiper] = useState(null);
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  // console.log("token token" , token);

  // Options for the select component
  const [selectOptions , setSelectOptions] = useState([]);
   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        // Extract only the category names into an array
        const categoryNames = response.data?.categories.map(category => category.name);
        console.log(categoryNames);
        setSelectOptions(categoryNames);
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, [axios]);

  // All available tags
  const tags = [
    "Illustrator",
    "WordPress",
    "Photoshop",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Webflow",
    "After Effects",
    "InDesign",
    "Canva",
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Build query parameters
        const queryParams = new URLSearchParams({
          page: page,
          limit: limit,
          ...(searchQuery && { search: searchQuery }),
          ...(selected && { category: selected }),
          ...(selectedTag && { tag: selectedTag }),
          ...(minPrice !== 0 && { minPrice: minPrice }),
          ...(maxPrice !== 120 && { maxPrice: maxPrice })
        }).toString();

        const response = await axios.get(
          `/products?${queryParams}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, axios, page, limit, searchQuery, selected, selectedTag, minPrice, maxPrice]);

 

  const handleSelectChange = (value) => {
    set_selected(value);
  };

  // Add pagination handler
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="pb-10">
      <FeaturedProducts
        section_head_title={
          <>
            FEATURED <br /> PRODUCTS
          </>
        }
        section_head_stats={[
          {
            count: products.length,
            text: "Ready Templates",
          },
        ]}
        section_head_circle_btn_text="Help?"
        section_head_filter_handler={() =>
          set_is_filter_shown(!is_filter_shown)
        }
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        products={products.map((product) => ({
          id: product._id,
          image: product.thumbnailUrls[0],
          title: product.title,
          tags: product.tags,
          price: product.finalPrice,
          regular_price: product.price,
          category: product.category?.name,
          isPublished: product.isPublished,
        }))} 
        loading={loading}
       >
        <div
          className={`border-t border-t-neutral-default ${
            is_filter_shown
              ? "max-h-[625rem] opacity-100 mt-6 pt-10 md:pt-[3.75rem]"
              : "max-h-0 opacity-0 overflow-hidden mt-0 pt-0"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:items-end mb-6">
            <h4 className="font-bold -tracking-125">Filter Illustrator</h4>

            <form
              className={`flex justify-between w-full max-w-[21.6875rem] bg-white border-2 ${
                is_search_hovered
                  ? "border-neutral-200"
                  : "border-neutral-default"
              } pl-3 pr-1.5 py-1.5 rounded-full transition-all duration-300`}
              onMouseEnter={() => set_is_search_hovered(true)}
              onMouseLeave={() => set_is_search_hovered(false)}
            >              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assets & templates..."
                className={`px-2.5 w-full font-semibold text-text-body ${
                  is_search_hovered
                    ? "placeholder:text-neutral-border"
                    : "placeholder:text-neutral-caption"
                } placeholder:font-normal outline-0 placeholder:transition-all placeholder:duration-300`}
              />

              <CircularButton
                size="4rem"
                bg_color="white"
                hover_bg_color="neutral-default"
                text_color="neutral-caption"
                text_hover_color="text-body"
                className="border-2 border-neutral-default"
                isGroupHover={is_search_hovered}
              >
                <svg
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M16.2824 13.833L13.1666 10.7177C13.0259 10.5771 12.8353 10.499 12.6353 10.499H12.1259C12.9884 9.39596 13.501 8.00859 13.501 6.49937C13.501 2.90909 10.5914 0 7.00048 0C3.40959 0 0.5 2.90909 0.5 6.49937C0.5 10.0896 3.40959 12.9987 7.00048 12.9987C8.50996 12.9987 9.89756 12.4863 11.0008 11.6239V12.1332C11.0008 12.3332 11.0789 12.5238 11.2195 12.6644L14.3354 15.7797C14.6292 16.0734 15.1042 16.0734 15.3948 15.7797L16.2793 14.8954C16.5731 14.6017 16.5731 14.1267 16.2824 13.833ZM7.00048 10.499C4.79094 10.499 3.00018 8.71165 3.00018 6.49937C3.00018 4.29021 4.78781 2.49976 7.00048 2.49976C9.21001 2.49976 11.0008 4.28708 11.0008 6.49937C11.0008 8.70852 9.21314 10.499 7.00048 10.499Z"
                    fill="#A398B9"
                  />
                </svg>
              </CircularButton>
            </form>
          </div>{" "}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex gap-5 sm:gap-2.5 items-center justify-center">
              {/* big tags */}
              <div className="tag-slider-container w-[21.5%] sm:w-[28.5rem] md:w-[29rem] lg:w-[28.5rem] overflow-hidden">
                <Swiper
                  onSwiper={setTagSwiper}
                  spaceBetween={10}
                  slidesPerView={3}
                  navigation={{
                    nextEl: ".tag-swiper-button-next",
                  }}
                  modules={[Navigation]}
                  className="tag-slider"
                >
                  {tags.map((item, index) => (
                    <SwiperSlide key={index}>                      <div 
                        className={`px-5 py-3 w-fit rounded-full cursor-pointer ${
                          selectedTag === item 
                            ? "bg-primary text-white" 
                            : "bg-neutral-default text-text-body"
                        }`}
                        onClick={() => setSelectedTag(selectedTag === item ? "" : item)}
                      >
                        <span className="text-xl leading-body">
                          {item}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="rounded-full relative w-fit h-fit group tag-swiper-button-next">
                <CircularButton
                  size="2.375rem"
                  bg_color="white"
                  hover_bg_color="neutral-default"
                  text_color="text-body"
                  text_hover_color="text-body"
                  className="left-right-icon-swap-container"
                >
                  <LeftRightIconSwap direction="right">
                    <svg
                      className="w-2 h-3"
                      viewBox="0 0 8 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.07562 5.29402C7.48761 5.6845 7.48761 6.31863 7.07562 6.7091L1.80207 11.7071C1.39007 12.0976 0.720993 12.0976 0.308997 11.7071C-0.102999 11.3167 -0.102999 10.6825 0.308997 10.2921L4.83766 6L0.312293 1.70793C-0.0997031 1.31745 -0.0997031 0.683327 0.312293 0.292854C0.724289 -0.0976181 1.39337 -0.0976181 1.80537 0.292854L7.07891 5.2909L7.07562 5.29402Z" />
                    </svg>
                  </LeftRightIconSwap>
                </CircularButton>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">              <div className="py-3 px-5 rounded-full border border-neutral-default bg-white text-text-body font-semibold flex items-center gap-5">
                <span>Price:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-20 outline-none border-b border-neutral-default text-center"
                    min="0"
                    max={maxPrice}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-20 outline-none border-b border-neutral-default text-center"
                    min={minPrice}
                  />
                </div>
              </div>

              <Select
                options={selectOptions}
                value={selected}
                onChange={handleSelectChange}
                icon={
                  <svg
                    viewBox="0 0 19 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-4"
                  >
                    <path
                      d="M10.1429 13.7143H8.85714C8.68665 13.7143 8.52313 13.7745 8.40257 13.8817C8.28202 13.9888 8.21429 14.1342 8.21429 14.2857V15.4286C8.21429 15.5801 8.28202 15.7255 8.40257 15.8326C8.52313 15.9398 8.68665 16 8.85714 16H10.1429C10.3134 16 10.4769 15.9398 10.5974 15.8326C10.718 15.7255 10.7857 15.5801 10.7857 15.4286V14.2857C10.7857 14.1342 10.718 13.9888 10.5974 13.8817C10.4769 13.7745 10.3134 13.7143 10.1429 13.7143ZM6.28571 13.7143H5C4.8295 13.7143 4.66599 13.7745 4.54543 13.8817C4.42487 13.9888 4.35714 14.1342 4.35714 14.2857V15.4286C4.35714 15.5801 4.42487 15.7255 4.54543 15.8326C4.66599 15.9398 4.8295 16 5 16H6.28571C6.45621 16 6.61972 15.9398 6.74028 15.8326C6.86084 15.7255 6.92857 15.5801 6.92857 15.4286V14.2857C6.92857 14.1342 6.86084 13.9888 6.74028 13.8817C6.61972 13.7745 6.45621 13.7143 6.28571 13.7143ZM14 13.7143H12.7143C12.5438 13.7143 12.3803 13.7745 12.2597 13.8817C12.1392 13.9888 12.0714 14.1342 12.0714 14.2857V15.4286C12.0714 15.5801 12.1392 15.7255 12.2597 15.8326C12.3803 15.9398 12.5438 16 12.7143 16H14C14.1705 16 14.334 15.9398 14.4546 15.8326C14.5751 15.7255 14.6429 15.5801 14.6429 15.4286V14.2857C14.6429 14.1342 14.5751 13.9888 14.4546 13.8817C14.334 13.7745 14.1705 13.7143 14 13.7143ZM17.8571 6.85714H16.5714C16.4009 6.85714 16.2374 6.91735 16.1169 7.02451C15.9963 7.13167 15.9286 7.27702 15.9286 7.42857V8.57143C15.9286 8.72298 15.9963 8.86833 16.1169 8.97549C16.2374 9.08265 16.4009 9.14286 16.5714 9.14286H17.8571C18.0276 9.14286 18.1912 9.08265 18.3117 8.97549C18.4323 8.86833 18.5 8.72298 18.5 8.57143V7.42857C18.5 7.27702 18.4323 7.13167 18.3117 7.02451C18.1912 6.91735 18.0276 6.85714 17.8571 6.85714ZM17.8571 10.2857H16.5714C16.4009 10.2857 16.2374 10.3459 16.1169 10.4531C15.9963 10.5602 15.9286 10.7056 15.9286 10.8571V12C15.9286 12.1516 15.9963 12.2969 16.1169 12.4041C16.2374 12.5112 16.4009 12.5714 16.5714 12.5714H17.8571C18.0276 12.5714 18.1912 12.5112 18.3117 12.4041C18.4323 12.2969 18.5 12.1516 18.5 12V10.8571C18.5 10.7056 18.4323 10.5602 18.3117 10.4531C18.1912 10.3459 18.0276 10.2857 17.8571 10.2857ZM17.8571 13.7143H16.5714C16.4009 13.7143 16.2374 13.7745 16.1169 13.8817C15.9963 13.9888 15.9286 14.1342 15.9286 14.2857V15.4286C15.9286 15.5801 15.9963 15.7255 16.1169 15.8326C16.2374 15.9398 16.4009 16 16.5714 16H17.8571C18.0276 16 18.1912 15.9398 18.3117 15.8326C18.4323 15.7255 18.5 15.5801 18.5 15.4286V14.2857C18.5 14.1342 18.4323 13.9888 18.3117 13.8817C18.1912 13.7745 18.0276 13.7143 17.8571 13.7143ZM17.8571 3.42857H16.5714C16.4009 3.42857 16.2374 3.48878 16.1169 3.59594C15.9963 3.7031 15.9286 3.84845 15.9286 4V5.14286C15.9286 5.29441 15.9963 5.43975 16.1169 5.54692C16.2374 5.65408 16.4009 5.71429 16.5714 5.71429H17.8571C18.0276 5.71429 18.1912 5.65408 18.3117 5.54692C18.4323 5.43975 18.5 5.29441 18.5 5.14286V4C18.5 3.84845 18.4323 3.7031 18.3117 3.59594C18.1912 3.48878 18.0276 3.42857 17.8571 3.42857ZM17.8571 0H1.78571C1.44472 0 1.1177 0.120408 0.876577 0.334735C0.635459 0.549062 0.5 0.839753 0.5 1.14286L0.5 15.4286C0.5 15.5801 0.567729 15.7255 0.688289 15.8326C0.808848 15.9398 0.972361 16 1.14286 16H2.42857C2.59907 16 2.76258 15.9398 2.88314 15.8326C3.0037 15.7255 3.07143 15.5801 3.07143 15.4286V2.28571H17.8571C18.0276 2.28571 18.1912 2.22551 18.3117 2.11835C18.4323 2.01118 18.5 1.86584 18.5 1.71429V0.571429C18.5 0.419876 18.4323 0.274531 18.3117 0.167368C18.1912 0.0602039 18.0276 0 17.8571 0Z"
                      className="fill-text-body"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </FeaturedProducts>

      {/* lets talk */}
      <SectionHead
        title={
          <>
            LET'S <br /> TALK
          </>
        }
        submit_handler={(e) => {
          e.preventDefault();
          console.log("Form data", e.target.subscribe_email.value);
        }}
        circle_btn_text="Mail"
        stats={[
          {
            count: 1000,
            text: "Questions Answered",
          },
          {
            count: 1250,
            text: "Ready Templates",
          },
        ]}
      ></SectionHead>
    </div>
  );
};

export default Products;
