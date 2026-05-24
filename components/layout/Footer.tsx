"use client";

import { motion } from "framer-motion";
import { Globe, Mail, Phone, MapPin, MessageCircle, Link, Share2, ArrowRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#about" },
    { label: "Certifications", href: "#certifications" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#contact" },
  ],
  services: [
    { label: "Export Solutions", href: "#services" },
    { label: "Import Assistance", href: "#services" },
    { label: "Global Sourcing", href: "#services" },
    { label: "Logistics Coordination", href: "#services" },
    { label: "Customs Documentation", href: "#services" },
  ],
  quickLinks: [
    { label: "Products", href: "#products" },
    { label: "Industries We Serve", href: "#industries" },
    { label: "Countries We Trade", href: "#countries" },
    { label: "Request a Quote", href: "#rfq" },
    { label: "Contact Us", href: "#contact" },
  ],
};

const socialLinks = [
  { icon: Link, href: "#", label: "LinkedIn" },
  { icon: Share2, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "Instagram" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 mb-5"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-lg">
                <Globe className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight font-display">FlexPro</div>
                <div className="text-gold-400 text-xs font-medium tracking-wider">Exports & Imports</div>
              </div>
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Trusted global trade partner connecting businesses across 45+ countries with premium export, import, and sourcing solutions since 2010.
            </p>
            <div className="space-y-3 mb-6">
              {[
                { icon: Mail, text: "hello@flexproexports.com" },
                { icon: Phone, text: "+91 90000 00000" },
                { icon: MessageCircle, text: "WhatsApp: +91 90000 00000", green: true },
                { icon: MapPin, text: "Chennai, Tamil Nadu, India" },
              ].map(({ icon: Icon, text, green }) => (
                <div key={text} className="flex items-center gap-3 text-slate-400 text-sm">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${green ? "text-green-400" : "text-gold-500"}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/30 flex items-center justify-center text-slate-400 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Services", links: footerLinks.services },
            { title: "Quick Links", links: footerLinks.quickLinks },
          ].map(({ title, links }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                      className="group flex items-center gap-1.5 text-slate-400 hover:text-gold-400 text-sm transition-colors duration-200"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 FlexPro Exports & Imports. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
