'use client';

import React, { useState, useEffect } from 'react'

const SocialPromoBox = ({ variant = 'default', showDelay = 1000, dismissible = true }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [fbLoaded, setFbLoaded] = useState(false)

  // Check if user has previously dismissed this component
  useEffect(() => {
    const dismissed = localStorage.getItem('socialPromoDismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  // Show the component after a short delay to not interrupt initial page load
  useEffect(() => {
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, showDelay)
      return () => clearTimeout(timer)
    }
  }, [showDelay, isDismissed])

  // Load Facebook SDK
  useEffect(() => {
    if (isVisible && !fbLoaded) {
      // Check if FB SDK is already loaded
      if (window.FB) {
        setFbLoaded(true)
        return
      }

      // Load Facebook SDK
      const script = document.createElement('script')
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.onload = () => {
        window.FB.init({
          xfbml: true,
          version: 'v18.0'
        })
        setFbLoaded(true)
      }
      document.head.appendChild(script)

      return () => {
        // Cleanup
        const existingScript = document.querySelector('script[src*="connect.facebook.net"]')
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [isVisible, fbLoaded])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem('socialPromoDismissed', 'true')
  }

  const handleFacebookLike = () => {
    // Fallback: open Facebook page if embedded like doesn't work
    window.open('https://www.facebook.com/profile.php?id=61579831023803', '_blank')
  }

  const handleAppDownload = () => {
    const appPackage = 'com.iskolelk.app'
    const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackage}`
    const marketUrl = `market://details?id=${appPackage}`
    const intentUrl = `intent://details?id=${appPackage}#Intent;scheme=market;package=com.android.vending;end`
  
    const isAndroid = /Android/i.test(navigator.userAgent)
  
    if (isAndroid) {
      try {
        // Attempt to open Play Store app
        window.location.href = intentUrl
  
        // Fallback after 1 second if intent doesn’t work
        setTimeout(() => {
          window.location.href = playStoreUrl
        }, 1000)
      } catch (err) {
        window.open(playStoreUrl, '_blank')
      }
    } else {
      // Desktop, iOS, etc.
      window.open(playStoreUrl, '_blank')
    }
  
  }

  if (!isVisible) return null

  // Compact variant for smaller spaces
  if (variant === 'compact') {
    return (
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm relative">
        {/* Dismiss button for compact variant */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">📘 Like us for updates!</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {fbLoaded ? (
              <iframe
                src={`https://www.facebook.com/plugins/like.php?href=${encodeURIComponent('https://www.facebook.com/profile.php?id=61579831023803')}&width=100&layout=button_count&action=like&size=small&share=false&height=28&appId`}
                width="100"
                height="28"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Facebook Like Button"
              ></iframe>
            ) : (
              <button
                onClick={handleFacebookLike}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Like us on Facebook
              </button>
            )}
            <button
              onClick={handleAppDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              Download App
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg shadow-sm relative">
      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      <div className="flex items-center justify-between gap-3">
        {/* Left side - Facebook promotion */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
          {/* Facebook icon */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          </div>
          
          {/* Text content - simplified for mobile */}
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-800">
              <span className="hidden sm:inline">📘 Like us on Facebook to get new past papers faster!</span>
              <span className="sm:hidden">📘 Like us for updates!</span>
            </p>
            <p className="text-xs text-gray-600 hidden sm:block">
              Stay updated with latest papers and educational content
            </p>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-2">
          {/* Facebook Like button - Embedded */}
          <div className="flex items-center">
            {fbLoaded ? (
              <iframe
                src={`https://www.facebook.com/plugins/like.php?href=${encodeURIComponent('https://www.facebook.com/profile.php?id=61579831023803')}&width=100&layout=button_count&action=like&size=small&share=false&height=28&appId`}
                width="100"
                height="28"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
                title="Facebook Like Button"
              ></iframe>
            ) : (
              <button
                onClick={handleFacebookLike}
                className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.833 0-1.612.453-1.918 1.227z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium">Like us on Facebook</span>
              </button>
            )}
          </div>

          {/* Mobile app download */}
          <button
            onClick={handleAppDownload}
            className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            <span className="text-xs sm:text-sm font-medium">Download App</span>
          </button>
        </div>
      </div>

      {/* Mobile app info - only on mobile */}
      <div className="mt-2 sm:hidden text-center">
        <p className="text-xs text-gray-500">
          📱 App is out - download free!
        </p>
      </div>
    </div>
  )
}

export default SocialPromoBox