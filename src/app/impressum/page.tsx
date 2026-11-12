import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Angaben und Impressum für Cafe Jour in Allschwil.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Header */}
        <section className="pt-40 pb-16 sm:pt-48 sm:pb-20 bg-[#111110] text-[#F3EEE6] text-center film-grain">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-3">
              Rechtliche Angaben
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight">
              Impressum
            </h1>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#5C554E] leading-relaxed font-light">
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl text-[#111110]">
                Betreiberangaben gemäss Schweizer Recht
              </h2>
              <div className="space-y-1 text-[#111110]">
                <p className="font-medium text-lg font-serif">{siteConfig.brandName}</p>
                <p>Eingetragener Firmenname: {siteConfig.registeredName}</p>
                <p>{siteConfig.address.street}</p>
                <p>
                  {siteConfig.address.zip} {siteConfig.address.city}
                </p>
                <p>Kanton {siteConfig.address.canton}, {siteConfig.address.country}</p>
              </div>

              <div className="pt-3 text-xs text-[#5C554E] border-t border-[#DCD5C8]">
                <p>
                  <strong>Geschäftstätigkeit:</strong> {siteConfig.activities.join(", ")}
                </p>
                <p className="mt-1">
                  <strong>Referenzeintrag:</strong>{" "}
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

            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">Kontaktmöglichkeiten</h3>
              <p>
                Für allgemeine Anfragen, Tischabsprachen oder Catering-Wünsche nutzen Sie bitte unser{" "}
                <Link href="/kontakt" className="text-[#A98E63] underline font-medium">
                  Kontaktformular
                </Link>{" "}
                oder das spezialisierte{" "}
                <Link href="/catering#anfrage" className="text-[#A98E63] underline font-medium">
                  Catering-Anfrageformular
                </Link>
                .
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                Haftungsausschluss für Inhalte und Links
              </h3>
              <p>
                Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">Urheberrechte</h3>
              <p>
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich Cafe Jour oder den speziell genannten Rechtsinhabern. Die auf dieser Website verwendeten Stimmungsbilder dienen als repräsentative Impressionen zur visuellen Veranschaulichung des Angebots.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
