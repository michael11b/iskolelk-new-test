'use client';

import React, { useState, useEffect } from 'react'

const RightSidePromo = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show the component after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // const handleAppDownload = () => {
  //   window.open('https://play.google.com/store/apps/details?id=com.iskolelk.app', '_blank')
  // }


  const handleAppDownload = () => {
    const appPackage = 'com.iskolelk.app'
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackage}`
    const marketUrl = `market://details?id=${appPackage}`
    const intentUrl = `intent://details?id=${appPackage}#Intent;scheme=market;package=com.android.vending;end`
  
    const isAndroid = /Android/i.test(navigator.userAgent)
  
    if (isAndroid) {
      // Try opening the Play Store app directly
      try {
        window.location.href = intentUrl
  
        // Fallback if intent fails after 1 second
        setTimeout(() => {
          window.location.href = playStoreUrl
        }, 1000)
      } catch (err) {
        window.open(playStoreUrl, '_blank')
      }
    } else {
      // Default behavior for desktop/iOS
      window.open(playStoreUrl, '_blank')
    }
  }
  


  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          📱 IskoleLK App
        </h3>
        <p className="text-sm text-gray-600">
          Now Available!
        </p>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          Download our mobile app for easier access to past papers, offline reading, and notifications for new papers.
        </p>
        
        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Offline access to papers
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Push notifications
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <svg className="w-3 h-3 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            Faster downloads
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleAppDownload}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
          </svg>
          <span>Download Free</span>
        </button>

        {/* Rating */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <p className="text-xs text-gray-500">4.8/5 rating</p>
        </div>
      </div>
    </div>
  )
}

export default RightSidePromo