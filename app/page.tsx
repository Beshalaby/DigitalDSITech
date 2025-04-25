'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FadeIn } from '@/components/ui/fade-in';
import { Parallax } from '@/components/ui/parallax';
import InteractiveBackground from './components/InteractiveBackground';

const services = [
  {
    title: "MANAGED IT SERVICES",
    items: [
      "Fully or Co-Managed",
      "Centralized Patching",
      "Priority Service",
      "Server Security",
      "Onsite & Remote Support",
      "IT Strategy & Consulting/Budgeting",
      "Proactive Monitoring & Alerting",
      "Endpoint Detection & Response",
      "Backup & Disaster Recovery",
    ],
  },
  {
    title: "VOIP",
    items: [
      "Enterprise Managed Voice Help Desk",
      "Direct Routing for MS Teams",
      "VoIP Hosted PBX",
      "SIP Trunking",
      "Audio & Video Conferencing",
      "Remote & Hybrid Workforce Support",
    ],
  },
  {
    title: "IT PROJECTS",
    items: [
      "365 Migration",
      "Server & Storage Virtualization",
      "Network & Security Assessments",
      "Project Management",
      "Upgrades & Migrations",
      "Network Design and Infrastructure",
      "Lifecycle Management",
      "Hosted-Cloud Migration",
      "HIPAA & PCI",
      "Cybersecurity",
      "Hardware Procurement",
    ],
  },
  {
    title: "MANAGED PRINT SERVICES",
    items: [
      "Desktop & Office Copiers/Printers",
      "Production Print Solutions",
      "Printer Fleet Management",
      "Automated Supply Ordering",
      "Sales, Service & Support",
      "Customizable Solutions",
      "Service Level Agreements (SLA)",
    ],
  },
];

const partners = [
  {
    name: "Lanco-Pennland Quality Milk Producers",
    logo: "/static/lanco_pennland.avif"
  },
  {
    name: "D.M Bowman Inc",
    logo: "/static/dm-bowman.png"
  },
  {
    name: "iSmile Dental Care",
    logo: "/static/ismile-dental.png"
  },
  {
    name: "Southern Fulton School District",
    logo: "/static/southern-fulton.png"
  },
  {
    name: "Classic Cabinets Kitchen and Bath",
    logo: "/static/classic-cabinets.svg"
  }
];

const faqs = [
  {
    question: "What makes Digital DSI different from other IT providers?",
    answer: "With 30 years of experience, we offer personalized IT solutions tailored to your specific business needs. Our customer-obsessed approach means we prioritize understanding your unique challenges before recommending solutions, ensuring you get exactly what your business requires to thrive."
  },
  {
    question: "How quickly can you respond to IT emergencies?",
    answer: "For managed service clients, we provide priority support during business hours with rapid response times. Our team is committed to addressing critical issues promptly, with most problems resolved remotely within the first hour of contact."
  },
  {
    question: "Do you offer solutions for businesses of all sizes?",
    answer: "Yes, we serve businesses of all sizes, from small startups to large enterprises. Our scalable solutions are designed to grow with your business, ensuring you always have the right level of IT support and infrastructure for your current needs."
  },
  {
    question: "How do you handle cybersecurity concerns?",
    answer: "We take a multi-layered approach to cybersecurity, including endpoint protection, network security, regular vulnerability assessments, and employee training. Our security solutions are constantly updated to address emerging threats, keeping your business data safe."
  },
  {
    question: "Can you help with cloud migration?",
    answer: "Absolutely. We specialize in seamless cloud migrations, whether you're moving to Microsoft 365, AWS, Azure, or other cloud platforms. Our team handles the entire process, from planning and implementation to training and ongoing support, minimizing disruption to your business."
  }
];

