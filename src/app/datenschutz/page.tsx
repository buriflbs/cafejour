import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Erhebung und Verarbeitung personenbezogener Daten gemäss Schweizer Datenschutzgesetz (revDSG) bei Cafe Jour.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />

      <main id="main-content" className="flex-1 bg-[#F3EEE6] text-[#111110]">
        {/* Page Header */}
        <section className="pt-40 pb-16 sm:pt-48 sm:pb-20 bg-[#111110] text-[#F3EEE6] text-center film-grain">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C6AD83] font-mono block mb-3">
              Privatsphäre & Datenschutz
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight">
              Datenschutzerklärung
            </h1>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#5C554E] leading-relaxed font-light">
            {/* Intro */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h2 className="font-serif text-2xl text-[#111110]">
                1. Grundsatz und Verantwortliche Stelle
              </h2>
              <p>
                Der Schutz Ihrer Privatsphäre ist für uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Erhebung und Verwendung personenbezogener Daten auf der Website von Cafe Jour gemäss dem Bundesgesetz über den Datenschutz (revDSG).
              </p>
              <div className="text-xs bg-[#FAF7F2] p-5 rounded-lg border border-[#DCD5C8] space-y-1 text-[#111110]">
                <p className="font-semibold text-sm font-serif">Verantwortliche Stelle:</p>
                <p>{siteConfig.registeredName} ({siteConfig.brandName})</p>
                <p>{siteConfig.address.street}</p>
                <p>
                  {siteConfig.address.zip} {siteConfig.address.city}, {siteConfig.address.country}
                </p>
              </div>
            </div>

            {/* Server Logs */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                2. Bereitstellung der Website und Server-Logfiles
              </h3>
              <p>
                Beim Aufrufen unserer Website erfasst der Webserver automatisch technische Informationen, die Ihr Browser an uns übermittelt. Dies umfasst:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer-URL (die zuvor besuchte Seite)</li>
                <li>Datum und Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse des anfragenden Geräts</li>
              </ul>
              <p className="text-xs">
                Diese Daten dienen ausschliesslich der technischen Sicherstellung des reibungslosen Betriebs, der Sicherheit und der Fehlerbehebung. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
              </p>
            </div>

            {/* Forms */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                3. Datenverarbeitung bei Anfragen (Formulare)
              </h3>
              <p>
                Wenn Sie uns über das Kontaktformular oder das Catering-Anfrageformular eine Mitteilung senden, werden die von Ihnen eingegebenen Daten (Vor- und Nachname, E-Mail-Adresse, Telefonnummer falls angegeben, gewünschtes Datum, Gästezahl, Ort und Mitteilung) ausschliesslich zur Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen verarbeitet.
              </p>
              <p className="text-xs">
                Die Daten werden vertraulich behandelt und nicht ohne Ihre ausdrückliche Einwilligung an unbefugte Dritte weitergegeben.
              </p>
            </div>

            {/* Cookies & Tracking */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                4. Cookies und Analyse-Tools
              </h3>
              <p>
                Unsere Website verzichtet bewusst auf aufdringliche Tracking-Cookies, Werbenetzwerke oder Webanalyse-Dienste Dritter (wie z.B. Google Analytics oder Facebook Pixel). Es werden keine verhaltensbasierten Benutzerprofile erstellt. Daher ist auch kein störendes Cookie-Banner erforderlich.
              </p>
            </div>

            {/* Google Maps Privacy Mode */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                5. Einbindung von Google Maps (Zwei-Klick-Lösung)
              </h3>
              <p>
                Auf unserer Kontaktseite bieten wir Ihnen eine interaktive Karte von Google Maps (Google Ireland Limited / Google LLC) an. Zum Schutz Ihrer Privatsphäre wird die interaktive Karte nicht automatisch geladen.
              </p>
              <p className="text-xs">
                Erst wenn Sie aktiv auf «Karte jetzt laden» klicken, wird eine Verbindung zu den Servern von Google hergestellt und Ihre IP-Adresse sowie technische Gerätedaten an Google übertragen. Wenn Sie dies nicht wünschen, können Sie die Adresse direkt in Ihrer eigenen Navigations-App öffnen.
              </p>
            </div>

            {/* Rights */}
            <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#DCD5C8] shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-[#111110]">
                6. Ihre Rechte
              </h3>
              <p>
                Sie haben gemäss dem schweizerischen Datenschutzgesetz das Recht auf Auskunft über Ihre von uns verarbeiteten Personendaten sowie auf Berichtigung, Löschung oder Sperrung unrichtiger Daten, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
              <p className="text-xs">
                Wenden Sie sich bei datenschutzrechtlichen Anliegen bitte über unser{" "}
                <Link href="/kontakt" className="text-[#A98E63] underline font-medium">
                  Kontaktformular
                </Link>{" "}
                oder postalisch an unsere oben angegebene Anschrift.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
