import Head from 'next/head';
import FooterCTA from '@/components/FooterCTA';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>Terms of Service | IskoleLK</title>
        <meta name="description" content="Read the terms of service for using IskoleLK." />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
      </Head>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-lg text-gray-700 mb-8">
          Last updated: {currentDate}
        </p>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            By using IskoleLK, you agree to our terms and conditions. Please read them carefully before using our website and resources.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using IskoleLK ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p className="text-gray-700 mb-6">
            These terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Educational Purpose and Content</h2>
          <p className="text-gray-700 mb-4">All content is provided for educational purposes only.</p>
          <p className="text-gray-700 mb-4">
            The Service provides access to educational materials, past examination papers, study resources, and related content designed to support academic learning and exam preparation.
          </p>
          <p className="text-gray-700 mb-6">
            Users are responsible for ensuring that their use of these materials complies with their educational institution's policies and applicable academic integrity standards.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property and Copyright</h2>
          <p className="text-gray-700 mb-4">Do not redistribute or sell materials from this site without permission.</p>
          <p className="text-gray-700 mb-4">
            All content on IskoleLK, including but not limited to text, graphics, images, past papers, study materials, and software, is the property of IskoleLK or its content suppliers and is protected by copyright laws.
          </p>
          <p className="text-gray-700 mb-4">
            Users may download and use materials for personal, non-commercial educational purposes only. Any other use, including reproduction, distribution, or commercial exploitation, requires written permission from IskoleLK.
          </p>
          <p className="text-gray-700 mb-6">
            If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please contact us at contact@iskolelk.com.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Responsibilities and Conduct</h2>
          <p className="text-gray-700 mb-4">Users of IskoleLK agree to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Use the Service only for lawful educational purposes</li>
            <li>Respect intellectual property rights and copyright laws</li>
            <li>Not attempt to gain unauthorized access to any part of the Service</li>
            <li>Not use the Service to transmit harmful, offensive, or inappropriate content</li>
            <li>Not interfere with the proper functioning of the Service</li>
            <li>Report any technical issues or concerns to our support team</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Violation of these terms may result in termination of access to the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Accuracy and Completeness</h2>
          <p className="text-gray-700 mb-4">We are not responsible for the accuracy or completeness of the materials.</p>
          <p className="text-gray-700 mb-4">
            While we strive to provide accurate and up-to-date educational content, IskoleLK makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of any information on the Service.
          </p>
          <p className="text-gray-700 mb-6">
            Users should verify information independently and consult with their teachers, professors, or educational institutions for authoritative guidance on academic matters.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Service Availability and Modifications</h2>
          <p className="text-gray-700 mb-4">
            IskoleLK strives to maintain high availability of the Service, but we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, technical issues, or other factors beyond our control.
          </p>
          <p className="text-gray-700 mb-6">
            We reserve the right to modify, suspend, or discontinue the Service or any part thereof at any time without prior notice.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Privacy and Data Protection</h2>
          <p className="text-gray-700 mb-4">
            Your privacy is important to us. Our collection and use of information is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
          </p>
          <p className="text-gray-700 mb-6">
            By using the Service, you consent to the collection and use of information as described in our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links and Services</h2>
          <p className="text-gray-700 mb-4">
            The Service may contain links to third-party websites, services, or resources. IskoleLK is not responsible for the content, privacy policies, or practices of any third-party resources.
          </p>
          <p className="text-gray-700 mb-6">
            Users access third-party resources at their own risk and should review the terms and privacy policies of those services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by law, IskoleLK shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
          </p>
          <p className="text-gray-700 mb-6">
            Our total liability for any claims arising from the use of the Service shall not exceed the amount paid by you, if any, for accessing the Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Indemnification</h2>
          <p className="text-gray-700 mb-6">
            You agree to indemnify and hold harmless IskoleLK, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms of Service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law and Jurisdiction</h2>
          <p className="text-gray-700 mb-6">
            These Terms of Service shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising from these terms or the use of the Service shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
          <p className="text-gray-700 mb-4">We may update these terms at any time without prior notice.</p>
          <p className="text-gray-700 mb-4">
            IskoleLK reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on the Service. Your continued use of the Service after any changes constitutes acceptance of the new terms.
          </p>
          <p className="text-gray-700 mb-6">
            We encourage users to review these terms periodically to stay informed about any updates.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Severability</h2>
          <p className="text-gray-700 mb-6">
            If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms of Service will otherwise remain in full force and effect.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Entire Agreement</h2>
          <p className="text-gray-700 mb-6">
            These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and IskoleLK regarding the use of the Service, superseding any prior agreements or understandings.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Contact Information</h2>
          <p className="text-gray-700 mb-6">
            For questions about these terms, please contact us at <a href="mailto:contact@iskolelk.com" className="text-blue-600 underline hover:text-blue-800">contact@iskolelk.com</a>.
          </p>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-8">
            <p className="text-gray-800 font-medium">
              📚 Educational Use Only
            </p>
            <p className="text-gray-700 mt-2">
              Remember that all materials on IskoleLK are provided for educational purposes only. Always verify information with your teachers and educational institutions.
            </p>
          </div>
        </div>
      </div>
      <FooterCTA />
    </>
  );
} 