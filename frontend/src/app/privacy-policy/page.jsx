import Head from 'next/head';
import FooterCTA from '@/components/FooterCTA';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>Privacy Policy | IskoleLK</title>
        <meta name="description" content="Read our privacy policy to understand how IskoleLK handles your information and protects your privacy." />
        <link rel="canonical" href={`${SITE_URL}/privacy-policy`} />
      </Head>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-8">
          Last updated: {currentDate}
        </p>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            At IskoleLK ("we", "our", or "us"), we value and respect your privacy. This Privacy Policy explains how we handle information when you use our website (iskolelk.com) and our mobile application.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We do not collect, store, or share any personal information such as names, email addresses, phone numbers, or contact details. Our website and mobile app are completely free to use and do not require user registration.
          </p>
          <p className="text-gray-700 mb-6">
            The only data we collect is non-personal usage data through analytics tools to understand how people use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Analytics Tools</h2>
          <p className="text-gray-700 mb-4">We use the following tools:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Google Analytics 4 (GA4)</li>
            <li>Meta Pixel</li>
          </ul>
          <p className="text-gray-700 mb-6">
            These tools help us gather anonymous insights such as page views, visit counts, and general usage trends. This information is used only to improve our services and run brand awareness campaigns.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing of Information</h2>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or rent your information to third parties.
          </p>
          <p className="text-gray-700 mb-4">
            We do not share any personal information because we do not collect it.
          </p>
          <p className="text-gray-700 mb-6">
            The only data collected is handled by Google Analytics and Meta Pixel under their own privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Children's Privacy</h2>
          <p className="text-gray-700 mb-6">
            Our website and mobile app provide educational services and can be used by people of any age group. We do not knowingly collect any personal information from children or adults.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Security</h2>
          <p className="text-gray-700 mb-6">
            We take reasonable steps to protect any information processed through our analytics tools. However, please note that no system is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date at the top.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions or concerns about this Privacy Policy, you can contact us at:
          </p>
          <p className="text-gray-700 mb-8">
            📧 <a href="mailto:contact@iskolelk.com" className="text-blue-600 underline hover:text-blue-800">contact@iskolelk.com</a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Information We Do Not Collect</h2>
          <p className="text-gray-700 mb-4">To be completely transparent, we want to clarify that we do not collect:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Personal identification information (names, email addresses, phone numbers)</li>
            <li>Financial information or payment details</li>
            <li>Academic records or student performance data</li>
            <li>Location data or GPS coordinates</li>
            <li>Device-specific information (device IDs, IMEI numbers)</li>
            <li>Biometric data or facial recognition information</li>
            <li>Social media account information</li>
            <li>Communication content or messages</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Our platform is designed to be completely anonymous and privacy-focused, allowing students to access educational resources without any tracking of their personal identity.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. How We Use Non-Personal Data</h2>
          <p className="text-gray-700 mb-4">The anonymous analytics data we collect helps us:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Understand which subjects and topics are most popular among students</li>
            <li>Identify which past papers are accessed most frequently</li>
            <li>Improve our website and mobile app performance and user experience</li>
            <li>Optimize content delivery and page loading speeds</li>
            <li>Plan future content development and resource allocation</li>
            <li>Measure the effectiveness of our educational outreach efforts</li>
            <li>Ensure our platform remains accessible and functional for all users</li>
          </ul>
          <p className="text-gray-700 mb-6">
            This data is always aggregated and anonymized, meaning it cannot be used to identify individual users or their specific activities.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Third-Party Services and Links</h2>
          <p className="text-gray-700 mb-4">Our platform may contain links to external websites and services, including:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Educational institutions and examination boards</li>
            <li>Study resources and reference materials</li>
            <li>Social media platforms for educational content sharing</li>
            <li>Third-party analytics and performance monitoring tools</li>
          </ul>
          <p className="text-gray-700 mb-6">
            We are not responsible for the privacy practices of these external sites. We encourage users to review the privacy policies of any third-party services they choose to access.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Data Retention and Deletion</h2>
          <p className="text-gray-700 mb-4">
            Since we do not collect personal information, there is no personal data to retain or delete. However, we do maintain anonymous analytics data for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Historical trend analysis and reporting</li>
            <li>Platform performance optimization</li>
            <li>Educational impact assessment</li>
            <li>Compliance with legal and regulatory requirements</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Anonymous analytics data is typically retained for up to 26 months, after which it is automatically deleted or further anonymized.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            Our services are primarily hosted in Sri Lanka, but some of our third-party analytics tools may process data in other countries. Since we do not collect personal information, there are no personal data transfers to be concerned about. All analytics data is processed in accordance with the respective service providers' privacy policies and applicable data protection laws.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Your Rights and Choices</h2>
          <p className="text-gray-700 mb-4">Even though we don't collect personal information, you have the right to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Access our platform anonymously without providing any personal details</li>
            <li>Use browser settings to control cookie preferences and tracking</li>
            <li>Contact us with any privacy-related questions or concerns</li>
            <li>Request information about what data we do collect and how it's used</li>
            <li>Opt out of analytics tracking through browser extensions or settings</li>
          </ul>
          <p className="text-gray-700 mb-6">
            We respect your choices and will work with you to address any privacy concerns you may have.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Educational Content and Copyright</h2>
          <p className="text-gray-700 mb-6">
            While this privacy policy focuses on data collection and usage, we want to clarify that all educational content, past papers, and study materials available on our platform are provided for educational purposes only. Users are responsible for ensuring they comply with relevant copyright laws and educational institution policies when accessing and using these materials.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Compliance and Legal Basis</h2>
          <p className="text-gray-700 mb-4">Our privacy practices are designed to comply with:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>General Data Protection Regulation (GDPR) principles</li>
            <li>Local Sri Lankan data protection laws and regulations</li>
            <li>Educational technology privacy best practices</li>
            <li>Google Play Store privacy policy requirements</li>
            <li>Apple App Store privacy guidelines</li>
          </ul>
          <p className="text-gray-700 mb-6">
            We regularly review and update our privacy practices to ensure ongoing compliance with applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">16. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions or concerns about this Privacy Policy, you can contact us at:
          </p>
          <p className="text-gray-700 mb-8">
            📧 <a href="mailto:contact@iskolelk.com" className="text-blue-600 underline hover:text-blue-800">contact@iskolelk.com</a>
          </p>
        </div>
      </div>
      <FooterCTA />
    </>
  );
}
