export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

export interface Country {
  name: string;
  code: string;
  x: number;
  y: number;
}

export interface Industry {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Certification {
  name: string;
  fullName: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface WhyItem {
  title: string;
  description: string;
  icon: string;
  size?: "large" | "small";
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  country: string;
  productRequired: string;
  quantity: string;
  email: string;
  whatsapp: string;
  message: string;
}
