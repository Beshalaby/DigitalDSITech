'use client';

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { useRouter } from 'next/navigation'
import { FadeIn } from '@/components/ui/fade-in';
import { Parallax } from '@/components/ui/parallax';

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
]

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isFooterBlack, setIsFooterBlack] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
  const [isFullyZoomed, setIsFullyZoomed] = useState(false);
  const [initialZoomComplete, setInitialZoomComplete] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const screenContentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollAnimationRef = useRef<number>();
  const wheelEventRef = useRef<((e: WheelEvent) => void) | null>(null);
  const lastWheelTimeRef = useRef<number>(0);
  const zoomLevelRef = useRef<number>(0);
  const [openService, setOpenService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Optimize navigation handling
  const handleNavigation = useCallback((href: string) => {
    setIsNavigating(true);
    router.push(href);
  }, [router]);

  // Prefetch links on hover
  useEffect(() => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          router.prefetch(href);
        }
      });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => {});
      });
    };
  }, [router]);

  // Check if we should skip the monitor section
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('skipIntro') === 'true') {
      setInitialZoomComplete(true);
      setIsFullyZoomed(true);
      document.body.style.overflow = '';
      document.body.classList.add('content-visible');
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  }, []);

  // Prevent default scroll behavior for touch events
  const preventScroll = (e: TouchEvent) => {
    if (!initialZoomComplete) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      const elements = document.querySelectorAll('.card-animate');
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [isLoading]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const xPercent = (event.clientX - rect.left) / rect.width;
        const yPercent = (event.clientY - rect.top) / rect.height;
        
        const maxMove = 30;
        const x = (xPercent - 0.5) * maxMove * 2;
        const y = (yPercent - 0.5) * maxMove * 2;

        setMousePosition({ x, y });
      }
    };

    // Smooth animation function
    const animate = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.1,
        y: prev.y + (mousePosition.y - prev.y) * 0.1
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  // Handle wheel events to control zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const currentTime = Date.now();
      lastWheelTimeRef.current = currentTime;
      
      // Auto-start zoom-out animation when scrolling up from the very top of the page
      if (initialZoomComplete && window.scrollY === 0) {
        // If scrolling up, start the zoom-out animation
        if (e.deltaY < 0) {
          e.preventDefault();
          
          // Reset to initial state
          setIsFullyZoomed(false);
          setInitialZoomComplete(false);
          document.body.style.overflow = 'hidden';
          document.body.classList.remove('content-visible');
          
          // Reset zoom level and scroll position
          zoomLevelRef.current = 0;
          setScrollProgress(0);
          setSmoothScrollProgress(0);
          return;
        }
      }
      
      // Allow normal scrolling if zoom is complete
      if (initialZoomComplete) {
        document.body.style.overflow = '';
        return;
      }
      
      e.preventDefault();
      
      // Increased zoom speed - 5x more sensitive
      const zoomIncrement = e.deltaY > 0 ? 0.05 : -0.05;
      
      // Update zoom level directly without smoothing or animation
      zoomLevelRef.current = Math.max(0, Math.min(1, zoomLevelRef.current + zoomIncrement));
      
      // Apply changes immediately
      setScrollProgress(zoomLevelRef.current);
      setSmoothScrollProgress(zoomLevelRef.current);
      
      // Check if zoom is complete
      if (zoomLevelRef.current >= 0.5 && !isFullyZoomed) {
        setIsFullyZoomed(true);
        
        // Reduced delay for faster response
        setTimeout(() => {
          setInitialZoomComplete(true);
          document.body.style.overflow = '';
          document.body.classList.add('content-visible');
          
          // Immediately scroll to the Customer Obsession section
          window.scrollTo({
            top: 0,
            behavior: 'auto'
          });
        }, 50); // Further reduced delay for more immediate response
      } else if (zoomLevelRef.current < 0.5 && isFullyZoomed) {
        setIsFullyZoomed(false);
      }
    };
    
    // Store the handler in a ref so we can remove it later
    wheelEventRef.current = handleWheel;
    
    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    
    // Enable scrolling if zoom is complete
    if (initialZoomComplete) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      if (wheelEventRef.current) {
        window.removeEventListener('wheel', wheelEventRef.current);
      }
      window.removeEventListener('touchmove', preventScroll);
      document.body.style.overflow = '';
    };
  }, [isLoading, isFullyZoomed, initialZoomComplete]);

  // Handle normal scrolling after initial zoom is complete
  useEffect(() => {
    if (initialZoomComplete) {
      document.body.style.overflow = '';
      
      const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Calculate scroll progress (0 to 1)
        const progress = Math.min(scrollTop / (documentHeight - windowHeight), 1);
        setScrollProgress(Math.max(0.5, progress));
        
        // Start transition later (within 150px of bottom)
        const isNearBottom = scrollTop + windowHeight >= documentHeight - 150;
        setIsFooterBlack(isNearBottom);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [initialZoomComplete]);

  // Remove the original scroll handler that conflicts with our new approach
  useEffect(() => {
    const handleScroll = () => {
      if (!initialZoomComplete) return; // Skip if initial zoom isn't complete
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Start transition later (within 150px of bottom)
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 150;
      setIsFooterBlack(isNearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialZoomComplete]);

  // Remove the smooth scroll progress animation effect
  useEffect(() => {
    // Directly set smoothScrollProgress to match scrollProgress without animation
    setSmoothScrollProgress(scrollProgress);
  }, [scrollProgress]);

  // Add smooth scroll behavior to the document
  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Add perspective to body for 3D effects
      document.body.style.perspective = '1000px';
      document.body.style.perspectiveOrigin = 'center center';
      
      // Add scroll event listener for parallax effects
      const handleParallaxScroll = () => {
        if (heroSectionRef.current) {
          const rect = heroSectionRef.current.getBoundingClientRect();
          const scrollPercentage = Math.max(0, Math.min(1, -rect.top / (window.innerHeight * 0.5)));
          
          // Apply fade-in effect to sections below the hero
          const sections = document.querySelectorAll('section:not(.hero-section)');
          sections.forEach((section, index) => {
            const delay = index * 0.1;
            const opacity = isFullyZoomed ? 1 : Math.min(1, Math.max(0, (scrollPercentage - delay) * 2));
            
            (section as HTMLElement).style.opacity = opacity.toString();
            (section as HTMLElement).style.transition = 'opacity 0.5s ease-out';
          });
        }
      };
      
      window.addEventListener('scroll', handleParallaxScroll);
      handleParallaxScroll(); // Initial call
      
      return () => {
        window.removeEventListener('scroll', handleParallaxScroll);
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.perspective = 'none';
      };
    }
  }, [isLoading, isFullyZoomed]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#090A11]">
      {/* Add loading overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <style jsx global>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(233, 234, 227, 0.5), 0 0 10px rgba(233, 234, 227, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(233, 234, 227, 0.7), 0 0 30px rgba(233, 234, 227, 0.7);
          }
          100% {
            box-shadow: 0 0 5px rgba(233, 234, 227, 0.5), 0 0 10px rgba(233, 234, 227, 0.5);
          }
        }
        .glow-effect {
          box-shadow: 0 0 10px rgba(233, 234, 227, 0.5), 0 0 20px rgba(233, 234, 227, 0.3);
        }
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .retro-screen::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }
        .retro-screen::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }
        .retro-text {
          text-shadow: 0.2rem 0.2rem 0.2rem rgba(233, 234, 227, 0.4);
          animation: textflicker 0.5s infinite;
        }
        @keyframes textflicker {
          0% { 
            text-shadow: 0.2rem 0.2rem 0.2rem rgba(233, 234, 227, 0.4);
            opacity: 1;
          }
          25% {
            text-shadow: 0.3rem 0.3rem 0.3rem rgba(233, 234, 227, 0.6);
            opacity: 0.8;
          }
          50% { 
            text-shadow: 0.2rem 0.2rem 0.2rem rgba(233, 234, 227, 0.4);
            opacity: 1;
          }
          75% {
            text-shadow: 0.1rem 0.1rem 0.1rem rgba(233, 234, 227, 0.6);
            opacity: 0.9;
          }
          100% { 
            text-shadow: 0.2rem 0.2rem 0.2rem rgba(233, 234, 227, 0.4);
            opacity: 1;
          }
        }
        .glitch {
          animation: glitch-skew 3s infinite linear alternate-reverse;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 8s infinite linear alternate-reverse;
        }
        .glitch::after {
          left: -2px;
          text-shadow: -2px 2px #00fff9, 2px 2px #ff00c1;
          animation: glitch-anim2 4s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% {
            clip: rect(10px, 9999px, 82px, 0);
            transform: skew(0.3deg);
          }
          5% {
            clip: rect(89px, 9999px, 90px, 0);
            transform: skew(0.78deg);
          }
          10% {
            clip: rect(74px, 9999px, 71px, 0);
            transform: skew(0.25deg);
          }
          15% {
            clip: rect(28px, 9999px, 84px, 0);
            transform: skew(0.04deg);
          }
          20% {
            clip: rect(67px, 9999px, 98px, 0);
            transform: skew(0.05deg);
          }
          25% {
            clip: rect(100px, 9999px, 2px, 0);
            transform: skew(0.39deg);
          }
          30% {
            clip: rect(53px, 9999px, 6px, 0);
            transform: skew(0.01deg);
          }
          35% {
            clip: rect(69px, 9999px, 32px, 0);
            transform: skew(0.16deg);
          }
          40% {
            clip: rect(61px, 9999px, 62px, 0);
            transform: skew(0.4deg);
          }
          45% {
            clip: rect(60px, 9999px, 87px, 0);
            transform: skew(0.61deg);
          }
          50% {
            clip: rect(15px, 9999px, 46px, 0);
            transform: skew(0.11deg);
          }
          55% {
            clip: rect(83px, 9999px, 32px, 0);
            transform: skew(0.07deg);
          }
          60% {
            clip: rect(59px, 9999px, 93px, 0);
            transform: skew(0.8deg);
          }
          65% {
            clip: rect(69px, 9999px, 8px, 0);
            transform: skew(0.3deg);
          }
          70% {
            clip: rect(85px, 9999px, 75px, 0);
            transform: skew(0.76deg);
          }
          75% {
            clip: rect(68px, 9999px, 89px, 0);
            transform: skew(0.65deg);
          }
          80% {
            clip: rect(51px, 9999px, 46px, 0);
            transform: skew(0.2deg);
          }
          85% {
            clip: rect(46px, 9999px, 78px, 0);
            transform: skew(0.43deg);
          }
          90% {
            clip: rect(45px, 9999px, 11px, 0);
            transform: skew(0.02deg);
          }
          95% {
            clip: rect(31px, 9999px, 48px, 0);
            transform: skew(0.48deg);
          }
          100% {
            clip: rect(16px, 9999px, 72px, 0);
            transform: skew(0.15deg);
          }
        }
        @keyframes glitch-anim2 {
          0% {
            clip: rect(65px, 9999px, 99px, 0);
            transform: skew(0.02deg);
          }
          5% {
            clip: rect(86px, 9999px, 39px, 0);
            transform: skew(0.05deg);
          }
          10% {
            clip: rect(93px, 9999px, 74px, 0);
            transform: skew(0.25deg);
          }
          15% {
            clip: rect(19px, 9999px, 67px, 0);
            transform: skew(0.38deg);
          }
          20% {
            clip: rect(31px, 9999px, 21px, 0);
            transform: skew(0.33deg);
          }
          25% {
            clip: rect(38px, 9999px, 20px, 0);
            transform: skew(0.63deg);
          }
          30% {
            clip: rect(94px, 9999px, 4px, 0);
            transform: skew(0.39deg);
          }
          35% {
            clip: rect(11px, 9999px, 25px, 0);
            transform: skew(0.01deg);
          }
          40% {
            clip: rect(0px, 9999px, 37px, 0);
            transform: skew(0.63deg);
          }
          45% {
            clip: rect(40px, 9999px, 98px, 0);
            transform: skew(0.57deg);
          }
          50% {
            clip: rect(23px, 9999px, 5px, 0);
            transform: skew(0.75deg);
          }
          55% {
            clip: rect(23px, 9999px, 31px, 0);
            transform: skew(0.78deg);
          }
          60% {
            clip: rect(61px, 9999px, 65px, 0);
            transform: skew(0.07deg);
          }
          65% {
            clip: rect(9px, 9999px, 52px, 0);
            transform: skew(0.51deg);
          }
          70% {
            clip: rect(54px, 9999px, 8px, 0);
            transform: skew(0.02deg);
          }
          75% {
            clip: rect(3px, 9999px, 82px, 0);
            transform: skew(0.65deg);
          }
          80% {
            clip: rect(63px, 9999px, 82px, 0);
            transform: skew(0.48deg);
          }
          85% {
            clip: rect(35px, 9999px, 39px, 0);
            transform: skew(0.57deg);
          }
          90% {
            clip: rect(58px, 9999px, 84px, 0);
            transform: skew(0.07deg);
          }
          95% {
            clip: rect(39px, 9999px, 33px, 0);
            transform: skew(0.51deg);
          }
          100% {
            clip: rect(97px, 9999px, 100px, 0);
            transform: skew(0.04deg);
          }
        }
        @keyframes glitch-skew {
          0% {
            transform: skew(-0.5deg);
          }
          10% {
            transform: skew(1deg);
          }
          20% {
            transform: skew(-1.5deg);
          }
          30% {
            transform: skew(0deg);
          }
          40% {
            transform: skew(0.5deg);
          }
          50% {
            transform: skew(-0.5deg);
          }
          60% {
            transform: skew(1deg);
          }
          70% {
            transform: skew(-1deg);
          }
          80% {
            transform: skew(0.5deg);
          }
          90% {
            transform: skew(-0.5deg);
          }
          100% {
            transform: skew(0deg);
          }
        }
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
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: 1s;
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          opacity: 0;
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          opacity: 0;
          animation: slideInRight 0.8s ease-out forwards;
        }
        .left-card {
          transform: translateX(-30px);
        }
        .right-card {
          transform: translateX(30px);
        }
        .card-animate {
          opacity: 0;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-animate.left-card {
          transform: translateX(-100px);
        }
        
        .card-animate.right-card {
          transform: translateX(100px);
        }
        
        .card-animate.show {
          opacity: 1;
          transform: translateX(0);
        }
        .retro-mouse {
          filter: drop-shadow(0 0 10px rgba(233, 234, 227, 0.5));
          transition: transform 0.3s ease-out;
        }
        .retro-mouse:hover {
          filter: drop-shadow(0 0 15px rgba(233, 234, 227, 0.7));
        }
        .blue-glow-effect {
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        /* FAQ Accordion Styles */
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease;
          opacity: 0;
        }
        
        .faq-content.open {
          max-height: 1000px;
          opacity: 1;
          padding-top: 1rem;
          padding-bottom: 1.5rem;
        }
        
        .faq-item {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .faq-item.active {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
        }
        
        /* Parallax Zoom Effect with direct response */
        .parallax-container {
          position: relative;
          overflow: hidden;
          transition: none;
          perspective: 1000px;
          will-change: transform;
        }
        
        .monitor-zoom {
          transition: none;
          transform-origin: center 30%;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        .monitor-content {
          transition: none;
          transform-origin: center 30%;
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        
        /* Improve performance with hardware acceleration */
        .hero-section, .hero-sticky, .monitor-3d-container {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .hero-section {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          transition: none;
        }
        
        .hero-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          overflow: hidden;
          transition: none;
        }
        
        .hero-sticky.zoomed-in {
          position: absolute;
          height: 0;
          min-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: none;
        }
        
        /* Content sections appear immediately */
        section:not(.hero-section) {
          opacity: 0;
          transition: none;
          will-change: opacity;
          position: relative;
          z-index: 20;
        }
        
        /* When fully zoomed, make sure content is visible */
        body.content-visible section:not(.hero-section) {
          opacity: 1;
        }
        
        /* Adjust hero section height when zoomed */
        body.content-visible .hero-section {
          min-height: 0;
          height: 0;
          margin: 0;
          padding: 0;
        }
        
        /* Services section adjustment */
        .content-section {
          transition: none;
          position: relative;
          z-index: 20;
          padding-top: 0;
        }
        
        body.content-visible .content-section {
          padding-top: 4rem;
        }
        
        /* Remove transition overlay */
        .transition-overlay {
          display: none;
        }
        
        .fade-in-out {
          transition: opacity 0.5s ease-out;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          opacity: 0.7;
          transition: opacity 0.3s ease;
          z-index: 30;
        }
        
        .scroll-indicator:hover {
          opacity: 1;
        }
        
        .scroll-arrow {
          width: 30px;
          height: 30px;
          margin-top: 8px;
          border-left: 2px solid white;
          border-bottom: 2px solid white;
          transform: rotate(-45deg);
          animation: arrowBounce 2s infinite;
        }
        
        @keyframes arrowBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) rotate(-45deg);
          }
          40% {
            transform: translateY(-10px) rotate(-45deg);
          }
          60% {
            transform: translateY(-5px) rotate(-45deg);
          }
        }
        
        /* Add depth to the monitor */
        .monitor-3d-container {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        /* Retro screen scanlines that persist after zoom */
        .fullscreen-retro-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 100;
        }
        
        .fullscreen-retro-effect::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          animation: scanline 10s linear infinite;
          pointer-events: none;
          z-index: 100;
        }
        
        /* Wheel instruction */
        .wheel-instruction {
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          color: white;
          z-index: 30;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .caret-icon {
          font-size: 24px;
          line-height: 1;
          animation: caretBounce 1.5s infinite;
        }
        
        @keyframes caretBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
        }
        
        /* Remove old arrow styles */
        .arrow-icon,
        .arrow-icon::before,
        .arrow-icon::after,
        @keyframes arrowFall {
          /* Remove these styles */
        }
        
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
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes pulse-subtle {
          0%, 100% {
            color: rgb(156, 163, 175);
          }
          50% {
            color: rgb(255, 255, 255);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className={`hero-section overflow-visible bg-[#090A11] ${isFullyZoomed ? '-mt-16 h-0' : 'mt-4'}`} ref={heroSectionRef}>
        <div className={`hero-sticky ${isFullyZoomed ? 'zoomed-in' : ''}`}>
          <div className="container relative z-10 mx-auto parallax-container overflow-visible" ref={containerRef}>
            <div className="relative w-full max-w-[85vw] mx-auto monitor-3d-container overflow-visible">
              <div 
                className="relative pb-[75%] overflow-visible"
                ref={monitorRef}
                style={{ 
                  transform: `scale(${0.85 + smoothScrollProgress * 10}) 
                              rotateX(${Math.min(smoothScrollProgress * 5, 1.5)}deg) 
                              rotateY(${Math.min(smoothScrollProgress * -3, -0.9)}deg)`,
                  transformOrigin: 'center 30%',
                  transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  opacity: isFullyZoomed ? 0 : 1,
                  zIndex: 1
                }}
              >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/retro-computer-kogzaHCxbKAUAcZwNi1Wts32MkhVaa.png"
                alt="Retro Computer"
                layout="fill"
                objectFit="contain"
                  className="absolute -top-4 left-0 w-full h-full z-20 monitor-zoom"
                  style={{ 
                    transform: smoothScrollProgress > 0.95 
                      ? `scale(${2 - smoothScrollProgress}) rotate(${(smoothScrollProgress - 0.95) * 100}deg)` 
                      : `rotate(${smoothScrollProgress * 2}deg)`,
                    filter: `brightness(${1 - smoothScrollProgress * 0.3})`,
                    transformOrigin: 'center 30%',
                    opacity: smoothScrollProgress >= 0.65 ? (1 - (smoothScrollProgress - 0.65) * 3) : 1
                  }}
                />
                <div 
                  className="absolute top-[16%] left-[13.5%] right-[13.5%] bottom-[43.5%] flex flex-col items-center z-10"
                  style={{
                    transform: `scale(${1 + smoothScrollProgress * 0.5})`,
                    transformOrigin: 'center 30%'
                  }}
                >
                  <div 
                    className="w-full h-full bg-[#090A11] retro-screen flex flex-col items-center justify-between py-8 z-10 monitor-content relative"
                    ref={screenContentRef}
                    style={{
                      transform: `translateZ(${smoothScrollProgress * 20}px)`,
                      opacity: smoothScrollProgress >= 0.5 ? 0 : 1 - smoothScrollProgress * 2,
                      position: 'relative',
                      zIndex: 100
                    }}
                  >
                    <div className="flex-1 flex items-center justify-center">
                      <h1
                        className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white tracking-tight retro-text text-center leading-tight glitch fade-in-out animate-fadeIn"
                        data-text="PERSONALIZED IT AND HARDWARE SOLUTIONS"
                        style={{
                          opacity: 1 - smoothScrollProgress * 3 > 0 ? 1 - smoothScrollProgress * 3 : 0
                        }}
                      >
                        PERSONALIZED IT AND
                        <br />
                        HARDWARE SOLUTIONS
                      </h1>
                    </div>
                    
                    <div className="w-full flex flex-col items-center justify-end pb-8">
                      <p className="text-sm text-gray-400 mb-2 animate-pulse-subtle" style={{
                        opacity: 1 - smoothScrollProgress * 3 > 0 ? 1 - smoothScrollProgress * 3 : 0
                      }}>
                        Scroll to explore
                      </p>
                      
                      {/* Replace arrow with caret */}
                      {!initialZoomComplete && !isFullyZoomed && (
                        <div className="wheel-instruction">
                          <div className="caret-icon">^</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Remove the old wheel instruction position */}
          {/* Scroll indicator - only show when wheel instruction is not visible */}
          {!(!initialZoomComplete && !isFullyZoomed) && !isFullyZoomed && (
            <div className="scroll-indicator" style={{ opacity: isFullyZoomed ? 0 : (1 - smoothScrollProgress * 3) }}>
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="scroll-arrow"></div>
            </div>
          )}
        </div>
      </section>

      {/* Customer Obsession Section */}
      <section className="py-35 relative overflow-hidden bg-[#090A11]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="text-[#e1e1e1]">30 Years of Customer </span>
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                  Obsession!
                </span>
              </h2>
            </FadeIn>
            <div className="relative z-10">
              <FadeIn delay={0.2}>
                <p className="text-[#e9eae3] text-xl mb-6">
                  We at Digital DSI share the philosophy of Customer Obsession.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-gray-300 text-lg">
                  This starts with understanding our clients' individual and unique needs.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-35 relative content-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Left side - "SERVICES" title */}
            <div className="flex items-center justify-center">
              <FadeIn direction="right">
                <h2 className="text-4xl font-bold text-[#e9eae3]">
                  SERVICES
                </h2>
              </FadeIn>
            </div>
            
            {/* Right side - Accordion Cards */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <FadeIn key={index} delay={index * 0.1} direction="left">
                  <div className="border border-[#e9eae3] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenService(openService === service.title ? null : service.title)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#1F1F20]/10 transition-colors"
                    >
                      <h3 className="text-2xl font-bold text-[#e9eae3]">
                        {service.title}
                      </h3>
                      <span className="text-[#e9eae3] text-2xl">
                        {openService === service.title ? '−' : '+'}
                      </span>
                    </button>
                    
                    {openService === service.title && (
                      <div className="px-6 pb-4">
                        <ul className="space-y-2">
                          {service.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-[#9CA3AF] text-sm">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Companies We've Worked With Section */}
      <section className="py-24 pb-8 relative bg-[#090A11] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-gray-400">Trusted by leading </span>
                <span className="text-gray-400">
                  organizations
                </span>
              </h2>
            </FadeIn>
          </div>
          
          <Parallax offset={30}>
            <div className="relative w-full overflow-hidden">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                <div className="flex space-x-8 items-center">
                  {[
                    {
                      name: "Lanco-Pennland Quality Milk Producers",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lanco-pennland-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "D.M Bowman Inc",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dm-bowman-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "iSmile Dental Care",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ismile-dental-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "Southern Fulton School District",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/southern-fulton-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "Classic Cabinets Kitchen and Bath",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-cabinets-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    }
                  ].map((company, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                      <div 
                        className={`w-[200px] h-[100px] relative bg-white/5 rounded-lg p-4 flex items-center justify-center hover:bg-white/10 transition-all duration-300 ${company.name === "Classic Cabinets Kitchen and Bath" ? "mr-4" : ""} ${index === 0 && company.name === "Lanco-Pennland Quality Milk Producers" ? "ml-8" : ""}`}
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          className="object-contain p-4 grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </FadeIn>
                  ))}
                </div>

                {/* Duplicate set of logos for seamless scrolling */}
                <div className="flex space-x-8 items-center">
                  {[
                    {
                      name: "Lanco-Pennland Quality Milk Producers",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lanco-pennland-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "D.M Bowman Inc",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dm-bowman-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "iSmile Dental Care",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ismile-dental-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "Southern Fulton School District",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/southern-fulton-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    },
                    {
                      name: "Classic Cabinets Kitchen and Bath",
                      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/classic-cabinets-logo-8f9f9f9f8f9f9f9f8f9f9f9f8f9f9f9f.png"
                    }
                  ].map((company, index) => (
                    <FadeIn key={index} delay={index * 0.1}>
                      <div 
                        className={`w-[200px] h-[100px] relative bg-white/5 rounded-lg p-4 flex items-center justify-center hover:bg-white/10 transition-all duration-300 ${company.name === "Classic Cabinets Kitchen and Bath" ? "mr-4" : ""} ${index === 0 && company.name === "Lanco-Pennland Quality Milk Producers" ? "ml-8" : ""}`}
                      >
                        <Image
                          src={company.logo}
                          alt={company.name}
                          fill
                          className="object-contain p-4 grayscale hover:grayscale-0 transition-all duration-300"
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

      {/* FAQ Section */}
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
            
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <FadeIn delay={0.1}>
                <div className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === 1 ? 'active' : ''}`}>
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  >
                    <h3 className="text-xl font-medium text-[#e9eae3]">
                      What makes Digital DSI different from other IT providers?
                    </h3>
                    <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === 1 ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                      {openFaq === 1 ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-content px-6 ${openFaq === 1 ? 'open' : ''}`}>
                    <p className="text-gray-400">
                      With 30 years of experience, we offer personalized IT solutions tailored to your specific business needs. Our customer-obsessed approach means we prioritize understanding your unique challenges before recommending solutions, ensuring you get exactly what your business requires to thrive.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* FAQ Item 2 */}
              <FadeIn delay={0.2}>
                <div className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === 2 ? 'active' : ''}`}>
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  >
                    <h3 className="text-xl font-medium text-[#e9eae3]">
                      How quickly can you respond to IT emergencies?
                    </h3>
                    <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === 2 ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                      {openFaq === 2 ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-content px-6 ${openFaq === 2 ? 'open' : ''}`}>
                    <p className="text-gray-400">
                      Our 24/7 support team is always ready to respond to emergencies. For managed service clients, we guarantee response times as quick as 15 minutes for critical issues, with most problems resolved remotely within the first hour of contact.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* FAQ Item 3 */}
              <FadeIn delay={0.3}>
                <div className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === 3 ? 'active' : ''}`}>
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  >
                    <h3 className="text-xl font-medium text-[#e9eae3]">
                      Do you offer solutions for businesses of all sizes?
                    </h3>
                    <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === 3 ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                      {openFaq === 3 ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-content px-6 ${openFaq === 3 ? 'open' : ''}`}>
                    <p className="text-gray-400">
                      Yes, we serve businesses of all sizes, from small startups to large enterprises. Our scalable solutions are designed to grow with your business, ensuring you always have the right level of IT support and infrastructure for your current needs.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* FAQ Item 4 */}
              <FadeIn delay={0.4}>
                <div className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === 4 ? 'active' : ''}`}>
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                  >
                    <h3 className="text-xl font-medium text-[#e9eae3]">
                      How do you handle cybersecurity concerns?
                    </h3>
                    <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === 4 ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                      {openFaq === 4 ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-content px-6 ${openFaq === 4 ? 'open' : ''}`}>
                    <p className="text-gray-400">
                      We take a multi-layered approach to cybersecurity, including endpoint protection, network security, regular vulnerability assessments, and employee training. Our security solutions are constantly updated to address emerging threats, keeping your business data safe.
                    </p>
                  </div>
                </div>
              </FadeIn>
              
              {/* FAQ Item 5 */}
              <FadeIn delay={0.5}>
                <div className={`faq-item border border-gray-800 rounded-lg overflow-hidden bg-[#0F1015] hover:border-blue-500/30 transition-all duration-300 ${openFaq === 5 ? 'active' : ''}`}>
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                  >
                    <h3 className="text-xl font-medium text-[#e9eae3]">
                      Can you help with cloud migration?
                    </h3>
                    <span className="text-blue-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === 5 ? 'rotate(0deg)' : 'rotate(90deg)' }}>
                      {openFaq === 5 ? '−' : '+'}
                    </span>
                  </button>
                  <div className={`faq-content px-6 ${openFaq === 5 ? 'open' : ''}`}>
                    <p className="text-gray-400">
                      Absolutely. We specialize in seamless cloud migrations, whether you're moving to Microsoft 365, AWS, Azure, or other cloud platforms. Our team handles the entire process, from planning and implementation to training and ongoing support, minimizing disruption to your business.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/faq');
                }}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors duration-300"
              >
                View All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-35 relative overflow-hidden bg-[#0F1015] pb-16">
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
            <FadeIn delay={0.2}>
              <p className="text-[#e9eae3] text-xl mb-12">
                Ready to transform your IT infrastructure? Our experts are here to help.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Contact Info */}
              <FadeIn delay={0.4} direction="right">
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
              
              {/* Quick Contact Form */}
              <FadeIn delay={0.6} direction="left">
                <div className="bg-[#090A11] p-8 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                  <form className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-[#1A1B23] border border-gray-800 rounded-lg text-[#e9eae3] placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 bg-[#1A1B23] border border-gray-800 rounded-lg text-[#e9eae3] placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows={4}
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
            
            {/* Additional CTA */}
            <div className="inline-flex items-center space-x-2 text-[#e9eae3]">
              <span className="text-lg">Need immediate assistance?</span>
              <Link
                href="/emergency"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/emergency');
                }}
                className="text-lg text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact emergency support →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

