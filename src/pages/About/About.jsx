import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { Heart, Target, Eye, Lightbulb, Users, Award, ArrowRight, Sparkles } from "lucide-react";
import SectionHead from "../../components/ui/SectionHead";
import { ExpandedIconButton } from "../../components/ui/Button";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

// Stats Section
const StatsSection = () => {
  const stats = [
    { count: "10K", text: "Happy Customers" },
    { count: "500", text: "Premium Products" },
    { count: "50", text: "Countries Served" },
    { count: "99", text: "Customer Satisfaction" },
  ];

  return (
    <SectionHead
      title={
        <>
          ABOUT <br />
          US
        </>
      }
      circle_btn_text="OUR STORY"
      circuler_btn_handler={() => {
        document.getElementById("our-story-section").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      stats={stats}
    />
  );
};

// Story Section
const OurStory = () => {
  return (
    <AnimateOnScroll>
      <div id="our-story-section" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-20">
        <div>
          <h2 className="text-4xl font-bold text-text-body mb-6">
            Our <span className="text-primary">Story</span>
          </h2>
          <div className="space-y-4 text-neutral-subtitle leading-relaxed">
            <p>
              Founded in 2020 by a team of passionate designers and developers, VibeEver began as a simple idea: to bridge the gap between creative vision and
              digital reality.
            </p>
            <p>
              What started as a small collection of design templates has evolved into a comprehensive platform offering premium digital assets, from stunning UI
              kits to complete website templates and beyond.
            </p>
            <p>
              Today, we're proud to serve a global community of creators, helping them bring their ideas to life with professional-grade resources and tools.
            </p>
          </div>
        </div>

        <div className="relative">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative ml-4 md:ml-8">
            {[
              { year: 2020, title: "The Beginning", desc: "VibeEver launched with a small collection of UI templates" },
              { year: 2023, title: "Global Recognition", desc: "Won Design Platform of the Year award" },
              { year: 2025, title: "Future Vision", desc: "Expanding into AI-powered design solutions" },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariant} className="mb-8 flex">
                <div className="relative">
                  <div
                    className={`h-14 w-14 rounded-full flex items-center justify-center 
                                    ${index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-600"}`}
                  >
                    <span className="font-bold">{item.year}</span>
                  </div>
                  {index < 2 && (
                    <div
                      className="absolute top-14 left-1/2 w-0.5 h-10 transform -translate-x-1/2 
                                        bg-gradient-to-b from-neutral-300 to-transparent"
                    ></div>
                  )}
                </div>

                <div className="ml-5 pb-2">
                  <h3 className="font-semibold text-lg text-text-body">{item.title}</h3>
                  <p className="text-neutral-subtitle text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-blue-400/5 rounded-full blur-xl -z-10"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-300/5 to-primary/5 rounded-full blur-lg -z-10"></div>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

// Values Section
const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Every decision we make puts our customers first, ensuring exceptional experiences and outcomes.",
      color: "primary",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries, embracing new technologies and design trends to stay ahead.",
      color: "blue",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in everything we create, from design to customer service.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of community and work together to achieve extraordinary results.",
      color: "green",
    },
  ];

  const getColorClass = (color, type) => {
    const colorMap = {
      primary: { bg: "bg-primary/10", text: "text-primary" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-600" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-600" },
      green: { bg: "bg-green-500/10", text: "text-green-600" },
    };
    return colorMap[color][type];
  };

  return (
    <div id="values-section" className="mb-20 bg-neutral-subtle overflow-hidden rounded-4xl">
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-32 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-32 w-32 h-32 bg-blue-400/10 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-md"></div>

        <div className="relative z-10 px-8 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-default mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text-body">Our Values</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-text-body mb-6 leading-snug"
            >
              Crafting Digital
              <span className="text-primary block sm:inline sm:ml-4">Experiences</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-md sm:text-xl text-neutral-subtitle max-w-3xl mx-auto leading-relaxed"
            >
              Our core values guide everything we do as we strive to create premium digital assets that empower creators and businesses worldwide.
            </motion.p>
          </div>
        </div>
      </div>

      <AnimateOnScroll>
        <div className="p-8">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-default/50"
              >
                <div className={`w-12 h-12 ${getColorClass(value.color, "bg")} rounded-xl flex items-center justify-center mb-4`}>
                  <value.icon className={`w-6 h-6 ${getColorClass(value.color, "text")}`} />
                </div>
                <h3 className="text-headline leading-headline font-semibold text-text-body mb-2">{value.title}</h3>
                <p className="text-caption leading-caption text-neutral-subtitle">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimateOnScroll>
    </div>
  );
};

// Mission & Vision Section with SectionHead styling
const MissionVisionSection = () => {
  const missionCards = [
    {
      title: "Our Mission",
      description: "To democratize design with premium digital assets that inspire innovation and drive success.",
    },
    {
      title: "Our Vision",
      description: "To become the most trusted platform for digital design assets where creativity thrives globally.",
    },
  ];

  return (
    <SectionHead
      title={
        <>
          MISSION &<br />
          VISION
        </>
      }
      description="Empowering creators with premium tools to build extraordinary digital experiences."
      circle_btn_text="WHY US"
      circuler_btn_handler={() => {
        document.getElementById("why-different-section").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      cards={missionCards}
    />
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  return (
    <div id="why-different-section" className="my-20">
      <AnimateOnScroll>
        <div className=" mb-12">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-default">
              <span className="text-xl font-medium text-text-body uppercase">Why Choose Us</span>
            </div>
          </motion.div>

          <h2 className="text-5xl font-semibold text-text-body mb-4">
            Why <span className="text-primary">VibeEver</span> is Different from Others
          </h2>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Premium Quality - Light Background */}
          <motion.div variants={itemVariant} whileHover={{ y: -4 }} className="bg-neutral-subtle rounded-2xl p-8 transition-all duration-300  group">
            <div className="w-14 h-14 border border-neutral-caption rounded-full flex items-center justify-center mb-5 transition-transform duration-300">
              <Award className="w-7 h-7 text-neutral-caption" />
            </div>

            <h3 className="text-3xl text-text-body mb-3">Premium Quality</h3>
            <p className="text-neutral-subtitle leading-relaxed">
              Every asset undergoes rigorous quality checks ensuring pixel-perfect design, clean code, and exceptional user experience for your projects.
            </p>
          </motion.div>

          {/* Extensive Collection - Light Background */}
          <motion.div variants={itemVariant} whileHover={{ y: -4 }} className="bg-neutral-subtle rounded-2xl p-8 transition-all duration-300 group">
            <div className="w-14 h-14 border border-neutral-caption rounded-full flex items-center justify-center mb-5 transition-transform duration-300">
              <Target className="w-7 h-7 text-neutral-caption" />
            </div>

            <h3 className="text-3xl text-text-body mb-3">Extensive Collection</h3>
            <p className="text-neutral-subtitle leading-relaxed">
              Thousands of meticulously crafted templates, UI kits, and graphics to help you create stunning digital experiences quickly.
            </p>
          </motion.div>

          {/* Regular Updates - Primary Background */}
          <motion.div
            variants={itemVariant}
            whileHover={{ y: -4 }}
            className="bg-primary rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 md:col-span-1 md:row-span-2 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 border border-white rounded-full flex items-center justify-center mb-6 transition-transform duration-300 backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl text-white mb-4 pr-12">Always Fresh & Updated</h3>
              <p className="text-white/90 leading-relaxed mb-8">
                We continuously update our collection with the latest design trends, ensuring you always have access to contemporary assets that keep your
                projects on the cutting edge. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </p>
              <p className="text-white/80 text-sm mb-6">All purchases include lifetime updates so your designs stay relevant as trends evolve.</p>

              <div className="mt-auto">
                {/* CTA Button */}
                <ExpandedIconButton
                  text="Browse Latest"
                  icon={
                    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.31366 6.65646H10.3137C10.8659 6.65646 11.3137 7.10417 11.3137 7.65646C11.3137 8.20874 10.8659 8.65646 10.3137 8.65646H1.31366C0.761383 8.65646 0.313664 8.20874 0.313664 7.65646C0.313664 7.10417 0.761383 6.65646 1.31366 6.65646ZM8.70711 3.29289C9.09763 2.90237 9.7308 2.90237 10.1213 3.29289L13.7071 6.87868C14.0976 7.2692 14.0976 7.90237 13.7071 8.29289L10.1213 11.8787C9.7308 12.2692 9.09763 12.2692 8.70711 11.8787C8.31658 11.4882 8.31658 10.855 8.70711 10.4645L11.5858 7.58579L8.70711 4.70711C8.31658 4.31658 8.31658 3.68342 8.70711 3.29289Z"
                        fill="#372F46"
                      />
                    </svg>
                  }
                  size="3rem"
                  buttonBgColor="neutral-subtle"
                  buttonHoverBgColor="neutral-border"
                  buttonTextColor="text-body"
                  buttonTextHoverColor="text-body"
                  onClick={() => (window.location.href = "/products")}
                ></ExpandedIconButton>
              </div>
            </div>
          </motion.div>

          {/* Designer Support - Spanning 2 columns */}
          <motion.div
            variants={itemVariant}
            whileHover={{ y: -4 }}
            className="bg-neutral-subtle rounded-2xl p-8 transition-all duration-300  group sm:col-span-2 md:col-span-2"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 border border-neutral-caption rounded-full flex items-center justify-center mb-6 transition-transform duration-300">
                  <Users className="w-7 h-7 text-neutral-caption" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-3xl text-text-body mb-3">Dedicated Designer Support</h3>
                <p className="text-neutral-subtitle leading-relaxed">
                  When you choose VibeEver, you're not just getting design assets—you're gaining a partner. Our team of expert designers provides personalized
                  support to help you customize templates, solve implementation challenges, and maximize the potential of every asset you purchase.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimateOnScroll>
    </div>
  );
};

// Join the Vibe Section with SectionHead and Newsletter
const JoinVibeSection = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.subscribe_email.value;
    console.log("Newsletter subscription:", email);
  };

  return (
    <SectionHead
      title={
        <>
          JOIN THE
          <br />
          VIBE
        </>
      }
      description="Join thousands of creators and experience the VibeEver difference today."
      circle_btn_text="GET STARTED"
      circuler_btn_handler={() => (window.location.href = "/sign-up")}
      submit_handler={handleNewsletterSubmit}
      stats={[
        {
          count: "25K",
          text: "Creators Joined",
        },
        {
          count: "98",
          text: "Satisfaction Rate",
        },
      ]}
    />
  );
};

const About = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Main Content with consistent spacing */}
        <div className="max-w-primary mx-auto">
          {/* Hero Stats Section using SectionHead */}
          <StatsSection />

          {/* Our Story Section */}
          <OurStory />

          {/* Values Section - keeping original design */}
          <ValuesSection />

          {/* Mission & Vision using SectionHead */}
          <MissionVisionSection />

          {/* Why Choose Us Section - new bento grid design */}
          <WhyChooseUsSection />

          {/* Join the Vibe Section with Newsletter */}
          <JoinVibeSection />
        </div>
      </div>
    </>
  );
};

export default About;
