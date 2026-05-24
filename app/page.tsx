import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import CompanyOverviewSection from "@/components/sections/CompanyOverviewSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import CountriesSection from "@/components/sections/CountriesSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import RFQSection from "@/components/sections/RFQSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import type { Service, Product, Testimonial, BlogPost } from "@/types";

async function getPageData() {
  try {
    const [dbServices, dbProducts, dbTestimonials, dbBlogPosts] = await Promise.all([
      prisma.service.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.product.findMany({ where: { active: true }, orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }),
      prisma.testimonial.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { date: "desc" }, take: 4 }),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const services: Service[] = (dbServices as any[]).map((s) => ({ id: s.id, title: s.title, description: s.description, icon: s.icon, features: s.features }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: Product[] = (dbProducts as any[]).map((p) => ({ id: p.id, title: p.title, category: p.category, description: p.description, image: p.image ?? "" }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testimonials: Testimonial[] = (dbTestimonials as any[]).map((t) => ({ id: t.id, name: t.name, role: t.role, company: t.company, country: t.country, review: t.review, rating: t.rating, avatar: t.avatar }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blogPosts: BlogPost[] = (dbBlogPosts as any[]).map((b) => ({ id: b.id, title: b.title, excerpt: b.excerpt, date: b.date.toISOString(), category: b.category, readTime: b.readTime, image: b.image ?? "", slug: b.slug }));

    return { services, products, testimonials, blogPosts };
  } catch {
    // DB not connected yet — return empty arrays so the site still renders
    return { services: [], products: [], testimonials: [], blogPosts: [] };
  }
}

export default async function HomePage() {
  const { services, products, testimonials, blogPosts } = await getPageData();

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CompanyOverviewSection />
      <ServicesSection services={services} />
      <ProductsSection products={products} />
      <WhyChooseUsSection />
      <CountriesSection />
      <IndustriesSection />
      <CertificationsSection />
      <TestimonialsSection testimonials={testimonials} />
      <RFQSection />
      <BlogSection posts={blogPosts} />
      <ContactSection />
      <Footer />
    </main>
  );
}
