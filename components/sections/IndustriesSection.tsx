"use client";

import { motion } from "framer-motion";
import { Wheat, ShoppingCart, Factory, Building2, Pill, Store, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { INDUSTRIES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Wheat, ShoppingCart, Factory, Building2, Pill, Store,
};

const colorStyles: Record<string, { bg: string; icon: string; border: string }> = {
  green: { bg: "rgba(34,197,94,0.08)", icon: "text-green-500", border: "rgba(34,197,94,0.2)" },
  blue: { bg: "rgba(59,130,246,0.08)", icon: "text-blue-500", border: "rgba(59,130,246,0.2)" },
  slate: { bg: "rgba(100,116,139,0.08)", icon: "text-slate-500", border: "rgba(100,116,139,0.2)" },
  orange: { bg: "rgba(249,115,22,0.08)", icon: "text-orange-500", border: "rgba(249,115,22,0.2)" },
  purple: { bg: "rgba(168,85,247,0.08)", icon: "text-purple-500", border: "rgba(168,85,247,0.2)" },
  gold: { bg: "rgba(230,184,0,0.08)", icon: "text-gold-600", border: "rgba(230,184,0,0.2)" },
};

export default function IndustriesSection() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Industries"
          title="Industries We "
          highlight="Specialize In"
          subtitle="Deep domain expertise across six major verticals, with trade solutions tailored to sector-specific requirements."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map(({ title, description, icon, color }, i) => {
            const Icon = iconMap[icon] || Factory;
            const styles = colorStyles[color] || colorStyles.gold;

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 border bg-white card-hover overflow-hidden cursor-pointer"
                style={{ borderColor: "rgba(226,232,240,1)" }}
              >
                {/* Background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: styles.bg }} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border"
                    style={{ background: styles.bg, borderColor: styles.border }}>
                    <Icon className={`w-6 h-6 ${styles.icon}`} />
                  </div>

                  <h3 className="text-navy-900 font-bold text-base mb-2 font-display">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{description}</p>

                  <button className="flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "#c9a100" }}>
                    Explore Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${styles.border.replace("0.2", "0.8")}, transparent)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
