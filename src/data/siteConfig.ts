export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  sceneTitle: string;
  sceneTag: string;
  representativeNotice: string;
}

export interface BusinessConfig {
  brandName: string;
  registeredName: string;
  tagline: string;
  activities: string[];
  address: {
    street: string;
    zip: string;
    city: string;
    canton: string;
    country: string;
    countryCode: string;
  };
  maps: {
    googleMapsUrl: string;
    routeUrl: string;
    embedQuery: string;
  };
  reference: {
    name: string;
    url: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  heroSlides: HeroSlide[];
  services: {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    href: string;
  }[];
  cateringProcess: {
    step: string;
    title: string;
    description: string;
  }[];
  galleryItems: {
    id: string;
    title: string;
    category: "cafe" | "bar" | "catering" | "atmosphaere";
    categoryLabel: string;
    src: string;
    alt: string;
    aspect: string;
  }[];
  missingOperationalInfo: {
    item: string;
    status: string;
    recommendation: string;
  }[];
}

export const siteConfig: BusinessConfig = {
  brandName: "Cafe Jour",
  registeredName: "Cafe Jour, Öztürk",
  tagline: "Café, Bar und Catering in Allschwil",
  activities: [
    "Café-Betrieb",
    "Bar & Erfrischungen",
    "Catering & Anlassbetreuung",
  ],
  address: {
    street: "Spitzwaldstrasse 4",
    zip: "4123",
    city: "Allschwil",
    canton: "Basel-Landschaft",
    country: "Schweiz",
    countryCode: "CH",
  },
  maps: {
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Spitzwaldstrasse+4,+4123+Allschwil",
    routeUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Spitzwaldstrasse+4,+4123+Allschwil",
    embedQuery: "Spitzwaldstrasse+4,+4123+Allschwil,+Schweiz",
  },
  reference: {
    name: "GoRegio Verzeichnis",
    url: "https://goregio.ch/en/firma/cafe-jour-ozturk",
  },
  navigation: [
    { label: "Startseite", href: "/" },
    { label: "Café & Bar", href: "/cafe-bar" },
    { label: "Catering", href: "/catering" },
    { label: "Galerie", href: "/galerie" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  heroSlides: [
    {
      id: "slide-1",
      image: "/images/hero-slide-1.jpg",
      alt: "Kaffee fliesst in die Tasse mit aufsteigendem warmem Dampf",
      sceneTitle: "Achtsamer Kaffeefluss",
      sceneTag: "01 · Barista Handwerk",
      representativeNotice: "Repräsentative Markenaufnahme zur Kaffeekultur",
    },
    {
      id: "slide-2",
      image: "/images/hero-slide-2.jpg",
      alt: "Sorgfältige Tisch- und Café-Details im warmen Licht",
      sceneTitle: "Morgenstimmung & Zeit",
      sceneTag: "02 · Das Ambiente",
      representativeNotice: "Repräsentative Markenaufnahme zur Atmosphäre",
    },
    {
      id: "slide-3",
      image: "/images/hero-slide-3.jpg",
      alt: "Zarte Glaskonturen, Eiswürfel und erfrischender Drink an der Bar",
      sceneTitle: "Feierabend & Apéro",
      sceneTag: "03 · Bar-Kultur",
      representativeNotice: "Repräsentative Markenaufnahme zur Bar",
    },
    {
      id: "slide-4",
      image: "/images/hero-slide-4.jpg",
      alt: "Fein arrangierte Fingerfood- und Canapés-Präsentation",
      sceneTitle: "Kulinarische Anlässe",
      sceneTag: "04 · Exklusives Catering",
      representativeNotice: "Repräsentative Markenaufnahme zum Catering-Service",
    },
  ],
  services: [
    {
      id: "cafe",
      title: "Café",
      tagline: "Ruhige Momente & sorgfältige Kaffeekultur",
      description:
        "Beginnen Sie den Tag in einer entspannten Umgebung mit frisch zubereitetem Kaffee und feinem Gebäck. Ein Ort für inspirierende Begegnungen oder eine ruhige Auszeit im Herzen von Allschwil.",
      image: "/images/coffee-art.jpg",
      href: "/cafe-bar",
    },
    {
      id: "bar",
      title: "Bar",
      tagline: "Feierabend, Apéro & stilvolles Beisammensein",
      description:
        "Vom nachmittäglichen Apéro bis zu stimmungsvollen Abendstunden: Geniessen Sie erlesene Weine, erfrischende Drinks und ungezwungene Gastfreundschaft in edlem Ambiente.",
      image: "/images/bar-evening.jpg",
      href: "/cafe-bar#bar",
    },
    {
      id: "catering",
      title: "Catering",
      tagline: "Individuelle kulinarische Begleitung für Ihre Anlässe",
      description:
        "Ob privater Geburtstag, festlicher Apéro oder Firmenanlass in der Region Basel: Wir kreieren massgeschneiderte Verpflegungskonzepte und sorgen für unvergessliche Momente.",
      image: "/images/catering-apero.jpg",
      href: "/catering",
    },
  ],
  cateringProcess: [
    {
      step: "01",
      title: "Anfrage senden",
      description:
        "Teilen Sie uns Datum, Gästezahl, Anlass und Ihre individuellen Vorstellungen über unser Anfrageformular mit.",
    },
    {
      step: "02",
      title: "Details gemeinsam abstimmen",
      description:
        "Wir besprechen Ihr Event persönlich, klären spezielle Wünsche und passen das Verpflegungskonzept exakt an Ihren Rahmen an.",
    },
    {
      step: "03",
      title: "Individuelles Angebot erhalten",
      description:
        "Sie erhalten eine transparente, verbindliche Offerte – massgeschneidert auf Ihr Budget und Ihre Gäste.",
    },
  ],
  galleryItems: [
    {
      id: "gal-1",
      title: "Warme Café-Atmosphäre",
      category: "atmosphaere",
      categoryLabel: "Atmosphäre",
      src: "/images/hero-cafe.jpg",
      alt: "Stimmungsvoller Café-Innenraum mit edlem Ambiente und warmem Licht",
      aspect: "landscape",
    },
    {
      id: "gal-2",
      title: "Barista Kaffeekunst",
      category: "cafe",
      categoryLabel: "Café",
      src: "/images/cafe-barista.jpg",
      alt: "Zubereitung von frischem Spezialitätenkaffee an der Siebträgermaschine",
      aspect: "portrait",
    },
    {
      id: "gal-3",
      title: "Abendstimmung an der Bar",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/bar-evening.jpg",
      alt: "Warme Beleuchtung und Gläser an der stilvollen Bar",
      aspect: "landscape",
    },
    {
      id: "gal-4",
      title: "Exklusiver Catering Apéro",
      category: "catering",
      categoryLabel: "Catering",
      src: "/images/catering-apero.jpg",
      alt: "Fein arrangierte Apéro-Häppchen und Fingerfood für Anlässe",
      aspect: "landscape",
    },
    {
      id: "gal-5",
      title: "Festliche Anlasstafel",
      category: "catering",
      categoryLabel: "Catering",
      src: "/images/catering-event.jpg",
      alt: "Elegante Tischdekoration für private oder geschäftliche Veranstaltungen",
      aspect: "portrait",
    },
    {
      id: "gal-6",
      title: "Gemütliche Sitzecke",
      category: "atmosphaere",
      categoryLabel: "Atmosphäre",
      src: "/images/atmosphere-corner.jpg",
      alt: "Einladende Sitzecke mit Holzmöbeln und sanftem Lichteinfall",
      aspect: "landscape",
    },
    {
      id: "gal-7",
      title: "Frische Backwaren",
      category: "cafe",
      categoryLabel: "Café",
      src: "/images/pastry-moment.jpg",
      alt: "Frisches Croissant und Gebäck zum Morgenkaffee",
      aspect: "square",
    },
    {
      id: "gal-8",
      title: "Apéro & Erfrischungen",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/apero-drinks.jpg",
      alt: "Gekühlte Drinks und Apéro-Spezialitäten in eleganten Gläsern",
      aspect: "portrait",
    },
    {
      id: "gal-9",
      title: "Erlesene Weinauswahl",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/wine-gathering.jpg",
      alt: "Weingläser und gesellige Runde am Abend",
      aspect: "landscape",
    },
  ],
  missingOperationalInfo: [
    {
      item: "Telefonnummer",
      status: "Nicht verifiziert",
      recommendation:
        "Sobald die offizielle Rufnummer vorliegt, kann sie in siteConfig.ts und im Header/Footer hinterlegt werden.",
    },
    {
      item: "Offizielle E-Mail-Adresse",
      status: "Nicht verifiziert",
      recommendation:
        "Kontakt- und Catering-Anfragen werden über die bereitgestellten Formulare entgegengenommen. Für den direkten Mailversand wird die Zieladresse per Umgebungsvariable CONTACT_EMAIL konfiguriert.",
    },
    {
      item: "Öffnungszeiten",
      status: "Nicht verifiziert",
      recommendation:
        "Aktuell wird auf Anfrage oder Besuch vor Ort verwiesen, um keine fehlerhaften Öffnungszeiten zu publizieren.",
    },
    {
      item: "Detaillierte Speise- & Barkarte mit Preisen",
      status: "Nicht verifiziert",
      recommendation:
        "Die Bereiche Café und Bar stellen den Angebotsrahmen dar. Eine verbindliche Karte mit CHF-Preisen kann nahtlos integriert werden, sobald die Daten vorliegen.",
    },
    {
      item: "Handelsregister-Nummer / UID",
      status: "Inhaber gemäss Eintrag: Öztürk",
      recommendation:
        "Im Impressum ist 'Cafe Jour, Öztürk' vermerkt. Bei Vorliegen der UID (CHE-...) kann diese ergänzt werden.",
    },
  ],
};
