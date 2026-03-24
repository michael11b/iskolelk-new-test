import Link from 'next/link';

export default function FooterCTA() {
  const year = new Date().getFullYear();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500">
      {/* Animated wave gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 animate-wave-1"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-teal-500 to-blue-500 opacity-20 animate-wave-2"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 via-purple-500 to-indigo-500 opacity-25 animate-wave-3"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Exam Preparation?</h2>
        <p className="text-xl mb-8 text-white">IskoleLK is Sri Lanka’s largest collection of past papers and marking schemes for A/L, O/L, and Scholarship exams. Our mission is to help every student prepare smarter with free, well-organized resources that make exam success more achievable.Join thousands of students who have improved their grades with our past papers</p>
        <Link 
          href="#papers-section" 
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
        >
          Get Started Now
        </Link>
      </div>
      {/* Social Media and Footer Extension for CTA Section */}
      <div className="relative z-10 mt-2">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            {/* LinkedIn SVG */}
            <svg className="w-6 h-6 text-white hover:text-blue-400 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            {/* Twitter SVG */}
            <svg className="w-6 h-6 text-white hover:text-blue-300 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            {/* GitHub SVG */}
            <svg className="w-6 h-6 text-white hover:text-gray-300 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            {/* Facebook SVG */}
            <svg className="w-6 h-6 text-white hover:text-blue-500 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
        </div>
        {/* Divider */}
        <div className="border-t border-white/30 mb-2"></div>
        {/* Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm gap-2 py-2 px-6">
          <div>©{year} IskoleLK. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="font-semibold underline hover:text-blue-200 transition-colors">Contact</Link>
            <Link href="/terms" className="font-semibold underline hover:text-blue-200 transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="font-semibold underline hover:text-blue-200 transition-colors">Privacy Policy</Link>
            <a href="/sitemap.xml" className="font-semibold underline hover:text-blue-200">Sitemap</a>
          </div>
          <div>
            Made with <span className="text-pink-400">♥</span> by <span className="font-semibold underline">SL</span>
          </div>
        </div>
      </div>
    </section>
  );
} 