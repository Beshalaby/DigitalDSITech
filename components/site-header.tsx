"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { usePathname } from 'next/navigation'

export function SiteHeader() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Determine the correct image path based on the route
  // Check for both '/' and potential trailing slash for home
  const isHomePage = pathname === '/' || pathname === ''; 
  const imageSrc = isHomePage 
    ? './images/dsi-logo-horizontal.png' 
    : '../images/dsi-logo-horizontal.png';

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu')
      const menuButton = document.getElementById('menu-button')
      if (mobileMenu && !mobileMenu.contains(event.target as Node) && 
          menuButton && !menuButton.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-[100] w-full transition-colors duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-14 items-center justify-between relative">
        <Link href="/" className="flex-shrink-0 relative z-[101]">
          <Image
            src={imageSrc}
            alt="Digital DSI Logo"
            width={180}
            height={40}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center gap-6">
          <Link 
            href="/"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            HOME
          </Link>
          <Link
            href="/copiers-printers" 
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            COPIERS/PRINTERS
          </Link>
          <Link
            href="/tech-team-solutions" 
            className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            IT SOLUTIONS
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-1 h-3 w-3 opacity-70"
            >
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            ABOUT
          </Link>
          <Link 
            href="/careers" 
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            CAREERS
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/request-quote">
            <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/5 px-4 py-2 text-sm">
              Request a Quote
            </Button>
          </Link>
          <Link href="/pay-now">
            <Button className="bg-white text-black hover:bg-white/90 px-4 py-2 text-sm font-medium rounded-md">
              Pay Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white/90 hover:text-white transition-colors relative z-[102]"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 w-64 bg-black border-l border-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden z-[102] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          <div className="flex-1 space-y-6">
            <Link 
              href="/"
              className="block text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/copiers-printers" 
              className="block text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              COPIERS/PRINTERS
            </Link>
            <Link
              href="/tech-team-solutions" 
              className="flex items-center text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              IT SOLUTIONS
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-1 h-3 w-3 opacity-70"
              >
                <path d="M7 17L17 7"></path>
                <path d="M7 7h10v10"></path>
              </svg>
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link 
              href="/careers" 
              className="block text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CAREERS
            </Link>
          </div>
          
          <div className="space-y-4 pt-6 border-t border-gray-800">
            <Link href="/request-quote" className="block w-full">
              <Button variant="ghost" className="w-full text-white/90 hover:text-white hover:bg-white/5 px-4 py-2 text-sm">
                Request a Quote
              </Button>
            </Link>
            <Link href="/pay-now" className="block w-full">
              <Button className="w-full bg-white text-black hover:bg-white/90 px-4 py-2 text-sm font-medium rounded-md">
                Pay Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-[101]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

