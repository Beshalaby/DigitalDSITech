'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null; radius: number }>({ 
    x: null, 
    y: null, 
    radius: 150 
  });
  const isMouseInside = useRef(false);

  const particleColor = 'rgba(147, 51, 234, 1.0)'; // Keep particles opaque
  const lineColor = 'rgba(147, 51, 234, 0.5)'; // Further increased line opacity
  const mouseParticleColor = 'rgba(192, 132, 252, 0.9)'; // Brighter purple for mouse
  const mouseParticleRadius = 4.5; // Slightly larger radius for mouse
  const mouseOuterCircleColor = 'rgba(192, 132, 252, 0.3)'; // Fainter color for outer circle
  const mouseOuterCircleRadius = 12; // Radius of the surrounding circle
  const mouseOuterCircleWidth = 1.5; // Line width of the surrounding circle
  const numParticles = 150; // Further increased particle count
  const connectDistance = 130; // Slightly increased connect distance

  // Initialize particles
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particles.current = [];
    const { width, height } = canvas;
    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, 
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2.5 + 1.5, // Increased max radius again
        color: particleColor,
      });
    }
  }, [particleColor, numParticles]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < p.radius || p.x > width - p.radius) p.vx *= -1;
      if (p.y < p.radius || p.y > height - p.radius) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // Draw the mouse particle if mouse coords are known (always try now)
    if (isMouseInside.current && mouse.current.x !== null && mouse.current.y !== null) {
      // Draw inner mouse particle
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, mouseParticleRadius, 0, Math.PI * 2);
      ctx.fillStyle = mouseParticleColor;
      ctx.fill();
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, mouseOuterCircleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = mouseOuterCircleColor;
      ctx.lineWidth = mouseOuterCircleWidth;
      ctx.stroke();
    }

    // Draw lines between nearby particles and to the mouse position
    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1.2; // Increased line width further
          ctx.stroke();
        }
      }
      if (mouse.current.x !== null && mouse.current.y !== null) {
          const p1 = particles.current[i];
          const dxMouse = p1.x - mouse.current.x;
          const dyMouse = p1.y - mouse.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distanceMouse < mouse.current.radius) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(mouse.current.x, mouse.current.y);
              ctx.strokeStyle = lineColor; 
              ctx.lineWidth = 0.9; // Increased mouse line width further
              ctx.stroke();
          }
      }
    }

    animationFrameId.current = requestAnimationFrame(animate); // Restore animation loop
  }, [lineColor, connectDistance, mouseParticleColor, mouseParticleRadius, mouseOuterCircleColor, mouseOuterCircleRadius, mouseOuterCircleWidth, initParticles]); // Added outer circle style dependencies

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!canvasRef.current) return;
            canvasRef.current.width = canvasRef.current.offsetWidth;
            canvasRef.current.height = canvasRef.current.offsetHeight;
            initParticles(canvasRef.current);
        }, 100);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return; // Ensure canvas ref exists
      const rect = canvasRef.current.getBoundingClientRect();
      
      // Update logical mouse position relative to canvas for drawing lines
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;

      // Check the element directly under the cursor
      const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);
      
      // Check if the element is the canvas OR the direct parent (body/html)
      // Adjust this check if your structure is different or if specific containers should allow the custom cursor
      const isOverBackground = elementUnderCursor === canvasRef.current || 
                               elementUnderCursor === document.body || 
                               elementUnderCursor === document.documentElement ||
                               elementUnderCursor?.id === 'page-container'; // Assume parent div has id='page-container'

      if (isOverBackground) {
        if (!isMouseInside.current) {
          isMouseInside.current = true;
          document.documentElement.classList.add('hide-default-cursor');
        }
      } else {
        if (isMouseInside.current) {
          isMouseInside.current = false;
          document.documentElement.classList.remove('hide-default-cursor');
        }
      }
    };
    
    const handleMouseLeaveWindow = () => {
      mouse.current.x = null; 
      mouse.current.y = null;
      if (isMouseInside.current) {
        isMouseInside.current = false;
        document.documentElement.classList.remove('hide-default-cursor');
      }
    };

    // Initial setup
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles(canvas);
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove); 
    window.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.documentElement.classList.remove('hide-default-cursor'); 
      clearTimeout(resizeTimeout);
    };
  }, [initParticles, animate]);

  return (
    <canvas 
      ref={canvasRef} 
      id="interactive-background-canvas"
      style={{
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Keep z-index at 0
        pointerEvents: 'none' // Set back to none
      }}
    />
  );
};

export default InteractiveBackground; 