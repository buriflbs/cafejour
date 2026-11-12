"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const categories = [
    { id: "all", label: "Alle Impressionen" },
    { id: "cafe", label: "Café" },
    { id: "bar", label: "Bar" },
    { id: "catering", label: "Catering" },
    { id: "atmosphaere", label: "Atmosphäre" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? siteConfig.galleryItems
      : siteConfig.galleryItems.filter(
          (item) => item.category === selectedCategory
        );

  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : filteredItems.length - 1;
    });
  }, [filteredItems.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev < filteredItems.length - 1 ? prev + 1 : 0;
    });
  }, [filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  // Focus trap / focus close button when lightbox opens
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const currentItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Galerie Kategorien"
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all focus-ring ${
                isSelected
                  ? "bg-[#111110] text-[#F3EEE6] shadow-md font-semibold"
                  : "bg-white text-[#5C554E] hover:text-[#111110] hover:bg-[#FAF7F2] border border-[#DCD5C8]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, index) => {
          return (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden bg-white border border-[#DCD5C8] shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <button
                type="button"
                onClick={(e) => openLightbox(index, e)}
                className="w-full text-left block focus-ring rounded-xl overflow-hidden"
                aria-label={`${item.title} vergrössern`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181816]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="inline-flex items-center text-xs tracking-[0.2em] uppercase font-semibold text-[#F3EEE6]">
                      <Maximize2 className="w-4 h-4 mr-2 text-[#C6AD83]" />
                      Grossansicht
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif text-lg text-[#111110] group-hover:text-[#A98E63] transition-colors mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Accessible Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-[#C6AD83] hover:text-[#111110] transition-colors focus-ring"
            aria-label="Grossansicht schliessen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 sm:left-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-[#C6AD83] hover:text-[#111110] transition-colors focus-ring"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 sm:right-6 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-[#C6AD83] hover:text-[#111110] transition-colors focus-ring"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <div className="relative w-full h-[60vh] sm:h-[72vh]">
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-4 text-center text-white px-4">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6AD83] font-mono block">
                {currentItem.categoryLabel} ({lightboxIndex + 1} von {filteredItems.length})
              </span>
              <p className="font-serif text-xl sm:text-2xl font-normal mt-1">
                {currentItem.title}
              </p>
              <p className="text-xs text-[#B8B0A4] mt-1 max-w-xl mx-auto font-light">
                {currentItem.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
