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
  const stream = capitalizeWords(fromUrlFormat(params.stream));
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  
  const pageTitle = `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes | ${stream} Stream | ${params.language.toUpperCase()} Medium`;
  const pageDescription = `Download ${subject} A/L (Advanced Level) past papers and marking scheme in ${params.language.toUpperCase()} medium. Includes marking schemes and solutions. Free access to ${stream} stream past papers.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download ${subject} A/L (Advanced Level) past papers, Download ${subject} past exam papers, Download ${subject} past test papers, Download ${subject} past model papers, Download ${subject} past revision papers, Download ${subject} past study materials, ${subject}, Advanced Level, AL, past papers, ${stream}, ${params.language.toUpperCase()} medium, marking scheme, solutions, Sri Lanka education, exam preparation`,
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
      canonical: `${SITE_URL}/papers/al/${params.stream}/${params.subject}/${params.language}`,
    },
  };
}

// This function runs on the server side
async function getPapersData(stream, subject, language, page = 1) {
  try {
    const data = await getPapersServerSide({ 
      examType: 'al',
      stream: stream,
      subject: subject,
      medium: language,
      page: page,
      limit: 100
    });
    return data;
  } catch (error) {
    console.error('Error fetching AL papers:', error);
    return {
      data: { data: [], pagination: { pages: 1, total: 0, limit: 100 } }
    };
  }
}

