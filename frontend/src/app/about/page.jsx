import Head from 'next/head';
import FooterCTA from '@/components/FooterCTA';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | IskoleLK</title>
        <meta name="description" content="Learn more about IskoleLK, our mission, and our team." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
      </Head>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          IskoleLK is dedicated to providing free and easy access to past exam papers for A/L, O/L, and Scholarship exams in Sri Lanka. Our mission is to help students and teachers prepare effectively for exams by offering a comprehensive and organized resource of past papers and marking schemes.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          We believe in the power of open education and strive to make exam preparation accessible to everyone, regardless of background or location.
        </p>
      </div>
      <FooterCTA />
    </>
  );
} 