import { CircularButton, ExpandedIconButton } from "../../components/ui/Button";
import VerticalTextSwap from "../../components/ui/VerticalTextSwap";
import { useState } from "react";

const DecorativeElements = () => {
  return (
    <>
      <div
        className="size-40 bg-transparent rounded-5xl absolute right-0 top-[4.5625rem] z-[1] pointer-events-none"
        style={{
          boxShadow: "0.8125rem -0.8125rem #fff",
          borderTopLeftRadius: "0.9375rem",
          borderBottomRightRadius: "0.9375rem",
        }}
      ></div>

      <div
        className="bg-transparent rounded-5xl absolute z-[1] top-0 translate-x-[-50%] left-[49.4%] sm:left-[49.99%] pointer-events-none"
        style={{
          boxShadow: "0.8125rem -0.8125rem #fff",
          width: "2.5rem",
          height: "2.5rem",
          borderTopLeftRadius: "0.9375rem",
          borderBottomRightRadius: "0.9375rem",
          clipPath: "polygon(0rem -0.4375rem, 0rem 0rem, 0rem 0rem, 100% 0rem, 250% 100%)",
        }}
      ></div>

      <div
        className="bg-transparent rounded-5xl absolute z-[1] top-[2.1rem] sm:top-[2.0625rem] rotate-180 translate-x-[-50%] left-[67.7%] sm:left-[60.5%] md:left-[55.6%] pointer-events-none"
        style={{
          boxShadow: "0.8125rem -0.8125rem #5d17ea",
          width: "2.5rem",
          height: "2.5rem",
          borderTopLeftRadius: "0.9375rem",
          borderBottomRightRadius: "0.9375rem",
          clipPath: "polygon(0rem -0.4375rem, 0rem 0rem, 0rem 0rem, 100% 0rem, 250% 100%)",
        }}
      ></div>
    </>
  );
};

const SectionHeadHeader = ({ title, description, circle_btn_text, circuler_btn_handler, submit_handler }) => {
  const [is_search_focused, set_is_search_focused] = useState(false);
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="grow">
        <h2 className="text-6xl sm:text-[5.75rem] font-bold leading-16 sm:leading-[5.175rem] tracking-[-0.125rem] uppercase pt-20 md:pt-0">{title}</h2>

        {/* Email input with floating label animation */}
        {submit_handler && (
          <form
            className="relative mt-10 md:mt-6 py-2 pr-2 pl-7 bg-neutral-subtle rounded-full flex justify-between items-center md:max-w-lg border-2 border-neutral-border"
            onFocus={() => set_is_search_focused(true)}
            onBlur={() => set_is_search_focused(false)}
            onClick={() => {
              set_is_search_focused(true);
              document.getElementById("subscribe_email").focus();
            }}
            onSubmit={submit_handler}
          >
            {/* Floating label that animates based on focus state */}
            <p
              className={`text-xl text-neutral-caption absolute left-7 px-2 transform transition-all duration-400 ease-in-out ${
                is_search_focused ? "-top-1 translate-y-[-50%] ml-4" : "ml-0 top-1/2 translate-y-[-50%]"
              } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[43.6%] before:bg-neutral-subtle`}
            >
              <span className="relative">Email address</span>
            </p>

            <input
              type="email"
              id="subscribe_email"
              name="subscribe_email"
              className={`text-xl text-neutral-caption outline-0 bg-transparent w-full transition-opacity duration-400 ease-in-out ${
                is_search_focused ? "opacity-100" : "opacity-0"
              }`}
              placeholder="inquiry@VibeEver.com"
            />

            {/* Submit button that changes appearance based on input focus state */}
            <CircularButton
              size="4rem"
              hover_bg_color="neutral-default"
              text_color="text-body"
              text_hover_color="neutral-caption"
              className="border-2 border-neutral-default transition-colors duration-300 active:scale-95"
            >
              <svg viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.375rem] h-4">
                <path
                  d="M2.46875 0C1.38184 0 0.5 0.895833 0.5 2C0.5 2.62917 0.791211 3.22083 1.2875 3.6L10.2125 10.4C10.6801 10.7542 11.3199 10.7542 11.7875 10.4L20.7125 3.6C21.2088 3.22083 21.5 2.62917 21.5 2C21.5 0.895833 20.6182 0 19.5312 0H2.46875ZM0.5 4.66667V13.3333C0.5 14.8042 1.67715 16 3.125 16H18.875C20.3229 16 21.5 14.8042 21.5 13.3333V4.66667L12.575 11.4667C11.6398 12.1792 10.3602 12.1792 9.425 11.4667L0.5 4.66667Z"
                  fill="#372F46"
                />
              </svg>
            </CircularButton>
          </form>
        )}
      </div>

      {/* Right side with description and CTA button */}
      <div className="relative pt-10 sm:pt-[5.125rem] flex flex-col sm:flex-row gap-14">
        {description && <h4 className="-tracking-150 max-w-[21.9375rem]">{description}</h4>}

        {/* Call-to-action circular button with text swap animation */}
        <CircularButton
          size="10.375rem"
          bg_color="white"
          hover_bg_color="black"
          text_color="text-body"
          text_hover_color="white"
          onClick={circuler_btn_handler}
          className="transition-colors duration-300 mx-auto"
        >
          <VerticalTextSwap>
            <p className="text-headline leading-headline font-bold group-hover:text-white uppercase">{circle_btn_text}</p>
          </VerticalTextSwap>
        </CircularButton>
      </div>
    </div>
  );
};

