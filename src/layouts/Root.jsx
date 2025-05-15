import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";
import Footer from "../components/shared/Footer/Footer";
import Cart from "../components/shared/Cart/Cart";
import GridOverlay from "../components/ui/GridOverlay";
import DefaultToTop from "../utility/DefaultToTop";

const Root = () => {
  const [open_cart, set_open_cart] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {(pathname === "/" || pathname === "/products") && <GridOverlay />}

      <div className="relative max-w-primary w-primary mx-auto z-10">
        <Nav set_open_cart={set_open_cart} />
        <Outlet></Outlet>
      </div>
      <Footer />

      <Cart open_cart={open_cart} set_open_cart={set_open_cart} />
      <DefaultToTop />
    </>
  );
};

export default Root;
