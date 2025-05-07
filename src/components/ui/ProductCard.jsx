import heartIcon from "../../assets/icons/heart.svg";
import { CircularButton } from "../ui/Button";
import Tooltip from "../ui/Tooltip";
import LeftRightIconSwap from "../ui/LeftRightIconSwap";

const ProductImage = ({ product_image, save_handler = () => {} }) => {
  return (
    <div className="max-h-product-image rounded-2xl overflow-hidden relative">
      {/* decorative elements */}
      <div
        className="size-10 bg-transparent rounded-2xl absolute right-0 top-[1.5625rem] z-[1] pointer-events-none"
        style={{
          boxShadow: "0.8125rem -0.8125rem #fff",
          borderTopLeftRadius: "0.9375rem",
          borderBottomRightRadius: "0.9375rem",
        }}
      ></div>

      <div
        className="size-10 bg-transparent rounded-2xl absolute z-[1] top-0 translate-x-[-50%] left-[5.5rem] pointer-events-none"
        style={{
          boxShadow: "0.8125rem -0.8125rem #fff",
          borderTopLeftRadius: "0.9375rem",
          borderBottomRightRadius: "0.9375rem",
          clipPath: "polygon(0rem -1rem, 0rem 0rem, 0rem 0rem, 100% 0rem, 250% 100%)",
        }}
      ></div>

      <div
        className="w-full h-full relative"
        style={{
          clipPath: "polygon(0 0, 6.25rem 0, 7.8125rem 1.5625rem, 0 1.5625rem, 100% 1.5625rem, 100% 100%, 0 100%)",
        }}
      >
        {/* save btn */}
        <button className="absolute top-1.5 left-1.5 size-6 group" onClick={save_handler}>
          <div className="relative">
            <Tooltip
              text="Save"
              bg_color="purple-50"
              text_color="purple-400"
              arrow_position="top-left"
              className="text-purple-50 bottom-0 left-0 group-hover:-bottom-8"
            />

            <img src={heartIcon} alt="Heart Icon" className="group-hover:scale-110 transition-all duration-300" />
          </div>
        </button>

        {/* image */}
        <img src={product_image} alt="Product Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap py-4 text-caption leading-caption uppercase font-semibold">
      {tags.map((tag, index) => (
        <span key={index}>
          {tag}
          {/* Add comma separator only if it's not the last tag */}
          {index < tags.length - 1 && <span className="mr-1">,</span>}
        </span>
      ))}
    </div>
  );
};

