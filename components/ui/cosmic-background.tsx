"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  type: "star" | "orb" | "glow";
  color: string;
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  oscillateOffset: number;
  oscillateSpeed: number;
  magnetism: number; // How much this particle responds to cursor
}

interface CosmicBackgroundProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
}

// Warm dominant color palette
const COLORS = {
  warm: [
    { r: 184, g: 90, b: 50 },   // Terracotta
    { r: 130, g: 46, b: 58 },   // Burgundy
    { r: 212, g: 168, b: 75 },  // Gold
  ],
  cool: [
    { r: 120, g: 150, b: 190 }, // Soft blue
    { r: 160, g: 140, b: 180 }, // Lavender
  ],
};

function getRandomColor(): { r: number; g: number; b: number } {
  // 75% warm, 25% cool
  if (Math.random() < 0.75) {
    return COLORS.warm[Math.floor(Math.random() * COLORS.warm.length)];
  }
  return COLORS.cool[Math.floor(Math.random() * COLORS.cool.length)];
}

function createParticle(width: number, height: number): Particle {
  const rand = Math.random();
  let type: "star" | "orb" | "glow";
  let size: number;
  let baseAlpha: number;

  if (rand < 0.6) {
    // Small stars (60%)
    type = "star";
    size = 1 + Math.random() * 2;
    baseAlpha = 0.4 + Math.random() * 0.3;
  } else if (rand < 0.9) {
    // Medium orbs (30%)
    type = "orb";
    size = 3 + Math.random() * 4;
    baseAlpha = 0.25 + Math.random() * 0.2;
  } else {
    // Large glowing orbs (10%)
    type = "glow";
    size = 10 + Math.random() * 12;
    baseAlpha = 0.15 + Math.random() * 0.12;
  }

  const color = getRandomColor();

  // Bias particles toward the sides (left 25% or right 25% of screen)
  // Some particles (20%) can appear in center for subtle effect
  let x: number;
  if (Math.random() < 0.8) {
    // 80% of particles on the sides
    if (Math.random() < 0.5) {
      // Left side (0-30% of width)
      x = Math.random() * width * 0.3;
    } else {
      // Right side (70-100% of width)
      x = width * 0.7 + Math.random() * width * 0.3;
    }
  } else {
    // 20% can be anywhere (but will be subtle)
    x = Math.random() * width;
  }
  const y = Math.random() * height;

  return {
    x,
    y,
    baseX: x,
    baseY: y,
    size,
    type,
    color: `${color.r}, ${color.g}, ${color.b}`,
    alpha: baseAlpha,
    baseAlpha,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.14,
    oscillateOffset: Math.random() * Math.PI * 2,
    oscillateSpeed: 0.001 + Math.random() * 0.002,
    magnetism: 0.5 + Math.random() * 2, // Subtle cursor response
  };
}

export function CosmicBackground({
  className,
  particleCount = 70,
  connectionDistance = 150,
}: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const isDarkRef = useRef<boolean>(false);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(width, height));
      }
    },
    [particleCount]
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle, isDark: boolean) => {
      const opacityMultiplier = isDark ? 1.0 : 0.7;
      const alpha = particle.alpha * opacityMultiplier;

      if (particle.type === "glow") {
        // Large glowing orb with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${alpha * 0.8})`);
        gradient.addColorStop(0.4, `rgba(${particle.color}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else if (particle.type === "orb") {
        // Medium orb with soft edge
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${alpha})`);
        gradient.addColorStop(0.6, `rgba(${particle.color}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // Small star - simple dot
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${alpha})`;
        ctx.fill();
      }
    },
    []
  );

  const drawConnections = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      isDark: boolean
    ) => {
      const opacityMultiplier = isDark ? 0.15 : 0.1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity =
              (1 - distance / connectionDistance) * opacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184, 90, 50, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    },
    [connectionDistance]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w: width, h: height } = canvasSizeRef.current;

    // Check if dark mode
    isDarkRef.current = document.documentElement.classList.contains("dark");

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update time
    timeRef.current += 1;

    // Mouse position relative to center
    const mouseX = mouseRef.current.x - width / 2;
    const mouseY = mouseRef.current.y - height / 2;

    // Update and draw particles
    const particles = particlesRef.current;

    for (const particle of particles) {
      // Update base position with velocity
      particle.baseX += particle.vx;
      particle.baseY += particle.vy;

      // Gentle oscillation
      const oscillation = Math.sin(
        timeRef.current * particle.oscillateSpeed + particle.oscillateOffset
      );
      particle.baseY += oscillation * 0.05;
      particle.alpha =
        particle.baseAlpha + oscillation * 0.05 * particle.baseAlpha;

      // Wrap around edges - keep particles biased to sides
      if (particle.baseX < -particle.size) {
        // Coming from left, reappear on right side
        particle.baseX = width * 0.7 + Math.random() * width * 0.3;
      }
      if (particle.baseX > width + particle.size) {
        // Coming from right, reappear on left side
        particle.baseX = Math.random() * width * 0.3;
      }
      if (particle.baseY < -particle.size) particle.baseY = height + particle.size;
      if (particle.baseY > height + particle.size) particle.baseY = -particle.size;

      // Apply subtle cursor parallax (particles shift slightly toward/away from cursor)
      const parallaxStrength = 0.015;
      const offsetX = mouseX * parallaxStrength * particle.magnetism;
      const offsetY = mouseY * parallaxStrength * particle.magnetism;

      // Smooth interpolation toward target position
      particle.x += (particle.baseX + offsetX - particle.x) * 0.05;
      particle.y += (particle.baseY + offsetY - particle.y) * 0.05;
    }

    // Draw constellation lines first (behind particles)
    drawConnections(ctx, particles, isDarkRef.current);

    // Draw particles
    for (const particle of particles) {
      drawParticle(ctx, particle, isDarkRef.current);
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [drawConnections, drawParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      canvasSizeRef.current = { w: width, h: height };

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initParticles(width, height);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Static render for reduced motion
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const particles = particlesRef.current;
        drawConnections(ctx, particles, isDarkRef.current);
        for (const particle of particles) {
          drawParticle(ctx, particle, isDarkRef.current);
        }
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate, drawConnections, drawParticle, initParticles]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}

export default CosmicBackground;