export default async function ALSubjectPage({ params, searchParams }) {
  const stream = capitalizeWords(fromUrlFormat(params.stream));
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  const language = params.language;
  
  // Get current page from search params, default to 1
  const currentPage = parseInt(searchParams.page) || 1;
  
  // Fetch data on the server side
  const data = await getPapersData(params.stream, params.subject, language, currentPage);
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
        "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes - ${language.toUpperCase()} Medium`,
        "description": `Download and view ${subject} Advanced Level past papers in ${language.toUpperCase()} medium. Includes marking schemes and solutions for ${stream} stream.`,
        "about": {
          "@type": "EducationalSubject",
          "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes - ${language.toUpperCase()} Medium`,
          "description": `Download ${subject} A/L (Advanced Level) past papers and marking scheme in ${language.toUpperCase()} medium. Includes marking schemes and solutions. Free access to ${stream} stream past papers.`,
        },
        "hasPart": []
      };
    }

    const paperList = papers.map(paper => ({
      "@type": "EducationalResource",
      "name": `Download ${subject} A/L ${paper.year} ${paper.session} Papers and Marking Scheme ${paper.paperNumber} - ${language.toUpperCase()} Medium`,
      "description": `Download A/L (Advanced Level) ${subject} past paper from ${paper.year} ${paper.session} session in ${language.toUpperCase()} medium.`,
      "educationalLevel": "Advanced Level",
      "inLanguage": language,
      "learningResourceType": "Past Paper"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes - ${language.toUpperCase()} Medium`,
      "description": `Download and view ${subject} Advanced Level past papers in ${language.toUpperCase()} medium. Includes marking schemes and solutions for ${stream} stream.`,
      "about": {
        "@type": "EducationalSubject",
        "name": `Download ${subject} A/L (Advanced Level) Past Papers and Marking Schemes - ${language.toUpperCase()} Medium`,
        "description": `Download ${subject} A/L (Advanced Level) past papers and marking scheme in ${language.toUpperCase()} medium. Includes marking schemes and solutions. Free access to ${stream} stream past papers.`,
        // "educationalLevel": "Advanced Level"
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-4">
            Download {subject} A/L (Advanced Level) Past Papers & Marking Schemes - {language.charAt(0).toUpperCase() + language.slice(1)} Medium
          </h1>
          
          <div className="prose prose-lg mb-8">
            <p className="text-gray-600">
              Download all {subject} A/L (Advanced Level) past papers & marking schemes for the {stream} stream in {language.charAt(0).toUpperCase() + language.slice(1)} medium. 
              Download or view papers and marking schemes for free. Perfect for exam preparation and practice.
            </p>
          </div>
          <SocialPromoBox variant="default" showDelay={1} dismissible={false} />

          {papers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No {language.charAt(0).toUpperCase() + language.slice(1)} medium papers available for this subject yet.</p>
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
                          Download {paper.year} {paper.examType} {subject} Past Paper & Marking Scheme - {language.charAt(0).toUpperCase() + language.slice(1)} Medium
                        </h2>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Medium:</span> {paper.medium.charAt(0).toUpperCase() + paper.medium.slice(1)}
                          </p>
                        </div>
                      </div>
                      <Link 
                        href={`/papers/al/${params.stream}/${params.subject}/${language}/${paper.year}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
                  baseUrl={`/papers/al/${params.stream}/${params.subject}/${params.language}`}
                  showingFrom={showingFrom}
                  showingTo={showingTo}
                  totalItems={totalItems}
                />
              </div>
            </>
          )}
                      <SocialPromoBox variant="default" showDelay={0} dismissible={false} />


          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">About {subject} A/L (Advanced Level) Past Papers - {language.charAt(0).toUpperCase() + language.slice(1)} Medium</h2>
            <div className="prose prose-lg">
              <p>
                Past papers in {language.charAt(0).toUpperCase() + language.slice(1)} medium are an essential resource for Advanced Level students preparing for their exams. 
                They help you understand the exam format, question types, and marking schemes in your preferred language. 
                Practicing with {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers will give you valuable insights into the examination pattern 
                and help you identify important topics and question trends.
              </p>
              <p className="mt-4">
                All papers are available for downloading in {language.charAt(0).toUpperCase() + language.slice(1)} medium and include marking schemes where available. 
                Use these resources to improve your exam technique and boost your confidence before the actual examination.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Tips for Using {language.charAt(0).toUpperCase() + language.slice(1)} Medium Past Papers Effectively</h2>
            <div className="prose prose-lg">
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <span className="font-semibold">Start Early:</span> Begin practicing with {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers well before your exams to identify areas that need improvement.
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

          <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-green-800">Additional Resources for {language.charAt(0).toUpperCase() + language.slice(1)} Medium</h2>
            <div className="prose prose-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li>Textbooks and study guides for {subject} in {language.charAt(0).toUpperCase() + language.slice(1)}</li>
                <li>Online tutorials and video lessons in {language.charAt(0).toUpperCase() + language.slice(1)}</li>
              </ul>
            </div>
          </div>

          {/* Keywords Section */}
          <div className="mt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms - {language.charAt(0).toUpperCase() + language.slice(1)} Medium</h2>
            <div className="flex flex-wrap gap-2">
              {/* Base keywords with language */}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {stream} stream {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Advanced Level {subject} {language.charAt(0).toUpperCase() + language.slice(1)}
              </span>
              
              {/* Dynamic keywords based on available years */}
              {papers.length > 0 && (
                <>
                  {[...new Set(papers.map(paper => paper.year))].map(year => (
                    <span key={year} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} {year} {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers
                    </span>
                  ))}
                </>
              )}

              {/* Session-specific keywords */}
              {papers.length > 0 && (
                <>
                  {[...new Set(papers.map(paper => paper.session))].map((session, index) => (
                    <span key={`${session}-${index}`} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} {session} {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers
                    </span>
                  ))}
                </>
              )}

              {/* Additional relevant keywords with language */}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language} medium marking scheme
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language} medium exam papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language} medium model papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language} medium revision papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {language} medium study materials
              </span>
            </div>
          </div>
            </div>

            {/* Right sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8">
                <RightSidePromo />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile promo - Bottom of page */}
      <div className="lg:hidden bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-sm mx-auto">
            <RightSidePromo />
          </div>
        </div>
      </div>

      <AppPromoNav />
      <FooterCTA />
    </>
  );
}
