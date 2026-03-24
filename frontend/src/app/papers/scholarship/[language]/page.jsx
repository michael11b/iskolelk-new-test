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
  const language = params.language.charAt(0).toUpperCase() + params.language.slice(1);
  
  const pageTitle = `Download Scholarship Exam Past Papers and Marking Schemes | ${language} Medium`;
  const pageDescription = `Download Scholarship exam past papers and marking scheme in ${language} medium. Includes marking schemes and solutions. Free access to past papers.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download Grade 5 Scholarship past papers, Download Scholarship exam past papers, Download Scholarship exam past exam papers, Download Scholarship exam past test papers, Download Scholarship exam past model papers, Download Scholarship exam past revision papers, Download Scholarship exam past study materials, Scholarship exam, past papers, ${language} medium, marking scheme, solutions, Sri Lanka education, exam preparation`,
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
      canonical: `${SITE_URL}/papers/scholarship/${params.language}`,
    },
  };
}

// This function runs on the server side
async function getPapersData(language, page = 1) {
  try {
    const data = await getPapersServerSide({ 
      examType: 'scholarship',
      medium: language,
      page: page,
      limit: 100
    });
    return data;
  } catch (error) {
    console.error('Error fetching scholarship papers:', error);
    return {
      data: { data: [], pagination: { pages: 1, total: 0, limit: 100 } }
    };
  }
}

export default async function ScholarshipLanguagePage({ params, searchParams }) {
  // Get current page from search params, default to 1
  const currentPage = parseInt(searchParams.page) || 1;
  
  // Fetch data on the server side
  const data = await getPapersData(params.language, currentPage);
  const papers = data.data.data || [];
  const pagination = data.data.pagination || { pages: 1, total: 0, limit: 100 };
  
  const totalPages = pagination.pages;
  const totalItems = pagination.total;
  const showingFrom = (currentPage - 1) * pagination.limit + 1;
  const showingTo = Math.min(currentPage * pagination.limit, pagination.total);

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!papers || papers.length === 0) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Download Scholarship Exam Past Papers - ${params.language.toUpperCase()} Medium`,
        "description": `Download  Scholarship exam past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Includes marking schemes and solutions.`,
        "about": {
          "@type": `Download Scholarship Exam Past Papers - ${params.language.toUpperCase()} Medium`,
          "name": "Scholarship Exam",
          "description": `Download Scholarship exam past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Includes marking schemes and solutions.`,
        },
        "hasPart": []
      };
    }

    const paperList = papers.map(paper => ({
      "@type": "EducationalResource",
      "name": `Download Grade 5 Scholarship Exam ${paper.year} ${paper.session} Paper ${paper.paperNumber} - ${params.language.toUpperCase()} Medium`,
      "description": `Download Grade 5 Scholarship exam past paper and marking schemes in ${params.language.toUpperCase()} medium.`,
      "educationalLevel": "Scholarship Exam",
      "inLanguage": params.language,
      "learningResourceType": "Past Paper"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Download Scholarship Exam Past Papers and Marking Schemes - ${params.language.toUpperCase()} Medium`,
      "description": `Download Scholarship exam past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Includes marking schemes and solutions.`,
      "about": {
        "@type": `Download Scholarship Exam Past Papers and Marking Schemes - ${params.language.toUpperCase()} Medium`,
        "name": `Download Scholarship Exam Past Papers and Marking Schemes - ${params.language.toUpperCase()} Medium`,
        "description": `Download Scholarship exam past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Includes marking schemes and solutions.`,
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
                <h1 className="text-4xl font-bold mb-4">
                  Download Grade 5Scholarship Exam Past Papers & Marking Schemes - {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium
                </h1>
                
                <div className="prose prose-lg mb-8">
                  <p className="text-gray-600">
                    Download all Grade 5 Scholarship exam past papers in {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium. 
                    Download or view papers and marking schemes for free. Perfect for exam preparation and practice.
                  </p>
                </div>
                <SocialPromoBox variant="default" showDelay={0} dismissible={false} />

                {papers.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-lg">No {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium papers available yet.</p>
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
                              <h2 className="text-2xl font-semibold mb-2">
                                {paper.year} Grade 5 Scholarship Exam Past Paper & Marking Scheme - {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium
                              </h2>
                              <div className="space-y-2">
                                <p className="text-gray-600">
                                  <span className="font-medium">Medium:</span> {paper.medium.charAt(0).toUpperCase() + paper.medium.slice(1)}
                                </p>
                              </div>
                            </div>
                            <Link 
                              href={`/papers/scholarship/${params.language}/${paper.year}`}
                              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
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
                        baseUrl={`/papers/scholarship/${params.language}`}
                        showingFrom={showingFrom}
                        showingTo={showingTo}
                        totalItems={totalItems}
                      />
                    </div>
                  </>
                )}
                            <SocialPromoBox variant="default" showDelay={0} dismissible={false} />


                <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4">About Grade 5 Scholarship Exam Past Papers - {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium</h2>
                  <div className="prose prose-lg">
                    <p>
                      Past papers in {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium are an essential resource for Scholarship exam preparation. 
                      They help you understand the exam format, question types, and marking schemes in your preferred language. 
                      Practicing with {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium past papers will give you valuable insights into the examination pattern 
                      and help you identify important topics and question trends.
                    </p>
                    <p className="mt-4">
                      All papers are available for downloading in {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium and include marking schemes where available. 
                      Use these resources to improve your exam technique and boost your confidence before the actual examination.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-yellow-800">Tips for Using {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium Past Papers Effectively</h2>
                  <div className="prose prose-lg">
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <span className="font-semibold">Start Early:</span> Begin practicing with {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium past papers well before your exams to identify areas that need improvement.
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
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Additional Resources for {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium</h2>
                  <div className="prose prose-lg">
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Textbooks and study guides in {params.language.charAt(0).toUpperCase() + params.language.slice(1)}</li>
                      <li>Online tutorials and video lessons in {params.language.charAt(0).toUpperCase() + params.language.slice(1)}</li>
                    </ul>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="mt-8 bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms - {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium</h2>
                  <div className="flex flex-wrap gap-2">
                    {/* Base keywords with language */}
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship exam {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium past papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium papers
                    </span>
                    
                    {/* Dynamic keywords based on available years */}
                    {papers.length > 0 && (
                      <>
                        {[...new Set(papers.map(paper => paper.year))].map(year => (
                          <span key={year} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            Scholarship {year} {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium past papers
                          </span>
                        ))}
                      </>
                    )}

                    {/* Session-specific keywords */}
                    {papers.length > 0 && (
                      <>
                        {[...new Set(papers.map(paper => paper.session))].map((session, index) => (
                          <span key={`${session}-${index}`} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            Scholarship {session} {params.language.charAt(0).toUpperCase() + params.language.slice(1)} medium past papers
                          </span>
                        ))}
                      </>
                    )}

                    {/* Additional relevant keywords with language */}
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language} medium marking scheme
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language} medium exam papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language} medium model papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language} medium revision papers
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scholarship {params.language} medium study materials
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