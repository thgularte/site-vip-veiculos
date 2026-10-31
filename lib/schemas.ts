export const BASE_URL = "https://vipveiculosriogrande.com.br";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "VipVeículos",
  alternateName: ["Vip Veículos Rio Grande", "VipVeiculos"],
  description:
    "Loja de veículos seminovos e usados revisados com garantia e procedência em Rio Grande - RS. Mais de 15 anos de tradição.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo_vip.svg`,
  image: `${BASE_URL}/fundador.svg`,
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "12:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/vipveiculos_/",
    "https://wa.me/5553984139110",
  ],
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: ["Cash", "Credit Card", "Financing", "Trade-in"],
  areaServed: [
    {
      "@type": "City",
      name: "Rio Grande",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    {
      "@type": "City",
      name: "Pelotas",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    {
      "@type": "AdministrativeArea",
      name: "Zona Sul do Rio Grande do Sul",
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VipVeículos Rio Grande",
  url: BASE_URL,
  description:
    "Site oficial da VipVeículos - Carros seminovos e usados em Rio Grande - RS",
  publisher: {
    "@type": "AutoDealer",
    name: "VipVeículos",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/veiculos?search={search_term_string}`,
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

export const vehicleSchema = (vehicle: any) => {
  // Extrai valor numérico limpo para o Schema (ex: "R$ 45.000" -> 45000)
  let numericPrice: number | undefined;
  if (typeof vehicle.price === "number") {
    numericPrice = vehicle.price;
  } else if (typeof vehicle.price === "string") {
    const cleaned = vehicle.price.replace(/[^\d]/g, "");
    if (cleaned) {
      numericPrice = Number(cleaned);
    }
  }

  // Extrai km numérico
  let numericKm: number | undefined;
  if (typeof vehicle.km === "number") {
    numericKm = vehicle.km;
  } else if (typeof vehicle.km === "string") {
    const cleaned = vehicle.km.replace(/[^\d]/g, "");
    if (cleaned) {
      numericKm = Number(cleaned);
    }
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model} ${vehicle.version || ""} ${vehicle.modelYear || vehicle.year || ""} em Rio Grande - RS`.trim();
  const vehicleUrl = `${BASE_URL}/veiculos/${vehicle.id}`;

  const images = [];
  if (vehicle.image) images.push(vehicle.image.startsWith("http") ? vehicle.image : `${BASE_URL}${vehicle.image}`);
  if (Array.isArray(vehicle.images)) {
    for (const img of vehicle.images) {
      if (img && !images.includes(img)) {
        images.push(img.startsWith("http") ? img : `${BASE_URL}${img}`);
      }
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": vehicleUrl,
    name: vehicleName,
    description: vehicle.description || `${vehicle.brand} ${vehicle.model} seminovo disponível na VipVeículos em Rio Grande - RS.`,
    url: vehicleUrl,
    image: images.length > 0 ? images : [`${BASE_URL}/fundador.svg`],
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.modelYear ? String(vehicle.modelYear) : undefined,
    productionDate: vehicle.year ? String(vehicle.year) : undefined,
    color: vehicle.color || undefined,
    fuelType: vehicle.fuel || undefined,
    vehicleTransmission: vehicle.transmission || undefined,
    itemCondition: "https://schema.org/UsedCondition",
    ...(numericKm !== undefined
      ? {
          mileageFromOdometer: {
            "@type": "QuantitativeValue",
            value: numericKm,
            unitCode: "KMT",
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: vehicleUrl,
      priceCurrency: "BRL",
      ...(numericPrice ? { price: numericPrice } : {}),
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "AutoDealer",
        name: "VipVeículos",
        telephone: "+55 53 3230-0250",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Santos Dumont, 80",
          addressLocality: "Rio Grande",
          addressRegion: "RS",
          postalCode: "96202-090",
          addressCountry: "BR",
        },
      },
      areaServed: {
        "@type": "City",
        name: "Rio Grande",
        addressRegion: "RS",
        addressCountry: "BR",
      },
    },
  };
};
