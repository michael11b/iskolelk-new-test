import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { metadata } from './metadata';
import Navbar from '@/components/Navbar';
// import FooterCTA from '@/components/FooterCTA';
import AppPromoNav from '@/components/customAdds/AppPromoNav';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
                {/* Google AdSense - loads after hydration to avoid hydration mismatch */}
                <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9828418982566744"
          crossOrigin="anonymous"
        />
        {/* End Google AdSense */}

        <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NLF3N7DT');
            `
          }}
        />
        {/* End Google Tag Manager */}
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="google-adsense-account" content="ca-pub-9828418982566744"></meta>
      </head>
      <body className={inter.className}>
      <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-9828418982566744">
</amp-auto-ads>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NLF3N7DT"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Navbar />
        <AppPromoNav />
        {children}
        {/* <FooterCTA /> */}
      </body>
    </html>
  );
} 