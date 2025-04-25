"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const printerCategories = [
  {
    title: "Multifunction Printers",
    description: "All-in-one solutions for printing, scanning, copying, and faxing",
    features: [
      "High-speed printing",
      "Advanced scanning capabilities",
      "Network connectivity",
      "Mobile printing support",
      "Secure printing options",
      "Energy efficient",
      "Cloud integration",
      "Document management"
    ],
    options: [
      {
        title: "bizhub C650i",
        image: "/images/konica-printers/multifunction/bizhub_C650i_Right.png",
        description: "High-performance color multifunction printer with advanced security features and cloud integration capabilities."
      },
      {
        title: "bizhub C550i",
        image: "/images/konica-printers/multifunction/bizhub_C550i_Right.png",
        description: "Versatile color multifunction printer offering exceptional print quality and efficient workflow solutions."
      },
      {
        title: "bizhub 4020i",
        image: "/images/konica-printers/multifunction/bizhub_4020i_525x450.png",
        description: "Compact and efficient monochrome multifunction printer perfect for small to medium workgroups."
      }
    ]
  },
  {
    title: "Single Function Printers",
    description: "Dedicated printing solutions for specific needs",
    features: [
      "Fast print speeds",
      "High-quality output",
      "Cost-effective",
      "Easy maintenance",
      "Compact design",
      "Quiet operation",
      "Wireless connectivity",
      "Duplex printing"
    ],
    options: [
      {
        title: "bizhub 5020i",
        image: "/images/konica-printers/single_function/bizhub-5020i-525x450.png",
        description: "High-speed monochrome printer with advanced security features and network capabilities."
      },
      {
        title: "bizhub 5000i",
        image: "/images/konica-printers/single_function/bizhub_5000i_525x450.png",
        description: "Reliable monochrome printer offering exceptional print quality and cost efficiency."
      },
      {
        title: "bizhub 4000i",
        image: "/images/konica-printers/single_function/bizhub_4000i_525x450.png",
        description: "Compact and efficient monochrome printer ideal for small office environments."
      }
    ]
  },
  {
    title: "Wide Format Printers",
    description: "Professional-grade large format printing solutions",
    features: [
      "Large format printing",
      "High-resolution output",
      "Multiple media support",
      "Poster printing",
      "Banner printing",
      "CAD printing",
      "Photo printing",
      "Color accuracy"
    ],
    options: [
      {
        title: "KIP 900 Series",
        image: "/images/konica-printers/kip/KIP-900-Series.png",
        description: "High-performance wide format printer series offering exceptional print quality and versatility for large format applications."
      },
      {
        title: "KIP 790",
        image: "/images/konica-printers/kip/KIP-790.png",
        description: "Advanced wide format printer with superior color accuracy and high-speed printing capabilities."
      },
      {
        title: "KIP 7572G-10D",
        image: "/images/konica-printers/kip/KIP-7572G-10D.png",
        description: "Professional-grade wide format printer designed for high-volume production and precise color reproduction."
      }
    ]
  }
]

export default function CopiersPrintersPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedPrinter, setSelectedPrinter] = useState<{title: string, image: string, description: string} | null>(null)

  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Modal */}
      {selectedPrinter && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPrinter(null)}
        >
          <div className="relative max-w-5xl w-full bg-[#1A1B23] rounded-lg p-8">
            <button
              onClick={() => setSelectedPrinter(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={selectedPrinter.image}
                  alt={selectedPrinter.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-[#e9eae3] mb-4">{selectedPrinter.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedPrinter.description}</p>
                <div className="mt-6">
                  <Link href="/request-quote">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                      Request a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
        @keyframes springExpand {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
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
        .animate-spring-expand {
          opacity: 0;
          animation: springExpand 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }
        .spring-button {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .spring-button:active {
          transform: scale(0.95);
        }
        .printer-option {
          transition: background-color 0.2s ease;
          background-color: transparent;
        }
        .printer-option:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }
        .printer-option-text {
          color: #e9eae3;
          transition: none;
        }
        .printer-option {
          transform-origin: center;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative -mt-14 pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 animate-fadeIn">
              <span className="text-[#e1e1e1]">Professional </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Printing Solutions
              </span>
            </h1>
            <p className="text-[#e9eae3] text-xl mb-8 animate-fadeIn-delayed">
              From multifunction devices to wide format printers, we provide cutting-edge printing solutions tailored to your business needs.
            </p>
            <div className="flex justify-center gap-4 animate-fadeIn-delayed">
              <Link href="/request-quote">
                <Button className="bg-[#e9eae3] text-black hover:bg-[#d0d1cb] px-8 py-6 text-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="#solutions">
                <Button variant="outline" className="border-[#e9eae3] text-[#e9eae3] hover:bg-[#e9eae3] hover:text-black px-8 py-6 text-lg">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Printing Solutions</span>
            </h2>
            <p className="text-[#e9eae3] text-xl">
              Discover our comprehensive range of printing solutions designed to meet your specific business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printerCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-[#1A1B23] rounded-lg p-8 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full card-hover animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col h-full">
                  {openCategory === category.title ? (
                    <>
                      <h3 className="text-2xl font-bold text-[#e9eae3] mb-4 animate-spring-expand">{category.title}</h3>
                      <div className="grid grid-cols-1 gap-4 flex-grow animate-spring-expand">
                        {category.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-4 p-4 rounded-md printer-option border border-gray-800 animate-spring-expand cursor-pointer"
                            onClick={() => setSelectedPrinter(option)}
                          >
                            <div className="w-20 h-20 relative rounded-md overflow-hidden">
                              <Image
                                src={option.image}
                                alt={option.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="printer-option-text font-medium text-lg">{option.title}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 animate-spring-expand" style={{ animationDelay: '0.4s' }}>
                        <Button 
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg"
                          onClick={() => setOpenCategory(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-[#e9eae3] mb-4">{category.title}</h3>
                      <p className="text-gray-400 mb-6">{category.description}</p>
                      <ul className="space-y-3 flex-grow">
                        {category.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-[#e9eae3]">
                            <span className="text-blue-400 mr-2 mt-1">•</span>
                            <span className="flex-1">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Button 
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg spring-button"
                          onClick={() => setOpenCategory(category.title)}
                        >
                          Explore
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative bg-[#0F1015]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#e1e1e1]">Why Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Expert Support",
                description: "24/7 technical support and maintenance services"
              },
              {
                title: "Cost-Effective",
                description: "Competitive pricing and flexible leasing options"
              },
              {
                title: "Quality Assurance",
                description: "Premium equipment from trusted manufacturers"
              },
              {
                title: "Custom Solutions",
                description: "Tailored printing solutions for your business"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-[#1A1B23] rounded-lg p-6 text-center border border-gray-800 hover:border-blue-500/30 transition-all duration-300 feature-card animate-fadeIn"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-xl font-bold text-[#e9eae3] mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-[#e1e1e1]">Ready to Transform Your </span>
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                Printing Experience?
              </span>
            </h2>
            <p className="text-[#e9eae3] text-xl mb-12">
              Contact us today to discuss your printing needs and get a customized solution for your business.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/request-quote">
                <Button className="bg-[#e9eae3] text-black hover:bg-[#d0d1cb] px-8 py-6 text-lg">
                  Request a Quote
                </Button>
              </Link>
              <Link href="/about#contact">
                <Button variant="outline" className="border-[#e9eae3] text-[#e9eae3] hover:bg-[#e9eae3] hover:text-black px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}