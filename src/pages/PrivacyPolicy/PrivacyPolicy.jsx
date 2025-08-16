import { motion } from "framer-motion";
import SectionHead from "../../components/ui/SectionHead";

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

// Section Component for consistent styling
const PolicySection = ({ title, children, delay = 0 }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold: 0.1 }}
      variants={{
        hidden: { opacity: 0, y: 20 },
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
      className="mb-12"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-text-body mb-6 leading-tight">{title}</h2>
      <div className="space-y-4 text-neutral-subtitle text-lg leading-relaxed">{children}</div>
    </motion.section>
  );
};

// Subsection component
const SubSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-text-body mb-3">{title}</h3>
      <div className="space-y-3 text-neutral-subtitle">{children}</div>
    </div>
  );
};

// List component
const PolicyList = ({ items }) => {
  return (
    <ul className="space-y-2 ml-6">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with SectionHead */}
      <SectionHead
        title={
          <>
            PRIVACY <br />
            POLICY
          </>
        }
      />

      {/* Main Content */}
      <div className="pt-5 pb-16">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Effective Date */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <p className="text-blue-700">This Privacy Policy was last updated on January 1, 2024, and is effective immediately.</p>
            </div>
          </motion.div>

          {/* Information We Collect */}
          <PolicySection title="1. Information We Collect" delay={0.1}>
            <p>
              We collect information you provide directly to us, information we obtain automatically when you use our services, and information from third
              parties.
            </p>

            <SubSection title="Personal Information">
              <p>When you create an account, make a purchase, or contact us, we may collect:</p>
              <PolicyList
                items={[
                  "Name, email address, and contact information",
                  "Payment information (processed securely through third-party providers)",
                  "Profile information and preferences",
                  "Communication history with our support team",
                ]}
              />
            </SubSection>

            <SubSection title="Usage Information">
              <p>We automatically collect information about how you use our platform:</p>
              <PolicyList
                items={[
                  "Device information (IP address, browser type, operating system)",
                  "Usage patterns and preferences",
                  "Downloaded files and purchase history",
                  "Analytics data to improve our services",
                ]}
              />
            </SubSection>
          </PolicySection>

          {/* How We Use Information */}
          <PolicySection title="2. How We Use Your Information" delay={0.1}>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>

            <SubSection title="Service Provision">
              <PolicyList
                items={[
                  "Process and fulfill your orders",
                  "Provide customer support and respond to inquiries",
                  "Send important updates about your account and purchases",
                  "Deliver digital products and manage downloads",
                ]}
              />
            </SubSection>

            <SubSection title="Improvement and Analytics">
              <PolicyList
                items={[
                  "Analyze usage patterns to improve our platform",
                  "Develop new features and services",
                  "Conduct research and analytics",
                  "Ensure security and prevent fraud",
                ]}
              />
            </SubSection>
          </PolicySection>

          {/* Information Sharing */}
          <PolicySection title="3. Information Sharing and Disclosure" delay={0.1}>
            <p>We do not sell, rent, or share your personal information with third parties except as described in this policy.</p>

            <SubSection title="We May Share Information:">
              <PolicyList
                items={[
                  "With service providers who help us operate our platform (payment processors, hosting services)",
                  "When required by law or to protect our rights and safety",
                  "In connection with a business transfer or acquisition",
                  "With your explicit consent",
                ]}
              />
            </SubSection>

            <SubSection title="Third-Party Services">
              <p>
                We integrate with trusted third-party services for payments, analytics, and other functionality. These services have their own privacy policies,
                and we encourage you to review them.
              </p>
            </SubSection>
          </PolicySection>

          {/* Data Security */}
          <PolicySection title="4. Data Security" delay={0.1}>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>

            <SubSection title="Security Measures">
              <PolicyList
                items={[
                  "Encryption of sensitive data in transit and at rest",
                  "Regular security audits and updates",
                  "Access controls and authentication systems",
                  "Secure payment processing through certified providers",
                ]}
              />
            </SubSection>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-6">
              <p className="text-orange-900 font-medium">
                <strong>Important:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. Please use
                strong passwords and keep your account information confidential.
              </p>
            </div>
          </PolicySection>

          {/* Your Rights */}
          <PolicySection title="5. Your Rights and Choices" delay={0.1}>
            <p>You have certain rights regarding your personal information, depending on your location and applicable laws.</p>

            <SubSection title="Account Management">
              <PolicyList
                items={[
                  "Access and update your account information",
                  "Download your data",
                  "Delete your account (subject to legal obligations)",
                  "Opt-out of marketing communications",
                ]}
              />
            </SubSection>

            <SubSection title="Data Protection Rights (GDPR/CCPA)">
              <p>If you're located in the EU, UK, or California, you may have additional rights:</p>
              <PolicyList
                items={[
                  "Right to access your personal data",
                  "Right to rectification or correction",
                  "Right to erasure (right to be forgotten)",
                  "Right to data portability",
                  "Right to object to processing",
                ]}
              />
            </SubSection>
          </PolicySection>

          {/* Cookies and Tracking */}
          <PolicySection title="6. Cookies and Tracking Technologies" delay={0.1}>
            <p>We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.</p>

            <SubSection title="Types of Cookies">
              <PolicyList
                items={[
                  "Essential cookies for basic website functionality",
                  "Analytics cookies to understand how you use our site",
                  "Preference cookies to remember your settings",
                  "Marketing cookies for relevant advertising (with consent)",
                ]}
              />
            </SubSection>

            <p className="mt-4">You can control cookie preferences through your browser settings or our cookie consent banner.</p>
          </PolicySection>

          {/* International Transfers */}
          <PolicySection title="7. International Data Transfers" delay={0.1}>
            <p>
              Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place for international
              transfers.
            </p>

            <SubSection title="Safeguards">
              <PolicyList
                items={[
                  "Standard contractual clauses approved by relevant authorities",
                  "Adequacy decisions for certain countries",
                  "Certification schemes and codes of conduct",
                  "Your explicit consent where required",
                ]}
              />
            </SubSection>
          </PolicySection>

          {/* Children's Privacy */}
          <PolicySection title="8. Children's Privacy" delay={0.1}>
            <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

            <p className="mt-4">
              If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly. If
              you believe we may have collected information from a child under 13, please contact us immediately.
            </p>
          </PolicySection>

          {/* Changes to Policy */}
          <PolicySection title="9. Changes to This Privacy Policy" delay={0.1}>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.</p>

            <SubSection title="How We Notify You">
              <PolicyList
                items={[
                  "Email notification for significant changes",
                  "Website banner or notice",
                  "Updated effective date at the top of this policy",
                  "Account dashboard notifications for material changes",
                ]}
              />
            </SubSection>
          </PolicySection>

          {/* Contact Information */}
          <PolicySection title="10. Contact Us" delay={0.1}>
            <p className="mb-6">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at{" "}
              <a href="mailto:privacy@vibeever.com" className="text-primary hover:text-primary-dark transition-colors duration-300">
                privacy@vibeever.com
              </a>
            </p>
          </PolicySection>

          {/* Footer Note */}
          <motion.div variants={fadeInUp} className="mt-16 p-8 bg-neutral-subtle rounded-2xl border border-neutral-default text-center">
            <p className="text-neutral-subtitle text-lg">
              Thank you for trusting VibeEver with your information. We are committed to protecting your privacy and providing transparent information about our
              data practices.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
