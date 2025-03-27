"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function SiteFooter() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    services: false,
    company: false,
    support: false
  })

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <footer className="bg-[#090A11] border-t border-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info - Always visible */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dsi-logo-horizontal-50aca6ef456c52a6c1fd9182624df141-CmZ0xbu4VmGpgHdSxsF7ZDbJhOkG2W.png"
                alt="Digital DSI Logo"
                width={180}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted partner for IT solutions and hardware services.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/digital-dsi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-1.613-.114-2.193-.127-.58-.72-1.182-1.56-1.182-1.108 0-1.582.842-1.582 1.83v5.149h-3v-11h2.832v1.576c.51-.918 1.428-1.576 2.428-1.576 1.805 0 3.158 1.18 3.158 3.714v6.286z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/digitaldsi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services Section - Collapsible on mobile */}
          <div className="md:block">
            <button 
              onClick={() => toggleSection('services')}
              className="flex items-center justify-between w-full md:hidden text-white mb-4"
            >
              <span className="text-lg font-semibold">Services</span>
              {openSections.services ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div className={`space-y-3 ${openSections.services ? 'block' : 'hidden md:block'}`}>
              <h3 className="text-lg font-semibold text-white hidden md:block mb-4">Services</h3>
              <Link href="/copiers-printers" className="block text-gray-400 hover:text-white transition-colors py-1">
                Copiers & Printers
              </Link>
              <Link href="/tech-team-solutions" className="block text-gray-400 hover:text-white transition-colors py-1">
                IT Solutions
              </Link>
              <Link href="/managed-services" className="block text-gray-400 hover:text-white transition-colors py-1">
                Managed Services
              </Link>
              <Link href="/cloud-solutions" className="block text-gray-400 hover:text-white transition-colors py-1">
                Cloud Solutions
              </Link>
            </div>
          </div>

          {/* Company Section - Collapsible on mobile */}
          <div className="md:block">
            <button 
              onClick={() => toggleSection('company')}
              className="flex items-center justify-between w-full md:hidden text-white mb-4"
            >
              <span className="text-lg font-semibold">Company</span>
              {openSections.company ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div className={`space-y-3 ${openSections.company ? 'block' : 'hidden md:block'}`}>
              <h3 className="text-lg font-semibold text-white hidden md:block mb-4">Company</h3>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors py-1">
                About Us
              </Link>
              <Link href="/careers" className="block text-gray-400 hover:text-white transition-colors py-1">
                Careers
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors py-1">
                Contact
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-white transition-colors py-1">
                Blog
              </Link>
            </div>
          </div>

          {/* Support Section - Collapsible on mobile */}
          <div className="md:block">
            <button 
              onClick={() => toggleSection('support')}
              className="flex items-center justify-between w-full md:hidden text-white mb-4"
            >
              <span className="text-lg font-semibold">Support</span>
              {openSections.support ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div className={`space-y-3 ${openSections.support ? 'block' : 'hidden md:block'}`}>
              <h3 className="text-lg font-semibold text-white hidden md:block mb-4">Support</h3>
              <Link href="/request-quote" className="block text-gray-400 hover:text-white transition-colors py-1">
                Request a Quote
              </Link>
              <Link href="/pay-now" className="block text-gray-400 hover:text-white transition-colors py-1">
                Pay Now
              </Link>
              <Link href="/support" className="block text-gray-400 hover:text-white transition-colors py-1">
                Technical Support
              </Link>
              <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors py-1">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} Digital DSI. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}