const StatsWithFilter = ({ stats, filter_handler }) => {
  return (
    <div className="mt-10 pt-10 md:pt-6 border-t border-t-neutral-default flex flex-col md:flex-row items-center justify-between gap-5">
      {/* stats */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-6 sm:gap-8 md:gap-14">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <h3 className="font-semibold text-[3.375rem] -tracking-300">{stat.count}+</h3>
            <h4 className="text-2xl leading-6 -tracking-150 uppercase font-medium">
              {stat?.text?.split(" ")?.map((word, index) => (
                <span key={index}>
                  {word}
                  {index < stat?.text?.split(" ")?.length - 1 && <br />} {/* Add <br /> only if it's not the last word */}
                </span>
              ))}
            </h4>
          </div>
        ))}
      </div>

      {/* filter */}
      {filter_handler && (
        <ExpandedIconButton
          text="filter"
          icon={
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.57004 8.66667C6.28319 9.6305 5.39034 10.3333 4.33333 10.3333C3.27633 10.3333 2.38348 9.6305 2.09663 8.66667H0.66713C0.298684 8.66667 0 8.37076 0 8C0 7.63181 0.298313 7.33333 0.66713 7.33333H2.09663C2.38348 6.3695 3.27633 5.66667 4.33333 5.66667C5.39034 5.66667 6.28319 6.3695 6.57004 7.33333H15.3329C15.7013 7.33333 16 7.62924 16 8C16 8.36819 15.7017 8.66667 15.3329 8.66667H6.57004ZM9.42996 13C9.71681 12.0362 10.6097 11.3333 11.6667 11.3333C12.7237 11.3333 13.6165 12.0362 13.9034 13H15.3329C15.7013 13 16 13.2959 16 13.6667C16 14.0349 15.7017 14.3333 15.3329 14.3333H13.9034C13.6165 15.2972 12.7237 16 11.6667 16C10.6097 16 9.71681 15.2972 9.42996 14.3333H0.66713C0.298684 14.3333 0 14.0374 0 13.6667C0 13.2985 0.298313 13 0.66713 13H9.42996ZM9.42996 1.66667C9.71681 0.702837 10.6097 0 11.6667 0C12.7237 0 13.6165 0.702837 13.9034 1.66667H15.3329C15.7013 1.66667 16 1.96258 16 2.33333C16 2.70152 15.7017 3 15.3329 3H13.9034C13.6165 3.96383 12.7237 4.66667 11.6667 4.66667C10.6097 4.66667 9.71681 3.96383 9.42996 3H0.66713C0.298684 3 0 2.70409 0 2.33333C0 1.96514 0.298313 1.66667 0.66713 1.66667H9.42996ZM11.6667 3.33333C12.219 3.33333 12.6667 2.88562 12.6667 2.33333C12.6667 1.78105 12.219 1.33333 11.6667 1.33333C11.1144 1.33333 10.6667 1.78105 10.6667 2.33333C10.6667 2.88562 11.1144 3.33333 11.6667 3.33333ZM11.6667 14.6667C12.219 14.6667 12.6667 14.219 12.6667 13.6667C12.6667 13.1144 12.219 12.6667 11.6667 12.6667C11.1144 12.6667 10.6667 13.1144 10.6667 13.6667C10.6667 14.219 11.1144 14.6667 11.6667 14.6667ZM4.33333 7C3.78105 7 3.33333 7.44772 3.33333 8C3.33333 8.55229 3.78105 9 4.33333 9C4.88562 9 5.33333 8.55229 5.33333 8C5.33333 7.44772 4.88562 7 4.33333 7Z"
                fill="#372F46"
              />
            </svg>
          }
          size="3rem"
          buttonBgColor="neutral-subtle"
          buttonHoverBgColor="neutral-border"
          buttonTextColor="text-body"
          buttonTextHoverColor="text-body"
          onClick={filter_handler}
        ></ExpandedIconButton>
      )}
    </div>
  );
};

