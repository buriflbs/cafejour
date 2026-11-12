"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const isHome = pathname === "/";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#C6AD83] text-[#111110] px-5 py-3 rounded text-xs uppercase tracking-widest font-semibold shadow-2xl focus-ring"
      >
        Zum Hauptinhalt springen
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || !isHome
            ? "bg-[#111110]/95 backdrop-blur-md py-3.5 border-b border-[#2A2A26] shadow-xl shadow-black/20"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex flex-col focus-ring rounded-sm py-1"
              aria-label="Cafe Jour Startseite"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-wide font-normal text-[#F3EEE6] transition-colors group-hover:text-[#C6AD83]">
                Cafe Jour
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C6AD83] -mt-1 font-mono">
                Allschwil · Schweiz
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              aria-label="Hauptnavigation"
            >
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 text-xs tracking-[0.18em] uppercase transition-all relative focus-ring rounded-sm ${
                      isActive
                        ? "text-[#C6AD83] font-semibold"
                        : "text-[#F3EEE6]/80 hover:text-[#F3EEE6]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C6AD83] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA and Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <Link
                href="/catering#anfrage"
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-all duration-300 rounded-sm shadow-md hover:shadow-lg focus-ring group"
              >
                <span>Catering anfragen</span>
                <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 text-[#F3EEE6] hover:text-[#C6AD83] rounded-sm transition-colors focus-ring"
                aria-label={mobileMenuOpen ? "Menü schliessen" : "Menü öffnen"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Content Sheet */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#111110] border-l border-[#2A2A26] p-6 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#2A2A26]">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col"
              >
                <span className="font-serif text-2xl text-[#F3EEE6]">
                  Cafe Jour
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C6AD83] font-mono">
                  Allschwil
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 text-[#F3EEE6] hover:text-[#C6AD83] rounded-sm focus-ring"
                aria-label="Menü schliessen"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col space-y-1" aria-label="Mobilnavigation">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded text-sm uppercase tracking-[0.15em] transition-colors flex items-center justify-between ${
                      isActive
                        ? "text-[#C6AD83] bg-[#29201B] font-semibold"
                        : "text-[#F3EEE6]/80 hover:text-[#F3EEE6] hover:bg-[#181816]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6AD83]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-[#2A2A26]">
              <Link
                href="/catering#anfrage"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-4 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-colors rounded-sm shadow"
              >
                <span>Catering anfragen</span>
                <ArrowUpRight className="ml-1.5 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Footer Info */}
          <div className="pt-6 border-t border-[#2A2A26] text-xs text-[#F3EEE6]/60 space-y-1.5">
            <p className="text-[#F3EEE6] font-medium font-serif">Cafe Jour</p>
            <p>{siteConfig.address.street}</p>
            <p>{siteConfig.address.zip} {siteConfig.address.city}, Schweiz</p>
            <div className="pt-2">
              <a
                href={siteConfig.maps.routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#C6AD83] hover:underline"
              >
                <span>Route in Google Maps</span>
                <ArrowUpRight className="ml-1 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
