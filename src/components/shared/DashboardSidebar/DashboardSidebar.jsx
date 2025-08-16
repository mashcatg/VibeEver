import { IoAddOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import logo from "../../../assets/images/logo-white.svg";
import { Link, NavLink } from "react-router-dom";
import { CiDiscount1, CiMail } from "react-icons/ci";

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className="py-3.5 px-4 text-white font-medium text-caption leading-caption uppercase flex gap-5 items-center transition-all duration-300 ease-in-out rounded-sm"
    >
      <div className="py-0.5">{icon}</div>
      <span>{label}</span>
    </NavLink>
  );
};

const DashboardSidebar = ({ open_mobile_sidebar, set_open_mobile_sidebar }) => {
  const NavItems = [
    {
      to: "/admin-dashboard",
      icon: (
        <svg className="w-4.5 h-4" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs />
          <path
            id="Vector"
            d="M17.99 7.98C17.99 8.54 17.52 8.98 16.99 8.98L15.99 8.98L16.01 13.99C16.01 14.07 16.01 14.16 16 14.24L16 14.75C16 15.44 15.44 16 14.75 16L14.25 16C14.21 16 14.18 16 14.14 15.99C14.1 16 14.06 16 14.01 16L13 16L12.25 16C11.56 16 11 15.44 11 14.75L11 14L11 12C11 11.44 10.55 11 10 11L8 11C7.44 11 7 11.44 7 12L7 14L7 14.75C7 15.44 6.44 16 5.75 16L5.25 16C5.2 16 5.16 16 5.12 15.99C5.08 16 5.04 16 5 16L4 16L3.24 16C2.55 16 2 15.44 2 14.75L2 8.98L0.99 8.98C0.44 8.98 0 8.54 0 7.98C0 7.71 0.11 7.45 0.29 7.26L8.3 0.27C8.69 -0.09 9.3 -0.09 9.69 0.27L17.7 7.26C17.88 7.45 17.99 7.71 17.99 7.98Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      to: "/admin-dashboard/add-product",
      icon: <IoAddOutline/>,
      label: "ADD PRODUCT",
    },
    {
      to: "/admin-dashboard/manage-products",
      icon: (
        <svg className="size-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs />
          <path
            id="Vector"
            d="M9.85 0.48C9.67 0.18 9.34 0 9 0C8.65 0 8.32 0.18 8.14 0.48L5.14 5.48C4.95 5.79 4.95 6.17 5.13 6.49C5.3 6.8 5.64 6.99 6 6.99L12 6.99C12.35 6.99 12.69 6.8 12.86 6.49C13.04 6.17 13.04 5.79 12.85 5.48L9.85 0.48ZM9 9.75L9 14.25C9 14.94 9.55 15.5 10.25 15.5L14.75 15.5C15.44 15.5 16 14.94 16 14.25L16 9.75C16 9.05 15.44 8.5 14.75 8.5L10.25 8.5C9.55 8.5 9 9.05 9 9.75ZM0 14.25L0 9.75C0 9.05 0.55 8.5 1.25 8.5L5.75 8.5C6.44 8.5 7 9.05 7 9.75L7 14.25C7 14.94 6.44 15.5 5.75 15.5L1.25 15.5C0.55 15.5 0 14.94 0 14.25Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "MANAGE PRODUCTS",
    },
    {
      to: "/admin-dashboard/manage-categories",
      icon: <BiCategoryAlt />,
      label: "MANAGE CATEGORIES",
    },
    {
      to: "/admin-dashboard/manage-coupons",
      icon: <CiDiscount1 />,
      label: "CUOPONS",
    },
    {
      to: "/admin-dashboard/orders",
      icon: <BsCart4 />,
      label: "ORDERS",
    },
    // {
    //   to: "/admin-dashboard/messages",
    //   icon: <CiMail/>,
    //   label: "MESSAGES",
    // },
    {
      to: "/admin-dashboard/reports",
      icon: (
        <svg className="size-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            id="Vector"
            d="M14.7 0.29C14.8 0.39 14.87 0.5 14.92 0.61C14.97 0.73 15 0.85 15 0.99L15 1L15 4C15 4.55 14.55 5 14 5C13.44 5 13 4.55 13 4L13 3.41L9.7 6.7C9.33 7.07 8.74 7.1 8.34 6.75L5.5 4.31L2.65 6.75C2.23 7.11 1.59 7.06 1.24 6.64C0.88 6.23 0.93 5.6 1.34 5.24L4.84 2.24C5.22 1.91 5.77 1.91 6.15 2.24L9.01 4.71L11.58 2.14L11 2C10.44 2 10 1.55 10 1C10 0.44 10.44 0 11 0L14 0C14.27 0 14.52 0.11 14.7 0.29L14.7 0.29ZM0 9.5C0 8.67 0.67 8 1.5 8L14.5 8C15.32 8 16 8.67 16 9.5L16 14.5C16 15.32 15.32 16 14.5 16L1.5 16C0.67 16 0 15.32 0 14.5L0 9.5ZM1.5 13L1.5 14.5L3 14.5C3 13.67 2.32 13 1.5 13ZM3 9.5L1.5 9.5L1.5 11C2.32 11 3 10.32 3 9.5ZM14.5 13C13.67 13 13 13.67 13 14.5L14.5 14.5L14.5 13ZM13 9.5C13 10.32 13.67 11 14.5 11L14.5 9.5L13 9.5ZM10 12C10 11.46 9.78 10.96 9.41 10.58C9.03 10.21 8.53 10 8 10C7.46 10 6.96 10.21 6.58 10.58C6.21 10.96 6 11.46 6 12C6 12.53 6.21 13.03 6.58 13.41C6.96 13.78 7.46 14 8 14C8.53 14 9.03 13.78 9.41 13.41C9.78 13.03 10 12.53 10 12Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "REPORTS",
    },
    {
      to: "/admin-dashboard/users",
      icon: (
        <svg className="w-3.5 h-4" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path
            id="Vector"
            d="M7 8C8.06 8 9.07 7.57 9.82 6.82C10.57 6.07 11 5.06 11 4C11 2.93 10.57 1.92 9.82 1.17C9.07 0.42 8.06 0 7 0C5.93 0 4.92 0.42 4.17 1.17C3.42 1.92 3 2.93 3 4C3 5.06 3.42 6.07 4.17 6.82C4.92 7.57 5.93 8 7 8ZM5.57 9.5C2.49 9.5 0 11.99 0 15.07C0 15.58 0.41 16 0.92 16L13.07 16C13.58 16 14 15.58 14 15.07C14 11.99 11.5 9.5 8.42 9.5L5.57 9.5Z"
            fill="#FFFFFF"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
      ),
      label: "USERS",
    },
  ];

  return (
    <>
      {/* Desktop Sidebar - Same as before */}
      <div id="dashboard_sidebar" className="fixed left-0 w-[19.44%] flex-col justify-between min-h-screen hidden md:flex">
        <div>
          <Link to="/" className="block p-6">
            <img src={logo} alt="Vibe Ever Logo" className="max-w-38.5 w-full" />
          </Link>

          <ul className="mt-10 p-3 flex flex-col gap-1">
            {NavItems.map((item, index) => (
              <li key={index}>
                <NavItem to={item.to} icon={item.icon} label={item.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6">
          <button className="px-6 py-3 bg-white rounded-lg w-full text-caption leading-caption uppercase text-primary font-semibold flex items-center justify-center gap-3">
            <span>
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.1704 8.80714C18.6099 8.36071 18.6099 7.63571 18.1704 7.18929L13.6702 2.61786C13.2307 2.17143 12.517 2.17143 12.0775 2.61786C11.638 3.06429 11.638 3.78929 12.0775 4.23571L14.6581 6.85714H7.25033C6.62803 6.85714 6.12527 7.36786 6.12527 8C6.12527 8.63214 6.62803 9.14286 7.25033 9.14286H14.6581L12.0775 11.7643C11.638 12.2107 11.638 12.9357 12.0775 13.3821C12.517 13.8286 13.2307 13.8286 13.6702 13.3821L18.1704 8.81071V8.80714Z"
                  fill="#5D17EA"
                />
              </svg>
            </span>

            <span>LOG OUT</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Similar structure but with transition effects */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 flex flex-col justify-between bg-primary transform transition-transform duration-300 ease-in-out md:hidden ${
          open_mobile_sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <Link to="/" className="block p-2">
            <img src={logo} alt="Vibe Ever Logo" className="max-w-32 w-full" />
          </Link>
          <button className="text-white p-2" onClick={() => set_open_mobile_sidebar(false)}>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="mt-6 p-3 flex flex-col gap-1 flex-1">
          {NavItems.map((item, index) => (
            <li key={index} onClick={() => set_open_mobile_sidebar(false)}>
              <NavItem to={item.to} icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>

        <div className="p-6">
          <button className="px-6 py-3 bg-white rounded-lg w-full text-caption leading-caption uppercase text-primary font-semibold flex items-center justify-center gap-3">
            <span>
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.1704 8.80714C18.6099 8.36071 18.6099 7.63571 18.1704 7.18929L13.6702 2.61786C13.2307 2.17143 12.517 2.17143 12.0775 2.61786C11.638 3.06429 11.638 3.78929 12.0775 4.23571L14.6581 6.85714H7.25033C6.62803 6.85714 6.12527 7.36786 6.12527 8C6.12527 8.63214 6.62803 9.14286 7.25033 9.14286H14.6581L12.0775 11.7643C11.638 12.2107 11.638 12.9357 12.0775 13.3821C12.517 13.8286 13.2307 13.8286 13.6702 13.3821L18.1704 8.81071V8.80714Z"
                  fill="#5D17EA"
                />
              </svg>
            </span>
            <span>LOG OUT</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
