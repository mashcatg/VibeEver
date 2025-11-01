import SectionHead from "../../../components/ui/SectionHead";
import Input from "../../../components/ui/Input";
import { ExpandedIconButton } from "../../../components/ui/Button";
import locationIcon from "../../../assets/icons/location.svg";
import emailIcon from "../../../assets/icons/email.svg";
import phoneIcon from "../../../assets/icons/phone.svg";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const ContactInfo = ({ icon, text, label }) => {
  return (
    <div className="flex gap-4 items-center">
      {/* icon */}
      <div className="p-6 rounded-xl bg-neutral-subtle">
        <img src={icon} alt="Location Icon" className="w-full max-w-26" />
      </div>

      {/* text */}
      <div>
        <p className="font-semibold text-black uppercase">{label}</p>
        {label === "Location" ? (
          <p className="text-black/50 break-all">{text}</p>
        ) : (
          <a
            href={(label === "Email" ? "mailto" : "tel") + ":" + text}
            className="text-black/50 break-all hover:text-primary transition-all duration-300 ease-in-out"
          >
            {text}
          </a>
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const axios = useAxios();
  // form submit handler
  const submit_handler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await axios.post("/hello", {
        name: data.contact_name,
        email: data.contact_email,
        message: data.contact_message,
      });
      toast.success(response.data.message || "We'll get back to you soon");
      e.target.reset();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };
  return (
    <div className="pt-10 pb-20">
      <SectionHead
        title={
          <>
            LET'S <br /> TALK
          </>
        }
        circle_btn_text="Contact Now"
        stats={[
          {
            count: 1250,
            text: "Questions Answered",
          },
        ]}
      ></SectionHead>

      <div className="max-w-[69rem] mx-auto md:px-10 flex flex-col md:flex-row gap-16">
        {/* contact form */}
        <form onSubmit={submit_handler} className="w-full md:w-lg flex flex-col gap-5">
          {/* name */}
          <Input name="contact_name" id="contact_name" type="text" label="Your Name" placeholder="Anisur R." is_required />

          {/* email */}
          <Input name="contact_email" id="contact_email" type="email" label="Email address" placeholder="anisurrahman@gmail.com" is_required />

          {/* message */}
          <Input name="contact_message" id="contact_message" type="textarea" label="Type Message" placeholder="Write your message here..." is_required />

          {/* submit button */}
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
        </form>

        {/* contact info */}
        <div className="flex flex-col gap-6">
          {/* location */}
          <ContactInfo icon={locationIcon} label="Location" text="All around the world" />

          {/* email */}
          <ContactInfo icon={emailIcon} label="Email" text="support@vibeever.com" />

          {/* phone */}
          <ContactInfo icon={phoneIcon} label="Phone" text="+8801726911975" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
