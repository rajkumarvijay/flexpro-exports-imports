"use client";

import { motion } from "framer-motion";
import { Globe2, ShieldCheck, BadgePercent, Clock, FileCheck2, Layers } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { WHY_ITEMS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Globe2, ShieldCheck, BadgePercent, Clock, FileCheck2, Layers,
};

export default function WhyChooseUsSection() {
  return (
    <section id="why" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why FlexPro"
          title="Why Businesses "
          highlight="Trust Us"
          subtitle="Six pillars that make FlexPro the preferred trade partner for companies across 45+ countries."
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map(({ title, description, icon, size }, i) => {
            const Icon = iconMap[icon] || Globe2;
            const isLarge = size === "large";

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl p-7 border border-slate-200 bg-white card-hover gold-border-glow shadow-sm ${
                  isLarge && i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                } ${isLarge && i === 5 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -translate-y-12 translate-x-12 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle, #e6b800, transparent)" }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, rgba(230,184,0,0.15), rgba(230,184,0,0.05))" }}>
                    <Icon className="w-6 h-6 text-gold-600" />
                  </div>

                  <h3 className="text-navy-900 font-bold text-base mb-3 font-display">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/60 transition-all duration-300" />

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-gold-400/60" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #102560 100%)" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { value: "98.7%", label: "On-Time Delivery" },
              { value: "500+", label: "Verified Suppliers" },
              { value: "45+", label: "Countries Active" },
              { value: "24/7", label: "Support Available" },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 py-5 text-center">
                <div className="text-2xl font-bold text-gold-400 font-display">{value}</div>
                <div className="text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
