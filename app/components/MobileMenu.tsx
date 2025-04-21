'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-menu fixed top-4 right-4 z-50 md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              href="/"
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 