import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";

const AuthHeader = ({ title, description }) => {
  return (
    <>
      <Link to="/" className="block max-w-38.5 mb-12">
        <img src={logo} alt="Vibe Ever Logo" className="w-full" />
      </Link>

      <h2 className="font-bold text-primary mb-3 uppercase">{title}</h2>

      <p className="text-neutral-caption text-xl leading-body">{description}</p>
    </>
  );
};

export default AuthHeader;
