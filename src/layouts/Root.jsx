import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="max-w-primary w-primary mx-auto">
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
