import SectionHead from "../../ui/SectionHead";
import ProductCard from "../../ui/ProductCard";
import { CircularButton } from "../../ui/Button";
import LeftRightIconSwap from "../../ui/LeftRightIconSwap";
import { LoaderIcon } from "react-hot-toast";

const FeaturedProducts = ({
  section_head_title,
  section_head_stats,
  section_head_circle_btn_text,
  section_head_circuler_btn_handler,
  section_head_filter_handler,
  products,
  currentPage,
  totalPages,
  onPageChange,
  children,
  loading
}) => {
  // Generate page numbers array
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

   

  return (
    <div>
      {/* section header */}
      <SectionHead
        title={section_head_title}
        circle_btn_text={section_head_circle_btn_text}
        circuler_btn_handler={section_head_circuler_btn_handler}
        stats={section_head_stats}
        filter_handler={section_head_filter_handler}
        extra_section={children}
      ></SectionHead>

      {/* products */}
      <div>
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <LoaderIcon className="w-10 h-10 text-primary animate-spin" />
          </div>
        )}

        {/* Products grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
        )}



        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div> */}

        {/* Updated pagination section */}
        <div className="py-20 flex flex-wrap justify-center items-center gap-5">
          {/* Previous button */}
          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className={`left-right-icon-swap-container border-2 ${
              currentPage === 1
                ? "border-neutral-200 opacity-50 cursor-not-allowed"
                : "border-neutral-default cursor-pointer"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <LeftRightIconSwap direction="left">
              <svg
                className="w-2 h-3"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0.308904 5.29402C-0.103093 5.6845 -0.103093 6.31863 0.308904 6.7091L5.58245 11.7071C5.99445 12.0976 6.66353 12.0976 7.07552 11.7071C7.48752 11.3167 7.48752 10.6825 7.07552 10.2921L2.54687 6L7.07223 1.70793C7.48422 1.31745 7.48422 0.683327 7.07223 0.292854C6.66023 -0.0976181 5.99115 -0.0976181 5.57916 0.292854L0.305607 5.2909L0.308904 5.29402Z" />
              </svg>
            </LeftRightIconSwap>
          </CircularButton>

          {/* Page number buttons */}
          {getPageNumbers().map((number) => (
            <CircularButton
              key={number}
              size="4rem"
              bg_color={currentPage === number ? "primary" : "white"}
              hover_bg_color="neutral-default"
              text_color={currentPage === number ? "white" : "black"}
              text_hover_color="black"
              className={`border-2 ${
                currentPage === number
                  ? "border-primary"
                  : "border-neutral-default"
              }`}
              onClick={() => onPageChange(number)}
            >
              <span className="text-xl font-bold">{number}</span>
            </CircularButton>
          ))}

          {/* Next button */}
          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className={`left-right-icon-swap-container border-2 ${
              currentPage === totalPages
                ? "border-neutral-200 opacity-50 cursor-not-allowed"
                : "border-neutral-default cursor-pointer"
            }`}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
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
    </div>
  );
};

export default FeaturedProducts;
