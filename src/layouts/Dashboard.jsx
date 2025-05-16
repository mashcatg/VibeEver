import DefaultToTop from "../utility/DefaultToTop";
import DashboardSidebar from "../components/shared/DashboardSidebar/DashboardSidebar";
import DashboardNav from "../components/shared/DashboardNav/DashboardNav";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [open_mobile_sidebar, set_open_mobile_sidebar] = useState(false);

  return (
    <>
      <div className="w-full flex min-h-screen bg-primary relative">
        {/* Overlay that appears when mobile sidebar is open */}
        <div
          className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 md:hidden ${
            open_mobile_sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => set_open_mobile_sidebar(false)}
        ></div>

        {/* Sidebar component - now receives the mobile toggle state */}
        <DashboardSidebar open_mobile_sidebar={open_mobile_sidebar} set_open_mobile_sidebar={set_open_mobile_sidebar} />

        {/* This empty div maintains layout spacing on desktop */}
        <div className="w-[19.44%] min-h-screen hidden md:block"></div>

        {/* Main content area */}
        <div className="w-full md:w-[81.66%] p-3 pb-0">
          <div className="w-full bg-white rounded-xl rounded-b-none min-h-screen py-8 px-6 md:px-24">
            <div className="max-w-primary w-full mx-auto">
              <DashboardNav open_mobile_sidebar={open_mobile_sidebar} set_open_mobile_sidebar={set_open_mobile_sidebar} />
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>

      <DefaultToTop />
    </>
  );
};

export default Dashboard;
