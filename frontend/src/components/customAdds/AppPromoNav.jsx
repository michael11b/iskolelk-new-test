"use client";
import React from 'react'

const AppPromoNav = () => {
  // const handleDownloadClick = () => {
  //   // Replace with your actual Play Store URL
  //   window.open('https://play.google.com/store/apps/details?id=com.iskolelk.app', '_blank')
  // }
  const handleDownloadClick = () => {

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



  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 px-3 sm:px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left side - Text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile icon */}
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                  </svg>
                </div>
              </div>
              
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                  <span className="inline sm:hidden">📱 App launched!</span>
                  <span className="hidden sm:inline md:hidden">📱 Mobile app launched!</span>
                  <span className="hidden md:inline">📱 We've launched our IskoleLK mobile app!</span>
                </p>
                <p className="text-xs sm:text-sm text-white/90 leading-tight">
                  <span className="hidden sm:inline">Download for free on Google Play Store</span>
                  <span className="sm:hidden">Free on Play Store</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Download button */}
          <div className="flex-shrink-0">
            <button
              onClick={handleDownloadClick}
              className="flex items-center space-x-1 sm:space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {/* Play Store icon */}
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
              </div>
              
              {/* Button text - responsive visibility */}
              <span className="hidden sm:inline text-xs sm:text-sm font-medium">
                Download
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12 animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default AppPromoNav