export default function Page() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll handler function
  const handleScrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const styleId = 'faq-accordion-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* Minimal CSS: Only hide cursor when html has the specific class */
        html.hide-default-cursor,
        html.hide-default-cursor body,
        html.hide-default-cursor a,
        html.hide-default-cursor button {
          cursor: none !important; 
        }

        /* Glowing Button Animation */
        @keyframes radiate {
          0% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2), 
                        0 0 10px rgba(255, 255, 255, 0.2), 
                        0 0 15px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 
                        0 0 20px rgba(255, 255, 255, 0.4), 
                        0 0 30px rgba(255, 255, 255, 0.4);
          }
          100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.2), 
                        0 0 10px rgba(255, 255, 255, 0.2), 
                        0 0 15px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes radiate-blue {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3), /* Blue theme color */
                        0 0 10px rgba(59, 130, 246, 0.3), 
                        0 0 15px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 
                        0 0 20px rgba(59, 130, 246, 0.5), 
                        0 0 30px rgba(59, 130, 246, 0.5);
          }
        }

        .glowing-explore-button {
          position: relative; 
          border: 1px solid white;
          color: white;
          background-color: transparent;
          padding: 0.75rem 2rem;
          border-radius: 9999px; 
          font-weight: 500;
          transition: all 0.3s ease;
          overflow: hidden; 
          animation: radiate 3s ease-in-out infinite;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2), 
                      0 0 10px rgba(255, 255, 255, 0.2), 
                      0 0 15px rgba(255, 255, 255, 0.2); 
        }

        .glowing-explore-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 
                      0 0 20px rgba(255, 255, 255, 0.5), 
                      0 0 30px rgba(255, 255, 255, 0.5), 
                      0 0 40px rgba(147, 51, 234, 0.3); 
          border-color: white;
        }

        .solid-explore-button {
          border: 1px solid rgba(59, 130, 246, 0.7); /* Semi-transparent blue border */
          color: #3B82F6; /* Blue text */
          background-color: transparent; /* Remove gradient */
          padding: 0.75rem 2rem;
          border-radius: 9999px; 
          font-weight: 500;
          transition: all 0.3s ease;
          animation: radiate-blue 3s ease-in-out infinite; /* Apply blue glow animation */
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.3), 
                      0 0 10px rgba(59, 130, 246, 0.3), 
                      0 0 15px rgba(59, 130, 246, 0.3); /* Initial blue shadow */
        }

        .solid-explore-button:hover {
          background-color: rgba(59, 130, 246, 0.1); /* Faint blue background on hover */
          border-color: #3B82F6; /* Solid blue border on hover */
          color: #5DA1FB; /* Slightly lighter blue text */
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6), /* Intensify glow on hover */
                      0 0 20px rgba(59, 130, 246, 0.6), 
                      0 0 30px rgba(59, 130, 246, 0.6);
        }

        /* FAQ Accordion Styles */
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease;
          opacity: 0;
        }
        .faq-content.open {
          max-height: 500px;
          opacity: 1;
          padding-top: 0.5rem;
          padding-bottom: 1rem;
        }
        
        /* Scrolling Logo Styles */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: fit-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .companies-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .companies-wrapper {
          display: flex;
          width: fit-content;
        }
        
        /* Removed previous blur/dot pattern styles */
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div 
      id="page-container"
      className="relative min-h-screen bg-[#0C0B10] text-white overflow-hidden"
    >
      <InteractiveBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
          <div className="max-w-4xl">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="text-gray-100">PERSONALIZED </span>
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">IT AND HARDWARE</span>
                <span className="text-gray-100"> SOLUTIONS</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Your trusted partner for comprehensive IT services and hardware procurement for 30 years.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex justify-center items-center gap-4">
                <Link href="/request-quote">
                  <button className="glowing-explore-button">
                    Request a Quote 
                  </button>
                </Link>
                <button 
                  className="solid-explore-button"
                  onClick={handleScrollToServices}
                >
                  Explore
                </button>
              </div>
            </FadeIn>
          </div>
        </main>

        <section 
          id="trusted-by-section"
          className="relative overflow-hidden pt-8 pb-16 md:pt-10 md:pb-20 bg-[#0C0B10]"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <FadeIn>
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-gray-400">Trusted by leading </span>
                  <span className="text-gray-400">organizations</span>
                </h2>
              </FadeIn>
            </div>
            
            <Parallax offset={30}>
              <div className="companies-container">
                <div className="companies-wrapper animate-scroll">
                  <div className="flex space-x-8 items-center">
                    {partners.map((company, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <div 
                          className={`w-[200px] h-[100px] relative bg-gray-800/30 rounded-lg p-4 flex items-center justify-center hover:bg-gray-800/50 transition-all duration-300 ${company.name === "Classic Cabinets Kitchen and Bath" ? "mr-4" : ""} ${index === 0 && company.name === "Lanco-Pennland Quality Milk Producers" ? "ml-8" : ""}`}
                        >
                          <Image
                            src={company.logo}
                            alt={company.name}
                            fill
                            className={`object-contain p-4 transition-all duration-300 ${
                              company.name === "Classic Cabinets Kitchen and Bath" 
                                ? "brightness-0 invert" 
                                : "grayscale hover:grayscale-0"
                            }`}
                          />
                        </div>
                      </FadeIn>
                    ))}
                  </div>

                  <div className="flex space-x-8 items-center">
                    {partners.map((company, index) => (
                      <FadeIn key={`dup-${index}`} delay={index * 0.1}>
                        <div 
                          className={`w-[200px] h-[100px] relative bg-gray-800/30 rounded-lg p-4 flex items-center justify-center hover:bg-gray-800/50 transition-all duration-300 ${company.name === "Classic Cabinets Kitchen and Bath" ? "mr-4" : ""} ${index === 0 && company.name === "Lanco-Pennland Quality Milk Producers" ? "ml-8" : ""}`}
                        >
                          <Image
                            src={company.logo}
                            alt={company.name}
                            fill
                            className={`object-contain p-4 transition-all duration-300 ${
                              company.name === "Classic Cabinets Kitchen and Bath" 
                                ? "brightness-0 invert" 
                                : "grayscale hover:grayscale-0"
                            }`}
                          />
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            </Parallax>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#111015]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-gray-200">30 Years of Customer </span>
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                    Obsession!
                  </span>
                </h2>
              </FadeIn>
              <FadeIn>
                <p className="text-gray-300 text-lg md:text-xl mb-4">
                  We at Digital DSI share the philosophy of Customer Obsession.
                </p>
              </FadeIn>
              <FadeIn>
                <p className="text-gray-400 text-base md:text-lg">
                  This starts with understanding our clients' individual and unique needs.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section 
          id="services-section" 
          className="relative content-section bg-[#0C0B10] pt-24 pb-24"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center md:justify-start md:pl-48">
                <FadeIn direction="right">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#e9eae3] text-center md:text-left">
                    SERVICES
                  </h2>
                </FadeIn>
              </div>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <FadeIn key={index} direction="left">
                    <div className="border border-[#e9eae3] rounded-lg overflow-hidden">
                      <button
                        onClick={() => setOpenService(openService === service.title ? null : service.title)}
                        className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex justify-between items-center hover:bg-[#1F1F20]/10 transition-colors"
                      >
                        <h3 className="text-xl md:text-2xl font-bold text-[#e9eae3] pr-4">
                          {service.title}
                        </h3>
                        <span className="text-[#e9eae3] text-xl md:text-2xl flex-shrink-0">
                          {openService === service.title ? '−' : '+'}
                        </span>
                      </button>
                      
                      <div className={`faq-content px-4 md:px-6 ${openService === service.title ? 'open' : ''}`}>
                        <ul className="space-y-2">
                          {service.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-[#9CA3AF] text-sm md:text-base">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden bg-[#090A11]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <h2 className="text-4xl font-bold text-center mb-12">
                  <span className="text-[#e1e1e1]">Frequently Asked </span>
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                    Questions
                  </span>
                </h2>
              </FadeIn>
              
              <FadeIn>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === index ? 'active' : ''}`}>
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      >
                        <h3 className="text-xl font-medium text-[#e9eae3]">
                          {faq.question}
                        </h3>
                        <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                          {openFaq === index ? '−' : '+'}
                        </span>
                      </button>
                      <div className={`faq-content px-6 ${openFaq === index ? 'open' : ''}`}>
                        <p className="text-gray-400">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-35 pt-24 relative overflow-hidden bg-[#0F1015] pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-[#e1e1e1]">Let's Discuss Your </span>
                  <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                    IT Needs
                  </span>
                </h2>
              </FadeIn>
              <FadeIn>
                <p className="text-[#e9eae3] text-xl mb-12">
                  Ready to transform your IT infrastructure? Our experts are here to help.
                </p>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <FadeIn direction="right">
                  <div className="bg-[#090A11] p-8 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-[#e9eae3] mb-2">Call Us</h3>
                        <p className="text-blue-400 hover:text-blue-300 transition-colors">
                          <a href="tel:+13017917999">+1 (301) 791-7999</a>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#e9eae3] mb-2">Email Us</h3>
                        <p className="text-blue-400 hover:text-blue-300 transition-colors">
                          <a href="mailto:contact@digitaldsi.com">contact@digitaldsi.com</a>
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#e9eae3] mb-2">Visit Us</h3>
                        <p className="text-gray-400">
                          10210 Governor Lane Boulevard Building #2005 Suite 114,<br />
                          Williamsport, MD 21795
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
                
                <FadeIn direction="left">
                  <div className="bg-[#090A11] p-8 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                    <form
                      action="https://formsubmit.co/contact@digitaldsi.com"
                      method="POST"
                      className="space-y-6"
                    >
                      <input type="hidden" name="_subject" value="New Contact Form Submission" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_autoresponse" value="Thank you for contacting Digital DSI. We will get back to you shortly!" />
                      <input type="hidden" name="_honey" style={{display: 'none'}} />
                      <input type="hidden" name="_captcha" value="true" />
                      <input type="hidden" name="_next" value="https://digitaldsi.com/thank-you" />
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          required
                          className="w-full px-4 py-3 bg-[#1A1B23] border border-gray-800 rounded-lg text-[#e9eae3] placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                          className="w-full px-4 py-3 bg-[#1A1B23] border border-gray-800 rounded-lg text-[#e9eae3] placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          rows={4}
                          required
                          className="w-full px-4 py-3 bg-[#1A1B23] border border-gray-800 rounded-lg text-[#e9eae3] placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#090A11]"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

