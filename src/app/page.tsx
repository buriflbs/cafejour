import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Coffee, Wine, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CinematicHero } from "@/components/CinematicHero";
import { InteractiveSpotlight3D } from "@/components/InteractiveSpotlight3D";
import { HorizontalGalleryReel } from "@/components/HorizontalGalleryReel";
import { InteractiveMap } from "@/components/InteractiveMap";
import { siteConfig } from "@/data/siteConfig";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* SECTION A: FULL-SCREEN CINEMATIC HERO SLIDESHOW */}
        <CinematicHero />

        {/* SECTION B: WARM IVORY TYPOGRAPHIC WELCOME */}
        <section id="entdecken" className="py-24 sm:py-36 bg-[#F3EEE6] scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A98E63] font-mono block mb-4">
              Willkommen im Cafe Jour
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#111110] font-normal leading-[1.08] tracking-tight mb-8">
              Kaffeekultur, Bar-Momente <br />
              <span className="italic text-[#A98E63]">& persönliche Feste.</span>
            </h2>
            <div className="w-20 h-[1.5px] bg-[#C6AD83] mx-auto mb-10" />
            <p className="text-lg sm:text-xl text-[#5C554E] leading-relaxed max-w-3xl mx-auto font-light">
              Mitten im Quartier an der Spitzwaldstrasse in Allschwil verbinden wir die Herzlichkeit eines europäischen Quartier-Cafés mit dem Anspruch an moderne, kompromisslose Gastfreundschaft. Ein Rückzugsort für den perfekten Espresso am Morgen, den gepflegten Feierabend-Apéro und massgeschneiderte Catering-Erlebnisse.
            </p>
          </div>
        </section>

        {/* SECTION C: ASYMMETRICAL EDITORIAL COMPOSITION (CAFÉ & BAR) WITH 3D SPOTLIGHT */}
        <section className="py-20 sm:py-32 bg-[#FAF7F2] border-y border-[#DCD5C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Asymmetrical Text & Service Features */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block mb-2">
                    01 · Kaffeegenuss & Handwerk
                  </span>
                  <h3 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                    Die Kunst des Kaffees, <br />
                    frisch zelebriert
                  </h3>
                </div>

                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Vom ersten sorgfältig getemperten Espresso am frühen Morgen bis zur entspannten Kaffeerunde am Nachmittag: Wir widmen jedem Schritt die Zeit, die er verdient. Feine Röstungen, aromaschonende Zubereitung und samtiger Milchschaum schaffen Geschmacksnoten, die im Gedächtnis bleiben.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#DCD5C8]">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-[#A98E63]">
                      <Coffee className="w-4 h-4" />
                      <h4 className="font-serif text-lg text-[#111110]">Barista Espresso</h4>
                    </div>
                    <p className="text-xs text-[#5C554E] leading-normal font-light">
                      Klassische italienische Extraktion mit samtiger Crema.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-[#A98E63]">
                      <Wine className="w-4 h-4" />
                      <h4 className="font-serif text-lg text-[#111110]">Apéro-Tradition</h4>
                    </div>
                    <p className="text-xs text-[#5C554E] leading-normal font-light">
                      Erlesene Weine und erfrischende Drinks zum Feierabend.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/cafe-bar"
                    className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] hover:text-[#A98E63] transition-colors focus-ring group"
                  >
                    <span>Café & Bar Philosophie entdecken</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Asymmetrical 3D Spotlight Focus */}
              <div className="lg:col-span-6">
                <InteractiveSpotlight3D />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION D: DARK CINEMATIC FULL-WIDTH ATMOSPHERE SCENE (NACHT & APÉRO) */}
        <section className="relative py-28 sm:py-40 bg-[#111110] text-[#F3EEE6] overflow-hidden film-grain">
          {/* Subtle Parallax Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/bar-evening.jpg"
              alt="Abendliche Barstimmung im Cafe Jour"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/70 to-[#111110]/80" />
            <div className="absolute inset-0 cinematic-vignette" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block">
              02 · Die Abendstunden
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F3EEE6] font-normal leading-tight">
              Wenn der Tag zur Ruhe kommt.
            </h2>
            <p className="text-base sm:text-xl text-[#B8B0A4] max-w-2xl mx-auto font-light leading-relaxed">
              Warmes Licht, das sanfte Klirren von Gläsern und die Gelassenheit eines gepflegten Apéros. In der Bar des Cafe Jour wird jeder Feierabend zu einer wohlverdienten Auszeit.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/cafe-bar#bar"
                className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-all duration-300 rounded-sm shadow-xl focus-ring"
              >
                Bar-Kultur erleben
              </Link>
              <Link
                href="/galerie"
                className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F3EEE6] hover:text-[#C6AD83] border border-white/20 hover:border-[#C6AD83] transition-all duration-300 rounded-sm focus-ring"
              >
                Impressionen ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION E: CATERING EDITORIAL SHOWCASE & PROCESS */}
        <section className="py-24 sm:py-36 bg-[#F3EEE6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Photo Column */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[#DCD5C8]">
                  <Image
                    src="/images/catering-apero.jpg"
                    alt="Exklusives Catering für Anlässe in Allschwil"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#111110] text-[#F3EEE6] p-6 rounded-lg shadow-2xl border border-[#2A2A26] max-w-xs">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C6AD83] font-mono mb-1">
                    03 · Catering
                  </p>
                  <p className="font-serif text-lg text-[#F3EEE6]">
                    «Für private Momente und geschäftliche Meilensteine.»
                  </p>
                </div>
              </div>

              {/* Text & Steps Column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block mb-2">
                    Kulinarischer Anlass-Service
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                    Catering mit persönlicher Handschrift
                  </h2>
                </div>

                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Ob Apéro riche, Familienfeier oder Firmenevent im Kanton Basel-Landschaft: Wir entwickeln das Verpflegungskonzept individuell nach Ihren Wünschen. Frische Zutaten, stilsichere Präsentation und zuverlässige Betreuung machen Ihren Anlass unbeschwert.
                </p>

                <div className="space-y-3 pt-2">
                  {siteConfig.cateringProcess.map((step) => (
                    <div key={step.step} className="flex items-start space-x-3.5">
                      <span className="font-mono text-xs text-[#A98E63] font-semibold mt-0.5">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="font-serif text-base text-[#111110]">{step.title}</h4>
                        <p className="text-xs text-[#5C554E] font-light mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/catering#anfrage"
                    className="inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-all duration-300 rounded-sm shadow-md focus-ring group"
                  >
                    <span>Unverbindliche Catering-Offerte anfragen</span>
                    <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION F: HORIZONTAL INTERACTIVE CURATED GALLERY REEL */}
        <section className="py-20 sm:py-32 bg-[#FAF7F2] border-t border-[#DCD5C8]">
          <HorizontalGalleryReel />
        </section>

        {/* SECTION G: LOCATION, ROUTE & PRIVACY-FRIENDLY MAP */}
        <section className="py-20 sm:py-32 bg-[#F3EEE6] border-t border-[#DCD5C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block">
                  Standort & Wegbeschreibung
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                  Spitzwaldstrasse 4 in Allschwil
                </h2>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Das Cafe Jour befindet sich in bester Lage im Kanton Basel-Landschaft. Ob zu Fuss aus dem Quartier oder bequem mit Auto und öffentlichem Verkehr: Wir freuen uns auf Ihren Besuch.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#DCD5C8]">
                  <p className="font-serif text-lg text-[#111110]">{siteConfig.brandName}</p>
                  <p className="text-xs text-[#5C554E]">Eintrag: {siteConfig.registeredName}</p>
                  <p className="text-sm text-[#111110] font-medium">
                    {siteConfig.address.street}, {siteConfig.address.zip} {siteConfig.address.city}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={siteConfig.maps.routeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#111110] bg-[#C6AD83] hover:bg-[#DFCBB5] transition-colors rounded-sm focus-ring"
                  >
                    <MapPin className="w-3.5 h-3.5 mr-2" />
                    <span>Route in Google Maps</span>
                    <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#111110] bg-[#FAF7F2] hover:bg-[#E5DFD4] border border-[#DCD5C8] transition-colors rounded-sm focus-ring"
                  >
                    <span>Kontaktformular</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InteractiveMap />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SECTION H: MONUMENTAL PREMIUM FOOTER */}
      <Footer />
    </>
  );
}
