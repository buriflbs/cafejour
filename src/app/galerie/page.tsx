import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GalleryView } from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Galerie & Impressionen",
  description:
    "Einblicke in die Atmosphäre, den Kaffeegenuss, die Bar-Kultur und Catering-Events im Cafe Jour in Allschwil.",
};

export default function GaleriePage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Header */}
        <section className="pt-40 pb-20 sm:pt-48 sm:pb-24 bg-[#111110] text-[#F3EEE6] text-center film-grain">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-4">
              Impressionen
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight mb-4">
              Galerie
            </h1>
            <p className="text-base sm:text-xl text-[#B8B0A4] max-w-xl mx-auto font-light leading-relaxed">
              Entdecken Sie visuelle Eindrücke unseres Cafés, der Bar und feierlicher Catering-Momente in Allschwil.
            </p>
          </div>
        </section>

        {/* Gallery Content with Lightbox */}
        <section className="py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryView />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
