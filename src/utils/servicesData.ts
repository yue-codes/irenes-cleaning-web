interface ServiceSection {
  title: string;
  items: string[];
}

export interface ServiceData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  tagline: string;
  image: string;
  intro: string;
  sections: ServiceSection[];
  note?: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    metaTitle: "Deep Cleaning Service Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Professional deep cleaning in Jersey City & Hoboken, NJ. Baseboards, appliances, bathrooms & floors — every corner covered. Free quote, no upfront payment.",
    title: "Deep Cleaning Service in Jersey City & Hoboken, NJ",
    tagline: "Ideal for first visits or homes that need extra attention.",
    image: "bento1.webp",
    intro: "Transform your home from top to bottom. Our deep cleaning service in Jersey City and Hoboken goes beyond the surface to eliminate dirt, dust, and buildup from every corner — giving your space a fresh, healthy start.",
    sections: [
      {
        title: "General Areas",
        items: [
          "Complete dust removal from all surfaces including baseboards, ceiling fans, and light fixtures",
          "Disinfection of light switches and door handles",
          "Sofa vacuuming and interior window cleaning (glass and frames)",
        ],
      },
      {
        title: "Kitchen",
        items: [
          "Deep degreasing of stove and backsplash",
          "Detailed sink scrubbing",
          "Exterior cleaning of all appliances (dishwasher, microwave, coffee maker, toaster)",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Intensive scrubbing of bathtub, shower, and tiles",
          "Specialized removal of scale and mold buildup",
          "Full toilet disinfection",
        ],
      },
      {
        title: "Floors",
        items: [
          "Specialized care for hardwood floors and deep mopping of tile",
          "Moving light furniture to clean hidden areas underneath",
        ],
      },
    ],
    note: "We bring all professional equipment and cleaning products — no need to prepare anything.",
  },
  {
    slug: "standard-cleaning",
    name: "Standard Cleaning",
    metaTitle: "Standard Cleaning Service Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Regular house cleaning in Jersey City & Hoboken, NJ. Dusting, kitchen, bathrooms & floors on your schedule. Flexible, affordable, no upfront payment.",
    title: "Standard Cleaning Service in Jersey City & Hoboken, NJ",
    tagline: "High-quality maintenance for already well-kept homes.",
    image: "bento2.webp",
    intro: "Keep your home consistently clean and welcoming. Our standard cleaning service in Jersey City and Hoboken is designed for homes that need regular upkeep — thorough, efficient, and always on your schedule.",
    sections: [
      {
        title: "General",
        items: [
          "Dusting of reachable surfaces, furniture, and decor",
        ],
      },
      {
        title: "Kitchen & Bathrooms",
        items: [
          "Countertop and exterior surface cleaning",
          "Sink and toilet disinfection",
        ],
      },
      {
        title: "Floors",
        items: [
          "Professional vacuuming and mopping of all floors",
        ],
      },
      {
        title: "Extras (on request)",
        items: [
          "Trash removal",
          "Bed making",
        ],
      },
    ],
    note: "We adapt to your routine. Book weekly, bi-weekly, or monthly — whatever works best for you.",
  },
  {
    slug: "move-in-out-cleaning",
    name: "Move-In / Move-Out",
    metaTitle: "Move-Out Cleaning Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Move-in/move-out cleaning in Jersey City & Hoboken, NJ. Full deep clean + cabinets, oven, fridge & more. Ideal for getting your deposit back. Free quote.",
    title: "Move-In & Move-Out Cleaning in Jersey City, NJ",
    tagline: "Complete disinfection for empty units — ideal for getting your security deposit back.",
    image: "bento3.webp",
    intro: "Moving out of Jersey City or into a new home in Hoboken? Our move-in/move-out cleaning service ensures a spotless handover. We handle everything so you can focus on your move — not on scrubbing.",
    sections: [
      {
        title: "Includes Everything in Deep Cleaning, plus:",
        items: [
          "Interior cleaning of all kitchen cabinets, drawers, and closets",
          "Deep cleaning of the oven interior",
          "Deep cleaning of the refrigerator interior",
          "Detailed cleaning of window tracks and corners previously hidden by furniture",
        ],
      },
    ],
    note: "Perfect for recovering your security deposit and ensuring a smooth, clean handover for the next tenant or owner.",
  },
  {
    slug: "airbnb-cleaning",
    name: "Airbnb Turnover",
    metaTitle: "Airbnb Cleaning Service Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Hotel-quality Airbnb turnover cleaning in Jersey City & Hoboken, NJ. Fast turnovers, bed setup, damage reports & supply restocking. Free quote.",
    title: "Airbnb Cleaning Service in Jersey City & Hoboken, NJ",
    tagline: "Hotel-quality turnover cleaning to ensure 5-star reviews for your rental.",
    image: "bento4.webp",
    intro: "Your guests deserve a spotless space from the moment they arrive. Our Airbnb turnover cleaning in Jersey City and Hoboken delivers hotel-quality results between every reservation — fast, reliable, and detail-oriented.",
    sections: [
      {
        title: "Turnover Service Includes",
        items: [
          "Fast and thorough deep disinfection between reservations",
          "Professional bed making and aesthetic towel setup",
          "Inspection of drawers and under beds for forgotten guest items",
          "Restocking of basic supplies (soap, paper, coffee) upon arrangement",
          "Immediate damage or inventory report sent to the owner",
        ],
      },
    ],
    note: "We coordinate with your booking calendar so your property is always guest-ready on time.",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial",
    metaTitle: "Commercial Cleaning Service Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Professional commercial cleaning in Jersey City & Hoboken, NJ. Offices, retail, restaurants & more. Flexible scheduling, after-hours service. Free quote.",
    title: "Commercial Cleaning Service in Jersey City, NJ",
    tagline: "Professional cleaning solutions for offices, retail spaces, and businesses in New Jersey.",
    image: "bento1.webp",
    intro: "A clean workplace is a productive workplace. Mrs. Irene's Cleaning provides reliable commercial cleaning in Jersey City and Hoboken for offices, retail stores, restaurants, and other commercial spaces — tailored to your schedule and specific business needs.",
    sections: [
      {
        title: "Office & Common Areas",
        items: [
          "Dusting and disinfection of desks, workstations, and common areas",
          "Disinfection of high-touch surfaces: keyboards, phones, door handles, light switches",
          "Trash removal and recycling bin management",
          "Interior window cleaning",
        ],
      },
      {
        title: "Restrooms",
        items: [
          "Full sanitization of toilets, sinks, and fixtures",
          "Restocking of paper products and soap (upon arrangement)",
        ],
      },
      {
        title: "Kitchen & Break Room",
        items: [
          "Countertop and appliance exterior cleaning",
          "Sink scrubbing and disinfection",
          "Microwave and coffee area cleaning",
        ],
      },
      {
        title: "Floors",
        items: [
          "Professional vacuuming and mopping of all floor types",
          "Strip and wax service available on request",
        ],
      },
      {
        title: "Scheduling",
        items: [
          "After-hours and weekend availability",
          "Flexible recurring schedules: daily, weekly, bi-weekly, or monthly",
        ],
      },
    ],
    note: "All staff are professional, trustworthy, and experienced. We adapt to your business hours and industry requirements.",
  },
  {
    slug: "custom-add-ons",
    name: "Custom Add-ons",
    metaTitle: "Custom Cleaning Add-ons Jersey City NJ | Mrs. Irene's Cleaning",
    metaDescription: "Customize your cleaning in Jersey City & Hoboken, NJ. Add oven, fridge, cabinet, or wall stain cleaning to any service. Free quote, no upfront payment.",
    title: "Custom Cleaning Add-ons in Jersey City & Hoboken, NJ",
    tagline: "Personalize your cleaning with targeted extras — add to any standard or deep clean.",
    image: "bento4.webp",
    intro: "Every home has specific needs. Our custom add-ons let you go beyond a standard cleaning and target the areas that need the most attention. Just mention them when booking your regular or deep cleaning in Jersey City or Hoboken.",
    sections: [
      {
        title: "Available Add-ons",
        items: [
          "Interior oven cleaning",
          "Interior refrigerator cleaning",
          "Interior kitchen cabinet cleaning",
          "Localized wall stain removal (upon request)",
        ],
      },
    ],
    note: "All add-ons are performed by the same professional team. No need to book a separate appointment.",
  },
];
