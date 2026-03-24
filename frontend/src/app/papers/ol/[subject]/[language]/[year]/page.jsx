import { fromUrlFormat, capitalizeWords } from '@/utils/stringUtils';
import FooterCTA from '@/components/FooterCTA';
import InteractiveOLPaperViewer from './InteractiveOLPaperViewer';
import { getPapersServerSide } from '@/lib/serverPapers';
import SocialPromoBox from '@/components/customSocialMedia/SocialPromoBox';
import AppPromoNav from '@/components/customAdds/AppPromoNav';
import RightSidePromo from '@/components/customAdds/RightSidePromo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com';

// This function runs on the server side
async function getPapersData(subject, year, language) {
  try {
    const data = await getPapersServerSide({ 
      examType: 'ol',
      subject: subject,
      year: year,
      medium: language || ""
    });
    return data.data.data;
  } catch (error) {
    console.error('Error fetching OL papers:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  const year = parseInt(params.year);
  
  const pageTitle = `Download ${year} O/L ${subject} Past Papers and Marking Schemes | ${params.language.toUpperCase()} Medium`;
  const pageDescription = `Download ${year} O/L ${subject} past paper in ${params.language.toUpperCase()} medium. Includes marking schemes and past paper. Free access to past papers.`;
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `Download ${year} O/L ${subject} past papers, Download ${subject} past papers, Download ${year} ${subject} ol past paper, Download ${subject} past exam papers, Download ${subject} past test papers, Download ${subject} past model papers, Download ${subject} past revision papers, Download ${subject} past study materials, ${subject}, Ordinary Level, OL, past papers, ${year}, ${params.language.toUpperCase()} medium, marking scheme, solutions, Sri Lanka education`,
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
      canonical: `${SITE_URL}/papers/ol/${params.subject}/${params.language}/${params.year}`,
    },
  };
}

export default async function OLYearPage({ params }) {
  const subject = capitalizeWords(fromUrlFormat(params.subject));
  const year = parseInt(params.year);
  const language = params?.language || "";
  
  // Fetch data on the server side
  let papers = [];
  try {
    papers = await getPapersData(params.subject, year, language);
  } catch (error) {
    console.error('Failed to fetch papers:', error);
    // papers will remain an empty array, which is handled gracefully in the UI
  }

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!papers || papers.length === 0) {
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Download ${year} O/L ${subject} Past Papers and Marking Schemes | ${language.toUpperCase()} Medium`,
        "description": `Download ${year} O/L ${subject} past paper in ${language.toUpperCase()} medium. Includes marking schemes and past paper. Free access to past papers.`,
        "about": {
          "@type": "EducationalSubject",
          "name": `Download ${year} O/L ${subject} Past Papers and Marking Schemes | ${language.toUpperCase()} Medium`,
          "description": `Download ${year} O/L ${subject} past paper in ${language.toUpperCase()} medium. Includes marking schemes and past paper. Free access to past papers.`,  
          "educationalLevel": "Ordinary Level"
        },
        "hasPart": []
      };
    }

    const paperList = papers.map(paper => ({
      "@type": "EducationalResource",
      "name": `Download ${year} O/L ${subject} ${paper.session} Paper ${paper.paperNumber} - ${language.toUpperCase()} Medium`,
      "description": `Download ${year} O/L ${subject} past paper  ${paper.session} session in ${language.toUpperCase()} medium.`,
      "educationalLevel": "Ordinary Level",
      "inLanguage": language,
      "learningResourceType": "Past Paper"
    }));

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Download ${year} O/L ${subject} Past Papers and Marking Schemes | ${language.toUpperCase()} Medium`,
      "description": `Download ${year} O/L ${subject} past papers in ${language.toUpperCase()} medium. Includes marking schemes and past paper. Free access to past papers.`,
      "about": {
        "@type": "EducationalSubject",
        "name": `Download ${year} O/L ${subject} Past Papers and Marking Schemes | ${language.toUpperCase()} Medium`,
        "description": `Download ${year} O/L ${subject} past paper in ${language.toUpperCase()} medium. Includes marking schemes and past paper. Free access to past papers.`,
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-4">
            Download {year} {subject} OL (Ordinary Level Past Papers & Marking Schemes - {language.charAt(0).toUpperCase() + language.slice(1)} Medium
          </h1>
          
          <div className="prose prose-lg mb-8">
            <p className="text-gray-600">
              Download {subject} Ordinary Level past papers from {year} in {language.charAt(0).toUpperCase() + language.slice(1)} medium. 
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
            <InteractiveOLPaperViewer 
              papers={papers}
              subject={subject}
              year={year}
              language={language}
            />
          )}

          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">About {subject} Ordinary Level Past Papers - {language.charAt(0).toUpperCase() + language.slice(1)} Medium</h2>
            <div className="prose prose-lg">
              <p>
                Past papers in {language.charAt(0).toUpperCase() + language.slice(1)} medium are an essential resource for Ordinary Level students preparing for their exams. 
                They help you understand the exam format, question types, and marking schemes in your preferred language. 
                Practicing with {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers from {year} will give you valuable insights into the examination pattern 
                and help you identify important topics and question trends.
              </p>
              <p className="mt-4">
                All papers are available for downloading in {language.charAt(0).toUpperCase() + language.slice(1)} medium and include marking schemes 
                where available. Use these resources to improve your exam technique and boost your confidence 
                before the actual examination.
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
                <li>Textbooks and study guides for {subject}</li>
                <li>Online tutorials and video lessons</li>
                <li>Practice questions and quizzes</li>
                <li>Study groups and discussion forums</li>
                <li>Teacher's guides and notes</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-purple-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Related Search Terms - {language.charAt(0).toUpperCase() + language.slice(1)} Medium</h2>
            <div className="flex flex-wrap gap-2">
              {/* Base keywords with language */}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language.charAt(0).toUpperCase() + language.slice(1)} medium past papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                Ordinary Level {subject} {year} {language.charAt(0).toUpperCase() + language.slice(1)}
              </span>
              
              {/* Session-specific keywords */}
              {papers.length > 0 && (
                <>
                  {[...new Set(papers.map(paper => paper.session))].map((session, index) => (
                    <span key={`${session}-${index}`} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {subject} {year} {session} {language.charAt(0).toUpperCase() + language.slice(1)} medium papers
                    </span>
                  ))}
                </>
              )}

              {/* Additional relevant keywords with language */}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language} medium marking scheme
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language} medium exam papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language} medium model papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language} medium revision papers
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {subject} {year} {language} medium study materials
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