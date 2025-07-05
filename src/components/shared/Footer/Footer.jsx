import logo from "../../../assets/images/logo-white.svg";
import linkedin from "../../../assets/icons/linkedin-white.svg";
import instagram from "../../../assets/icons/instagram-white.svg";
import facebook from "../../../assets/icons/facebook-white.svg";
import twitter from "../../../assets/icons/twitter-white.svg";
import { Link } from "react-router-dom";

const FooterLink = ({ to, children }) => {
  return (
    <Link to={to} className="text-neutral-50 text-sm hover:text-neutral-200 transition-all duration-300 ease-in-out uppercase">
      {children}
    </Link>
  );
};

const Footer = () => {
  const copyright_text = "© VibeEver. All rights reserved.";
  return (
    <footer className="relative bg-neutral-dark py-5 px-10 text-white rounded-t-20">
      <div className="max-w-primary mx-auto px-4 pb-4 pt-8">
        <div className="max-w-[9.625rem] mx-auto">
          <img src={logo} alt="Vibe Ever Logo" className="w-full" />
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            {/* social links */}
            <div className="flex p-2.5 gap-2.5 items-center">
              <a href="https://www.linkedin.com/company/vibeever/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300 ease-in-out">
                <img src={linkedin} alt="LinkedIn" className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/vibeever_com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-all duration-300 ease-in-out"
              >
                <img src={instagram} alt="Instagram" className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/vibeever" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300 ease-in-out">
                <img src={facebook} alt="Facebook" className="w-4 h-4" />
              </a>
              <a href="https://x.com/vibeever" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300 ease-in-out">
                <img src={twitter} alt="Twitter" className="w-4 h-4" />
              </a>
            </div>

            <FooterLink to="#">About</FooterLink>

            <FooterLink to="#">Contact</FooterLink>
          </div>

          <h6 className="text-neutral-50 text-sm hidden md:block">{copyright_text}</h6>

          <div className="flex flex-col md:flex-row gap-5 items-center">
            <FooterLink to="#">Privacy Policy</FooterLink>
            <FooterLink to="#">Terms of Service</FooterLink>
          </div>

          <h6 className="text-neutral-50 text-sm md:hidden">{copyright_text}</h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
