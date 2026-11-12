import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CateringForm } from "@/components/CateringForm";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Catering in Allschwil & Region Basel",
  description:
    "Massgeschneidertes Catering für private Anlässe und geschäftliche Events im Kanton Basel-Landschaft. Unverbindliche Anfrage beim Cafe Jour.",
};

export default function CateringPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Hero */}
        <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 bg-[#111110] text-[#F3EEE6] overflow-hidden film-grain">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/catering-event.jpg"
              alt="Catering und Eventbetreuung durch Cafe Jour"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/75 to-[#111110]/85" />
            <div className="absolute inset-0 cinematic-vignette" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-4">
              Catering & Eventservice
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight mb-6">
              Kulinarische Begleitung für Ihren Anlass
            </h1>
            <p className="text-base sm:text-xl text-[#B8B0A4] max-w-2xl mx-auto font-light leading-relaxed">
              Ob stimmungsvoller Apéro riche, private Feier oder geschäftliches Meeting in Allschwil und der Region Basel: Wir entwickeln mit Ihnen die passende kulinarische Lösung.
            </p>
          </div>
        </section>

        {/* Catering Philosophy & Event Types */}
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block">
                  Individuell & Zuverlässig
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                  Ihr Anlass im Mittelpunkt
                </h2>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Jeder Anlass hat seine eigene Dynamik. Ob im kleinen, vertrauten Kreis oder als grössere Gesellschaft: Wir legen Wert auf geschmackvolle Präsentation, frische Zutaten und einen reibungslosen Ablauf.
                </p>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Die genaue Zusammenstellung, Mengenkalkulation und Ausgestaltung stimmen wir stets persönlich mit Ihnen ab, damit Ihr Fest oder Firmenmeeting genau Ihren Vorstellungen entspricht.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#C6AD83]/20 text-[#A98E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-base font-serif text-[#111110]">Apéro & Stehempfänge</p>
                      <p className="text-xs text-[#5C554E] font-light mt-0.5">
                        Raffinierte Häppchen, Fingerfood und erfrischende Getränkebegleitung.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#C6AD83]/20 text-[#A98E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-base font-serif text-[#111110]">Private Feiern & Jubiläen</p>
                      <p className="text-xs text-[#5C554E] font-light mt-0.5">
                        Geburtstage, Familienfeste und besondere Lebensmomente.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#C6AD83]/20 text-[#A98E63] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-base font-serif text-[#111110]">Geschäftliche Anlässe</p>
                      <p className="text-xs text-[#5C554E] font-light mt-0.5">
                        Verpflegung für Meetings, Kundenempfänge oder Firmenfeiern in Allschwil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[#DCD5C8]">
                  <Image
                    src="/images/catering-apero.jpg"
                    alt="Feine Apéro-Platten und Canapés"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="py-24 sm:py-32 bg-[#FAF7F2] border-y border-[#DCD5C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block mb-2">
                Der Ablauf
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#111110]">
                In drei Schritten zu Ihrem Event
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteConfig.cateringProcess.map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm relative flex flex-col justify-between hover:shadow-xl transition-shadow"
                >
                  <div>
                    <span className="font-serif text-5xl text-[#C6AD83] font-normal block mb-4">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-2xl text-[#111110] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5C554E] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catering Inquiry Form Section (Cinematic Atelier Staging) */}
        <section id="anfrage" className="relative py-28 sm:py-40 bg-[#111110] text-[#F3EEE6] scroll-mt-20 overflow-hidden film-grain">
          {/* Subtle Ambient Radial Lighting & Grain */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C6AD83]/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 cinematic-vignette opacity-80" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-3">
                Exklusives Catering Atelier · Allschwil
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F3EEE6] font-normal leading-[1.06]">
                Ihre Vision. <br />
                <span className="italic text-[#C6AD83]">Unser kulinarischer Rahmen.</span>
              </h2>
              <div className="w-20 h-[1.5px] bg-[#C6AD83] mx-auto my-6" />
              <p className="text-base sm:text-lg text-[#B8B0A4] font-light leading-relaxed max-w-2xl mx-auto">
                Konfigurieren Sie unverbindlich Ihre Eckdaten. Wir prüfen die Durchführbarkeit in Allschwil und entwickeln ein massgeschneidertes Konzept mit persönlicher Betreuung.
              </p>
            </div>

            <CateringForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
