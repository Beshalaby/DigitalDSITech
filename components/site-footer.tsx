'use client';

import Link from "next/link"
import { useEffect, useState } from 'react'

export function SiteFooter() {
  const [isFooterBlack, setIsFooterBlack] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isNearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsFooterBlack(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer 
      className={`${isFooterBlack ? 'bg-black' : 'bg-[#090A11]'}`}
      style={{
        transition: 'background-color 1s ease',
        paddingTop: '60px',
        paddingBottom: '40px',
      }}
    >
      {/* Glowing line separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-70 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-white mb-8">Digital DSI</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>30 Years of Excellence</p>
              <p>24/7 Support Available</p>
              <p>Personalized IT Solutions</p>
              <p>Customer-Focused Service</p>
            </div>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white hover:text-gray-300">ABOUT US</Link></li>
              <li><Link href="/careers" className="text-white hover:text-gray-300">CAREERS</Link></li>
              <li><Link href="/#testimonials" className="text-white hover:text-gray-300">SUCCESS STORIES</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">MANAGED IT SERVICES</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">VOIP</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">IT PROJECTS</Link></li>
              <li><Link href="/copiers-printers" className="text-white hover:text-gray-300">MANAGED PRINT</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">IT CONSULTING</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">SECURITY SOLUTIONS</Link></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">SOLUTIONS</h4>
            <ul className="space-y-2">
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">CLOUD SERVICES</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">BACKUP & RECOVERY</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">NETWORK DESIGN</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">24/7 MONITORING</Link></li>
              <li><Link href="/copiers-printers" className="text-white hover:text-gray-300">HARDWARE SOLUTIONS</Link></li>
              <li><Link href="/tech-team-solutions" className="text-white hover:text-gray-300">CYBERSECURITY</Link></li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-400 uppercase mb-4">FOLLOW US</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/tech-team-solutions-md/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <Link 
                href="https://x.com/techteammd" 
                className="text-white hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link 
                href="https://www.facebook.com/techteamsolutionsmd/" 
                className="text-white hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/#contact" className="text-white hover:text-gray-300">CONTACT US</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}