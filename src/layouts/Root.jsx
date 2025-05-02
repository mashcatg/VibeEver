import { Outlet } from "react-router-dom";
import Nav from "../components/shared/Nav/Nav";

const Root = () => {
  return (
    <div className="max-w-primary w-primary mx-auto">
      <Nav />
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
