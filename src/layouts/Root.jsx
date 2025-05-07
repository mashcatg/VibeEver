import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";
import Footer from "../components/shared/Footer/Footer";
import GridOverlay from "../components/ui/GridOverlay";
import DefaultToTop from "../utility/DefaultToTop";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      {(pathname === "/" || pathname === "/products") && <GridOverlay />}

      <div className="relative max-w-primary w-primary mx-auto z-10">
        <Nav />
        <Outlet></Outlet>
      </div>
      <Footer />

      <DefaultToTop />
    </>
  );
};

export default Root;
