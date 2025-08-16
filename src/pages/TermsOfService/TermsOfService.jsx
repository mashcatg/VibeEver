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
const TermsSection = ({ title, children, delay = 0 }) => {
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
const TermsList = ({ items }) => {
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

// Important Notice component
const ImportantNotice = ({ title, content, type = "info" }) => {
  const getStyles = () => {
    switch (type) {
      case "warning":
        return "bg-orange-50 border-orange-200 text-orange-900";
      case "error":
        return "bg-red-50 border-red-200 text-red-900";
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      default:
        return "bg-blue-50 border-blue-200 text-blue-900";
    }
  };

  return (
    <div className={`${getStyles()} border rounded-2xl p-6 my-6`}>
      <p className="font-medium">
        <strong>{title}</strong>
      </p>
      <p className="mt-2 opacity-90">{content}</p>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with SectionHead */}
      <SectionHead
        title={
          <>
            TERMS OF <br />
            SERVICE
          </>
        }
      />

      {/* Main Content */}
      <div className="pt-5 pb-16">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Effective Date */}
          <motion.div variants={fadeInUp} className="mb-12">
            <ImportantNotice
              title="Effective Date:"
              content="These Terms of Service were last updated on January 1, 2024, and are effective immediately upon posting."
              type="info"
            />
          </motion.div>

          {/* Acceptance of Terms */}
          <TermsSection title="1. Acceptance of Terms" delay={0.1}>
            <p>By accessing and using VibeEver ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>

            <p>
              If you do not agree to abide by the above, please do not use this service. These terms apply to all users, including visitors, registered users,
              and premium subscribers.
            </p>

            <ImportantNotice
              title="Important:"
              content="If you are under 18 years of age, you may only use our service with the involvement and consent of a parent or guardian."
              type="warning"
            />
          </TermsSection>

          {/* Description of Service */}
          <TermsSection title="2. Description of Service" delay={0.1}>
            <p>
              VibeEver is a digital marketplace that provides creative assets, including but not limited to graphics, UI templates, design elements, and digital
              products.
            </p>

            <SubSection title="Our Services Include:">
              <TermsList
                items={[
                  "Digital design assets and templates",
                  "User account management and profiles",
                  "Download and licensing services",
                  "Customer support and community features",
                  "Payment processing and order management",
                ]}
              />
            </SubSection>

            <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.</p>
          </TermsSection>

          {/* User Accounts */}
          <TermsSection title="3. User Accounts and Registration" delay={0.1}>
            <p>
              To access certain features of our Service, you must register for an account. You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>

            <SubSection title="Account Requirements:">
              <TermsList
                items={[
                  "Provide accurate, current, and complete information",
                  "Maintain and update your information as necessary",
                  "Keep your password secure and confidential",
                  "Notify us immediately of any unauthorized use",
                  "Accept responsibility for all activities under your account",
                ]}
              />
            </SubSection>

            <SubSection title="Account Termination">
              <p>
                We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent activity, or for any other reason at our
                sole discretion.
              </p>
            </SubSection>
          </TermsSection>

          {/* Licensing and Usage Rights */}
          <TermsSection title="4. Licensing and Usage Rights" delay={0.1}>
            <p>When you purchase digital assets from VibeEver, you receive specific usage rights as outlined in our licensing terms.</p>

            <SubSection title="Standard License Includes:">
              <TermsList
                items={[
                  "Commercial and personal use rights",
                  "Modification and customization rights",
                  "Use in unlimited projects",
                  "No attribution required (though appreciated)",
                ]}
              />
            </SubSection>

            <SubSection title="License Restrictions:">
              <TermsList
                items={[
                  "Cannot resell, redistribute, or share original files",
                  "Cannot use in templates for resale",
                  "Cannot claim authorship of the original work",
                  "Cannot use for pornographic, defamatory, or illegal content",
                ]}
              />
            </SubSection>

            <ImportantNotice
              title="License Clarification:"
              content="Each purchase grants a license for the specific asset(s) purchased. Bulk licensing options may be available for enterprise customers."
              type="info"
            />
          </TermsSection>

          {/* Payment Terms */}
          <TermsSection title="5. Payment Terms and Refunds" delay={0.1}>
            <p>All payments are processed securely through our trusted payment partners. Prices are subject to change without notice.</p>

            <SubSection title="Payment Processing:">
              <TermsList
                items={[
                  "Secure payment processing via Stripe and PayPal",
                  "Immediate access to purchases upon successful payment",
                  "All prices displayed include applicable taxes",
                  "Failed payments may result in temporary account suspension",
                ]}
              />
            </SubSection>

            <SubSection title="Refund Policy:">
              <p>Digital products are generally non-refundable due to their nature. However, we may provide refunds in the following circumstances:</p>
              <TermsList
                items={[
                  "Technical issues preventing download or use",
                  "Significant discrepancy between product description and actual product",
                  "Duplicate purchases made in error",
                  "Requests made within 30 days of purchase with valid justification",
                ]}
              />
            </SubSection>

            <ImportantNotice
              title="Refund Process:"
              content="Refund requests must be submitted through our support system with detailed explanation. Processing may take 5-10 business days."
              type="info"
            />
          </TermsSection>

          {/* Prohibited Uses */}
          <TermsSection title="6. Prohibited Uses and Conduct" delay={0.1}>
            <p>You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair our platform.</p>

            <SubSection title="Prohibited Activities:">
              <TermsList
                items={[
                  "Uploading malicious code, viruses, or harmful content",
                  "Attempting to gain unauthorized access to our systems",
                  "Sharing account credentials with unauthorized parties",
                  "Using automated tools to scrape or download content",
                  "Engaging in fraudulent transactions or chargebacks",
                  "Violating intellectual property rights",
                  "Spamming or sending unsolicited communications",
                ]}
              />
            </SubSection>

            <SubSection title="Content Standards">
              <p>Any content you submit or create using our assets must comply with:</p>
              <TermsList
                items={[
                  "All applicable laws and regulations",
                  "Community standards and guidelines",
                  "Intellectual property rights of third parties",
                  "Platform-specific terms of service where applicable",
                ]}
              />
            </SubSection>
          </TermsSection>

          {/* Intellectual Property */}
          <TermsSection title="7. Intellectual Property Rights" delay={0.1}>
            <p>VibeEver respects intellectual property rights and expects users to do the same.</p>

            <SubSection title="Our Content:">
              <p>
                All content on VibeEver, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, and data
                compilations, is owned by VibeEver or its content suppliers and is protected by copyright laws.
              </p>
            </SubSection>

            <SubSection title="User-Generated Content:">
              <p>
                By submitting content to our platform (reviews, comments, profiles), you grant us a non-exclusive, royalty-free license to use, modify, and
                display such content in connection with our services.
              </p>
            </SubSection>

            <SubSection title="DMCA Compliance:">
              <p>
                We respond to notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (DMCA). If you believe your
                copyrighted work has been infringed, please contact us with:
              </p>
              <TermsList
                items={[
                  "Identification of the copyrighted work claimed to be infringed",
                  "Location of the allegedly infringing material",
                  "Your contact information and electronic signature",
                  "Statement of good faith belief that use is not authorized",
                ]}
              />
            </SubSection>
          </TermsSection>

          {/* Disclaimers and Limitations */}
          <TermsSection title="8. Disclaimers and Limitation of Liability" delay={0.1}>
            <p>VibeEver is provided "as is" and "as available" without warranties of any kind, either express or implied.</p>

            <SubSection title="Service Availability:">
              <p>
                While we strive for high availability, we do not guarantee that our service will be uninterrupted, secure, or error-free. Scheduled maintenance
                and updates may temporarily affect service availability.
              </p>
            </SubSection>

            <SubSection title="Limitation of Liability:">
              <p>
                To the fullest extent permitted by law, VibeEver shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                including but not limited to loss of profits, data, or business opportunities.
              </p>
            </SubSection>

            <ImportantNotice
              title="Maximum Liability:"
              content="Our total liability for any claims arising from your use of the service shall not exceed the amount you paid us in the twelve months preceding the claim."
              type="warning"
            />
          </TermsSection>

          {/* Privacy and Data Protection */}
          <TermsSection title="9. Privacy and Data Protection" delay={0.1}>
            <p>
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into
              these Terms by reference.
            </p>

            <SubSection title="Data Processing:">
              <TermsList
                items={[
                  "We collect only necessary information to provide our services",
                  "Your data is processed in accordance with applicable privacy laws",
                  "We implement security measures to protect your information",
                  "You have rights regarding your personal data as outlined in our Privacy Policy",
                ]}
              />
            </SubSection>
          </TermsSection>

          {/* Modifications and Updates */}
          <TermsSection title="10. Modifications to Terms" delay={0.1}>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website.</p>

            <SubSection title="Notification of Changes:">
              <TermsList
                items={[
                  "Email notification for material changes",
                  "Website banner or notice for minor updates",
                  "Account dashboard notifications when appropriate",
                  "Continued use constitutes acceptance of modified terms",
                ]}
              />
            </SubSection>

            <ImportantNotice
              title="Your Responsibility:"
              content="It is your responsibility to review these terms periodically. If you disagree with any changes, you must discontinue use of the service."
              type="warning"
            />
          </TermsSection>

          {/* Termination */}
          <TermsSection title="11. Termination" delay={0.1}>
            <p>Either party may terminate this agreement at any time. Upon termination, your right to use the service will cease immediately.</p>

            <SubSection title="Effect of Termination:">
              <TermsList
                items={[
                  "Access to your account and purchased content may be restricted",
                  "Previously granted licenses for purchased content remain valid",
                  "Outstanding payment obligations remain in effect",
                  "Certain provisions of these terms survive termination",
                ]}
              />
            </SubSection>
          </TermsSection>

          {/* Governing Law */}
          <TermsSection title="12. Governing Law and Dispute Resolution" delay={0.1}>
            <p>These Terms of Service are governed by the laws of New York State, without regard to conflict of law principles.</p>

            <SubSection title="Dispute Resolution:">
              <p>We encourage resolving disputes through direct communication. For formal disputes:</p>
              <TermsList
                items={[
                  "Initial dispute resolution through good faith negotiation",
                  "Mediation through a mutually agreed mediator if negotiation fails",
                  "Binding arbitration as final resort (except for intellectual property claims)",
                  "Court jurisdiction in New York for non-arbitrable disputes",
                ]}
              />
            </SubSection>
          </TermsSection>

          {/* Contact Information */}
          <TermsSection title="13. Contact Information" delay={0.1}>
            <p className="mb-6">
              If you have questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:privacy@vibeever.com" className="text-primary hover:text-primary-dark transition-colors duration-300">
                privacy@vibeever.com
              </a>
            </p>
          </TermsSection>

          {/* Acknowledgment */}
          <motion.div variants={fadeInUp} className="mt-16 p-8 bg-primary/5 rounded-2xl border-2 border-primary/20 text-center">
            <h3 className="text-2xl font-bold text-text-body mb-4">Acknowledgment</h3>
            <p className="text-neutral-subtitle text-lg leading-relaxed">
              By using VibeEver, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. Thank you for choosing
              VibeEver for your creative needs.
            </p>
            <p className="text-primary font-medium mt-4">— The VibeEver Team</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
