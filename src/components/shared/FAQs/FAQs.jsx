import SectionHead from "../../ui/SectionHead";
import { ExpandedIconButton } from "../../ui/Button";
import { useState } from "react";
import { motion } from "framer-motion";

const FaqCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(!isOpen)} className="rounded-20 p-8 bg-neutral-subtle">
      {/* question */}
      <div className="flex justify-between items-center gap-4">
        <h4 className="text-2xl text-text-body text-left">{question}</h4>

        {/* plus - minus icon */}
        <div className="relative flex-shrink-0 w-5 h-5">
          <motion.span
            className="absolute inset-0 w-full h-1 bg-text-body rounded-full"
            style={{ top: "calc(50% - 0.125rem)" }}
            animate={{ rotate: isOpen ? 0 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute inset-0 w-1 h-full bg-text-body rounded-full"
            style={{ left: "calc(50% - 0.125rem)" }}
            animate={{ opacity: isOpen ? 0 : 1, rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Answer */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[625rem] opacity-100 mt-3.5" : "max-h-0 opacity-0 overflow-hidden mt-0"}`}>
        <h6 className="text-lg leading-body text-neutral-subtitle text-left">{answer}</h6>
      </div>
    </button>
  );
};

const FAQs = ({ faqs }) => {
  return (
    <div className="mb-20">
      {/* section header */}
      <SectionHead
        title={
          <>
            FREQUENTLY <br /> ASKED QUESTIONS
          </>
        }
        circle_btn_text="View All"
        stats={[
          {
            count: 1250,
            text: "QUESTIONS ANSWERED",
          },
        ]}
      ></SectionHead>

      <div className="flex flex-col md:flex-row gap-10">
        {/* CEO Info */}
        <div className="min-w-[31.25%] h-fit p-10 rounded-20 border border-neutral-default">
          <div className="flex gap-2.5 items-center">
            {/* profile image */}
            <div className="size-24 bg-[#D9D9D9] rounded-full overflow-hidden">{/* <img src="" alt="profile" className="w-full h-full object-cover" /> */}</div>

            {/* name and designation */}
            <div className="flex flex-col">
              <h6 className="text-xl leading-body font-bold text-text-body">Anisur Rahman</h6>
              <p className="text-neutral-subtitle font-semibold">Founder & CEO</p>
            </div>
          </div>

          {/* quote */}
          <p className="my-5 text-xl leading-body md:max-w-80">“Something that represent to visit your profile to discuss about you.”</p>

          {/* linkedIn */}
          <ExpandedIconButton
            text="CONNECT ON LINKEDIN"
            icon={
              <svg viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.1875rem] h-[1.0625rem]">
                <path
                  d="M2.96 4.68C2.36 4.68 1.86667 4.50667 1.48 4.16C1.10667 3.8 0.92 3.36 0.92 2.84C0.92 2.30667 1.10667 1.86667 1.48 1.52C1.86667 1.16 2.36 0.979999 2.96 0.979999C3.54667 0.979999 4.02667 1.16 4.4 1.52C4.78667 1.86667 4.98 2.30667 4.98 2.84C4.98 3.36 4.78667 3.8 4.4 4.16C4.02667 4.50667 3.54667 4.68 2.96 4.68ZM4.66 5.84V17H1.24V5.84H4.66ZM13.9384 5.72C15.2451 5.72 16.2851 6.14667 17.0584 7C17.8451 7.84 18.2384 9 18.2384 10.48V17H14.8384V10.94C14.8384 10.1933 14.6451 9.61333 14.2584 9.2C13.8718 8.78667 13.3518 8.58 12.6984 8.58C12.0451 8.58 11.5251 8.78667 11.1384 9.2C10.7518 9.61333 10.5584 10.1933 10.5584 10.94V17H7.13844V5.84H10.5584V7.32C10.9051 6.82667 11.3718 6.44 11.9584 6.16C12.5451 5.86667 13.2051 5.72 13.9384 5.72Z"
                  fill="white"
                />
              </svg>
            }
            size="2.375rem"
            bgColor="neutral-subtle"
            buttonBgColor="social-linkedin"
            buttonHoverBgColor="black"
            buttonTextColor="white"
            buttonTextHoverColor="white"
            onClick={() => window.open("https://www.linkedin.com/in/anisurrahman/", "_blank")}
          ></ExpandedIconButton>
        </div>

        {/* FAQs */}
        <div className="md:grow flex flex-col gap-5">
          {faqs.map((faq, index) => (
            <FaqCard key={index} question={faq.question} answer={faq.answer}></FaqCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
