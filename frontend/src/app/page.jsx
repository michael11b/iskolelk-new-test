import Link from 'next/link'
import Image from 'next/image'
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { years, alsubjects, olsubjects, scholarShipYears } from '@/data/data'
import { olFilters, alFilters, scholarshipFilters } from '@/data/dataNew'
import {mainPage} from '@/data/dataKeyWord'
import { toUrlFormat } from '@/utils/stringUtils'
import Head from 'next/head'
import FooterCTA from '@/components/FooterCTA'
import HomepageSearchSection from '@/components/HomepageSearchSection'
import AppPromoNav from '@/components/customAdds/AppPromoNav'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://iskolelk.com'; // TODO: Change this to the actual URL

const TestLandingPage = () => {
  // Mock data for testimonials
  const testimonials = [
    {
      name: 'Samantha Perera',
      role: 'AL Student',
      content: 'This website helped me ace my AL exams. The marking schemes were particularly helpful!',
      rating: 5
    },
    {
      name: 'Rajiv Kumar',
      role: 'OL Student',
      content: 'The organized collection of past papers made my exam preparation much easier.',
      rating: 5
    },
    {
      name: 'Nimali Silva',
      role: 'Teacher',
      content: 'A valuable resource for both students and teachers. Highly recommended!',
      rating: 5
    }
  ]

  // Mock data for features
  const features = [
    {
      title: 'Advanced Level Papers',
      description: 'Comprehensive collection of AL papers across all streams',
      icon: AcademicCapIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Ordinary Level Papers',
      description: 'Complete set of OL papers for all subjects',
      icon: BookOpenIcon,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Scholarship Papers',
      description: 'Special collection of scholarship exam papers',
      icon: DocumentTextIcon,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Marking Schemes',
      description: 'Detailed marking schemes for better understanding',
      icon: ChartBarIcon,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  // Helper function to get all AL streams and subjects
  const getALStreamsAndSubjects = () => {
    return alsubjects.map(streamObj => {
      const stream = Object.keys(streamObj)[0]
      return {
        stream,
        subjects: streamObj[stream]
      }
    })
  }

  // Mock stats data
  const stats = {
    totalPapers: 1000,
    totalDownloads: 5000,
    subjectsCovered: 25,
    yearsCovered: 10
  }

  // Structured data for homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IskoleLK",
    "url": SITE_URL,
    "description": "Download comprehensive collection of past papers for Sri Lankan AL, OL & Scholarship exams. Download papers with marking schemes in Sinhala, English & Tamil.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>IskoleLK | AL, OL & Scholarship Exam Papers</title>
        <meta name="description" content="Access comprehensive collection of past papers for Sri Lankan AL, OL & Scholarship exams. Download papers with marking schemes in Sinhala, English & Tamil." />
        <meta name="keywords" content="fuck you past papers, AL, OL, scholarship, Sri Lanka, marking schemes, exam resources" />
        <meta property="og:title" content="IskoleLK | AL, OL & Scholarship Exam Papers" />
        <meta property="og:description" content="Access comprehensive collection of past papers for Sri Lankan AL, OL & Scholarship exams. Download papers with marking schemes in Sinhala, English & Tamil." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IskoleLK | AL, OL & Scholarship Exam Papers" />
        <meta name="twitter:description" content="Access comprehensive collection of past papers for Sri Lankan AL, OL & Scholarship exams. Download papers with marking schemes in Sinhala, English & Tamil." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }} />
      </Head>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] lg:min-h-[90vh] overflow-hidden">
          {/* Animated wave gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 animate-wave-1"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-teal-500 to-blue-500 opacity-20 animate-wave-2"></div>
            <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 via-purple-500 to-indigo-500 opacity-25 animate-wave-3"></div>
          </div>
          
          {/* Content */}
          <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-2">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
              {/* Left side - Text content */}
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                  Download Past Papers for AL, OL & Scholarship Exams
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Download comprehensive past papers for AL, OL & Scholarship exams. Available in Sinhala, English & Tamil with detailed marking schemes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="#papers-section" 
                    className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105"
                  >
                    Browse Papers
                  </Link>
                  <Link 
                    href="#statistics" 
                    className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-gray-700 border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transform transition-all duration-200 hover:scale-105"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Right side - Hero Image - Hidden on mobile */}
              <div className="hidden lg:block lg:w-1/2 relative h-[500px] lg:h-[600px] w-full">
                <Image
                  src="/hero/student.png"
                  alt="Student studying with past papers"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Search Section */}
        <section id="search-section" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Find Your Paper</h2>
            <HomepageSearchSection />
          </div>
        </section>

        {/* Comprehensive Papers Section */}
        <section id="papers-section" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">All Available Papers</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* A/L Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">A/L Papers</h3>
                {getALStreamsAndSubjects().map(({ stream, subjects }) => (
                  <div key={stream} className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">{stream}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subjects.map(subject => (
                        <Link
                          key={subject}
                          href={`/papers/al/${toUrlFormat(stream)}/${toUrlFormat(subject)}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {subject}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* O/L Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-bold mb-6 text-green-600">O/L Papers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {olsubjects.map(subject => (
                    <Link
                      key={subject}
                      href={`/papers/ol/${toUrlFormat(subject)}`}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {subject}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Scholarship Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-600">Scholarship Papers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {scholarShipYears.map(({ year }) => (
                  <Link
                    key={year}
                    href={`/papers/scholarship/all/${year}`}
                    className="text-center py-2 px-4 bg-purple-50 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-colors"
                  >
                    {year}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="statistics" className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalPapers}+</div>
                <div className="text-gray-600">Total Papers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalDownloads}+</div>
                <div className="text-gray-600">Total Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.subjectsCovered}+</div>
                <div className="text-gray-600">Subjects Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.yearsCovered}+</div>
                <div className="text-gray-600">Years of Coverage</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <AppPromoNav />
        <FooterCTA />
      </div>
    </>
  )
}

export default TestLandingPage 