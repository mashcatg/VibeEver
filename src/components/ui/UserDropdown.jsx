import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Providers/AuthProvider";

const UserDropdown = ({
    children,
  className = "",
  showFullName = true,
  avatarSize = "3.5rem",
  dropdownPosition = "right-0", // Can be "right-0" or "left-0"
}) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logOut } = useAuth();

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

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleUserDropdown}
      >
{children}      </button>

      {/* User Dropdown */}
      <AnimatePresence>
        {isUserDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute ${dropdownPosition} top-full mt-3 w-56 bg-white border border-neutral-default rounded-2xl shadow-xl z-50 overflow-hidden`}
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
                  className="max-w-10 max-h-10 size-full object-cover rounded-full border border-neutral-border"
                />
                {showFullName && (
                  <div>
                    <p className="font-semibold text-text-body text-sm">{user?.fullName || "User"}</p>
                  </div>
                )}
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

              <Link
                to="/wishlist"
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
                    d="M14.6399 1.41543C12.9094 -0.251611 10.0704 -0.251611 8.34006 1.41543L7.99979 1.7557L7.65952 1.41543C5.92916 -0.251611 3.09022 -0.251611 1.35986 1.41543C-0.453288 3.16562 -0.453288 5.92303 1.35986 7.67322L7.47785 13.6178C7.75642 13.8964 8.23265 13.8964 8.51121 13.6178L14.6292 7.67322C16.4532 5.92303 16.4532 3.16562 14.6399 1.41543ZM13.6065 6.67207L7.99979 12.1138L2.39308 6.67207C1.16834 5.45462 1.16834 3.53671 2.39308 2.32189C3.61783 1.10443 5.5443 1.10443 6.76905 2.32189L7.47785 3.0307C7.75642 3.30199 8.24315 3.30199 8.52172 3.0307L9.22001 2.32189C10.4448 1.10443 12.3712 1.10443 13.596 2.32189C14.8207 3.53671 14.8207 5.45462 13.6065 6.67207Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-medium">My Wishlist</span>
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
  );
};

export default UserDropdown;
