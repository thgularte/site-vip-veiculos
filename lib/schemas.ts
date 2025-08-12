export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "VipVeículos",
  alternateName: "Vip Veículos Rio Grande",
  description:
    "Loja de veículos usados e seminovos em Rio Grande - RS, com mais de 15 anos de experiência no mercado automobilístico.",
  url: "https://vipveiculos.com.br",
  logo: "https://vipveiculos.com.br/logo.png",
  image: "https://vipveiculos.com.br/O home.png",
  telephone: "+55 53 3230-0250",
  email: "vipveiculos@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Santos Dumont, 80",
    addressLocality: "Rio Grande",
    addressRegion: "RS",
    postalCode: "96202-090",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -32.0408958,
    longitude: -52.1087725,
  },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-12:00"],
  sameAs: [
    "https://www.instagram.com/vipveiculos_",
    "https://wa.me/5553984139110",
  ],
  founder: {
    "@type": "Person",
    name: "Fábio Gularte",
  },
  foundingDate: "2008-01",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
  },
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: ["Cash", "Credit Card", "Financing"],
  areaServed: {
    "@type": "City",
    name: "Rio Grande",
    addressRegion: "RS",
    addressCountry: "BR",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VipVeículos",
  url: "https://vipveiculos.com.br",
  description:
    "Site oficial da VipVeículos - Loja de veículos usados em Rio Grande - RS",
  publisher: {
    "@type": "Organization",
    name: "VipVeículos",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://vipveiculos.com.br/vehicles?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const vehicleSchema = (vehicle: any) => ({
  "@context": "https://schema.org",
  "@type": "Vehicle",
  name: `${vehicle.brand} ${vehicle.model} ${vehicle.version}`,
  brand: {
    "@type": "Brand",
    name: vehicle.brand,
  },
  model: vehicle.model,
  vehicleModelDate: vehicle.modelYear,
  productionDate: vehicle.year,
  color: vehicle.color,
  fuelType: vehicle.fuel,
  vehicleTransmission: vehicle.transmission,
  mileageFromOdometer: {
    "@type": "QuantitativeValue",
    value: vehicle.km,
  },
  offers: {
    "@type": "Offer",
    price: vehicle.price,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "AutomotiveBusiness",
      name: "VipVeículos",
    },
  },
});
