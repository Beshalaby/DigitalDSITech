"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

const jobPositions = [
  {
    title: "Technical Support Specialist",
    department: "Support",
    location: "Remote / Hybrid",
    description: "Provide expert technical support and maintenance services for our printing solutions.",
    requirements: [
      "2+ years of technical support experience",
      "Strong problem-solving skills",
      "Excellent communication abilities",
      "Knowledge of printing systems"
    ]
  },
  {
    title: "Sales Representative",
    department: "Sales",
    location: "Remote / Hybrid",
    description: "Drive sales growth by identifying and developing new business opportunities.",
    requirements: [
      "3+ years of sales experience",
      "Proven track record of meeting targets",
      "Strong negotiation skills",
      "Business development expertise"
    ]
  }
]

export default function CareersPage() {
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
      <section className="relative -mt-14 pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-slideInLeft">
              <span className="text-[#e1e1e1]">Join Our </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Growing Team
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl animate-slideInRight">
              Be part of a dynamic team that's shaping the future of printing technology. We're looking for talented individuals who are passionate about innovation and customer success.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {jobPositions.map((position, index) => (
              <div
                key={index}
                className="bg-[#1A1B23] rounded-lg p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 scroll-reveal"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#e9eae3] mb-2">{position.title}</h3>
                    <div className="flex gap-4 text-gray-400">
                      <span>{position.department}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <Link href={`/careers/${position.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg">
                      Apply Now
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-400 mb-6">{position.description}</p>
                <div>
                  <h4 className="text-[#e9eae3] font-semibold mb-3">Requirements:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center text-gray-400">
                        <span className="text-blue-400 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

