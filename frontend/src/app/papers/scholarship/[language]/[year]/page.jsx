import { getAccessibleFileUrl } from '@/utils/fileUrlHandler';
import FooterCTA from '@/components/FooterCTA';
import { getPapersServerSide } from '@/lib/serverPapers';
import InteractiveScholarshipViewer from './InteractiveScholarshipViewer';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const year = parseInt(params.year);
  const language = params.language.charAt(0).toUpperCase() + params.language.slice(1);
  
  const pageTitle = `Download ${year} Grade 5 Scholarship Past Papers and Marking Schemes | ${language} Medium`;
  const pageDescription = `Download ${year} Grade 5 Scholarship past paper and marking scheme in ${language} medium. Download or view papers and marking schemes for free.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download ${year} Grade 5 Scholarship past papers, Download Grade 5 Scholarship past exam papers, Download Grade 5 Scholarship past test papers, Download Grade 5 Scholarship past model papers, Download Grade 5 Scholarship past revision papers, Download Grade 5 Scholarship past study materials, Grade 5 Scholarship, past papers, ${year}, ${language} medium, marking scheme, solutions, Sri Lanka education`,
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
      canonical: `${SITE_URL}/papers/scholarship/${params.language}/${params.year}`,
    },
  };
}

// This function runs on the server side
async function getPapersData(language, year) {
  try {
    let filterData = {
      examType: 'scholarship',
      year: year,
    }
    if(language && language !== "all"){
      filterData.medium = language
    }
    
    const data = await getPapersServerSide(filterData);
    return data;
  } catch (error) {
    console.error('Error fetching scholarship papers:', error);
    return {
      data: { data: [] }
    };
  }
}

export default async function ScholarshipYearPage({ params }) {
  const year = parseInt(params.year);
  
  // Fetch data on the server side
  const data = await getPapersData(params.language, year);
  const papers = data.data.data || [];

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!papers || papers.length === 0) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Download ${year} Grade 5 Scholarship Past Papers - ${params.language.toUpperCase()} Medium`,
        "description": `Download ${year} Grade 5 Scholarship past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Download or view papers and marking schemes for free.`,
        "about": {
          "@type": `Download ${year} Grade 5 Scholarship Past Papers - ${params.language.toUpperCase()} Medium`,
          "name": "Grade 5 Scholarship",
          "description": `Download ${year} Grade 5 Scholarship past papers and Marking Scheme in ${params.language.toUpperCase()} medium. Download or view papers and marking schemes for free.`,
        },
        "hasPart": []
      };
    }

    const paperList = papers.map(paper => ({
      "@type": "EducationalResource",
      "name": `Download ${year} Grade 5 Scholarship ${year} Paper - ${params.language.toUpperCase()} Medium`,
      "description": `Download ${year} Grade 5 Scholarship past paper and Marking Scheme in ${params.language.toUpperCase()} medium.`,
      "educationalLevel": "Grade 5",
      "inLanguage": params.language,
      "learningResourceType": "Past Paper"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Download ${year} Grade 5 Scholarship Past Papers - ${params.language.toUpperCase()} Medium`,
      "description": `Download ${year} Grade 5 Scholarship past paper and Marking Scheme in ${params.language.toUpperCase()} medium. Download or view papers and marking schemes for free.`,
      "about": {
        "@type": "EducationalLevel",
        "name": `Download ${year} Grade 5 Scholarship Past Papers - ${params.language.toUpperCase()} Medium`,
        "description": `Download ${year} Grade 5 Scholarship past paper and Marking Scheme in ${params.language.toUpperCase()} medium. Download or view papers and marking schemes for free.`,
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
            Download {year} Grade 5 Scholarship Past Papers & Marking Schemes - {params.language.charAt(0).toUpperCase() + params.language.slice(1)} Medium
          </h1>
          
          <div className="prose prose-lg mb-8">
            <p className="text-gray-600">
              Download {year} Grade 5 Scholarship past papers. 
              Download or view papers and marking schemes for free. Perfect for exam preparation and practice.
            </p>
          </div>
          <SocialPromoBox variant="default" showDelay={0} dismissible={false} />
          {papers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">No papers available for {year} yet.</p>
              <p className="text-gray-500 mt-2">Check back later or browse other years.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {papers.map((paper) => (
                <div 
                  key={paper._id}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {paper.year} Grade 5 Scholarship {paper.medium} Medium Paper & Marking Scheme
                      </h2>
                    </div>
                    <InteractiveScholarshipViewer 
                      paper={paper}
                      year={year}
                    />
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
          )}

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">About {year} Grade 5 Scholarship Past Papers</h2>
            <div className="prose prose-lg">
              <p>
                Past papers are an essential resource for Grade 5 students preparing for the Scholarship Examination. 
                They help you understand the exam format, question types, and marking schemes. 
                Practicing with past papers from {year} will give you valuable insights into the examination pattern 
                and help you identify important topics and question trends.Download free past papers.
              </p>
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

          <div className="mt-8 bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">Additional Resources</h2>
            <div className="prose prose-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li>Textbooks and study guides for Grade 5</li>
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
                {year} Scholarship papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Grade 5 Scholarship {year}
              </span>
              {papers.length > 0 && (
                <>
                  {[...new Set(papers.map(paper => paper.medium))].map(medium => (
                    <span key={medium} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {year} {medium} medium Scholarship papers
                    </span>
                  ))}
                </>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {year} Scholarship marking scheme
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {year} Scholarship exam papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {year} Scholarship model papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {year} Scholarship revision papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {year} Scholarship study materials
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