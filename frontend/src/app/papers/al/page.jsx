import { alsubjects } from '@/data/data';
import Link from 'next/link';
import { toUrlFormat } from '@/utils/stringUtils';
import FooterCTA from '@/components/FooterCTA';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata() {
  const pageTitle = "Download A/L (Advanced Level) Past Papers and Marking Schemes | All Streams and Subjects";
  const pageDescription = "Download A/L (Advanced Level) past papers and marking scheme for all streams and subjects. Download or view papers and marking schemes for free. Perfect for exam preparation.";
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: "Download A/L (Advanced Level) past papers, Download Advanced Level past exam papers, Download Advanced Level past test papers, Download Advanced Level past model papers, Download Advanced Level past revision papers, Download Advanced Level past study materials, Advanced Level, AL, past papers, Sri Lanka education, exam preparation, Bio Science, Physical Science, Technology, Commerce, Arts",
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
      canonical: `${SITE_URL}/papers/al`,
    },
  };
}

export default function ALPapersPage() {
  // Generate structured data for SEO
  const generateStructuredData = () => {
    const streamList = alsubjects.map(stream => {
      const streamName = Object.keys(stream)[0];
      return {
        "@type": "EducationalStream",
        "name":  `Download A/L (Advanced Level) Past Papers and Marking Schemes | All Streams and Subjects`,
        "description": `Download A/L (Advanced Level) stream subjects past papers and Marking Schemes `,
        "hasPart": stream[streamName].map(subject => ({
          "@type": "EducationalSubject",
          "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes`,
          "description": `Download ${subject} A/L (Advanced Level) past papers and marking scheme. Download or view papers and marking schemes for free.`,
          // "educationalLevel": "Advanced Level"
        }))
      };
    });

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name":  `Download A/L (Advanced Level) Past Papers and Marking Schemes | All Streams and Subjects `,
      "description": "Access Advanced Level past papers for all streams and subjects. Download or view papers and marking schemes for free.",
      "about": {
        "@type": "EducationalLevel",
        "name": `Download A/L (Advanced Level) Past Papers and Marking Schemes | All Streams and Subjects`,
        "description": "Sri Lankan Advanced Level Examination"
      },
      "hasPart": streamList
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
                <h1 className="text-4xl font-bold mb-4">Advanced Level Past Papers & Marking Schemes</h1>
                
                <div className="prose prose-lg mb-8">
                  <p className="text-gray-600">
                    Access Advanced Level past papers for all streams and subjects. Download or view papers and marking schemes for free. 
                    Perfect for exam preparation and practice.
                  </p>
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {alsubjects.map((stream, index) => {
                    const streamName = Object.keys(stream)[0];
                    const subjects = stream[streamName];
                    
                    return (
                      <div 
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                      >
                        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                          {streamName}
                        </h2>
                        
                        <div className="space-y-3">
                          {subjects.map((subject) => (
                            <Link
                              key={subject}
                              href={`/papers/al/${toUrlFormat(streamName)}/${toUrlFormat(subject)}`}
                              className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{subject}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About Advanced Level Past Papers</h2>
                  <div className="prose prose-lg">
                    <p>
                      Past papers are an essential resource for Advanced Level students preparing for their exams. 
                      They help you understand the exam format, question types, and marking schemes. 
                      Practicing with past papers will give you valuable insights into the examination pattern 
                      and help you identify important topics and question trends.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Available Streams</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      {alsubjects.map((stream, index) => {
                        const streamName = Object.keys(stream)[0];
                        return (
                          <li key={index}>
                            <span className="font-semibold">{streamName}:</span> {stream[streamName].join(', ')}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Advanced Level past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      AL exam papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Sri Lanka AL papers
                    </span>
                    {alsubjects.map((stream, index) => {
                      const streamName = Object.keys(stream)[0];
                      return (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {streamName} past papers
                        </span>
                      );
                    })}
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