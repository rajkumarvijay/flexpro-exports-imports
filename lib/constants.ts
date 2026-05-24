import type { NavItem, Service, Product, Testimonial, BlogPost, Country, Industry, Certification, Stat, WhyItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Countries", href: "#countries" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const STATS: Stat[] = [
  { value: "15", suffix: "+", label: "Years of Experience" },
  { value: "45", suffix: "+", label: "Countries Served" },
  { value: "1200", suffix: "+", label: "Happy Clients" },
  { value: "500", suffix: "M+", label: "Trade Volume (USD)" },
];

export const SERVICES: Service[] = [
  {
    id: "export",
    title: "Export Solutions",
    description: "End-to-end export management covering documentation, compliance, freight coordination, and international delivery to 45+ countries.",
    icon: "Ship",
    features: ["Custom export documentation", "Freight coordination", "Compliance management", "Port handling"],
  },
  {
    id: "import",
    title: "Import Assistance",
    description: "Streamlined import services handling customs clearance, duty optimization, and last-mile delivery for businesses worldwide.",
    icon: "PackageOpen",
    features: ["Customs clearance", "Duty optimization", "Last-mile delivery", "Import permits"],
  },
  {
    id: "sourcing",
    title: "Global Sourcing",
    description: "Connect with verified manufacturers and suppliers globally. We evaluate, negotiate, and manage supplier relationships on your behalf.",
    icon: "Globe",
    features: ["Supplier discovery", "Quality audits", "Price negotiation", "Ongoing management"],
  },
  {
    id: "logistics",
    title: "Logistics Coordination",
    description: "Multi-modal logistics solutions including sea freight, air cargo, and road transport with real-time tracking and insurance.",
    icon: "Truck",
    features: ["Sea & air freight", "Real-time tracking", "Cargo insurance", "Warehouse solutions"],
  },
  {
    id: "customs",
    title: "Customs Documentation",
    description: "Expert preparation of all trade documents — commercial invoices, bills of lading, certificates of origin, and compliance filings.",
    icon: "FileCheck",
    features: ["HS code classification", "Commercial invoices", "Certificates of origin", "Regulatory filings"],
  },
  {
    id: "verification",
    title: "Supplier Verification",
    description: "Rigorous due-diligence on potential suppliers including factory audits, financial checks, and product quality testing.",
    icon: "ShieldCheck",
    features: ["Factory audits", "Financial due diligence", "Product testing", "Background checks"],
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Agricultural",
  "Spices",
  "Textiles",
  "Industrial",
  "Food Products",
  "Raw Materials",
];

export const PRODUCTS: Product[] = [
  { id: "p1", title: "Basmati Rice", category: "Agricultural", description: "Premium long-grain basmati rice sourced from the finest farms in India. Available in bulk quantities.", image: "/images/products/rice.jpg" },
  { id: "p2", title: "Turmeric & Spices", category: "Spices", description: "Curcumin-rich turmeric and a full range of Indian spices — whole, ground, and blended.", image: "/images/products/spices.jpg" },
  { id: "p3", title: "Cotton Fabric", category: "Textiles", description: "High-quality woven and knitted cotton fabrics for garment manufacturing, available in custom specifications.", image: "/images/products/textile.jpg" },
  { id: "p4", title: "Industrial Machinery", category: "Industrial", description: "Heavy-duty industrial equipment including presses, lathes, and CNC machines from certified manufacturers.", image: "/images/products/machinery.jpg" },
  { id: "p5", title: "Processed Foods", category: "Food Products", description: "Ready-to-eat and processed food products meeting international food safety and hygiene standards.", image: "/images/products/food.jpg" },
  { id: "p6", title: "Iron Ore & Minerals", category: "Raw Materials", description: "High-grade iron ore, granite, and mineral raw materials for industrial applications globally.", image: "/images/products/minerals.jpg" },
  { id: "p7", title: "Wheat & Grains", category: "Agricultural", description: "Non-GMO wheat, sorghum, and specialty grains meeting global export quality benchmarks.", image: "/images/products/grains.jpg" },
  { id: "p8", title: "Cardamom & Pepper", category: "Spices", description: "Premium-grade cardamom, black pepper, and cumin packed to international export standards.", image: "/images/products/cardamom.jpg" },
  { id: "p9", title: "Denim & Synthetics", category: "Textiles", description: "Denim fabric and synthetic blends for fashion and workwear manufacturers worldwide.", image: "/images/products/denim.jpg" },
];

export const WHY_ITEMS: WhyItem[] = [
  { title: "Trusted Global Network", description: "15+ years of established partnerships with verified manufacturers, logistics providers, and trade agents across 45+ countries.", icon: "Globe2", size: "large" },
  { title: "Verified Suppliers", description: "Every supplier undergoes rigorous multi-point verification — factory audits, financial checks, and quality testing.", icon: "ShieldCheck", size: "small" },
  { title: "Competitive Pricing", description: "Direct manufacturer relationships and volume leverage ensure the best market rates with full cost transparency.", icon: "BadgePercent", size: "small" },
  { title: "Timely Delivery", description: "98.7% on-time delivery record backed by multi-carrier logistics and proactive shipment monitoring.", icon: "Clock", size: "small" },
  { title: "Compliance Support", description: "In-house trade compliance experts handle documentation, regulatory filings, and customs across all jurisdictions.", icon: "FileCheck2", size: "small" },
  { title: "End-to-End Service", description: "From sourcing and quality control to freight, customs clearance, and final delivery — we manage the complete trade cycle.", icon: "Layers", size: "large" },
];

export const COUNTRIES: Country[] = [
  { name: "India", code: "IN", x: 66, y: 45 },
  { name: "UAE", code: "AE", x: 60, y: 42 },
  { name: "USA", code: "US", x: 18, y: 36 },
  { name: "UK", code: "GB", x: 47, y: 27 },
  { name: "Germany", code: "DE", x: 50, y: 28 },
  { name: "Singapore", code: "SG", x: 76, y: 54 },
  { name: "Australia", code: "AU", x: 80, y: 68 },
];

export const INDUSTRIES: Industry[] = [
  { title: "Agriculture & Food", description: "Connecting agri-businesses with global buyers and suppliers for grains, spices, and processed foods.", icon: "Wheat", color: "green" },
  { title: "FMCG", description: "Streamlined import-export solutions for fast-moving consumer goods with shelf-life-compliant logistics.", icon: "ShoppingCart", color: "blue" },
  { title: "Manufacturing", description: "Raw material imports and finished goods exports for industrial manufacturers across sectors.", icon: "Factory", color: "slate" },
  { title: "Construction", description: "Sourcing and importing steel, cement, aggregates, and construction equipment for large-scale projects.", icon: "Building2", color: "orange" },
  { title: "Pharmaceuticals", description: "Regulatory-compliant import and export of pharmaceutical ingredients, generics, and medical devices.", icon: "Pill", color: "purple" },
  { title: "Retail & E-Commerce", description: "Flexible sourcing and logistics solutions enabling retailers to stock diverse international product ranges.", icon: "Store", color: "gold" },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "IEC", fullName: "Import Export Code", description: "Authorized by DGFT, Government of India for conducting import/export trade.", icon: "Award" },
  { name: "GST", fullName: "Goods & Services Tax", description: "GST registered entity compliant with Indian indirect tax regulations.", icon: "Receipt" },
  { name: "MSME", fullName: "Micro, Small & Medium Enterprises", description: "Recognized MSME under Government of India's Udyam Registration scheme.", icon: "Building" },
  { name: "ISO", fullName: "ISO 9001:2015", description: "Quality Management System certified for consistent international service delivery.", icon: "CheckCircle2" },
  { name: "APEDA", fullName: "Agricultural & Processed Food Products Export Development Authority", description: "Registered with APEDA for export of agricultural and processed food products.", icon: "Sprout" },
  { name: "FSSAI", fullName: "Food Safety & Standards Authority of India", description: "FSSAI licensed for manufacture, storage, and distribution of food products.", icon: "Shield" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "James Whitmore", role: "Head of Procurement", company: "Whitmore Industrial Group", country: "United Kingdom", review: "FlexPro has transformed our supply chain. Their supplier verification process and on-time delivery gave us complete confidence in scaling our imports from India. Highly professional team.", rating: 5, avatar: "JW" },
  { id: "t2", name: "Fatima Al-Rashid", role: "CEO", company: "Gulf Trade Partners LLC", country: "UAE", review: "Working with FlexPro for 3 years has been exceptional. Their knowledge of customs documentation and regulatory compliance saved us from costly delays multiple times.", rating: 5, avatar: "FA" },
  { id: "t3", name: "Michael Chen", role: "Supply Chain Director", company: "Pacific Rim Imports", country: "Singapore", review: "Outstanding logistics coordination and sourcing expertise. FlexPro found us suppliers we couldn't locate through other channels and negotiated pricing 18% below our previous benchmarks.", rating: 5, avatar: "MC" },
  { id: "t4", name: "Sarah Mitchell", role: "Operations Manager", company: "Mitchell & Co Exports", country: "Australia", review: "The customs documentation team at FlexPro is second to none. Complex Australian import requirements handled seamlessly every shipment.", rating: 5, avatar: "SM" },
  { id: "t5", name: "Rolf Brecker", role: "Purchasing Director", company: "Brecker GmbH", country: "Germany", review: "We've tried multiple trade partners but FlexPro stands apart for their transparency and attention to compliance. Our textile imports arrive on schedule and within specification.", rating: 5, avatar: "RB" },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: "b1", title: "How to Choose the Right Export Partner for Your Business", excerpt: "A comprehensive guide to evaluating international trade partners — what to look for, red flags to avoid, and how to structure agreements.", date: "2026-05-10", category: "Trade Strategy", readTime: "6 min read", image: "/images/blog/export-partner.jpg", slug: "choose-right-export-partner" },
  { id: "b2", title: "Understanding India's APEDA Regulations for Food Exports", excerpt: "Everything exporters need to know about APEDA registration, product categories, and documentation requirements for agricultural exports.", date: "2026-04-22", category: "Compliance", readTime: "8 min read", image: "/images/blog/apeda.jpg", slug: "apeda-regulations-food-exports" },
  { id: "b3", title: "Top 5 Logistics Trends Shaping Global Trade in 2026", excerpt: "From AI-driven freight optimization to green shipping corridors — the logistics innovations redefining international supply chains.", date: "2026-04-05", category: "Logistics", readTime: "5 min read", image: "/images/blog/logistics-trends.jpg", slug: "logistics-trends-2026" },
  { id: "b4", title: "Customs Documentation: A Complete Checklist for Importers", excerpt: "Avoid costly delays with our definitive checklist of customs documents required for smooth clearance across major markets.", date: "2026-03-18", category: "Compliance", readTime: "7 min read", image: "/images/blog/customs-docs.jpg", slug: "customs-documentation-checklist" },
];
