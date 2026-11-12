"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Eye } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function HorizontalGalleryReel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = window.innerWidth > 768 ? 440 : 300;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Top Header with Navigation Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C6AD83] block mb-2">
            Visuelle Poesie
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111110]">
            Momente & Impressionen
          </h2>
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DCD5C8] hover:border-[#C6AD83] hover:bg-[#C6AD83] hover:text-[#111110] text-[#111110] flex items-center justify-center transition-all duration-200 focus-ring shadow-sm"
            aria-label="Galerie nach links scrollen"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DCD5C8] hover:border-[#C6AD83] hover:bg-[#C6AD83] hover:text-[#111110] text-[#111110] flex items-center justify-center transition-all duration-200 focus-ring shadow-sm"
            aria-label="Galerie nach rechts scrollen"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="Horizontale Impressionen-Galerie"
        className="flex space-x-6 overflow-x-auto pb-8 pt-2 px-4 sm:px-6 lg:px-8 no-scrollbar scroll-smooth snap-x snap-mandatory focus-ring"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {siteConfig.galleryItems.map((item, index) => (
          <div
            key={item.id}
            className="flex-shrink-0 w-[280px] sm:w-[360px] md:w-[420px] snap-start group"
          >
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#181816] border border-[#DCD5C8] shadow-md group-hover:shadow-2xl transition-all duration-500">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 280px, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient & Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C6AD83] bg-black/50 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                    0{index + 1} · {item.categoryLabel}
                  </span>
                  <Link
                    href="/galerie"
                    className="w-9 h-9 rounded-full bg-white/15 text-white hover:bg-[#C6AD83] hover:text-[#111110] flex items-center justify-center transition-colors focus-ring"
                    aria-label={`${item.title} in Galerie ansehen`}
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F3EEE6] font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B8B0A4] font-light mt-1 line-clamp-2">
                    {item.alt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Last Slide: Link to complete Gallery */}
        <div className="flex-shrink-0 w-[240px] sm:w-[280px] snap-start flex items-center justify-center">
          <Link
            href="/galerie"
            className="w-full aspect-[4/5] rounded-xl border-2 border-dashed border-[#C6AD83]/60 bg-[#FAF7F2] hover:bg-[#C6AD83]/10 flex flex-col items-center justify-center p-8 text-center transition-colors group focus-ring"
          >
            <div className="w-14 h-14 rounded-full bg-[#111110] text-[#C6AD83] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </div>
            <span className="font-serif text-xl text-[#111110] group-hover:text-[#A98E63]">
              Gesamte Galerie
            </span>
            <span className="text-xs text-[#5C554E] mt-1 uppercase tracking-widest font-mono">
              Alle Fotos ansehen
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
