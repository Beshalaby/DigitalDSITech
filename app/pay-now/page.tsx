"use client"

import { useEffect, useState } from "react"

export default function PayNowPage() {
  const [iframeHeight, setIframeHeight] = useState(600);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Add resize listener to adjust iframe height on window resize
    const handleResize = () => {
      // Adjust height based on window size
      const newHeight = window.innerWidth < 768 ? 700 : 600;
      setIframeHeight(newHeight);
    };

    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Hero Section */}
      <section className="relative -mt-14 pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,10,17,0.8)_100%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-[#e1e1e1]">Secure </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Payment
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl">
              Process your payment securely using our encrypted payment system.
            </p>
            <br/>
            <p className="text-[#e9eae3] text-lg mt-4 font-semibold text-white-400">
              THIS PORTAL IS ONLY FOR DIGITAL DSI AND TECH TEAM SOLUTIONS CUSTOMERS. To pay a quote for Document Solutions, please call 301-777-7999.
            </p>
            <br/>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1A1B23] rounded-lg p-4 sm:p-8 border border-gray-800">
              {/* Loading placeholder */}
              {!iframeLoaded && (
                <div className="w-full flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-[#e9eae3]">Loading payment form...</p>
                </div>
              )}
              
              {/* External payment form iframe */}
              <iframe 
                src="https://pay.ecpgateway.com/techteam-solutions" 
                width="100%" 
                height={iframeHeight}
                style={{
                  border: "none",
                  display: iframeLoaded ? "block" : "none"
                }}
                onLoad={() => setIframeLoaded(true)}
                title="Payment Form"
                allow="payment"
              />
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Your payment information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 