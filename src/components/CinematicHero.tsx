"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const SLIDE_DURATION = 8000; // 8 seconds per scene
  const TICK_INTERVAL = 50; // Progress tick every 50ms
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = siteConfig.heroSlides;

  // Handle visibility change (pause when tab hidden)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else if (!isReducedMotion) {
        setIsPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isReducedMotion]);

  // Slideshow progress & interval
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
      });
    }, TICK_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Subtle Mouse Parallax Depth (Desktop only, limited to 4px)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion || window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation for Hero
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === " ") {
      e.preventDefault();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Cafe Jour Slideshow"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#111110] text-[#F3EEE6] focus-ring"
    >
      {/* BACKGROUND SLIDES WITH KEN BURNS MOTION & DISSOLVE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Szene ${index + 1} von ${slides.length}: ${slide.sceneTitle}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div
                className={`w-full h-full relative ${
                  isActive && !isReducedMotion
                    ? index % 2 === 0
                      ? "animate-ken-burns-1"
                      : "animate-ken-burns-2"
                    : "scale-[1.02]"
                }`}
                style={{
                  transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`,
                  transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Layered Cinematic Darkness, Warm Vignette & Grain */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/55 to-[#111110]/70" />
              <div className="absolute inset-0 bg-[#29201B]/25 mix-blend-multiply" />
              <div className="absolute inset-0 cinematic-vignette opacity-80" />
            </div>
          );
        })}
      </div>

      {/* FOREGROUND HERO CONTENT (PARALLAX LAYER) */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-24 sm:py-36"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px, 0)`,
          transition: "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* Location & Scene Indicator */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C6AD83]/30 text-[#DFCBB5] text-[11px] uppercase tracking-[0.2em] mb-8 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#C6AD83]" />
          <span>{siteConfig.address.street} · 4123 Allschwil</span>
          <span className="text-[#C6AD83]/60">|</span>
          <span className="hidden sm:inline text-[#C6AD83] font-medium">
            {slides[currentSlide].sceneTag}
          </span>
        </div>

        {/* Cinematic Main Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#F3EEE6] tracking-tight leading-[1.04] mb-8 drop-shadow-md">
          Ein Moment. <br />
          <span className="italic font-normal text-[#C6AD83] tracking-normal">
            Ganz für Sie.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl md:text-3xl text-[#F3EEE6]/85 font-light tracking-wide max-w-2xl mx-auto mb-8 leading-relaxed">
          Café, Bar & Catering in Allschwil.
        </p>

        {/* Active Dish Appetizing Highlight */}
        <div className="max-w-2xl mx-auto mb-10 transition-all duration-700">
          <div className="inline-block px-5 py-3 rounded-2xl bg-black/65 backdrop-blur-md border border-[#C6AD83]/40 text-left shadow-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6AD83] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C6AD83] font-semibold font-mono">
                {slides[currentSlide].sceneTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#F3EEE6] font-light leading-relaxed">
              {slides[currentSlide].appetizingDescription}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link
            href="#entdecken"
            className="w-full sm:w-auto px-9 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#F3EEE6] hover:bg-[#C6AD83] transition-all duration-300 rounded-sm shadow-xl hover:shadow-[#C6AD83]/20 focus-ring text-center"
          >
            Cafe Jour entdecken
          </Link>
          <Link
            href="/catering#anfrage"
            className="w-full sm:w-auto px-9 py-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#F3EEE6] bg-[#111110]/80 hover:bg-[#29201B] border border-[#C6AD83] transition-all duration-300 rounded-sm backdrop-blur-md focus-ring flex items-center justify-center group"
          >
            <span>Catering anfragen</span>
            <ArrowRight className="ml-2 w-4 h-4 text-[#C6AD83] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* BOTTOM SLIDESHOW CONTROLS & PROGRESS BARS */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-30 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111110]/60 backdrop-blur-md p-3 sm:px-6 sm:py-3.5 rounded-lg border border-white/10">
          {/* Slide Progress Bars */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {slides.map((slide, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => selectSlide(idx)}
                  className="group flex flex-col text-left focus-ring rounded py-1 flex-1 sm:flex-initial"
                  aria-label={`Gehe zu Szene ${idx + 1}: ${slide.sceneTitle}`}
                  aria-current={isCurrent ? "true" : undefined}
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#F3EEE6]/60 group-hover:text-[#F3EEE6] mb-1 font-mono">
                    <span className={isCurrent ? "text-[#C6AD83] font-bold" : ""}>
                      0{idx + 1}
                    </span>
                    <span className="hidden md:inline ml-2 text-[10px] lowercase text-[#B8B0A4] truncate max-w-[110px]">
                      {slide.sceneTitle}
                    </span>
                  </div>
                  <div className="w-full sm:w-12 md:w-16 lg:w-20 h-1 bg-white/15 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#C6AD83] transition-all ${
                        isCurrent
                          ? "duration-75"
                          : idx < currentSlide
                          ? "w-full"
                          : "w-0"
                      }`}
                      style={{
                        width: isCurrent ? `${progress}%` : idx < currentSlide ? "100%" : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Navigation & Play/Pause */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C6AD83] text-[#F3EEE6] hover:text-[#111110] flex items-center justify-center transition-colors focus-ring"
              aria-label="Vorherige Szene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C6AD83] text-[#F3EEE6] hover:text-[#111110] flex items-center justify-center transition-colors focus-ring"
              aria-label={isPlaying ? "Slideshow anhalten" : "Slideshow abspielen"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C6AD83] text-[#F3EEE6] hover:text-[#111110] flex items-center justify-center transition-colors focus-ring"
              aria-label="Nächste Szene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
