export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  sceneTitle: string;
  sceneTag: string;
  appetizingDescription: string;
  representativeNotice?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "cafe" | "bar" | "catering" | "atmosphaere";
  categoryLabel: string;
  src: string;
  alt: string;
  description: string;
  aspect?: string;
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
  galleryItems: GalleryItem[];
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
      id: "slide-canapes",
      image: "/images/real-canape-box.jpg",
      alt: "Handgemachte Gourmet-Canapés Box mit geräuchertem Lachs, Frischkäsecreme und mariniertem Gemüse",
      sceneTitle: "Gourmet Apéro-Canapés",
      sceneTag: "01 · Fingerfood & Apéro",
      appetizingDescription:
        "Knusprig geröstetes Landbrot, belegt mit feinstem Räucherlachs, luftiger Kräuter-Frischkäsecreme und mariniertem Grillgemüse – der perfekte Auftakt für jedes Fest.",
    },
    {
      id: "slide-buffet",
      image: "/images/real-catering-buffet.jpg",
      alt: "Reichhaltiges mediterranes Catering-Buffet mit gefüllten Weinblättern, Pide, Börek und Salaten",
      sceneTitle: "Festliches Catering-Buffet",
      sceneTag: "02 · Feine Buffetkultur",
      appetizingDescription:
        "Traditionell von Hand gerollte Weinblätter, ofenfrische Pide, goldbraunes Börek und bunte mediterrane Salate – ein opulentes Fest für Augen und Gaumen.",
    },
    {
      id: "slide-cheesecake",
      image: "/images/real-pistazien-cheesecake.jpg",
      alt: "San Sebastián Pistazien-Cheesecake mit karamellisierter Kruste und gerösteten Nüssen",
      sceneTitle: "Pistazien San Sebastián",
      sceneTag: "03 · Pâtisserie-Kunst",
      appetizingDescription:
        "Cremig-zarter baskischer Käsekuchen mit karamellisiertem Rand, veredelt mit gerösteten Pistazien, Mandelsplittern und feinen Blüten – himmlisch saftig und intensiv.",
    },
    {
      id: "slide-frucht-torte",
      image: "/images/real-frucht-torte.jpg",
      alt: "Frische Beeren- und Fruchttorte mit Weinbergpfirsichen, Himbeeren und Mascarponecreme",
      sceneTitle: "Beeren- & Fruchttorte",
      sceneTag: "04 · Hausgemacht & Frisch",
      appetizingDescription:
        "Fein aufgefächerte Weinbergpfirsiche, sonnengereifte Himbeeren und rubinrote Granatapfelkerne auf samtiger Mascarponecreme – pure Frische in jedem Bissen.",
    },
    {
      id: "slide-brunch",
      image: "/images/real-brunch-buffet.jpg",
      alt: "Mediterrane Brunch- und Frühstückstafel mit Dips, Oliven, Rührei und frischen Kräutern",
      sceneTitle: "Mediterrane Brunchtafel",
      sceneTag: "05 · Brunch & Genuss",
      appetizingDescription:
        "Aromatische mediterrane Dips, marinierte Oliven, Bauernkäse und sonnengereiftes Gemüse – geniessen Sie Ihren Morgen wie im Urlaub am Mittelmeer.",
    },
    {
      id: "slide-cigkofte",
      image: "/images/real-cigkofte-platte.jpg",
      alt: "Traditionelle handgeknetete Çiğ Köfte Platte mit Zitronenspalten und knackigem Römersalat",
      sceneTitle: "Traditionelle Çiğ Köfte",
      sceneTag: "06 · Würzige Spezialitäten",
      appetizingDescription:
        "Meisterhaft nach traditionellem Geheimrezept handgeknetet, serviert auf knackig-frischem Römersalat mit Zitronenspalten und edlem Granatapfelsirup.",
    },
    {
      id: "slide-fruechte",
      image: "/images/real-fruechte-platte.jpg",
      alt: "Exotische Früchte-Platte mit Erdbeeren, Weintrauben, Melone und Ananas",
      sceneTitle: "Exotische Früchte-Etagere",
      sceneTag: "07 · Vitaminreicher Genuss",
      appetizingDescription:
        "Ein farbenfrohes Feuerwerk aus süssen Erdbeeren, knackigen Trauben, Melonen und Physalis – kunstvoll arrangiert als krönende Erfrischung Ihres Events.",
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
      id: "gal-canape-box",
      title: "Gourmet Apéro-Canapés",
      category: "catering",
      categoryLabel: "Catering & Apéro",
      src: "/images/real-canape-box.jpg",
      alt: "Handgemachte Gourmet-Canapés Box mit geräuchertem Lachs, Frischkäsecreme und mariniertem Gemüse",
      description:
        "Knusprig geröstetes Landbrot, belegt mit feinstem Räucherlachs, luftiger Kräuter-Frischkäsecreme und mariniertem Grillgemüse – der perfekte Auftakt für jedes Fest.",
      aspect: "portrait",
    },
    {
      id: "gal-catering-buffet",
      title: "Festliches Catering-Buffet",
      category: "catering",
      categoryLabel: "Catering & Buffet",
      src: "/images/real-catering-buffet.jpg",
      alt: "Reichhaltiges mediterranes Catering-Buffet mit gefüllten Weinblättern, Pide, Börek und Salaten",
      description:
        "Traditionell von Hand gerollte Weinblätter, ofenfrische Pide, goldbraunes Börek und bunte mediterrane Salate – ein opulentes Fest für Augen und Gaumen.",
      aspect: "landscape",
    },
    {
      id: "gal-pistazien-cheesecake",
      title: "Pistazien San Sebastián Cheesecake",
      category: "cafe",
      categoryLabel: "Café & Pâtisserie",
      src: "/images/real-pistazien-cheesecake.jpg",
      alt: "San Sebastián Pistazien-Cheesecake mit karamellisierter Kruste und gerösteten Nüssen",
      description:
        "Cremig-zarter baskischer Käsekuchen mit karamellisiertem Rand, veredelt mit gerösteten Pistazien, Mandelsplittern und feinen Blüten – himmlisch saftig und intensiv.",
      aspect: "square",
    },
    {
      id: "gal-frucht-torte",
      title: "Frische Beeren- & Fruchttorte",
      category: "cafe",
      categoryLabel: "Café & Pâtisserie",
      src: "/images/real-frucht-torte.jpg",
      alt: "Frische Beeren- und Fruchttorte mit Weinbergpfirsichen, Himbeeren und Mascarponecreme",
      description:
        "Fein aufgefächerte Weinbergpfirsiche, sonnengereifte Himbeeren und rubinrote Granatapfelkerne auf samtiger Mascarponecreme – pure Frische in jedem Bissen.",
      aspect: "square",
    },
    {
      id: "gal-brunch-buffet",
      title: "Mediterrane Brunchtafel",
      category: "catering",
      categoryLabel: "Catering & Brunch",
      src: "/images/real-brunch-buffet.jpg",
      alt: "Mediterrane Brunch- und Frühstückstafel mit Dips, Oliven, Rührei und frischen Kräutern",
      description:
        "Aromatische mediterrane Dips, marinierte Oliven, Bauernkäse und sonnengereiftes Gemüse – geniessen Sie Ihren Morgen wie im Urlaub am Mittelmeer.",
      aspect: "portrait",
    },
    {
      id: "gal-cigkofte",
      title: "Traditionelle Çiğ Köfte Platte",
      category: "catering",
      categoryLabel: "Catering & Spezialitäten",
      src: "/images/real-cigkofte-platte.jpg",
      alt: "Traditionelle handgeknetete Çiğ Köfte Platte mit Zitronenspalten und knackigem Römersalat",
      description:
        "Meisterhaft nach traditionellem Geheimrezept handgeknetet, serviert auf knackig-frischem Römersalat mit Zitronenspalten und edlem Granatapfelsirup.",
      aspect: "square",
    },
    {
      id: "gal-fruechte-etagere",
      title: "Exotische Früchte-Etagere",
      category: "catering",
      categoryLabel: "Catering & Frisch",
      src: "/images/real-fruechte-platte.jpg",
      alt: "Exotische Früchte-Platte mit Erdbeeren, Weintrauben, Melone und Ananas",
      description:
        "Ein farbenfrohes Feuerwerk aus süssen Erdbeeren, knackigen Trauben, Melonen und Physalis – kunstvoll arrangiert als krönende Erfrischung Ihres Events.",
      aspect: "square",
    },
    {
      id: "gal-1",
      title: "Warme Café-Atmosphäre",
      category: "atmosphaere",
      categoryLabel: "Atmosphäre",
      src: "/images/hero-cafe.jpg",
      alt: "Stimmungsvoller Café-Innenraum mit edlem Ambiente und warmem Licht",
      description:
        "Einladende Atmosphäre im Herzen von Allschwil – gestaltet für entspannte Momente und anregende Gespräche.",
      aspect: "landscape",
    },
    {
      id: "gal-2",
      title: "Barista Kaffeekunst",
      category: "cafe",
      categoryLabel: "Café",
      src: "/images/cafe-barista.jpg",
      alt: "Zubereitung von frischem Spezialitätenkaffee an der Siebträgermaschine",
      description:
        "Mit Leidenschaft zubereiteter Espresso und seidig cremiger Cappuccino – handgebrüht für echte Kaffeeliebhaber.",
      aspect: "portrait",
    },
    {
      id: "gal-3",
      title: "Abendstimmung an der Bar",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/bar-evening.jpg",
      alt: "Warme Beleuchtung und Gläser an der stilvollen Bar",
      description:
        "Stilvolles Ambiente für den wohlverdienten Feierabend mit feinen Drinks und ausgewählten Apéro-Häppchen.",
      aspect: "landscape",
    },
    {
      id: "gal-4",
      title: "Exklusiver Catering Apéro",
      category: "catering",
      categoryLabel: "Catering",
      src: "/images/catering-apero.jpg",
      alt: "Fein arrangierte Apéro-Häppchen und Fingerfood für Anlässe",
      description:
        "Edle Häppchen und liebevoll dekorierte Platten für private Feiern und hochkarätige Firmenevents.",
      aspect: "landscape",
    },
    {
      id: "gal-5",
      title: "Festliche Anlasstafel",
      category: "catering",
      categoryLabel: "Catering",
      src: "/images/catering-event.jpg",
      alt: "Elegante Tischdekoration für private oder geschäftliche Veranstaltungen",
      description:
        "Aufmerksame Tischkultur und stimmungsvolle Präsentationen, abgestimmt auf Ihren persönlichen Event.",
      aspect: "portrait",
    },
    {
      id: "gal-6",
      title: "Gemütliche Sitzecke",
      category: "atmosphaere",
      categoryLabel: "Atmosphäre",
      src: "/images/atmosphere-corner.jpg",
      alt: "Einladende Sitzecke mit Holzmöbeln und sanftem Lichteinfall",
      description:
        "Warme Holztöne und sanftes Licht laden zum Verweilen, Lesen und Geniessen ein.",
      aspect: "landscape",
    },
    {
      id: "gal-7",
      title: "Frische Backwaren",
      category: "cafe",
      categoryLabel: "Café",
      src: "/images/pastry-moment.jpg",
      alt: "Frisches Croissant und Gebäck zum Morgenkaffee",
      description:
        "Ofenfrische Croissants und zartes Feingebäck als harmonische Begleitung zu Ihrem Lieblingskaffee.",
      aspect: "square",
    },
    {
      id: "gal-8",
      title: "Apéro & Erfrischungen",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/apero-drinks.jpg",
      alt: "Gekühlte Drinks und Apéro-Spezialitäten in eleganten Gläsern",
      description:
        "Erfrischende Signatures und klassische Drinks, mit Liebe zum Detail im perfekten Glas serviert.",
      aspect: "portrait",
    },
    {
      id: "gal-9",
      title: "Erlesene Weinauswahl",
      category: "bar",
      categoryLabel: "Bar",
      src: "/images/wine-gathering.jpg",
      alt: "Weingläser und gesellige Runde am Abend",
      description:
        "Sorgfältig kuratierte Weine und feine Tropfen für gesellige Stunden unter Freunden.",
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
