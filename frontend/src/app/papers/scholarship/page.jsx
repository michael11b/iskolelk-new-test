import { scholarShipYears } from '@/data/data';
import FooterCTA from '@/components/FooterCTA';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata() {
  const pageTitle = "Download Grade 5 Scholarship Exam Past Papers | Sri Lanka Education";
  const pageDescription = "Download Grade 5 Scholarship exam past papers and Marking Schemes. Includes marking schemes and solutions. Free access to past papers.";
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: "Download Grade 5 Scholarship exam past papers, Download Scholarship exam past papers, Download Scholarship exam past exam papers, Download Scholarship exam past test papers, Download Scholarship exam past model papers, Download Scholarship exam past revision papers, Download Scholarship exam past study materials, Scholarship exam, past papers, marking scheme, solutions, Sri Lanka education, exam preparation",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      images: [`${SITE_URL}/opengraph/scholarship-main.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${SITE_URL}/opengraph/scholarship-main.png`],
    },
    alternates: {
      canonical: `${SITE_URL}/papers/scholarship`,
    },
  };
}

export default function ScholarshipPage() {
  const languages = [
    { name: 'Sinhala', code: 'sinhala' },
    { name: 'English', code: 'english' },
    { name: 'Tamil', code: 'tamil' }
  ];

  // Generate structured data for SEO
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Download Grade 5 Scholarship Exam Past Papers and Marking Schemes",
      "description": "Download Grade 5 Scholarship past papers and marking schemes. Download or view papers for free. Perfect for exam preparation and practice.",
      "about": {
        "@type": "EducationalLevel",
        "name": "Download Grade 5 Scholarship Exam Past Papers and Marking Schemes",
        "description": "Download Grade 5 Scholarship past papers and marking schemes. Download or view papers for free. Perfect for exam preparation and practice."
      },
      "url": `${SITE_URL}/papers/scholarship`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": scholarShipYears.map((year, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "EducationalResource",
            "name": `Download  Grade 5 Scholarship Past Papers and Marking Schemes `,
            "description": `Download Grade 5 Scholarship past papers and Marking Schemes. Download or view papers and marking schemes.`,
            "educationalLevel": "Grade 5",
            "learningResourceType": "Past Paper"
          }
        }))
      }
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
                {/* Language Selection Section */}
                <div className="text-center mb-16">
                  <h1 className="text-3xl font-bold mb-6">
                    Select Language for Scholarship Exam
                  </h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {languages.map((language) => (
                      <a
                        key={language.code}
                        href={`/papers/scholarship/${language.code}`}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-yellow-500"
                      >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {language.name}
                        </h2>
                        <p className="text-gray-600">
                          View papers in {language.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Papers Section */}
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Grade 5 Scholarship Exam Past Papers & Marking Schemes
                  </h2>
                  
                  <div className="prose prose-lg mb-8 text-center">
                    <p className="text-gray-600">
                      Browse all available Scholarship exam past papers. 
                      Papers are available in multiple languages and include marking schemes where available.
                    </p>
                  </div>
                  <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                  <div className="space-y-6">
                    {scholarShipYears.map((yearData) => (
                      <div 
                        key={yearData.year}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-semibold mb-2">
                              {yearData.year} Grade 5 Scholarship Exam Past Papers
                            </h3>
                            <div className="space-y-2">
                              <p className="text-gray-600">
                                <span className="font-medium">Available Mediums:</span> Sinhala, English, Tamil
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {languages.map((language) => (
                              <a
                                key={language.code}
                                href={`/papers/scholarship/${language.code}/${yearData.year}`}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                              >
                                {language.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                  <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About Scholarship Exam Past Papers</h2>
                  <div className="prose prose-lg">
                    <p>
                      Past papers are an essential resource for Scholarship exam preparation. 
                      They help you understand the exam format, question types, and marking schemes. 
                      Practicing with past papers will give you valuable insights into the examination pattern 
                      and help you identify important topics and question trends.
                    </p>
                    <p className="mt-4">
                      All papers are available in multiple mediums and include marking schemes where available. 
                      Use these resources to improve your exam technique and boost your confidence before the actual examination.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Tips for Using Past Papers Effectively</h2>
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

                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Additional Resources</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Textbooks and study guides</li>
                      <li>Online tutorials and video lessons</li>
                      <li>Practice questions and quizzes</li>
                      <li>Study groups and discussion forums</li>
                      <li>Teacher's guides and notes</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship exam past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Grade 5 scholarship papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Sri Lanka scholarship exam
                    </span>
                    {scholarShipYears.map((yearData) => (
                      <span key={yearData.year} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {yearData.year} scholarship papers
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