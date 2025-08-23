import { useState, useEffect } from "react";
import { Heart, CalendarClock, ShoppingCart, CircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import SectionHead from "../../components/ui/SectionHead";
import { ExpandedIconButton, CircularButton } from "../../components/ui/Button";
import { LoaderIcon } from "react-hot-toast";
import { motion, useInView, useAnimation } from "framer-motion";
import { useCart } from "../../Providers/cartProvider";
import { useWishlist } from "../../Providers/wishlistProvider";
import { useRef } from "react";

// Animation variants for sections
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Animation wrapper component
const AnimateOnScroll = ({ children, delay = 0, threshold = 0.1 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const ProfileHero = ({ user }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-20 w-24 h-24 bg-blue-400/10 rounded-full blur-lg"></div>

      <div className="relative z-10 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={user?.image || "https://via.placeholder.com/160"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/160?text=Profile";
                  }}
                />
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl leading-12 sm:leading-normal lg:text-5xl font-bold text-text-body mb-3 sm:mb-0">{user?.fullName}</h1>
              <p className="text-xl text-neutral-subtitle mb-4">@{user?.userName}</p>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-default mb-5">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium text-text-body capitalize">{user?.role}</span>
              </div>

              {/* Bio */}
              {user?.bio && <p className="text-lg text-neutral-subtitle max-w-2xl mb-6 leading-relaxed">{user?.bio}</p>}

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 mb-7">
                <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm">
                  <svg className="w-5 h-5 text-neutral-caption" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-neutral-subtitle">{user?.email}</span>
                  {user?.isEmailVerified && (
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>

                {user?.phoneNumber && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm">
                    <svg className="w-5 h-5 text-neutral-caption" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-neutral-subtitle">{user?.phoneNumber}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ExpandedIconButton
                  text="Edit Profile"
                  textColor="white"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  }
                  bgColor="primary"
                  onClick={() => (window.location.href = "/edit-profile")}
                />

                <ExpandedIconButton
                  text="Change Password"
                  textColor="text-body"
                  circleBtnClassName="border border-neutral-default"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  bgColor="white"
                  buttonBgColor="white"
                  buttonHoverBgColor="neutral-default"
                  buttonTextColor="neutral-caption"
                  buttonTextHoverColor="text-body"
                  className="border border-neutral-default"
                  onClick={() => (window.location.href = "/change-password")}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Updated StatCard with animations
const StatCard = ({ icon, label, value, index }) => {
  return (
    <motion.div
      variants={itemVariant}
      whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-neutral-default/50"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-3xl font-bold text-text-body">{value}</h3>
        <div className={`rounded-xl`}>{icon}</div>
      </div>

      <p className="text-sm text-neutral-caption uppercase tracking-wider">{label}</p>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-neutral-subtle h-1 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="h-full bg-primary/30"
        ></motion.div>
      </div>
    </motion.div>
  );
};

// Updated QuickActionCard with animations
const QuickActionCard = ({ icon, title, description, onClick, color = "primary", index }) => {
  // Determine background color class based on the color prop
  const getBgColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500/10";
      case "green":
        return "bg-green-500/10";
      case "orange":
        return "bg-orange-500/10";
      case "purple":
        return "bg-purple-500/10";
      case "primary":
      default:
        return "bg-primary/10";
    }
  };

  return (
    <motion.button
      variants={itemVariant}
      whileTap={{ scale: 0.98 }}
      whileHover={{
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 },
      }}
      onClick={onClick}
      className="w-full text-left p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-default/50 group"
    >
      <div className="flex items-start gap-4">
        <div className={`hidden sm:block p-3 rounded-xl ${getBgColorClass(color)} transition-colors duration-300`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-headline leading-headline font-semibold text-text-body mb-1.5">{title}</h3>
          <p className="text-caption leading-caption text-neutral-subtitle tracking-[0.02em]">{description}</p>
        </div>
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="flex items-center">
          <svg className="w-5 h-5 text-neutral-caption group-hover:text-primary transition-colors duration-300 mt-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
};

const Myprofile = () => {
  const [profileData, setProfileData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  // Get cart and wishlist data from providers
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const avgOrderValue = statsData?.totalTransactions && statsData.totalOrders ? (statsData.totalTransactions / statsData.totalOrders).toFixed(2) : "0.00";

  useEffect(() => {
    const fetchProfileAndStats = async () => {
      setLoading(true);
      try {
        const { token } = JSON.parse(localStorage.getItem("auth"));
        const authHeader = { Authorization: `${token}` };

        // Fetch profile data
        const profileResponse = await axios.get("/profile", {
          headers: authHeader,
        });

        // Fetch stats data from the new endpoint
        const statsResponse = await axios.get("/profile/get-stats", {
          headers: authHeader,
        });

        setProfileData(profileResponse.data);
        setStatsData(statsResponse.data.stats);
      } catch (error) {
        console.log("Failed to load profile or stats data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStats();
  }, [axios]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-subtle">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="w-10 h-10 text-primary animate-spin" />
          <p className="text-neutral-subtitle">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-subtle rounded-4xl overflow-hidden mb-10">
      {/* Profile Hero Section */}
      <ProfileHero user={profileData?.user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <AnimateOnScroll>
          <h2 className="text-2xl font-bold text-text-body mb-6">Account Overview</h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics Cards */}
            <AnimateOnScroll>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    index={0}
                    icon={
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    }
                    label="Total Orders"
                    value={`${statsData?.totalOrders || 0}`}
                  />

                  <StatCard
                    index={1}
                    icon={
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    }
                    label="Total Spent"
                    value={`$${statsData?.totalTransactions?.toFixed(2) || "0.00"}`}
                  />

                  <StatCard
                    index={2}
                    icon={
                      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    }
                    label="Average Order"
                    value={`$${avgOrderValue}`}
                  />

                  <StatCard
                    index={3}
                    icon={
                      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2 2 4-4" />
                      </svg>
                    }
                    label="PRODUCTS PURCHASED"
                    value={`${statsData?.totalProducts || 0}`}
                  />

                  <StatCard
                    index={4}
                    icon={<Heart className="w-6 h-6 text-red-600" strokeWidth={2} style={{ fillOpacity: 0 }} />}
                    label="Wishlist Items"
                    value={`${wishlist?.length || 0}`}
                  />

                  <StatCard
                    index={5}
                    icon={<ShoppingCart className="w-6 h-6 text-yellow-600" strokeWidth={2} style={{ fillOpacity: 0 }} />}
                    label="Cart Items"
                    value={`${cart?.items?.length || 0}`}
                  />
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>

          {/* Right Column */}
          <div>
            {/* Account Status Card */}
            <AnimateOnScroll delay={0.2}>
              <div className="bg-white rounded-2xl p-6 text-text-body shadow-sm border border-neutral-default/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shadow-inner"
                  >
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor" />
                    </svg>
                  </motion.div>
                  <h3 className="text-headline leading-caption font-semibold">Account Status</h3>
                </div>

                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                  <motion.div variants={itemVariant} className="flex items-center justify-between p-3 bg-neutral-subtle/80 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profileData?.user?.isEmailVerified ? "bg-green-400" : "bg-amber-400"}`}></div>
                      <span className="text-neutral-subtitle text-caption leading-caption font-medium">Email Verification</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-caption leading-footnote font-medium ${
                        profileData?.user?.isEmailVerified
                          ? "bg-green-500/10 text-green-700 border border-green-400/30"
                          : "bg-amber-500/10 text-amber-700 border border-amber-400/30"
                      }`}
                    >
                      {profileData?.user?.isEmailVerified ? "Verified" : "Pending"}
                    </span>
                  </motion.div>

                  <motion.div variants={itemVariant} className="flex items-center justify-between p-3 bg-neutral-subtle/80 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-neutral-subtitle text-caption leading-caption font-medium">Member Since</span>
                    </div>
                    <span className="text-caption leading-footnote text-blue-700 font-medium px-3 py-1 bg-blue-400/10 rounded-full border border-blue-400/30">
                      {new Date(profileData?.user?.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-5 pt-4 border-t border-neutral-default/40"
                >
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors duration-300 text-primary text-sm font-medium"
                  >
                    View Account Details
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        <div>
          <AnimateOnScroll delay={0.3}>
            <h2 className="text-2xl font-bold text-text-body mt-12 mb-6">Quick Actions</h2>
          </AnimateOnScroll>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickActionCard
              index={0}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart w-6 h-6 text-primary"
                  aria-hidden="true"
                  style={{ fillOpacity: 0 }}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              }
              title="My Wishlist"
              description="View and manage your saved items"
              onClick={() => (window.location.href = "/wishlist")}
              color="primary"
            />

            <QuickActionCard
              index={1}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar-clock w-6 h-6 text-blue-600"
                  aria-hidden="true"
                  style={{ fillOpacity: 0 }}
                >
                  <path d="M16 14v2.2l1.6 1" />
                  <path d="M16 2v4" />
                  <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
                  <path d="M3 10h5" />
                  <path d="M8 2v4" />
                  <circle cx={16} cy={16} r={6} />
                </svg>
              }
              title="Purchase History"
              description="View all your past orders and downloads"
              onClick={() => (window.location.href = "/dashboard")}
              color="blue"
            />

            <QuickActionCard
              index={2}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart w-6 h-6 text-green-600"
                  aria-hidden="true"
                  style={{ fillOpacity: 0 }}
                >
                  <circle cx={8} cy={21} r={1} />
                  <circle cx={19} cy={21} r={1} />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              }
              title="Browse Products"
              description="Discover new templates and resources"
              onClick={() => (window.location.href = "/products")}
              color="green"
            />

            <QuickActionCard
              index={3}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-question-mark w-6 h-6 text-orange-600"
                  aria-hidden="true"
                  style={{ fillOpacity: 0 }}
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              }
              title="Support Center"
              description="Get help with your account or purchases"
              onClick={() => (window.location.href = "/contact")}
              color="orange"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
