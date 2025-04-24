'use client';

import { useEffect } from 'react';

interface Window {
  particlesJS: any;
  pJSDom?: Array<{
    pJS: {
      fn: {
        vendors: {
          destroyCanvas: () => void;
        };
      };
    };
  }>;
}

declare global {
  interface Window {
    particlesJS: any;
    pJSDom?: Array<{
      pJS: {
        fn: {
          vendors: {
            destroyCanvas: () => void;
          };
        };
      };
    }>;
  }
}

const ParticlesContainer = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#3B82F6'
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: false
            },
            onclick: {
              enable: false
            },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    return () => {
      if (typeof window !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroyCanvas();
      }
    };
  }, []);

  return <div id="particles-js" className="absolute inset-0 z-0" />;
};

export default ParticlesContainer; 