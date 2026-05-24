import { PrismaClient, Role, RFQStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@12345", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@flexproexports.com" },
    update: {},
    create: {
      name: "FlexPro Admin",
      email: "admin@flexproexports.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log("✅ Admin user:", admin.email);

  // Demo customer
  const customerPassword = await bcrypt.hash("Customer@123", 10);
  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      name: "Demo Customer",
      email: "customer@example.com",
      password: customerPassword,
      role: Role.CUSTOMER,
    },
  });

  // Services
  await prisma.service.deleteMany();
  await prisma.service.createMany({
    data: [
      { title: "Export Solutions", description: "End-to-end export management covering documentation, compliance, freight coordination, and international delivery to 45+ countries.", icon: "Ship", features: ["Custom export documentation", "Freight coordination", "Compliance management", "Port handling"], order: 1 },
      { title: "Import Assistance", description: "Streamlined import services handling customs clearance, duty optimization, and last-mile delivery for businesses worldwide.", icon: "PackageOpen", features: ["Customs clearance", "Duty optimization", "Last-mile delivery", "Import permits"], order: 2 },
      { title: "Global Sourcing", description: "Connect with verified manufacturers and suppliers globally. We evaluate, negotiate, and manage supplier relationships on your behalf.", icon: "Globe", features: ["Supplier discovery", "Quality audits", "Price negotiation", "Ongoing management"], order: 3 },
      { title: "Logistics Coordination", description: "Multi-modal logistics solutions including sea freight, air cargo, and road transport with real-time tracking and insurance.", icon: "Truck", features: ["Sea & air freight", "Real-time tracking", "Cargo insurance", "Warehouse solutions"], order: 4 },
      { title: "Customs Documentation", description: "Expert preparation of all trade documents — commercial invoices, bills of lading, certificates of origin, and compliance filings.", icon: "FileCheck", features: ["HS code classification", "Commercial invoices", "Certificates of origin", "Regulatory filings"], order: 5 },
      { title: "Supplier Verification", description: "Rigorous due-diligence on potential suppliers including factory audits, financial checks, and product quality testing.", icon: "ShieldCheck", features: ["Factory audits", "Financial due diligence", "Product testing", "Background checks"], order: 6 },
    ],
  });
  console.log("✅ Services seeded");

  // Products
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      { title: "Basmati Rice", category: "Agricultural", description: "Premium long-grain basmati rice sourced from the finest farms in India. Available in bulk quantities.", featured: true },
      { title: "Turmeric & Spices", category: "Spices", description: "Curcumin-rich turmeric and a full range of Indian spices — whole, ground, and blended.", featured: true },
      { title: "Cotton Fabric", category: "Textiles", description: "High-quality woven and knitted cotton fabrics for garment manufacturing, available in custom specifications.", featured: false },
      { title: "Industrial Machinery", category: "Industrial", description: "Heavy-duty industrial equipment including presses, lathes, and CNC machines from certified manufacturers.", featured: false },
      { title: "Processed Foods", category: "Food Products", description: "Ready-to-eat and processed food products meeting international food safety and hygiene standards.", featured: false },
      { title: "Iron Ore & Minerals", category: "Raw Materials", description: "High-grade iron ore, granite, and mineral raw materials for industrial applications globally.", featured: false },
      { title: "Wheat & Grains", category: "Agricultural", description: "Non-GMO wheat, sorghum, and specialty grains meeting global export quality benchmarks.", featured: false },
      { title: "Cardamom & Pepper", category: "Spices", description: "Premium-grade cardamom, black pepper, and cumin packed to international export standards.", featured: true },
      { title: "Denim & Synthetics", category: "Textiles", description: "Denim fabric and synthetic blends for fashion and workwear manufacturers worldwide.", featured: false },
    ],
  });
  console.log("✅ Products seeded");

  // Testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      { name: "James Whitmore", role: "Head of Procurement", company: "Whitmore Industrial Group", country: "United Kingdom", review: "FlexPro has transformed our supply chain. Their supplier verification process and on-time delivery gave us complete confidence in scaling our imports from India. Highly professional team.", rating: 5, avatar: "JW" },
      { name: "Fatima Al-Rashid", role: "CEO", company: "Gulf Trade Partners LLC", country: "UAE", review: "Working with FlexPro for 3 years has been exceptional. Their knowledge of customs documentation and regulatory compliance saved us from costly delays multiple times.", rating: 5, avatar: "FA" },
      { name: "Michael Chen", role: "Supply Chain Director", company: "Pacific Rim Imports", country: "Singapore", review: "Outstanding logistics coordination and sourcing expertise. FlexPro found us suppliers we couldn't locate through other channels and negotiated pricing 18% below our previous benchmarks.", rating: 5, avatar: "MC" },
      { name: "Sarah Mitchell", role: "Operations Manager", company: "Mitchell & Co Exports", country: "Australia", review: "The customs documentation team at FlexPro is second to none. Complex Australian import requirements handled seamlessly every shipment.", rating: 5, avatar: "SM" },
      { name: "Rolf Brecker", role: "Purchasing Director", company: "Brecker GmbH", country: "Germany", review: "We've tried multiple trade partners but FlexPro stands apart for their transparency and attention to compliance. Our textile imports arrive on schedule and within specification.", rating: 5, avatar: "RB" },
    ],
  });
  console.log("✅ Testimonials seeded");

  // Blog posts
  await prisma.blogPost.deleteMany();
  await prisma.blogPost.createMany({
    data: [
      { title: "How to Choose the Right Export Partner for Your Business", excerpt: "A comprehensive guide to evaluating international trade partners — what to look for, red flags to avoid, and how to structure agreements.", content: "<p>Choosing the right export partner is one of the most critical decisions for any business entering international trade...</p>", date: new Date("2026-05-10"), category: "Trade Strategy", readTime: "6 min read", slug: "choose-right-export-partner", published: true },
      { title: "Understanding India's APEDA Regulations for Food Exports", excerpt: "Everything exporters need to know about APEDA registration, product categories, and documentation requirements for agricultural exports.", content: "<p>APEDA (Agricultural and Processed Food Products Export Development Authority) is the body responsible for...</p>", date: new Date("2026-04-22"), category: "Compliance", readTime: "8 min read", slug: "apeda-regulations-food-exports", published: true },
      { title: "Top 5 Logistics Trends Shaping Global Trade in 2026", excerpt: "From AI-driven freight optimization to green shipping corridors — the logistics innovations redefining international supply chains.", content: "<p>The logistics industry is undergoing rapid transformation in 2026...</p>", date: new Date("2026-04-05"), category: "Logistics", readTime: "5 min read", slug: "logistics-trends-2026", published: true },
      { title: "Customs Documentation: A Complete Checklist for Importers", excerpt: "Avoid costly delays with our definitive checklist of customs documents required for smooth clearance across major markets.", content: "<p>Customs documentation errors are among the leading causes of shipment delays...</p>", date: new Date("2026-03-18"), category: "Compliance", readTime: "7 min read", slug: "customs-documentation-checklist", published: true },
    ],
  });
  console.log("✅ Blog posts seeded");

  // Demo RFQ for the demo customer
  const demoCustomer = await prisma.user.findUnique({ where: { email: "customer@example.com" } });
  if (demoCustomer) {
    await prisma.rFQ.upsert({
      where: { id: "demo-rfq-001" },
      update: {},
      create: {
        id: "demo-rfq-001",
        fullName: "Demo Customer",
        companyName: "Demo Corp",
        country: "India",
        productRequired: "Basmati Rice",
        quantity: "10 MT",
        email: "customer@example.com",
        whatsapp: "+91 9000000000",
        message: "Looking for premium basmati rice for export.",
        status: RFQStatus.QUOTED,
        quotedAmount: 45000,
        quotedCurrency: "INR",
        adminNotes: "Quote prepared at ₹4,500/MT for 10 MT. Valid for 30 days.",
        userId: demoCustomer.id,
      },
    });
    console.log("✅ Demo RFQ seeded");
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
