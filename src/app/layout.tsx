import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1C1612",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://cafejour.ch"),
  title: {
    default: "Cafe Jour | Café, Bar & Catering in Allschwil",
    template: "%s | Cafe Jour Allschwil",
  },
  description:
    "Cafe Jour in Allschwil – Ihr Ort für erstklassigen Kaffee, entspannte Bar-Momente und massgeschneidertes Catering in Basel-Landschaft. Spitzwaldstrasse 4.",
  keywords: [
    "Cafe Jour",
    "Café Allschwil",
    "Bar Allschwil",
    "Catering Allschwil",
    "Catering Basel-Landschaft",
    "Spitzwaldstrasse 4",
    "Kaffee Allschwil",
  ],
  authors: [{ name: "Cafe Jour" }],
  creator: "Cafe Jour",
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: "https://cafejour.ch",
    title: "Cafe Jour | Café, Bar & Catering in Allschwil",
    description:
      "Ein guter Moment beginnt hier. Feiner Kaffee, stimmungsvolle Bar-Kultur und persönliches Catering in Allschwil.",
    siteName: "Cafe Jour",
    images: [
      {
        url: "/images/hero-cafe.jpg",
        width: 1200,
        height: 630,
        alt: "Cafe Jour Allschwil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe Jour | Café, Bar & Catering in Allschwil",
    description:
      "Café, Bar und Catering an der Spitzwaldstrasse 4 in Allschwil.",
    images: ["/images/hero-cafe.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#241D17] font-sans antialiased selection:bg-[#C5A880] selection:text-[#1C1612]">
        {children}
      </body>
    </html>
  );
}
