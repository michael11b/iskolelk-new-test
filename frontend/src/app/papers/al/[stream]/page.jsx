import { alsubjects } from '@/data/data';
import Link from 'next/link';
import { fromUrlFormat, toUrlFormat } from '@/utils/stringUtils';
import FooterCTA from '@/components/FooterCTA';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const streamParam = fromUrlFormat(params.stream).toLowerCase();
  
  // Find the matching stream from alsubjects
  const streamData = alsubjects.find(stream => {
    const streamName = Object.keys(stream)[0].toLowerCase();
    return streamName === streamParam;
  });

  if (!streamData) {
    return {
      title: 'Stream not found',
      description: 'The requested stream does not exist.',
    };
  }

  const streamName = Object.keys(streamData)[0];
  const subjects = streamData[streamName];
  
  const pageTitle = `Download ${streamName} A/L (Advanced Level) Past Papers and Marking Schemes | Subjects`;
  const pageDescription = `Download ${streamName} A/L (Advanced Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free. Perfect for exam preparation.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download ${streamName} A/L (Advanced Level) past papers, Download ${streamName} past exam papers, Download ${streamName} past test papers, Download ${streamName} past model papers, Download ${streamName} past revision papers, Download ${streamName} past study materials, ${streamName}, Advanced Level, AL, past papers, ${subjects.join(', ')}, Sri Lanka education, exam preparation`,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      images: [`${SITE_URL}/opengraph/al-main.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${SITE_URL}/opengraph/al-main.png`],
    },
    alternates: {
      canonical: `${SITE_URL}/papers/al/${params.stream}`,
    },
  };
}

export default function ALStreamPage({ params }) {
  const streamParam = fromUrlFormat(params.stream).toLowerCase();
  
  // Find the matching stream from alsubjects
  const streamData = alsubjects.find(stream => {
    const streamName = Object.keys(stream)[0].toLowerCase();
    return streamName === streamParam;
  });

  if (!streamData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Stream not found</h1>
        <p className="text-gray-600">The requested stream does not exist.</p>
      </div>
    );
  }

  const streamName = Object.keys(streamData)[0];
  const subjects = streamData[streamName];

  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Download ${streamName} A/L (Advanced Level) Past Papers and Marking Schemes | Subjects`,
      "description": `Download ${streamName} A/L (Advanced Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free.`,
      "about": {
        "@type": "EducationalStream",
        "name": `Download ${streamName} A/L (Advanced Level) Past Papers and Marking Schemes | Subjects`,
        "description": `Download ${streamName} A/L (Advanced Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free.`,
      },
      "hasPart": subjects.map(subject => ({
        "@type": "EducationalSubject",
        "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes`,
        "description": `Download ${subject} A/L (Advanced Level) past papers and marking scheme. Download or view papers and marking schemes for free.`,
      }))
    };
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateStructuredData()) }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Responsive Grid Layout */}
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-bold mb-4">
                  Download {streamName} A/L (Advanced Level) Past Papers & Marking Schemes
                </h1>
                
                <div className="prose prose-lg mb-8">
                  <p className="text-gray-600">
                    Download {streamName} A/L (Advanced Level) past papers and marking scheme for all subjects. 
                    Download or view papers and marking schemes for free. Perfect for exam preparation and practice.
                  </p>
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjects.map((subject) => (
                    <Link
                      key={subject}
                      href={`/papers/al/${toUrlFormat(streamName)}/${toUrlFormat(subject)}`}
                      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h2 className="text-xl font-semibold text-blue-600">{subject}</h2>
                    </Link>
                  ))}
                </div>

                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About {streamName} A/L (Advanced Level) Stream</h2>
                  <div className="prose prose-lg">
                    <p>
                      The {streamName} A/L (Advanced Level) stream provides specialized education in various subjects 
                      that prepare students for higher education and professional careers. Past papers are an 
                      essential resource for understanding the exam format and improving your performance.
                    </p>
                  </div>
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Available {streamName} A/L (Advanced Level) Subjects</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      {subjects.map((subject, index) => (
                        <li key={index}>
                          <Link 
                            href={`/papers/al/${toUrlFormat(streamName)}/${toUrlFormat(subject)}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {subject}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {streamName} A/L (Advanced Level) past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {streamName} A/L (Advanced Level) papers
                    </span>
                    {subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {subject} A/L (Advanced Level) past papers
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <RightSidePromo />
              </div>
            </div>
          </div>

          {/* Mobile Promo - Bottom Section */}
          <div className="lg:hidden mt-8">
            <div className="max-w-sm mx-auto">
              <RightSidePromo />
            </div>
          </div>
        </div>
      </div>
      <AppPromoNav />
      <FooterCTA />
    </>
  );
}