"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-sm"
    >
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dsi-logo-horizontal-50aca6ef456c52a6c1fd9182624df141-CmZ0xbu4VmGpgHdSxsF7ZDbJhOkG2W.png"
            alt="Digital DSI Logo"
            width={180}
            height={40}
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex items-center gap-6">
          <Link 
            href="/?skipIntro=true" 
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
          >
            IT SOLUTIONS
            <span className="ml-1 text-xs opacity-70">↗</span>
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
          className="lg:hidden text-white/90 hover:text-white transition-colors"
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
        className={`fixed inset-y-0 right-0 w-64 bg-black border-l border-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex-1 space-y-6">
            <Link 
              href="/?skipIntro=true" 
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
              className="block text-sm font-medium text-white/90 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              IT SOLUTIONS
              <span className="ml-1 text-xs opacity-70">↗</span>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}

