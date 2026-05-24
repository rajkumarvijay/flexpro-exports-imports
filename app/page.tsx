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

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CompanyOverviewSection />
      <ServicesSection />
      <ProductsSection />
      <WhyChooseUsSection />
      <CountriesSection />
      <IndustriesSection />
      <CertificationsSection />
      <TestimonialsSection />
      <RFQSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
