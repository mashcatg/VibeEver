import logo from "../../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import VerticalTextSwap from "../../ui/VerticalTextSwap";
import { CircularButton, ExpandedIconButton } from "../../ui/Button";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineWindow } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../../Providers/AuthProvider";
import { useCart } from "../../../Providers/cartProvider";

const Nav = ({ set_open_cart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const {cart} = useCart()

  console.log(user?.image );

  // console.log(cart.items.length);
  // Check screen size to determine if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (user?.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/dashboard";
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const nav_links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Assets", path: "/assets" },
    { name: "Templates", path: "/templates" },
  ];

  // Animation variants for the mobile sidebar
  const sidebarVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div id="nav" className="flex justify-between items-center py-6 relative">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="VibeEver" className="h-8" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-x-10">
        {nav_links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path} className="text-text-body font-semibold uppercase">
              <VerticalTextSwap>{link.name}</VerticalTextSwap>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <ExpandedIconButton
            text="DASHBOARD"
            icon={
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4">
                <path
                  d="M14.8571 0H1.14286C0.839753 0 0.549062 0.120408 0.334735 0.334735C0.120408 0.549062 0 0.839749 0 1.14285V14.8571C0 15.1602 0.120408 15.4509 0.334735 15.6653C0.549062 15.8796 0.839753 16 1.14286 16H14.8571C15.1602 16 15.4509 15.8796 15.6653 15.6653C15.8796 15.4509 16 15.1602 16 14.8571V1.14285C16 0.839749 15.8796 0.549062 15.6653 0.334735C15.4509 0.120408 15.1602 0 14.8571 0ZM13.7143 2.28571V6.85714H9.14286V2.28571H13.7143ZM6.85714 2.28571V6.85714H2.28571V2.28571H6.85714ZM2.28571 13.7143V9.14283H6.85714V13.7143H2.28571ZM9.14286 13.7143V9.14283H13.7143V13.7143H9.14286Z"
                  fill="#372F46"
                />
              </svg>
            }
            size="3rem"
            buttonBgColor="white"
            buttonHoverBgColor="primary"
            buttonTextColor="text-body"
            buttonTextHoverColor="white"
            onClick={handleLinkClick}
          />
        </div>

        {/* Cart Button */}
        <CircularButton
          size="3.375rem"
          indicator={cart?.items?.length}
          bg_color="neutral-default"
          hover_bg_color="primary"
          text_color="text-body"
          text_hover_color="white"
          onClick={() => set_open_cart(true)}
        >
          <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4">
            <path
              d="M0.5 0.75C0.5 0.334375 0.85597 0 1.29844 0H2.81214C3.54404 0 4.19277 0.4 4.49551 1H18.1688C19.0437 1 19.6825 1.78125 19.4529 2.575L18.0889 7.33437C17.8061 8.31563 16.858 9 15.7768 9H6.17889L6.35854 9.89062C6.43173 10.2437 6.76108 10.5 7.14366 10.5H16.7349C17.1774 10.5 17.5333 10.8344 17.5333 11.25C17.5333 11.6656 17.1774 12 16.7349 12H7.14366C5.99258 12 5.00452 11.2312 4.7916 10.1719L3.07496 1.70312C3.05167 1.58438 2.94189 1.5 2.81214 1.5H1.29844C0.85597 1.5 0.5 1.16562 0.5 0.75ZM4.75833 14.5C4.75833 14.303 4.79964 14.108 4.87989 13.926C4.96014 13.744 5.07776 13.5786 5.22605 13.4393C5.37433 13.3001 5.55037 13.1896 5.74411 13.1142C5.93785 13.0388 6.1455 13 6.35521 13C6.56491 13 6.77256 13.0388 6.96631 13.1142C7.16005 13.1896 7.33609 13.3001 7.48437 13.4393C7.63265 13.5786 7.75028 13.744 7.83053 13.926C7.91078 14.108 7.95208 14.303 7.95208 14.5C7.95208 14.697 7.91078 14.892 7.83053 15.074C7.75028 15.256 7.63265 15.4214 7.48437 15.5607C7.33609 15.6999 7.16005 15.8104 6.96631 15.8858C6.77256 15.9612 6.56491 16 6.35521 16C6.1455 16 5.93785 15.9612 5.74411 15.8858C5.55037 15.8104 5.37433 15.6999 5.22605 15.5607C5.07776 15.4214 4.96014 15.256 4.87989 15.074C4.79964 14.892 4.75833 14.697 4.75833 14.5ZM15.9365 13C16.36 13 16.7661 13.158 17.0656 13.4393C17.3651 13.7206 17.5333 14.1022 17.5333 14.5C17.5333 14.8978 17.3651 15.2794 17.0656 15.5607C16.7661 15.842 16.36 16 15.9365 16C15.5129 16 15.1068 15.842 14.8073 15.5607C14.5078 15.2794 14.3396 14.8978 14.3396 14.5C14.3396 14.1022 14.5078 13.7206 14.8073 13.4393C15.1068 13.158 15.5129 13 15.9365 13Z"
              fill="#372F46"
            />
          </svg>
        </CircularButton>

        {user ? (
          // User Avatar
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleUserDropdown}
              className={`rounded-full border-2 transition-all duration-300 block max-w-[3.5rem] max-h-[3.5rem] focus:outline-none overflow-hidden ${
                isUserDropdownOpen ? "border-primary shadow-lg transform scale-105" : "border-neutral-border hover:border-neutral-caption"
              }`}
            >
              <img src={user?.image || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"} alt="user" className="size-full object-cover" />
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-56 bg-white border border-neutral-default rounded-2xl shadow-xl z-50 overflow-hidden"
                  style={{
                    boxShadow: "0 10px 40px rgba(93, 23, 234, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  {/* Dropdown Header */}
                  <div className="px-5 py-4 bg-neutral-subtle border-b border-neutral-default">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.image || "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
                        alt="user"
                        className="w-10 h-10 rounded-full border border-neutral-border"
                      />
                      <div>
                        <p className="font-semibold text-text-body text-sm">{user?.fullName || "User"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu Items */}
                  <div className="py-2">
                    <Link
                      to="/my-profile"
                      className="group flex items-center gap-3 px-5 py-3 text-sm text-text-body hover:bg-neutral-subtle transition-all duration-200"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4 text-neutral-caption group-hover:text-primary transition-colors duration-200"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 8C9.06 8 10.07 7.57 10.82 6.82C11.57 6.07 12 5.06 12 4C12 2.93 11.57 1.92 10.82 1.17C10.07 0.42 9.06 0 8 0C6.93 0 5.92 0.42 5.17 1.17C4.42 1.92 4 2.93 4 4C4 5.06 4.42 6.07 5.17 6.82C5.92 7.57 6.93 8 8 8ZM5.6 9.5C2.5 9.5 0 11.99 0 15.07C0 15.58 0.42 16 0.93 16H15.07C15.58 16 16 15.58 16 15.07C16 11.99 13.5 9.5 10.4 9.5H5.6Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <div className="border-t border-neutral-default my-2"></div>

                    <button
                      onClick={() => {
                        logOut();
                        setIsUserDropdownOpen(false);
                      }}
                      className="group flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.17 8.81C15.61 8.36 15.61 7.64 15.17 7.19L10.67 2.62C10.23 2.17 9.52 2.17 9.08 2.62C8.64 3.06 8.64 3.79 9.08 4.24L11.66 6.86H4.25C3.63 6.86 3.13 7.37 3.13 8C3.13 8.63 3.63 9.14 4.25 9.14H11.66L9.08 11.76C8.64 12.21 8.64 12.94 9.08 13.38C9.52 13.83 10.23 13.83 10.67 13.38L15.17 8.81ZM4.13 2.29C4.75 2.29 5.25 1.78 5.25 1.14C5.25 0.51 4.75 0 4.13 0H1.88C0.84 0 0 0.84 0 1.88V14.13C0 15.16 0.84 16 1.88 16H4.13C4.75 16 5.25 15.49 5.25 14.86C5.25 14.23 4.75 13.71 4.13 13.71H1.88V2.29H4.13Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // circular button for login
          <CircularButton
            size="3.375rem"
            bg_color="neutral-default"
            hover_bg_color="primary"
            text_color="text-body"
            text_hover_color="white"
            onClick={() => navigate("/sign-in")}
            aria-label="Login"
            className="hidden md:block"
          >
            <BiLogInCircle className="text-xl" />
          </CircularButton>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          <HiMenuAlt3 className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              onClick={toggleMobileMenu}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed right-0 top-0 h-full w-[75%] max-w-[280px] bg-white z-50 p-6 shadow-lg"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button onClick={toggleMobileMenu} aria-label="Close menu">
                  <IoClose className="text-2xl" />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <ul className="flex flex-col gap-y-6">
                {nav_links.map((link, index) => (
                  <li key={index}>
                    <NavLink to={link.path} className="text-text-body font-semibold uppercase block text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user ? (
                  <li className="mt-6 pt-6 border-t border-t-neutral-border">
                    <NavLink to="/dashboard" className="text-text-body font-semibold uppercase block text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  <li className="mt-6 pt-6 border-t border-t-neutral-border">
                    <NavLink to="/sign-in" className="text-text-body font-semibold uppercase block text-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
