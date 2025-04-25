"use client"

import Link from "next/link"
import Image from "next/image"

export default function TechTeamSolutions() {
  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Hero Section with Unique Design */}
      <section className="relative -mt-14 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)] z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(9,10,17,0.8)_100%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-16">
              <Image
                src="../images/tts-logo-WHITE.png"
                alt="TechTeam Solutions Logo"
                width={600}
                height={150}
                className="h-40 w-auto"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Enterprise IT </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Comprehensive IT services designed to empower your business with cutting-edge technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-quote" className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Get Started
                <span className="ml-2">→</span>
              </Link>
              <Link href="#services" className="inline-flex items-center justify-center px-6 py-3 bg-white/5 text-white rounded-md hover:bg-white/10 transition-colors">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        {/* Glowing line separator */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
      </section>

      {/* Services Grid with Unique Layout */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Maintenance Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Maintenance</h3>
                <p className="text-gray-400 mb-4">
                  Routine maintenance to minimize IT downtime, enable maximum productivity, and reduce long-term IT costs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Updates & Security Patches
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    System Monitoring
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Data Backups
                  </li>
                </ul>
              </div>
            </div>

            {/* Emergency Services Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Emergency Services</h3>
                <p className="text-gray-400 mb-4">
                  Priority service for maintenance customers during IT emergencies to get your business back up and running quickly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Top Priority Response
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Rapid Resolution
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Business Continuity
                  </li>
                </ul>
              </div>
            </div>

            {/* Virus Protection Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Virus Protection</h3>
                <p className="text-gray-400 mb-4">
                  Preventive software solutions to protect your systems from viruses and malware before they cause damage.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Real-time Protection
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    System Scanning
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Threat Prevention
                  </li>
                </ul>
              </div>
            </div>

            {/* VOIP Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">VOIP Solutions</h3>
                <p className="text-gray-400 mb-4">
                  Internet-based phone systems for seamless communication between offices and with clients.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Call Center Solutions
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Multi-Office Integration
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Advanced Features
                  </li>
                </ul>
              </div>
            </div>

            {/* Email Migration Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Email Migration</h3>
                <p className="text-gray-400 mb-4">
                  Seamless email system transitions to keep your business operations running smoothly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Data Preservation
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Minimal Downtime
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    User Training
                  </li>
                </ul>
              </div>
            </div>

            {/* Cloud Services Card */}
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Cloud Services</h3>
                <p className="text-gray-400 mb-4">
                  Comprehensive cloud solutions using Microsoft Azure/AWS, including hybrid and on-premises options.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Azure/AWS Integration
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Hybrid Solutions
                  </li>
                  <li className="flex items-center text-gray-400">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    Custom Server Setup
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Unique Design */}
      <section className="py-24 relative bg-[#0F1015]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Why Choose </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Tech Team Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Experience the difference with our comprehensive IT solutions and dedicated support team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Maintenance",
                description: "Minimize downtime and reduce long-term IT costs with our comprehensive maintenance services",
                icon: (
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )
              },
              {
                title: "Proactive Monitoring",
                description: "Prevent issues before they impact your business",
                icon: (
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Custom Solutions",
                description: "Tailored IT solutions for your specific business needs",
                icon: (
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-[#1A1B23] p-6 rounded-lg border border-gray-800 hover:border-red-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#e9eae3] mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TechTeam Printers Section */}
      <section className="py-24 relative bg-[#0F1015]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Enterprise </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Print Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Discover our comprehensive range of enterprise-grade printers and multifunction devices.
            </p>
          </div>
          
          {/* Printer Catalog Card */}
          <div className="max-w-3xl mx-auto">
            <div className="group relative bg-[#1A1B23] rounded-xl overflow-hidden border border-gray-800 hover:border-red-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-8 relative">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">Printer Catalog</h3>
                <p className="text-gray-400 mb-6">
                  Browse our selection of high-performance enterprise printers and multifunction devices. Find the perfect printing solution for your business needs.
                </p>
                <Link 
                  href="/tech-team-printers" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  View Printer Catalog
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Unique Design */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Ready to Transform Your </span>
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                IT Infrastructure
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how our IT solutions can help your business thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-quote" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-lg">
                Get Started
                <span className="ml-2">→</span>
              </Link>
              <Link href="/about#contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white rounded-md hover:bg-white/10 transition-colors text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 