import React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#111110] text-[#F3EEE6] border-t border-[#2A2A26] relative overflow-hidden">
      {/* Upper Footer: Atmosphere & Direct Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block group focus-ring rounded-sm">
              <span className="font-serif text-3xl sm:text-4xl tracking-wide text-[#F3EEE6] group-hover:text-[#C6AD83] transition-colors">
                Cafe Jour
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-[#C6AD83] font-mono mt-1">
                Allschwil · Basel-Landschaft
              </span>
            </Link>
            <p className="text-sm text-[#B8B0A4] max-w-sm leading-relaxed font-light">
              Café, Bar und Catering an der Spitzwaldstrasse in Allschwil. Ein
              ausgewählter Ort für inspirierende Begegnungen, erstklassigen Kaffeegenuss
              und exklusive kulinarische Begleitung.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center text-xs text-[#B8B0A4] bg-[#181816] px-3.5 py-2 rounded border border-[#2A2A26]">
                <span className="font-medium text-[#F3EEE6] mr-2">Eintrag:</span>
                <span className="font-mono text-[11px]">{siteConfig.registeredName}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#C6AD83] font-semibold font-mono">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B8B0A4]">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-[#F3EEE6] transition-colors focus-ring rounded-sm py-0.5 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Direction Col */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#C6AD83] font-semibold font-mono">
              Standort & Anfahrt
            </h3>
            <div className="space-y-1 text-sm text-[#B8B0A4] font-light">
              <p className="text-[#F3EEE6] font-medium font-serif">{siteConfig.brandName}</p>
              <p>{siteConfig.address.street}</p>
              <p>
                {siteConfig.address.zip} {siteConfig.address.city}
              </p>
              <p>{siteConfig.address.country}</p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-2.5">
              <a
                href={siteConfig.maps.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs tracking-[0.15em] uppercase font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] px-4 py-2.5 rounded-sm transition-colors focus-ring"
              >
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                <span>Route planen</span>
                <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center text-xs tracking-[0.15em] uppercase font-medium text-[#F3EEE6] hover:text-[#C6AD83] px-3.5 py-2.5 transition-colors focus-ring"
              >
                <span>Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Monumental Typographic Watermark */}
      <div className="border-t border-[#2A2A26] pt-8 pb-4 overflow-hidden select-none pointer-events-none opacity-[0.06] flex items-center justify-center">
        <span className="font-serif text-[18vw] leading-none tracking-tighter whitespace-nowrap text-[#F3EEE6] font-bold">
          CAFE JOUR
        </span>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#2A2A26] bg-[#0A0A09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B0A4]/70 font-light">
            <p>
              &copy; {currentYear} {siteConfig.brandName} ({siteConfig.registeredName}). Alle Rechte vorbehalten.
            </p>

            <div className="flex items-center space-x-6">
              <Link
                href="/impressum"
                className="hover:text-[#F3EEE6] transition-colors focus-ring"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="hover:text-[#F3EEE6] transition-colors focus-ring"
              >
                Datenschutz
              </Link>
              <a
                href={siteConfig.reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C6AD83] transition-colors inline-flex items-center focus-ring"
              >
                <span>{siteConfig.reference.name}</span>
                <ArrowUpRight className="ml-1 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
