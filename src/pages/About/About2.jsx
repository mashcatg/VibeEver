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

// Hero Section
const AboutHero = () => {
  return (
    <div className="relative overflow-hidden rounded-4xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-50 to-blue-50"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-32 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-32 w-32 h-32 bg-blue-400/10 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-md"></div>

      <div className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-neutral-default mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-text-body">About VibeEver</span>
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
            We're passionate designers and developers creating premium digital assets that empower creators, businesses, and innovators worldwide.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Premium Products", icon: Award },
    { number: "50+", label: "Countries Served", icon: Target },
    { number: "99%", label: "Satisfaction Rate", icon: Heart },
  ];

  return (
    <AnimateOnScroll>
      <div className="p-8">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariant} className="text-center relative">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-text-body mb-1">{stat.number}</h3>
              <p className="text-neutral-subtitle text-sm">{stat.label}</p>

              {/* Divider line */}
              {((index < stats.length - 1 && index !== 1) || (index === 1 && stats.length > 2)) && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-20 w-px bg-neutral-default/40"></div>
              )}
              {/* Divider for mobile 2-column layout */}
              {index === 0 && <div className="md:hidden absolute top-1/2 -right-4 transform -translate-y-1/2 h-12 w-px bg-neutral-default/30"></div>}
              {index === 2 && stats.length > 3 && (
                <div className="md:hidden absolute top-1/2 -right-4 transform -translate-y-1/2 h-12 w-px bg-neutral-default/30"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimateOnScroll>
  );
};

// Story Section
const OurStory = () => {
  return (
    <AnimateOnScroll>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-text-body mb-6">Our Story</h2>
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-neutral-default/30">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-subtle rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-text-body mb-1">Innovation</h4>
                <p className="text-xs text-neutral-subtitle">Cutting-edge design solutions</p>
              </div>

              <div className="bg-neutral-subtle rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-text-body mb-1">Passion</h4>
                <p className="text-xs text-neutral-subtitle">Love for great design</p>
              </div>

              <div className="bg-neutral-subtle rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-text-body mb-1">Community</h4>
                <p className="text-xs text-neutral-subtitle">Global creator network</p>
              </div>

              <div className="bg-neutral-subtle rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-text-body mb-1">Quality</h4>
                <p className="text-xs text-neutral-subtitle">Premium standards</p>
              </div>
            </div>
          </div>
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
    <AnimateOnScroll>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-body mb-4">Our Values</h2>
        <p className="text-neutral-subtitle max-w-2xl mx-auto">
          The principles that guide everything we do and help us deliver exceptional value to our community.
        </p>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </AnimateOnScroll>
  );
};

// Mission & Vision Section
const MissionVisionSection = () => {
  return (
    <AnimateOnScroll>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-primary to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
          </div>
          <p className="text-white/90 leading-relaxed">
            To democratize great design by providing creators and businesses with premium, accessible digital assets that inspire innovation and accelerate
            success. We're committed to making professional design resources available to everyone, regardless of their budget or technical expertise.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Our Vision</h3>
          </div>
          <p className="text-white/90 leading-relaxed">
            To become the world's most trusted platform for digital design assets, fostering a global community where creativity thrives and great ideas come to
            life. We envision a future where every creator has access to the tools they need to build extraordinary digital experiences.
          </p>
        </motion.div>
      </div>
    </AnimateOnScroll>
  );
};

// Why Different Section
const WhyDifferentSection = () => {
  const differences = [
    {
      title: "Premium Quality",
      description: "Every asset is carefully crafted and thoroughly tested by our expert design team.",
      icon: "🎨",
    },
    {
      title: "Regular Updates",
      description: "Fresh content and new features added regularly to keep you ahead of trends.",
      icon: "🚀",
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to help you succeed.",
      icon: "💬",
    },
    {
      title: "Lifetime Access",
      description: "Once purchased, you own it forever with unlimited downloads and updates.",
      icon: "♾️",
    },
    {
      title: "Community Driven",
      description: "Built with feedback from our amazing community of creators and developers.",
      icon: "👥",
    },
    {
      title: "Fair Pricing",
      description: "Premium quality at accessible prices, because great design should be available to all.",
      icon: "💎",
    },
  ];

  return (
    <AnimateOnScroll>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-body mb-4">Why Choose VibeEver?</h2>
        <p className="text-neutral-subtitle max-w-2xl mx-auto">
          We're not just another marketplace. Here's what makes us different and why thousands of creators trust us with their projects.
        </p>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {differences.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-default/50 group"
          >
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
            <h3 className="text-headline leading-headline font-semibold text-text-body mb-2">{item.title}</h3>
            <p className="text-caption leading-caption text-neutral-subtitle">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimateOnScroll>
  );
};

// CTA Section
const JoinVibeSection = () => {
  return (
    <AnimateOnScroll>
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-body mb-4">Ready to Join the Vibe?</h2>
          <p className="text-neutral-subtitle text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of creators who have already discovered the VibeEver difference. Start your journey with us today and bring your creative vision to
            life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <ExpandedIconButton
                text="Browse Products"
                textColor="white"
                icon={<ArrowRight className="w-5 h-5" />}
                bgColor="primary"
                className="hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <Link to="/sign-up">
              <ExpandedIconButton
                text="Create Account"
                textColor="text-body"
                icon={<Users className="w-5 h-5" />}
                bgColor="white"
                buttonBgColor="white"
                buttonHoverBgColor="neutral-subtle"
                className="border border-neutral-default hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimateOnScroll>
  );
};

const About = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <AboutHero />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-16 space-y-20">
          {/* Stats Section */}
          <StatsSection />

          {/* Our Story */}
          <OurStory />

          {/* Values */}
          <ValuesSection />

          {/* Mission & Vision */}
          <MissionVisionSection />

          {/* Why Different */}
          <WhyDifferentSection />

          {/* CTA Section */}
          <JoinVibeSection />
        </div>
      </div>
    </>
  );
};

export default About;
