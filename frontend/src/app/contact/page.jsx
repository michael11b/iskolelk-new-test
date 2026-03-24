import Head from 'next/head';
import FooterCTA from '@/components/FooterCTA';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | IskoleLK</title>
        <meta name="description" content="Contact IskoleLK for questions, feedback, or support." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
      </Head>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Have questions, feedback, or need support? Reach out to us at <a href="mailto:contact@iskolelk.com" className="text-blue-600 underline">contact@iskolelk.com</a> and we'll get back to you as soon as possible.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          You can also use the contact form below (coming soon).
        </p>
      </div>
      <FooterCTA />
    </>
  );
} 