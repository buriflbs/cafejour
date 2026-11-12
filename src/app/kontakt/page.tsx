import React from "react";
import type { Metadata } from "next";
import { MapPin, Navigation, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveMap } from "@/components/InteractiveMap";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Kontakt & Anfahrt",
  description:
    "So finden Sie zum Cafe Jour an der Spitzwaldstrasse 4 in 4123 Allschwil. Anfahrt, Karte und Kontaktformular.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Header */}
        <section className="pt-40 pb-20 sm:pt-48 sm:pb-24 bg-[#111110] text-[#F3EEE6] text-center film-grain">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-4">
              Standort & Austausch
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight mb-4">
              Kontakt & Anfahrt
            </h1>
            <p className="text-base sm:text-xl text-[#B8B0A4] max-w-xl mx-auto font-light leading-relaxed">
              Finden Sie Ihren Weg zu uns an die Spitzwaldstrasse in Allschwil oder senden Sie uns eine direkte Nachricht.
            </p>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section className="py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Address, Directions, Info */}
              <div className="lg:col-span-5 space-y-8">
                {/* Official Address Card */}
                <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C6AD83] flex items-center justify-center text-[#A98E63]">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block">
                        Adresse
                      </span>
                      <h3 className="font-serif text-2xl text-[#111110]">
                        {siteConfig.brandName}
                      </h3>
                    </div>
                  </div>

                  <div className="text-sm text-[#5C554E] space-y-1 font-light">
                    <p className="text-[#111110] font-medium font-serif">{siteConfig.address.street}</p>
                    <p>
                      {siteConfig.address.zip} {siteConfig.address.city}
                    </p>
                    <p>{siteConfig.address.canton}, {siteConfig.address.country}</p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#DCD5C8] flex flex-col sm:flex-row gap-3">
                    <a
                      href={siteConfig.maps.routeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-colors rounded-sm focus-ring"
                    >
                      <Navigation className="w-3.5 h-3.5 mr-2" />
                      <span>Route via Google Maps</span>
                      <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Anreise & Orientierung */}
                <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-xl border border-[#DCD5C8]">
                  <h4 className="font-serif text-xl text-[#111110] mb-4">
                    Anreise nach Allschwil
                  </h4>
                  <ul className="space-y-4 text-xs sm:text-sm text-[#5C554E] leading-relaxed font-light">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A98E63] mt-2 mr-3 shrink-0" />
                      <span>
                        <strong className="text-[#111110] font-medium">Mit dem Auto:</strong> Bequeme Anfahrt über die Basler Stadtgrenze nach Allschwil. Parkmöglichkeiten finden sich in der Umgebung der Spitzwaldstrasse.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A98E63] mt-2 mr-3 shrink-0" />
                      <span>
                        <strong className="text-[#111110] font-medium">Öffentlicher Verkehr:</strong> Direkt an das Netz des Basler Nahverkehrs angebunden mit zügigen Verbindungen ins Zentrum von Allschwil.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Reference notice */}
                <div className="text-xs text-[#5C554E] space-y-1 font-light">
                  <p>
                    Registrierter Firmenname:{" "}
                    <span className="text-[#111110] font-medium">{siteConfig.registeredName}</span>
                  </p>
                  <p>
                    Referenzeintrag:{" "}
                    <a
                      href={siteConfig.reference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A98E63] hover:underline"
                    >
                      {siteConfig.reference.name} (GoRegio)
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 space-y-8">
                <ContactForm />

                {/* Interactive Map */}
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
