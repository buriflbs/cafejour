"use client";

import React, { useState } from "react";
import { MapPin, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function InteractiveMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-[#E8E2D8] shadow-md flex flex-col">
      {/* Map display / privacy notice */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#F4EFEB] flex items-center justify-center overflow-hidden">
        {mapLoaded ? (
          <iframe
            title="Standort Cafe Jour in Allschwil"
            src={`https://maps.google.com/maps?q=${siteConfig.maps.embedQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#FAF8F5] via-[#F4EFEB] to-[#EAE3D8]">
            <div className="w-12 h-12 rounded-full bg-[#1C1612] text-[#C5A880] flex items-center justify-center mb-3 shadow">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#1C1612] mb-1">
              Interaktive Karte von Allschwil
            </h4>
            <p className="text-xs text-[#6B6156] max-w-sm mb-4 leading-relaxed">
              Aus Datenschutzgründen wird die interaktive Google-Karte erst geladen, wenn Sie zustimmen. Dabei können Daten an Google übertragen werden.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-[#1C1612] hover:bg-[#2A211B] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium rounded-sm transition-colors focus-ring"
              >
                <Compass className="w-3.5 h-3.5 mr-1.5 text-[#C5A880]" />
                <span>Karte jetzt laden</span>
              </button>
              <a
                href={siteConfig.maps.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-[#1C1612] text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors focus-ring"
              >
                <span>Direkt in Google Maps</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </a>
            </div>
            <div className="mt-3 flex items-center text-[11px] text-[#A0988F]">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#A88656]" />
              <span>Privatsphären-Schutz aktiv</span>
            </div>
          </div>
        )}
      </div>

      {/* Address & Fast Route Summary */}
      <div className="p-6 bg-[#FAF8F5] border-t border-[#E8E2D8] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A88656] block">
            Offizielle Adresse
          </span>
          <p className="text-base font-serif font-medium text-[#1C1612]">
            Cafe Jour
          </p>
          <p className="text-xs sm:text-sm text-[#6B6156]">
            {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city} (Basel-Landschaft)
          </p>
        </div>

        <a
          href={siteConfig.maps.routeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#1C1612] bg-[#C5A880] hover:bg-[#D4AF37] transition-colors rounded-sm focus-ring self-start sm:self-center"
        >
          <span>Route planen</span>
          <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