const ProductCardActionButton = ({
  tooltip_text,
  tooltip_text_color,
  tooltip_arrow_position,
  bg_color,
  hover_bg_color,
  icon_color,
  icon_hover_color,
  icon,
  on_click_handler = () => {},
}) => {
  // Function to handle border color
  const getBorderColorClass = (color) => {
    if (color === "blue-50") return "border-blue-50";
    if (color === "purple-50") return "border-purple-50";
    if (color === "neutral-50") return "border-neutral-50";
    return `border-${color}`;
  };
  return (
    <div className="relative group">
      <Tooltip
        text={tooltip_text}
        bg_color={bg_color}
        text_color={tooltip_text_color}
        arrow_position={tooltip_arrow_position}
        className="top-0 group-hover:-top-8 left-1/2 translate-x-[-50%]"
      />
      <CircularButton
        size="2.375rem"
        bg_color={bg_color}
        hover_bg_color={hover_bg_color}
        text_color={icon_color}
        text_hover_color={icon_hover_color}
        className={`left-right-icon-swap-container border-2 ${getBorderColorClass(bg_color)}`}
        onClick={on_click_handler}
      >
        {icon}
      </CircularButton>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { id, image, title, tags, price, regular_price } = product;
  return (
    <div>
      {/* product image */}
      <ProductImage product_image={image} save_handler={() => console.log("Save " + id)}></ProductImage>

      {/* tags */}
      <Tags tags={tags}></Tags>

      {/* title */}
      <h5 className="text-headline leading-headline text-black font-bold">{title}</h5>

      {/* card footer */}
      <div className="mt-4 flex items-center justify-between gap-5">
        {/* price */}
        <div className="flex items-center gap-3 relative w-fit h-fit group">
          {/* main price */}
          <div className="text-main-price flex items-start gap-xxs">
            <span className="mt-0.5">$</span>
            <h5 className="text-headline leading-headline font-bold">{price}</h5>
          </div>

          {/* regular price */}
          <div className="bg-neutral-default rounded-sm w-fit opacity-0 group-hover:opacity-100 absolute -right-40 group-hover:-right-20 top-[50%] translate-y-[-50%] pointer-events-none transition-all duration-300 ease-in-out">
            <div className="relative px-1.5">
              <span className="absolute -left-1.5 top-[50%] translate-y-[-50%]">
                <svg className="w-2 h-2" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.500001 4.86603C-0.166666 4.48113 -0.166667 3.51887 0.5 3.13397L5 0.535898C5.66667 0.150998 6.5 0.632122 6.5 1.40192L6.5 6.59807C6.5 7.36788 5.66667 7.849 5 7.4641L0.500001 4.86603Z"
                    className="fill-neutral-default"
                  />
                </svg>
              </span>
              <del className="font-semibold text-neutral-caption">${regular_price}</del>
            </div>
          </div>
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-1.5">
          {/* Add to Cart */}
          <ProductCardActionButton
            tooltip_text="Add to Cart"
            on_click_handler={() => console.log("Add to Cart " + id)}
            bg_color="blue-50"
            hover_bg_color="blue-200"
            tooltip_text_color="blue-400"
            tooltip_arrow_position="bottom"
            icon_color="blue-900"
            icon_hover_color="blue-700"
            icon={
              <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
                <path d="M6.92308 0.923077C6.92308 0.4125 6.51058 0 6 0C5.48942 0 5.07692 0.4125 5.07692 0.923077V5.07692H0.923077C0.4125 5.07692 0 5.48942 0 6C0 6.51058 0.4125 6.92308 0.923077 6.92308H5.07692V11.0769C5.07692 11.5875 5.48942 12 6 12C6.51058 12 6.92308 11.5875 6.92308 11.0769V6.92308H11.0769C11.5875 6.92308 12 6.51058 12 6C12 5.48942 11.5875 5.07692 11.0769 5.07692H6.92308V0.923077Z" />
              </svg>
            }
          ></ProductCardActionButton>

          {/* Buy Now */}
          <ProductCardActionButton
            tooltip_text="Buy Now"
            on_click_handler={() => console.log("Buy Now " + id)}
            bg_color="purple-50"
            hover_bg_color="purple-200"
            tooltip_text_color="purple-400"
            tooltip_arrow_position="bottom"
            icon_color="purple-900"
            icon_hover_color="purple-700"
            icon={
              <svg viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[0.875rem] h-3">
                <path
                  d="M0 0.5625C0 0.250781 0.262294 0 0.588322 0H1.70368C2.24298 0 2.72099 0.3 2.94406 0.75H13.0191C13.6638 0.75 14.1344 1.33594 13.9653 1.93125L12.9603 5.50078C12.7519 6.23672 12.0533 6.75 11.2566 6.75H4.18444L4.31682 7.41797C4.37074 7.68281 4.61343 7.875 4.89533 7.875H11.9626C12.2886 7.875 12.5509 8.12578 12.5509 8.4375C12.5509 8.74922 12.2886 9 11.9626 9H4.89533C4.04717 9 3.31912 8.42344 3.16223 7.62891L1.89734 1.27734C1.88018 1.18828 1.79929 1.125 1.70368 1.125H0.588322C0.262294 1.125 0 0.874219 0 0.5625ZM3.13772 10.875C3.13772 10.7273 3.16815 10.581 3.22729 10.4445C3.28642 10.308 3.37309 10.184 3.48235 10.0795C3.59161 9.97504 3.72132 9.89217 3.86408 9.83564C4.00684 9.7791 4.15984 9.75 4.31436 9.75C4.46888 9.75 4.62189 9.7791 4.76465 9.83564C4.9074 9.89217 5.03712 9.97504 5.14638 10.0795C5.25564 10.184 5.34231 10.308 5.40144 10.4445C5.46057 10.581 5.49101 10.7273 5.49101 10.875C5.49101 11.0227 5.46057 11.169 5.40144 11.3055C5.34231 11.442 5.25564 11.566 5.14638 11.6705C5.03712 11.775 4.9074 11.8578 4.76465 11.9144C4.62189 11.9709 4.46888 12 4.31436 12C4.15984 12 4.00684 11.9709 3.86408 11.9144C3.72132 11.8578 3.59161 11.775 3.48235 11.6705C3.37309 11.566 3.28642 11.442 3.22729 11.3055C3.16815 11.169 3.13772 11.0227 3.13772 10.875ZM11.3742 9.75C11.6863 9.75 11.9856 9.86853 12.2062 10.0795C12.4269 10.2905 12.5509 10.5766 12.5509 10.875C12.5509 11.1734 12.4269 11.4595 12.2062 11.6705C11.9856 11.8815 11.6863 12 11.3742 12C11.0622 12 10.7629 11.8815 10.5422 11.6705C10.3216 11.4595 10.1976 11.1734 10.1976 10.875C10.1976 10.5766 10.3216 10.2905 10.5422 10.0795C10.7629 9.86853 11.0622 9.75 11.3742 9.75Z"
                  fill="#12042F"
                />
              </svg>
            }
          ></ProductCardActionButton>

          {/* View Details */}
          <ProductCardActionButton
            tooltip_text="View Details"
            on_click_handler={() => console.log("View Details " + id)}
            bg_color="neutral-50"
            hover_bg_color="neutral-200"
            tooltip_text_color="neutral-400"
            tooltip_arrow_position="bottom"
            icon_color="neutral-900"
            icon_hover_color="neutral-700"
            icon={
              <LeftRightIconSwap direction="right">
                <svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-3">
                  <path
                    d="M7.3833 5.29402C7.79529 5.6845 7.79529 6.31863 7.3833 6.7091L2.10975 11.7071C1.69775 12.0976 1.02867 12.0976 0.616675 11.7071C0.204679 11.3167 0.204679 10.6825 0.616675 10.2921L5.14533 6L0.619971 1.70793C0.207975 1.31745 0.207975 0.683327 0.619971 0.292854C1.03197 -0.0976181 1.70105 -0.0976181 2.11304 0.292854L7.38659 5.2909L7.3833 5.29402Z"
                    fill="#372F46"
                  />
                </svg>
              </LeftRightIconSwap>
            }
          ></ProductCardActionButton>
        </div>
      </div>
    </div>
  );
};

export { ProductImage, Tags, ProductCardActionButton };
export default ProductCard;
