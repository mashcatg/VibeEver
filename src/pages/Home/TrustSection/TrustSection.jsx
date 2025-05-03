import { FaXTwitter } from "react-icons/fa6";
import trusted_people from "../../../assets/images/trusted_people.png";
import instagram from "../../../assets/icons/instagram.svg";
import facebook from "../../../assets/icons/facebook.svg";
import twitter from "../../../assets/icons/twitter.svg";
import linkedin from "../../../assets/icons/linkedin.svg";
import youtube from "../../../assets/icons/youtube.svg";
import medium from "../../../assets/icons/medium.svg";
import behance from "../../../assets/icons/behance.svg";
import dribbble from "../../../assets/icons/dribbble.svg";

const TrustSection = () => {
  const profile_images = Array(16).fill(trusted_people);

  const social_links = [
    { icon: instagram, link: "https://www.instagram.com/" },
    { icon: facebook, link: "https://www.facebook.com/" },
    { icon: twitter, link: "https://twitter.com/" },
    { icon: linkedin, link: "https://www.linkedin.com/" },
    { icon: youtube, link: "https://www.youtube.com/" },
    { icon: medium, link: "https://medium.com/" },
    { icon: behance, link: "https://www.behance.net/" },
    { icon: dribbble, link: "https://dribbble.com/" },
  ];

  return (
    <section className="relative mt-24 md:mt-[8.5rem] mb-24 md:mb-[8.125rem] border-2 border-neutral-default rounded-2xl">
      <p className="relative -top-8 sm:-top-4 text-xl text-neutral-subtitle w-[90%] md:w-fit mx-auto px-4 md:px-7 bg-white text-center">
        Trusted and loved by over <span className="font-semibold">10,000+ people in 120+ countries</span>
      </p>

      <div className="w-fit mx-auto flex -space-x-4 flex-wrap justify-center items-center pt-3 pb-6 md:py-8 px-4 md:px-0">
        {profile_images.map((image, index) => (
          <img key={index} src={image} alt="trusted_people" className="w-16 h-16 rounded-full border-4 border-white" />
        ))}
      </div>

      <div className="relative -bottom-3 md:-bottom-4 w-fit mx-auto px-5 bg-white flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-8">
        {social_links.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-6 md:max-w-8 rounded-full hover:scale-110 transition-all duration-300 ease-in-out"
          >
            <img src={social.icon} alt="social_icon" className="w-full" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
