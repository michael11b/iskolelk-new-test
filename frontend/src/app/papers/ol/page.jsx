import { olsubjects } from '@/data/data';
import Link from 'next/link';
import { toUrlFormat } from '@/utils/stringUtils';
import FooterCTA from '@/components/FooterCTA';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata() {
  const pageTitle = "Download O/L (Ordinary Level) Past Papers and Marking Schemes | All Subjects";
  const pageDescription = "Download O/L (Ordinary Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free. Perfect for exam preparation.";
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: "Download O/L (Ordinary Level) past papers, Download O/L (Ordinary Level) past exam papers, Download O/L (Ordinary Level) past test papers, Download O/L (Ordinary Level) past model papers, Download O/L (Ordinary Level) past revision papers, Download O/L (Ordinary Level) past study materials, O/L (Ordinary Level), OL, past papers, Sri Lanka education, exam preparation, Science, Mathematics, English, Sinhala, Tamil",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      images: [`${SITE_URL}/opengraph/ol-main.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${SITE_URL}/opengraph/ol-main.png`],
    },
    alternates: {
      canonical: `${SITE_URL}/papers/ol`,
    },
  };
}

export default function OLPapersPage() {
  // Generate structured data for SEO
  const generateStructuredData = () => {
    const subjectList = olsubjects.map(subject => ({
      "@type": "EducationalSubject",
      "name": subject,
      "description": `Ordinary Level ${subject} past papers and resources`,
      "educationalLevel": "Ordinary Level"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Download O/L (Ordinary Level) Past Papers and Marking Schemes",
      "description": "Download O/L (Ordinary Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free.",
      "about": {
        "@type": "EducationalLevel",
        "name": "Download O/L (Ordinary Level) Past Papers and Marking Schemes",
        "description": "Download O/L (Ordinary Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free.",  
      },
      "hasPart": subjectList
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
                <h1 className="text-4xl font-bold mb-4">Download O/L (Ordinary Level) Past Papers and Marking Schemes</h1>
                
                <div className="prose prose-lg mb-8">
                  <p className="text-gray-600">
                    Download O/L (Ordinary Level) past papers and marking scheme for all subjects. Download or view papers and marking schemes for free. 
                    Perfect for exam preparation and practice.
                  </p>
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {olsubjects.map((subject) => (
                    <Link
                      key={subject}
                      href={`/papers/ol/${toUrlFormat(subject)}`}
                      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h2 className="text-xl font-semibold text-green-600">{subject}</h2>
                    </Link>
                  ))}
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />


                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About O/L (Ordinary Level) Past Papers</h2>
                  <div className="prose prose-lg">
                    <p>
                      Past papers are an essential resource for Ordinary Level students preparing for their exams. 
                      They help you understand the exam format, question types, and marking schemes. 
                      Practicing with past papers will give you valuable insights into the examination pattern 
                      and help you identify important topics and question trends.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-green-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-green-800">Available Subjects</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      {olsubjects.map((subject, index) => (
                        <li key={index}>
                          <Link 
                            href={`/papers/ol/${toUrlFormat(subject)}`}
                            className="text-green-600 hover:text-green-800"
                          >
                            {subject}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Tips for Using Past Papers Effectively</h2>
                  <div className="prose prose-lg">
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <span className="font-semibold">Start Early:</span> Begin practicing with past papers well before your exams to identify areas that need improvement.
                      </li>
                      <li>
                        <span className="font-semibold">Time Management:</span> Practice under exam conditions to improve your time management skills.
                      </li>
                      <li>
                        <span className="font-semibold">Review Marking Schemes:</span> Study the marking schemes to understand how answers are evaluated.
                      </li>
                      <li>
                        <span className="font-semibold">Identify Patterns:</span> Look for recurring topics and question types across different years.
                      </li>
                      <li>
                        <span className="font-semibold">Seek Help:</span> If you're struggling with certain topics, don't hesitate to seek help from teachers or peers.
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Ordinary Level past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      OL exam papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Sri Lanka OL papers
                    </span>
                    {olsubjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {subject} past papers
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