import { ExpandedIconButton, CircularButton } from "../../components/ui/Button";
import GridOverlay from "../../components/ui/GridOverlay";
import Input from "../../components/ui/Input";
import LeftRightIconSwap from "../../components/ui/LeftRightIconSwap";

const ComponentsPage = () => {
  return (
    <div className="max-w-primary w-primary mx-auto">
      <GridOverlay />
      <br />
      <main className="relative z-10">
        <ExpandedIconButton
          text="Send Message"
          textColor="neutral-subtle"
          icon={
            <svg className="w-[1.375rem] h-4" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.46875 0C1.38184 0 0.5 0.895833 0.5 2C0.5 2.62917 0.791211 3.22083 1.2875 3.6L10.2125 10.4C10.6801 10.7542 11.3199 10.7542 11.7875 10.4L20.7125 3.6C21.2088 3.22083 21.5 2.62917 21.5 2C21.5 0.895833 20.6182 0 19.5312 0H2.46875ZM0.5 4.66667V13.3333C0.5 14.8042 1.67715 16 3.125 16H18.875C20.3229 16 21.5 14.8042 21.5 13.3333V4.66667L12.575 11.4667C11.6398 12.1792 10.3602 12.1792 9.425 11.4667L0.5 4.66667Z" />
            </svg>
          }
          bgColor="primary"
          className="w-full sm:w-fit"
          circleBtnClassName="border border-transparent hover:border-white"
        ></ExpandedIconButton>

        <br />

        <div className="flex gap-5">
          <CircularButton
            size="3.375rem"
            indicator={2}
            bg_color="neutral-default"
            hover_bg_color="primary"
            text_color="text-body"
            text_hover_color="white"
            onClick={() => console.log("Clicked")}
          >
            <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4">
              <path
                d="M0.5 0.75C0.5 0.334375 0.85597 0 1.29844 0H2.81214C3.54404 0 4.19277 0.4 4.49551 1H18.1688C19.0437 1 19.6825 1.78125 19.4529 2.575L18.0889 7.33437C17.8061 8.31563 16.858 9 15.7768 9H6.17889L6.35854 9.89062C6.43173 10.2437 6.76108 10.5 7.14366 10.5H16.7349C17.1774 10.5 17.5333 10.8344 17.5333 11.25C17.5333 11.6656 17.1774 12 16.7349 12H7.14366C5.99258 12 5.00452 11.2312 4.7916 10.1719L3.07496 1.70312C3.05167 1.58438 2.94189 1.5 2.81214 1.5H1.29844C0.85597 1.5 0.5 1.16562 0.5 0.75ZM4.75833 14.5C4.75833 14.303 4.79964 14.108 4.87989 13.926C4.96014 13.744 5.07776 13.5786 5.22605 13.4393C5.37433 13.3001 5.55037 13.1896 5.74411 13.1142C5.93785 13.0388 6.1455 13 6.35521 13C6.56491 13 6.77256 13.0388 6.96631 13.1142C7.16005 13.1896 7.33609 13.3001 7.48437 13.4393C7.63265 13.5786 7.75028 13.744 7.83053 13.926C7.91078 14.108 7.95208 14.303 7.95208 14.5C7.95208 14.697 7.91078 14.892 7.83053 15.074C7.75028 15.256 7.63265 15.4214 7.48437 15.5607C7.33609 15.6999 7.16005 15.8104 6.96631 15.8858C6.77256 15.9612 6.56491 16 6.35521 16C6.1455 16 5.93785 15.9612 5.74411 15.8858C5.55037 15.8104 5.37433 15.6999 5.22605 15.5607C5.07776 15.4214 4.96014 15.256 4.87989 15.074C4.79964 14.892 4.75833 14.697 4.75833 14.5ZM15.9365 13C16.36 13 16.7661 13.158 17.0656 13.4393C17.3651 13.7206 17.5333 14.1022 17.5333 14.5C17.5333 14.8978 17.3651 15.2794 17.0656 15.5607C16.7661 15.842 16.36 16 15.9365 16C15.5129 16 15.1068 15.842 14.8073 15.5607C14.5078 15.2794 14.3396 14.8978 14.3396 14.5C14.3396 14.1022 14.5078 13.7206 14.8073 13.4393C15.1068 13.158 15.5129 13 15.9365 13Z"
                fill="#372F46"
              />
            </svg>
          </CircularButton>

          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className="left-right-icon-swap-container border-2 border-neutral-default"
          >
            <LeftRightIconSwap direction="left">
              <svg className="w-2 h-3" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.308904 5.29402C-0.103093 5.6845 -0.103093 6.31863 0.308904 6.7091L5.58245 11.7071C5.99445 12.0976 6.66353 12.0976 7.07552 11.7071C7.48752 11.3167 7.48752 10.6825 7.07552 10.2921L2.54687 6L7.07223 1.70793C7.48422 1.31745 7.48422 0.683327 7.07223 0.292854C6.66023 -0.0976181 5.99115 -0.0976181 5.57916 0.292854L0.305607 5.2909L0.308904 5.29402Z" />
              </svg>
            </LeftRightIconSwap>
          </CircularButton>

          <CircularButton
            size="4rem"
            bg_color="white"
            hover_bg_color="neutral-default"
            text_color="black"
            text_hover_color="black"
            className="left-right-icon-swap-container border-2 border-neutral-default"
          >
            <LeftRightIconSwap direction="right">
              <svg className="w-2 h-3" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.07562 5.29402C7.48761 5.6845 7.48761 6.31863 7.07562 6.7091L1.80207 11.7071C1.39007 12.0976 0.720993 12.0976 0.308997 11.7071C-0.102999 11.3167 -0.102999 10.6825 0.308997 10.2921L4.83766 6L0.312293 1.70793C-0.0997031 1.31745 -0.0997031 0.683327 0.312293 0.292854C0.724289 -0.0976181 1.39337 -0.0976181 1.80537 0.292854L7.07891 5.2909L7.07562 5.29402Z" />
              </svg>
            </LeftRightIconSwap>
          </CircularButton>
        </div>

        <br />

        <Input name="contact_email" id="contact_email" type="email" label="Email address" placeholder="inquiry@VibeEver.com" is_required />

        <br />

        <Input name="contact_message" id="contact_message" type="textarea" label="Type Message" placeholder="Write your message here..." is_required />
      </main>

      <br />
    </div>
  );
};

export default ComponentsPage;
