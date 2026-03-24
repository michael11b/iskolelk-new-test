'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { alFilters, olFilters } from '@/data/dataNew'
import { toUrlFormat } from '@/utils/stringUtils'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileScreen, setMobileScreen] = useState('main') // 'main', 'al', 'ol'
  const [selectedStream, setSelectedStream] = useState(null)

  // Helper function to get all AL streams and subjects from new data structure
  const getALStreamsAndSubjects = () => {
    const streamMap = new Map()
    
    alFilters.streams.forEach(stream => {
      if (stream.stream && stream.subject) {
        if (!streamMap.has(stream.stream)) {
          streamMap.set(stream.stream, [])
        }
        streamMap.get(stream.stream).push(stream.subject)
      }
    })
    
    return Array.from(streamMap.entries()).map(([stream, subjects]) => ({
      stream,
      subjects: subjects.sort()
    }))
  }

  const handleMobileMenuClick = (screen) => {
    setMobileScreen(screen)
    setSelectedStream(null)
  }

  const handleBackClick = () => {
    if (selectedStream) {
      setSelectedStream(null)
    } else {
      setMobileScreen('main')
    }
  }

  const renderMobileScreen = () => {
    switch (mobileScreen) {
      case 'al':
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <button
                onClick={handleBackClick}
                className="flex items-center text-blue-600 font-medium"
              >
                <ChevronDownIcon className="h-5 w-5 rotate-90 mr-1" />
                Back
              </button>
              <span className="text-xl font-semibold text-gray-900">A/L Papers</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {selectedStream ? (
                <div className="px-4 py-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">{selectedStream}</h3>
                  <div className="space-y-2">
                    {getALStreamsAndSubjects()
                      .find(s => s.stream === selectedStream)
                      ?.subjects.map(subject => (
                        <Link
                          key={subject}
                          href={`/papers/al/${toUrlFormat(selectedStream)}/${toUrlFormat(subject)}`}
                          className="block px-3 py-2 text-base text-gray-900 hover:bg-gray-50 rounded-md"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subject}
                        </Link>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6">
                  <div className="space-y-4">
                    {getALStreamsAndSubjects().map(({ stream }) => (
                      <button
                        key={stream}
                        onClick={() => setSelectedStream(stream)}
                        className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                      >
                        <span>{stream}</span>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 'ol':
        return (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <button
                onClick={handleBackClick}
                className="flex items-center text-blue-600 font-medium"
              >
                <ChevronDownIcon className="h-5 w-5 rotate-90 mr-1" />
                Back
              </button>
              <span className="text-xl font-semibold text-gray-900">O/L Papers</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-2">
                {olFilters.streams.map(stream => (
                  <Link
                    key={stream.subject}
                    href={`/papers/ol/${toUrlFormat(stream.subject)}`}
                    className="block px-3 py-2 text-base text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {stream.subject}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <span className="text-xl font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="px-2 py-4">
              <div className="space-y-1">
                <button
                  onClick={() => handleMobileMenuClick('al')}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                >
                  A/L Papers
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  onClick={() => handleMobileMenuClick('ol')}
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                >
                  O/L Papers
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </button>
                <Link
                  href="/papers/scholarship"
                  className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Scholarship Papers
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
                <Link
                  href="/search"
                  className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Search Papers
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="mr-8">
              <img src="/logo/logo.png" alt="IskoleLK Logo" className="h-12" />
            </Link>
            {/* <Link href="/" className="text-xl font-bold text-blue-600 mr-8">
              IskoleLK
            </Link> */}

            {/* Desktop navigation */}
            <div className="hidden sm:flex sm:space-x-8">
              {/* AL Papers */}
              <div 
                className="relative group inline-flex items-center h-16"
                onMouseEnter={() => setActiveMenu('al')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="inline-flex items-center h-full px-1 text-sm font-medium text-gray-900 border-b-2 border-transparent group-hover:border-gray-300">
                  A/L Papers
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${activeMenu === 'al' ? 'rotate-180' : ''}`} />
                </button>

                {/* AL Mega Menu */}
                <div className={`absolute top-full left-0 w-screen max-w-screen-lg bg-white rounded-lg shadow-lg border border-gray-100 transform transition-all duration-200 ${activeMenu === 'al' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                  {/* Arrow indicator */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
                  
                  <div className="relative bg-white rounded-lg p-6">
                    <div className="grid grid-cols-3 gap-8">
                      {getALStreamsAndSubjects().map(({ stream, subjects }) => (
                        <div key={stream} className="relative">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b">{stream}</h3>
                          <ul className="space-y-2">
                            {subjects.map(subject => (
                              <li key={subject}>
                                <Link 
                                  href={`/papers/al/${toUrlFormat(stream)}/${toUrlFormat(subject)}`}
                                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1"
                                >
                                  {subject}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* OL Papers */}
              <div 
                className="relative group inline-flex items-center h-16"
                onMouseEnter={() => setActiveMenu('ol')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="inline-flex items-center h-full px-1 text-sm font-medium text-gray-900 border-b-2 border-transparent group-hover:border-gray-300">
                  O/L Papers
                  <ChevronDownIcon className={`ml-2 h-4 w-4 transition-transform duration-200 ${activeMenu === 'ol' ? 'rotate-180' : ''}`} />
                </button>

                {/* OL Mega Menu */}
                <div className={`absolute top-full left-0 w-screen max-w-md bg-white rounded-lg shadow-lg border border-gray-100 transform transition-all duration-200 ${activeMenu === 'ol' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                  {/* Arrow indicator */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
                  
                  <div className="relative bg-white rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {olFilters.streams.map(stream => (
                        <Link 
                          key={stream.subject}
                          href={`/papers/ol/${toUrlFormat(stream.subject)}`}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors block py-1"
                        >
                          {stream.subject}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scholarship Papers */}
              <Link 
                href="/papers/scholarship"
                className="inline-flex items-center h-16 px-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              >
                Scholarship Papers
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center">
              <Link
                href="/#search-section"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                onClick={(e) => {
                  // If we're already on the home page, prevent default and scroll
                  if (window.location.pathname === '/') {
                    e.preventDefault();
                    const searchSection = document.getElementById('search-section');
                    if (searchSection) {
                      searchSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                Search Papers
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(true)
                setMobileScreen('main')
                setSelectedStream(null)
              }}
              className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 overflow-hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-gray-800/40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {renderMobileScreen()}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 