'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, ChartBarIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { years, alsubjects, olsubjects, scholarShipYears } from '@/data/data'
import { getAllPapers } from '@/actions/papers'
import { toast } from 'react-hot-toast'

const TestLandingPage = () => {
  const [stats, setStats] = useState({
    totalPapers: 0,
    totalDownloads: 0,
    subjectsCovered: 0,
    yearsCovered: 0
  })

  const [searchExamType, setSearchExamType] = useState('')
  const [searchStream, setSearchStream] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [searchMedium, setSearchMedium] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchSectionRef = useRef(null)

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

  // Get available streams for AL
  const getAvailableStreams = () => {
    return alsubjects.map(subject => Object.keys(subject)[0])
  }

  // Get available subjects based on exam type and stream
  const getAvailableSubjects = () => {
    if (searchExamType === 'AL' && searchStream) {
      const streamSubjects = alsubjects.find(subject => 
        Object.keys(subject)[0] === searchStream
      )
      return streamSubjects ? streamSubjects[searchStream] : []
    } else if (searchExamType === 'OL') {
      return olsubjects
    }
    return []
  }

  const handleSearch = async () => {
    try {
      setIsSearching(true)
      setHasSearched(true)

      // Build search params
      const searchParams = {
        examType: searchExamType,
        year: searchYear,
        medium: searchMedium,
      }

      // Add conditional params
      if (searchExamType === 'AL') {
        searchParams.stream = searchStream
        if (searchStream) {
          searchParams.subject = searchSubject
        }
      } else if (searchExamType === 'OL') {
        searchParams.subject = searchSubject
      }

      // Remove empty params
      Object.keys(searchParams).forEach(key => 
        !searchParams[key] && delete searchParams[key]
      )

      const results = await getAllPapers(searchParams)
      setSearchResults(results)
    } catch (error) {
      toast.error(error.message || 'Failed to search papers')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchSectionRef.current && !searchSectionRef.current.contains(event.target)) {
        setHasSearched(false)
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh]lg:min-h-[90vh] overflow-hidden">
        {/* Animated wave gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 animate-wave-1"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-teal-500 to-blue-500 opacity-20 animate-wave-2"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 via-purple-500 to-indigo-500 opacity-25 animate-wave-3"></div>
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                Access Past Papers for AL, OL & Scholarship Exams
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Access comprehensive past papers for AL, OL & Scholarship exams. Available in Sinhala, English & Tamil with detailed marking schemes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/papers" 
                  className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105"
                >
                  Browse Papers
                </Link>
                <Link 
                  href="#features" 
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Find Your Paper</h2>
          <div className="max-w-4xl mx-auto" ref={searchSectionRef}>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {/* Exam Type - Always enabled */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={searchExamType}
                    onChange={(e) => {
                      setSearchExamType(e.target.value)
                      setSearchStream('')
                      setSearchSubject('')
                    }}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select Exam Type</option>
                    <option value="AL">A/L Papers</option>
                    <option value="OL">O/L Papers</option>
                    <option value="Scholarship">Scholarship Papers</option>
                  </select>
                </div>

                {/* Stream - Visible for AL, disabled if not selected */}
                <div className={searchExamType === 'AL' ? 'opacity-100' : 'opacity-50'}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stream {searchExamType === 'AL' && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={searchStream}
                    onChange={(e) => {
                      setSearchStream(e.target.value)
                      setSearchSubject('')
                    }}
                    disabled={searchExamType !== 'AL'}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Stream</option>
                    {getAvailableStreams().map((stream) => (
                      <option key={stream} value={stream}>{stream}</option>
                    ))}
                  </select>
                </div>

                {/* Subject - Visible but disabled based on conditions */}
                <div className={searchExamType && searchExamType !== 'Scholarship' ? 'opacity-100' : 'opacity-50'}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject {(searchExamType === 'OL' || (searchExamType === 'AL' && searchStream)) && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    value={searchSubject}
                    onChange={(e) => setSearchSubject(e.target.value)}
                    disabled={!searchExamType || (searchExamType === 'AL' && !searchStream) || searchExamType === 'Scholarship'}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Subject</option>
                    {getAvailableSubjects().map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                {/* Year - Always visible but disabled if no exam type */}
                <div className={searchExamType ? 'opacity-100' : 'opacity-50'}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                    disabled={!searchExamType}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year.year} value={year.year}>{year.year}</option>
                    ))}
                  </select>
                </div>

                {/* Medium - Always visible but disabled if no exam type */}
                <div className={searchExamType ? 'opacity-100' : 'opacity-50'}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medium <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={searchMedium}
                    onChange={(e) => setSearchMedium(e.target.value)}
                    disabled={!searchExamType}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Medium</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>

              {/* Search button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSearch}
                  disabled={!searchExamType || isSearching}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  {isSearching ? 'Searching...' : 'Search Papers'}
                </button>
              </div>

              {/* Helper text */}
              <p className="text-sm text-gray-500 text-center mt-4">
                {!searchExamType 
                  ? "Select an exam type to start searching"
                  : searchExamType === 'AL' && !searchStream
                  ? "Select a stream to see available subjects"
                  : "All fields marked with * are required"}
              </p>
            </div>

            {/* Search Results */}
            {hasSearched && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Search Results</h3>
                {isSearching ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stream</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medium</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {searchResults.map((paper) => (
                            <tr key={paper._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.examType}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.stream || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.subject || '-'}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.year}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.medium}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <Link
                                  href={`/papers/${paper._id}`}
                                  className="text-blue-600 hover:text-blue-900 font-medium"
                                >
                                  View Paper
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-500">No papers found matching your search criteria.</p>
                    <p className="text-sm text-gray-400 mt-2">Try adjusting your search filters.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comprehensive Papers Section */}
      <section className="py-16">
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
                        href={`/papers/al/${encodeURIComponent(stream)}/${encodeURIComponent(subject)}`}
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
                    href={`/papers/ol/${encodeURIComponent(subject)}`}
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
                  href={`/papers/scholarship/${year}`}
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
      <section className="py-16">
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

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Exam Preparation?</h2>
          <p className="text-xl mb-8">Join thousands of students who have improved their grades with our past papers</p>
          <Link 
            href="/papers" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default TestLandingPage 



