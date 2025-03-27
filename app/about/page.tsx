"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / duration
      
      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [end, duration])

  return count
}

export default function AboutPage() {
  const currentYear = new Date().getFullYear()
  const yearsOfExcellence = currentYear - 1989

  const yearsCount = useCountUp(yearsOfExcellence)
  const locationsCount = useCountUp(4)
  const supportCount = useCountUp(24)
  const satisfactionCount = useCountUp(100)

  useEffect(() => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, {
      threshold: 0.1
    })

    scrollRevealElements.forEach(element => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#090A11]">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeIn-delayed {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }
        .animate-slideInLeft {
          opacity: 0;
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          opacity: 0;
          animation: slideInRight 0.8s ease-out forwards;
        }
        .parallax-section {
          position: relative;
          overflow: hidden;
        }
        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateZ(-1px) scale(2);
          z-index: -1;
        }
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative -mt-14 pt-48 pb-24 overflow-hidden parallax-section">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] z-0 parallax-bg"></div>
        <div className="container relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h1 className="text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">
                  About Digital DSI
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Serving businesses with innovative IT solutions and document management services since 1989.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 animate-slideInRight">
              <div className="bg-blue-500/10 p-6 rounded-lg backdrop-blur-sm scroll-reveal">
                <div className="text-4xl font-bold text-blue-400 mb-2">{yearsCount}+</div>
                <div className="text-gray-300">Years of Excellence</div>
              </div>
              <div className="bg-blue-500/10 p-6 rounded-lg backdrop-blur-sm scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{locationsCount}</div>
                <div className="text-gray-300">Office Locations</div>
              </div>
              <div className="bg-blue-500/10 p-6 rounded-lg backdrop-blur-sm scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{supportCount}</div>
                <div className="text-gray-300">Support Available</div>
              </div>
              <div className="bg-blue-500/10 p-6 rounded-lg backdrop-blur-sm scroll-reveal" style={{ animationDelay: '0.3s' }}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{satisfactionCount}%</div>
                <div className="text-gray-300">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 parallax-section">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] z-0 parallax-bg"></div>
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8 animate-slideInLeft">Our History</h2>
            <div className="prose prose-invert prose-lg">
              <p className="text-xl text-gray-300 mb-8 scroll-reveal">
                Document Solutions, Inc. was founded in 1989 with a clear mission: to offer competitive products with the best service and support in the area.
              </p>
              <p className="text-gray-300 mb-12 scroll-reveal" style={{ animationDelay: '0.2s' }}>
                While we've experienced tremendous growth over the years, our core values and commitment to excellence have remained unchanged. We continue to evolve and innovate, always keeping our customers' needs at the forefront of everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0F1015]">
        <div className="container">
          <h2 className="text-4xl font-bold text-white mb-16 text-center animate-fadeIn">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                title: "Customer-Centric",
                description: "Your success is our priority. We're committed to delivering solutions that exceed your expectations.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                title: "Innovation",
                description: "We stay ahead of the curve, continuously improving and embracing new technologies.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Integrity",
                description: "We operate with transparency and honesty, building trust through our actions.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "Teamwork",
                description: "Collaboration is key to our success, working together to achieve exceptional results.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              }
            ].map((value, index) => (
              <div key={index} className="text-center scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                </svg>
              </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-24 parallax-section">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] z-0 parallax-bg"></div>
        <div className="container relative">
          <h2 className="text-4xl font-bold text-white mb-16 text-center animate-fadeIn">Locations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Cumberland Office",
                address: "114 Wineow St\nCumberland, MD 21502",
                link: "https://www.google.com/maps/dir/?api=1&destination=114+Wineow+St+Cumberland+MD+21502"
              },
              {
                title: "Winchester Office",
                address: "303 South Loudoun St.\nWinchester, VA",
                link: "https://www.google.com/maps/dir/?api=1&destination=303+South+Loudoun+St+Winchester+VA"
              },
              {
                title: "Hagerstown Office",
                address: "10210 Governor Lane Boulevard\nSuite 2005\nWilliamsport, MD 21795",
                link: "https://www.google.com/maps/dir/?api=1&destination=10210+Governor+Lane+Boulevard+Williamsport+MD+21795"
              },
              {
                title: "Duncansville Office",
                address: "117 Olde Farm Office Road\nSuite 202\nDuncansville, PA",
                link: "https://www.google.com/maps/dir/?api=1&destination=117+Olde+Farm+Office+Road+Duncansville+PA"
              }
            ].map((location, index) => (
              <a 
                key={index}
                href={location.link}
              target="_blank" 
              rel="noopener noreferrer"
                className="relative group cursor-pointer scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg transform transition-transform group-hover:scale-105"></div>
              <div className="relative p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{location.title}</h3>
                  <p className="text-gray-300 whitespace-pre-line">{location.address}</p>
                <div className="mt-4 text-blue-400 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Get Directions
                </div>
              </div>
            </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0F1015]">
        <div className="container">
          <h2 className="text-4xl font-bold text-white mb-16 text-center animate-fadeIn">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="scroll-reveal">
              <h3 className="text-2xl font-bold text-white mb-6">Services & Supplies</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-300">Phone: 301-777-7967</p>
                    <p className="text-gray-300">Fax: 301-777-7906</p>
                    <p className="text-gray-300">Toll-Free: 888-777-5727</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <a href="mailto:service@digitaldsi.com" className="text-blue-400 hover:text-blue-300">service@digitaldsi.com</a><br />
                    <a href="mailto:meters@digitaldsi.com" className="text-blue-400 hover:text-blue-300">meters@digitaldsi.com</a><br />
                    <a href="mailto:supplies@digitaldsi.com" className="text-blue-400 hover:text-blue-300">supplies@digitaldsi.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Sales Department</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-300">Monday to Friday from 9am-5pm (EST)</p>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-gray-300">Phone: 301-777-7999</p>
                    <p className="text-gray-300">Toll-Free: 800-726-7999</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:sales@digitaldsi.com" className="text-blue-400 hover:text-blue-300">sales@digitaldsi.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}