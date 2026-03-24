import { fromUrlFormat, capitalizeWords, toUrlFormat } from '@/utils/stringUtils';
import Link from 'next/link';
import ServerPagination from '@/components/ServerPagination';
import FooterCTA from '@/components/FooterCTA';
import { getPapersServerSide } from '@/lib/serverPapers';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  
  const pageTitle = `Download ${subject} (O/L) Ordinary Level Past Papers and Marking Schemes`;
  const pageDescription = `Download ${subject} (O/L) Ordinary Level past papers and marking scheme. Includes marking schemes and solutions. Free access to past papers.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download ${subject} ol past papers, Download ${subject} past exam papers, Download ${subject} past test papers, Download ${subject} past model papers, Download ${subject} past revision papers, Download ${subject} past study materials, ${subject}, Ordinary Level, OL, past papers, marking scheme, solutions, Sri Lanka education, exam preparation`,
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
      canonical: `${SITE_URL}/papers/ol/${params.subject}`,
    },
  };
}

// This function runs on the server side
async function getPapersData(subject, page = 1) {
  try {
    const data = await getPapersServerSide({ 
      examType: 'ol',
      subject: subject,
      page: page,
      limit: 100,
    });
    return data;
  } catch (error) {
    console.error('Error fetching OL papers:', error);
    return {
      data: { data: [], pagination: { pages: 1, total: 0, limit: 100 } }
    };
  }
}

export default async function OLSubjectPage({ params, searchParams }) {
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  
  // Get current page from search params, default to 1
  const currentPage = parseInt(searchParams.page) || 1;
  
  // Fetch data on the server side
  const data = await getPapersData(params.subject, currentPage);
  const papers = data.data.data || [];
  const pagination = data.data.pagination || { pages: 1, total: 0, limit: 100 };
  
  const totalPages = pagination.pages;
  const totalItems = pagination.total;
  const showingFrom = (currentPage - 1) * pagination.limit + 1;
  const showingTo = Math.min(currentPage * pagination.limit, pagination.total);

  const languages = [
    { name: 'Sinhala', code: 'sinhala' },
    { name: 'English', code: 'english' },
    { name: 'Tamil', code: 'tamil' }
  ];

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!papers || papers.length === 0) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Download ${subject} (O/L) Ordinary Level Past Papers and Marking Schemes`,
        "description": `Download ${subject} (O/L) Ordinary Level past papers and marking scheme. Includes marking schemes and solutions. Free access to past papers.`,
        "about": {
          "@type": "EducationalSubject",
          "name": `Download ${subject} (O/L) Ordinary Level Past Papers and Marking Schemes`,
          "description": `Download ${subject} (O/L) Ordinary Level past papers and marking scheme. Includes marking schemes and solutions. Free access to past papers.`,
          "educationalLevel": "Ordinary Level"
        },
        "hasPart": []
      };
    }

    const paperList = papers.map(paper => ({
      "@type": "EducationalResource",
      "name": `Download ${subject} O/L ${paper.year} ${paper.session} Paper and Marking Scheme ${paper.paperNumber}`,
      "description": `Ordinary Level ${subject} past paper from ${paper.year} ${paper.session} session. Medium: ${paper.medium}`,
      "educationalLevel": "Ordinary Level",
      "datePublished": paper.createdAt,
      "inLanguage": paper.medium,
      "learningResourceType": "Past Paper"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${subject} Ordinary Level Past Papers`,
      "description": `Download and view ${subject} Ordinary Level past papers. Includes marking schemes and solutions.`,
      "about": {
        "@type": "EducationalSubject",
        "name": subject,
        "educationalLevel": "Ordinary Level"
      },
      "hasPart": paperList
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
                    Select Language for {subject}
                  </h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {languages.map((language) => (
                      <Link
                        key={language.code}
                        href={`/papers/ol/${params.subject}/${language.code}`}
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-green-500"
                      >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                          {language.name}
                        </h2>
                        <p className="text-gray-600">
                          View papers in {language.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Papers Section */}
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Download {subject} OL (Ordinary Level) Past Papers & Marking Schemes
                  </h2>
                  
                  <div className="prose prose-lg mb-8 text-center">
                    <p className="text-gray-600">
                      Browse all available {subject} O/L (Ordinary Level) past papers. 
                      Papers are available in multiple languages and include marking schemes where available.
                    </p>
                  </div>
                  <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                  {papers.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-lg">No papers available for this subject yet.</p>
                      <p className="text-gray-500 mt-2">Check back later for updates.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-6">
                        {papers.map((paper) => (
                          <div 
                            key={paper._id}
                            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-2xl font-semibold mb-2">
                                  Download {paper.year} {paper.examType} {subject} Past Paper & Marking Scheme ({paper.medium.charAt(0).toUpperCase() + paper.medium.slice(1)} Medium)
                                </h3>
                                <div className="space-y-2">
                                  <p className="text-gray-600">
                                    <span className="font-medium">Medium:</span> {paper.medium.charAt(0).toUpperCase() + paper.medium.slice(1)}
                                  </p>
                                </div>
                              </div>
                              <Link 
                                href={`/papers/ol/${params.subject}/${paper.medium}/${paper.year}`}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                              >
                                View Papers
                              </Link>
                            </div>
                            {paper.notes && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                                <p className="text-gray-700">
                                  <span className="font-semibold">Notes:</span> {paper.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <ServerPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          baseUrl={`/papers/ol/${params.subject}`}
                          showingFrom={showingFrom}
                          showingTo={showingTo}
                          totalItems={totalItems}
                        />
                      </div>
                    </>
                  )}
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />


                {/* About Section */}
                <div className="mt-16 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About {subject} O/L (Ordinary Level) Past Papers</h2>
                  <div className="prose prose-lg">
                    <p>
                      Past papers are an essential resource for O/L (Ordinary Level) students preparing for their exams. 
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

                {/* Tips Section */}
                <div className="mt-8 bg-green-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-green-800">Tips for Using Past Papers Effectively</h2>
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

                {/* Additional Resources */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-800">Additional Resources</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Textbooks and study guides for {subject}</li>
                      <li>Online tutorials and video lessons</li>
                      <li>Practice questions and quizzes</li>
                      <li>Study groups and discussion forums</li>
                      <li>Teacher's guides and notes</li>
                    </ul>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms</h2>
                  <div className="flex flex-wrap gap-2">
                    {/* Base keywords */}
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} ol past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Ordinary Level {subject}
                    </span>
                    
                    {/* Dynamic keywords based on available years */}
                    {papers.length > 0 && (
                      <>
                        {[...new Set(papers.map(paper => paper.year))].map(year => (
                          <span key={year} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {subject} {year} ol past papers
                          </span>
                        ))}
                      </>
                    )}

                    {/* Medium-specific keywords */}
                    {papers.length > 0 && (
                      <>
                        {[...new Set(papers.map(paper => paper.medium))].map(medium => (
                          <span key={medium} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {subject} {medium} ol medium past papers
                          </span>
                        ))}
                      </>
                    )}

                    {/* Session-specific keywords */}
                    {papers.length > 0 && (
                      <>
                        {[...new Set(papers.map(paper => paper.session))].map((session, index) => (
                          <span key={`${session}-${index}`} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {subject} {session} ol past papers
                          </span>
                        ))}
                      </>
                    )}

                    {/* Additional relevant keywords */}
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} ol marking scheme
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} exam papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} model papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} revision papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} study materials
                    </span>
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