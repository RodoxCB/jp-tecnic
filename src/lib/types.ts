export type NavLink = {
  href: string;
  label: string;
};

export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  permalink: string;
};

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
};

export type StepItem = {
  step: number;
  title: string;
  description: string;
};

export type DifferentialItem = {
  icon: string;
  title: string;
  description: string;
};

export type ReviewItem = {
  name: string;
  location: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PhoneBrand = "apple" | "samsung" | "motorola" | "xiaomi" | "outros";

export type PhoneItem = {
  id: string;
  brand: PhoneBrand;
  model: string;
  storage: string;
  color: string;
  condition: string;
  price: string;
  description: string;
  image: string;
  active: boolean;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    instagram: string;
    schedule: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappMessage: string;
    phoneDisplay: string;
  };
  navLinks: NavLink[];
  regions: string[];
  services: ServiceItem[];
  steps: StepItem[];
  differentials: DifferentialItem[];
  reviews: ReviewItem[];
  faq: FaqItem[];
  copy: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      complement: string;
      ctaGallery: string;
      trust1: string;
      trust2: string;
    };
    gallery: {
      title: string;
      subtitle: string;
      fallback: string;
      instagramCta: string;
      hover: string;
    };
    services: {
      title: string;
      subtitle: string;
      cta: string;
      ctaMessage: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      pickup: string;
    };
    differentials: {
      title: string;
    };
    reviews: {
      title: string;
      subtitle: string;
    };
    region: {
      title: string;
      subtitle: string;
    };
    faq: {
      title: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
    };
    footer: {
      regions: string;
      contact: string;
      schedule: string;
      copyright: string;
    };
    loja: {
      title: string;
      subtitle: string;
      empty: string;
      cta: string;
    };
  };
  gallery: GalleryItem[];
  phones: PhoneItem[];
};
