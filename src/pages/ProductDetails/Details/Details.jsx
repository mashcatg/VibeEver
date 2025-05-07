import { useState } from "react";
import VerticalTextSwap from "../../../components/ui/VerticalTextSwap";
import sliderImage from "../../../assets/images/slider-image.jpg";
import versionIcon from "../../../assets/icons/version.svg";
import calenderIcon from "../../../assets/icons/calender.svg";
import tagIcon from "../../../assets/icons/tag.svg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import required Swiper modules
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const ProductImageSlider = () => {
  // Store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Sample product images - in a real project, these would come from props or an API
  const productImages = [sliderImage, sliderImage, sliderImage, sliderImage, sliderImage];

  return (
    <div className="product-slider-container">
      {/* Main image slider */}
      <div className="main-slider-container mb-4">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Navigation, Thumbs]}
          className="main-product-slider sm:h-[26rem]"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="product-slide rounded-2xl overflow-hidden">
                <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail slider */}
      <div className="thumbnail-slider-container overflow-hidden rounded-2xl">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail-slider sm:h-[6.25rem]"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="thumbnail-slide cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-neutral-border transition-all duration-300">
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full max-h-[5.75rem] object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom stylesheet for the slider */}
      <style jsx="true">{`
        .main-product-slider {
          border-radius: 1rem;
          overflow: hidden;
        }
        .main-product-slider .swiper-slide {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thumbnail-slider .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .thumbnail-slider .swiper-slide-thumb-active {
          opacity: 1;
          border: 0.125rem solid var(--color-primary);
          border-radius: 0.75rem;
        }
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="flex items-center gap-3">
      <img src={icon} alt="Version Icon" className="w-full max-w-9" />

      <div>
        <span className="text-neutral-caption text-caption leading-caption font-medium uppercase">{title}</span>
        <h5 className="font-semibold">{value}</h5>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, text, className }) => {
  return (
    <button
      className={`vertical-text-swap-container relative flex items-center gap-3 py-3 px-5 rounded-full text-caption leading-caption font-semibold uppercase before:content-[''] before:absolute before:top-0 before:left-1/2 hover:before:left-0 before:w-0 hover:before:w-full before:h-full before:rounded-full before:transition-all before:ease-in-out ${className}`}
    >
      {/* Icon for the button */}
      {icon}

      {/* Text for the button */}
      <VerticalTextSwap>{text}</VerticalTextSwap>
    </button>
  );
};

const PrimaryInfo = () => {
  return (
    <div>
      {/* category */}
      <div className="w-fit border border-neutral-default rounded-full py-0.5 px-2 text-caption leading-caption text-neutral-caption font-semibold uppercase">
        Website
      </div>

      {/* title */}
      <h5 className="text-headline leading-headline font-bold mt-2 mb-10">Demo Portfolio Website Template</h5>

      {/* price */}
      <div>
        <p className="text-footnote leading-footnote font-medium tracking-[4%]">PRICE:</p>

        <h3 className="text-primary font-bold">$12.80</h3>
      </div>

      <div className="pt-10 space-y-8">
        <div className="grid grid-cols-2">
          <StatCard icon={versionIcon} title="Version" value="V12.3.001" />
          <StatCard icon={calenderIcon} title="Released" value="12 March, 2024" />
        </div>

        <StatCard icon={tagIcon} title="Tags" value="Wordpress, Elementor, Portfolio" />
      </div>

      <div className="py-10 flex gap-5 items-center">
        <ActionButton
          icon={
            <svg className="size-3 relative" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.92308 0.923077C6.92308 0.4125 6.51058 0 6 0C5.48942 0 5.07692 0.4125 5.07692 0.923077V5.07692H0.923077C0.4125 5.07692 0 5.48942 0 6C0 6.51058 0.4125 6.92308 0.923077 6.92308H5.07692V11.0769C5.07692 11.5875 5.48942 12 6 12C6.51058 12 6.92308 11.5875 6.92308 11.0769V6.92308H11.0769C11.5875 6.92308 12 6.51058 12 6C12 5.48942 11.5875 5.07692 11.0769 5.07692H6.92308V0.923077Z"
                className="fill-text-body"
              />
            </svg>
          }
          text="Add to Cart"
          className="bg-neutral-subtle before:bg-neutral-default before:duration-300"
        />

        <ActionButton
          icon={
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 0.5625C0 0.250781 0.262294 0 0.588322 0H1.70368C2.24298 0 2.72099 0.3 2.94406 0.75H13.0191C13.6638 0.75 14.1344 1.33594 13.9653 1.93125L12.9603 5.50078C12.7519 6.23672 12.0533 6.75 11.2566 6.75H4.18444L4.31682 7.41797C4.37074 7.68281 4.61343 7.875 4.89533 7.875H11.9626C12.2886 7.875 12.5509 8.12578 12.5509 8.4375C12.5509 8.74922 12.2886 9 11.9626 9H4.89533C4.04717 9 3.31912 8.42344 3.16223 7.62891L1.89734 1.27734C1.88018 1.18828 1.79929 1.125 1.70368 1.125H0.588322C0.262294 1.125 0 0.874219 0 0.5625ZM3.13772 10.875C3.13772 10.7273 3.16815 10.581 3.22729 10.4445C3.28642 10.308 3.37309 10.184 3.48235 10.0795C3.59161 9.97504 3.72132 9.89217 3.86408 9.83564C4.00684 9.7791 4.15984 9.75 4.31436 9.75C4.46888 9.75 4.62189 9.7791 4.76465 9.83564C4.9074 9.89217 5.03712 9.97504 5.14638 10.0795C5.25564 10.184 5.34231 10.308 5.40144 10.4445C5.46057 10.581 5.49101 10.7273 5.49101 10.875C5.49101 11.0227 5.46057 11.169 5.40144 11.3055C5.34231 11.442 5.25564 11.566 5.14638 11.6705C5.03712 11.775 4.9074 11.8578 4.76465 11.9144C4.62189 11.9709 4.46888 12 4.31436 12C4.15984 12 4.00684 11.9709 3.86408 11.9144C3.72132 11.8578 3.59161 11.775 3.48235 11.6705C3.37309 11.566 3.28642 11.442 3.22729 11.3055C3.16815 11.169 3.13772 11.0227 3.13772 10.875ZM11.3742 9.75C11.6863 9.75 11.9856 9.86853 12.2062 10.0795C12.4269 10.2905 12.5509 10.5766 12.5509 10.875C12.5509 11.1734 12.4269 11.4595 12.2062 11.6705C11.9856 11.8815 11.6863 12 11.3742 12C11.0622 12 10.7629 11.8815 10.5422 11.6705C10.3216 11.4595 10.1976 11.1734 10.1976 10.875C10.1976 10.5766 10.3216 10.2905 10.5422 10.0795C10.7629 9.86853 11.0622 9.75 11.3742 9.75Z"
                fill="#F4F3F7"
              />
            </svg>
          }
          text="Buy Now"
          className="text-white bg-primary before:bg-white before:opacity-100 hover:before:opacity-0 before:duration-400"
        />
      </div>

      <div>
        <h5 className="font-bold text-headline leading-headline mb-2.5">Files Included</h5>
        <ul className="pl-3 flex flex-col gap-2.5 text-xl leading-body list-disc list-inside">
          <li>HTML, CSS, and JS files</li>
          <li>jQuery, PHP</li>
          <li>MySQL Database ...</li>
        </ul>
      </div>

      <div className="pt-10">
        <h5 className="font-bold text-headline leading-headline mb-2.5">Benefits</h5>
        <ul className="pl-3 flex flex-col gap-2.5 text-xl leading-body list-disc list-inside">
          <li>Benefit 1 is here to list</li>
          <li>Benefit 2 is in the list </li>
          <li>Benefit 3 is listed ...</li>
        </ul>
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <div className="sm:py-10 flex flex-col md:flex-row justify-between gap-16">
      <div className="w-full md:max-w-[59%]">
        {/* Product image slider */}
        <ProductImageSlider />

        <div className="mt-10 md:hidden">
          <PrimaryInfo />
        </div>

        <div className="mt-10 md:mt-16">
          <h4 className="font-bold">Overview</h4>

          <p className="text-xl text-neutral-subtitle mt-6">
            TaskFlow Pro is an all-in-one digital productivity platform designed to help individuals and teams streamline tasks, manage projects, and crush
            deadlines without the chaos. Whether you're a freelancer juggling multiple clients or part of a fast-paced team, TaskFlow adapts to your workflow
            with ease.
            <br /> <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, deleniti ex perferendis voluptas veniam voluptatem. Enim possimus animi rem
            quae facere. Magnam quisquam obcaecati rem consequatur vitae, eius explicabo ducimus.
          </p>
        </div>
      </div>

      <div className="hidden md:block w-full md:max-w-[38%]">
        <PrimaryInfo />
      </div>
    </div>
  );
};

export default Details;
