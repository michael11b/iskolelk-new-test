'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { getAllPapers } from '@/actions/papers'
import { toast } from 'react-hot-toast'
import { toUrlFormat } from '@/utils/stringUtils'
import { years, alsubjects, olsubjects, scholarShipYears } from '@/data/data'

const InteractiveSearchSection = () => {
  const [searchExamType, setSearchExamType] = useState('')
  const [searchStream, setSearchStream] = useState('')
  const [searchSubject, setSearchSubject] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [searchMedium, setSearchMedium] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const searchSectionRef = useRef(null)

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
    if (searchExamType === 'al' && searchStream) {
      const streamSubjects = alsubjects.find(subject => 
        Object.keys(subject)[0] === searchStream
      )
      return streamSubjects ? streamSubjects[searchStream] : []
    } else if (searchExamType === 'ol') {
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
      if (searchExamType === 'al') {
        searchParams.stream = searchStream
        if (searchStream) {
          searchParams.subject = searchSubject
        }
      } else if (searchExamType === 'ol') {
        searchParams.subject = searchSubject
      }

      // Remove empty params
      Object.keys(searchParams).forEach(key => 
        !searchParams[key] && delete searchParams[key]
      )

      const results = await getAllPapers(searchParams)
      setSearchResults(results.data.data)
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
    <div className="bg-white p-6 rounded-lg shadow-md" ref={searchSectionRef}>
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
            <option value="al">A/L Papers</option>
            <option value="ol">O/L Papers</option>
            <option value="scholarship">Scholarship Papers</option>
          </select>
        </div>

        {/* Stream - Visible for AL, disabled if not selected */}
        <div className={searchExamType === 'al' ? 'opacity-100' : 'opacity-50'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stream {searchExamType === 'al' && <span className="text-red-500">*</span>}
          </label>
          <select
            value={searchStream}
            onChange={(e) => {
              setSearchStream(e.target.value)
              setSearchSubject('')
            }}
            disabled={searchExamType !== 'al'}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Stream</option>
            {getAvailableStreams().map((stream) => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>
        </div>

        {/* Subject - Visible but disabled based on conditions */}
        <div className={searchExamType && searchExamType !== 'scholarship' ? 'opacity-100' : 'opacity-50'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject {(searchExamType === 'ol' || (searchExamType === 'al' && searchStream)) && <span className="text-red-500">*</span>}
          </label>
          <select
            value={searchSubject}
            onChange={(e) => setSearchSubject(e.target.value)}
            disabled={!searchExamType || (searchExamType === 'al' && !searchStream) || searchExamType === 'scholarship'}
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
            <option value="sinhala">Sinhala</option>
            <option value="english">English</option>
            <option value="tamil">Tamil</option>
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
          : searchExamType === 'al' && !searchStream
          ? "Select a stream to see available subjects"
          : "All fields marked with * are required"}
      </p>

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
                            href={
                              paper.examType === 'al' 
                                ? `/papers/${paper.examType.toLowerCase()}/${toUrlFormat(paper.stream)}/${toUrlFormat(paper.subject)}/${paper.medium}/${paper.year}`
                                : paper.examType === 'ol'
                                ? `/papers/${paper.examType.toLowerCase()}/${toUrlFormat(paper.subject)}/${paper.medium}/${paper.year}`
                                : `/papers/${paper.examType.toLowerCase()}/${paper.medium}/${paper.year}`
                            }
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
  )
}

export default InteractiveSearchSection
