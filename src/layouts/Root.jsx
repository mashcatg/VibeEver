import { Outlet, useLocation } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";
import GridOverlay from "../components/ui/GridOverlay";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <GridOverlay />}

      <div className="relative max-w-primary w-primary mx-auto z-10">
        <Nav />
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Root;
