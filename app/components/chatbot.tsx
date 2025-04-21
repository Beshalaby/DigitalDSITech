'use client';

import Script from "next/script"
import { usePathname } from "next/navigation"

export function Chatbot() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) return null;

  return (
    <Script id="chatbase-embed" strategy="afterInteractive">
      {`
        (function(){
          if(!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...arguments) => {
              if(!window.chatbase.q) {
                window.chatbase.q = []
              }
              window.chatbase.q.push(arguments)
            };
            window.chatbase = new Proxy(window.chatbase, {
              get(target, prop) {
                if(prop === "q") {
                  return target.q
                }
                return (...args) => target(prop, ...args)
              }
            })
          }

          const onLoad = function() {
            const script = document.createElement("script");
            script.src = "https://www.chatbase.co/embed.min.js";
            script.id = "kGpr8iRd3qBadHmgU4Zlh";
            script.domain = "www.chatbase.co";
            
            // Ensure proper positioning
            script.setAttribute("data-position", "fixed");
            script.setAttribute("data-bottom", "20px");
            script.setAttribute("data-right", "20px");
            
            document.body.appendChild(script);
            
            // Add style fix for z-index issues
            setTimeout(() => {
              const chatElements = document.querySelectorAll('.chatbase-iframe, .chatbot-container');
              chatElements.forEach(el => {
                if (el instanceof HTMLElement) {
                  el.style.position = 'fixed';
                  el.style.zIndex = '9999';
                  el.style.bottom = '20px';
                  el.style.right = '20px';
                }
              });
            }, 2000);
          };

          if(document.readyState === "complete") {
            onLoad()
          } else {
            window.addEventListener("load", onLoad)
          }
        })();
      `}
    </Script>
  )
} 