import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Wine, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Café & Bar",
  description:
    "Erleben Sie Kaffeegenuss, erfrischende Getränke und entspannte Bar-Kultur im Cafe Jour an der Spitzwaldstrasse in Allschwil.",
};

export default function CafeBarPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Hero */}
        <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 bg-[#111110] text-[#F3EEE6] overflow-hidden film-grain">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image
              src="/images/bar-evening.jpg"
              alt="Café und Bar Kultur im Cafe Jour"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-[#111110]/70 to-[#111110]/80" />
            <div className="absolute inset-0 cinematic-vignette" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-4">
              Gastfreundschaft & Genuss
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight mb-6">
              Café & Bar in Allschwil
            </h1>
            <p className="text-base sm:text-xl text-[#B8B0A4] max-w-2xl mx-auto font-light leading-relaxed">
              Vom ersten morgendlichen Espresso über entspannte Nachmittage bis zum Feierabend-Apéro: Entdecken Sie einen ausgewählten Treffpunkt für genussvolle Momente.
            </p>
          </div>
        </section>

        {/* Section 1: Kaffeekultur */}
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono">
                  <Coffee className="w-4 h-4 mr-2" />
                  <span>Kaffeegenuss am Morgen & Tag</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                  Sorgfältig zubereitet, <br />
                  in Ruhe genossen
                </h2>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Guter Kaffee verlangt Hingabe, die richtige Mahlung und Gespür für die Zubereitung. Im Cafe Jour legen wir Wert auf ein ausgewogenes Aroma – ob als kräftiger Espresso, samtiger Cappuccino oder erfrischender Eiskaffee an warmen Sommertagen.
                </p>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Dazu geniessen unsere Gäste frisches Gebäck und feine Kleinigkeiten in einer ruhigen, geschmackvollen Atmosphäre.
                </p>

                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-6 border-t border-[#DCD5C8] pt-6">
                    <div>
                      <h4 className="font-serif text-lg text-[#111110]">Espresso-Kultur</h4>
                      <p className="text-xs text-[#5C554E] mt-1 leading-normal font-light">
                        Klassisch, unverfälscht und mit dichter Crema serviert.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-[#111110]">Milchspezialitäten</h4>
                      <p className="text-xs text-[#5C554E] mt-1 leading-normal font-light">
                        Feinporiger Milchschaum für harmonische Kaffeemomente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[#DCD5C8]">
                  <Image
                    src="/images/cafe-barista.jpg"
                    alt="Barista bei der Kaffeeverfeinerung im Cafe Jour"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Bar & Apéro */}
        <section id="bar" className="py-24 sm:py-32 bg-[#FAF7F2] border-y border-[#DCD5C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[#DCD5C8]">
                  <Image
                    src="/images/apero-drinks.jpg"
                    alt="Apéro-Kultur und Bar-Erfrischungen"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono">
                  <Wine className="w-4 h-4 mr-2" />
                  <span>Apéro & Feierabend</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] font-normal leading-tight">
                  Der Treffpunkt für den Feierabend
                </h2>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Wenn der Tag in den Abend übergeht, wandelt sich die Stimmung: Das warme Licht und die unaufgeregte Musik laden zum Verweilen ein.
                </p>
                <p className="text-base text-[#5C554E] leading-relaxed font-light">
                  Unsere Bar bietet den perfekten Rahmen für ein gepflegtes Glas Wein, erfrischende Drinks und ungezwungene Gespräche mit Kollegen, Nachbarn und Freunden.
                </p>

                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-6 border-t border-[#DCD5C8] pt-6">
                    <div>
                      <h4 className="font-serif text-lg text-[#111110]">Apéro-Tradition</h4>
                      <p className="text-xs text-[#5C554E] mt-1 leading-normal font-light">
                        Entspannte Schweizer Apéro-Kultur nach Feierabend.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-[#111110]">Ausgesuchte Getränke</h4>
                      <p className="text-xs text-[#5C554E] mt-1 leading-normal font-light">
                        Erlesene Weine, kühle Biere und alkoholfreie Spezialitäten.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modular Menu Architecture Overview */}
        <section className="py-24 sm:py-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A98E63] font-mono block mb-3">
              Angebotsstruktur
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#111110] mb-6">
              Unser Sortiment vor Ort
            </h2>
            <p className="text-base text-[#5C554E] max-w-2xl mx-auto mb-14 font-light leading-relaxed">
              Wir setzen auf saisonale Frische und ausgewählte Zutaten. Nachfolgend sehen Sie die Schwerpunkte unseres Sortiments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white p-8 rounded-xl border border-[#DCD5C8] shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C6AD83] flex items-center justify-center text-[#A98E63] mb-5">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#111110] mb-2">Kaffee & Heissgetränke</h3>
                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed font-light">
                  Espresso, Café Crème, Cappuccino, Latte Macchiato sowie aromatische Teesorten.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-[#DCD5C8] shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C6AD83] flex items-center justify-center text-[#A98E63] mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#111110] mb-2">Erfrischungen</h3>
                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed font-light">
                  Mineralwasser, frisch gekühlte Säfte, feine Eistees und beliebte Softdrinks.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-[#DCD5C8] shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C6AD83] flex items-center justify-center text-[#A98E63] mb-5">
                  <Wine className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#111110] mb-2">Bar & Apéro</h3>
                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed font-light">
                  Weisse und rote Tropfen im Offenausschank, Schaumweine, Bier und Apéro-Begleitung.
                </p>
              </div>
            </div>

            <div className="mt-14 p-8 rounded-xl bg-[#FAF7F2] border border-[#DCD5C8] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="text-left">
                <p className="font-serif text-lg text-[#111110]">Haben Sie einen speziellen Wunsch?</p>
                <p className="text-xs text-[#5C554E] mt-0.5 font-light">Besuchen Sie uns direkt an der Spitzwaldstrasse 4 in Allschwil.</p>
              </div>
              <Link
                href="/kontakt"
                className="shrink-0 px-6 py-3 bg-[#111110] hover:bg-[#29201B] text-[#F3EEE6] text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors focus-ring"
              >
                Anfahrt planen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