const Card = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="pt-10 px-10 pb-14 rounded-20 bg-white text-text-body flex flex-col sm:flex-row items-start gap-5 sm:gap-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CircularButton
        size="4rem"
        bg_color=""
        hover_bg_color="neutral-default"
        text_color="text-body"
        text_hover_color="text-body"
        className="border-2 border-neutral-default transition-colors duration-300"
        isGroupHover={isHovered}
      >
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.31366 0.65646L12.3137 0.656459C12.8659 0.65646 13.3137 1.10417 13.3137 1.65646L13.3137 10.6565C13.3137 11.2087 12.8659 11.6565 12.3137 11.6565C11.7614 11.6565 11.3137 11.2087 11.3137 10.6565L11.3137 4.07067L1.70706 13.6773L0.292847 12.2631L9.89945 2.65646L3.31366 2.65646C2.76138 2.65646 2.31366 2.20874 2.31366 1.65646C2.31366 1.10418 2.76138 0.65646 3.31366 0.65646Z"
            fill="#372F46"
          />
        </svg>
      </CircularButton>

      <div className="flex flex-col gap-5">
        <h4 className="font-bold -tracking-125 py-3">{title}</h4>

        <p className="text-2xl text-neutral-subtitle font-medium leading-9">{description}</p>
      </div>
    </div>
  );
};

const SectionHead = ({ title, description, circle_btn_text, circuler_btn_handler, submit_handler, filter_handler, stats, cards, extra_section }) => {
  return (
    <section className="relative my-10">
      {/* Decorative UI elements - these create abstract shapes for visual interest */}
      <DecorativeElements></DecorativeElements>

      {/* content */}
      <div
        className="p-10 bg-primary text-white rounded-5xl relative"
        style={{
          clipPath: "polygon(0 0, 50% 0, calc(50% + 4.5313rem) 4.5313rem, 0 4.5313rem, 100% 4.5313rem, 100% 100%, 0 100%)",
        }}
      >
        {/* Head */}
        <SectionHeadHeader
          title={title}
          description={description}
          circle_btn_text={circle_btn_text}
          circuler_btn_handler={circuler_btn_handler}
          submit_handler={submit_handler}
        ></SectionHeadHeader>

        {/* Stats with filter */}
        {stats && <StatsWithFilter stats={stats} filter_handler={filter_handler}></StatsWithFilter>}

        {/* Cards section */}
        {cards && (
          <div className="mt-10 md:mt-6 pt-12 border-t border-t-neutral-default grid grid-cols-1 md:grid-cols-2 gap-10">
            {cards.map((card, i) => (
              <Card key={i} title={card.title} description={card.description}></Card>
            ))}
          </div>
        )}

        {/* Extra section for additional content */}
        {extra_section && <>{extra_section}</>}
      </div>
    </section>
  );
};

export { SectionHeadHeader, DecorativeElements, StatsWithFilter, Card };
export default SectionHead;
