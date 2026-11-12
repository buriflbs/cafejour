import { siteConfig } from "@/data/siteConfig";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: siteConfig.brandName,
    legalName: siteConfig.registeredName,
    description: siteConfig.tagline,
    url: "https://cafejour.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.zip,
      addressRegion: siteConfig.address.canton,
      addressCountry: siteConfig.address.countryCode,
    },
    servesCuisine: "Café, Bar, Catering",
    hasMap: siteConfig.maps.googleMapsUrl,
    sameAs: [siteConfig.reference.url],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
