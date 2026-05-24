"use client";

import { motion } from "framer-motion";
import { Ship, PackageOpen, Globe, Truck, FileCheck, ShieldCheck, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";
import type { Service } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Ship, PackageOpen, Globe, Truck, FileCheck, ShieldCheck,
};

export default function ServicesSection({ services: propServices }: { services?: Service[] }) {
  const resolvedServices = propServices && propServices.length > 0 ? propServices : SERVICES;
  return (
    <section id="services" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Our Services"
          title="Complete "
          highlight="Trade Solutions"
          title2=" Under One Roof"
          subtitle="From sourcing to delivery, we handle every stage of your international trade lifecycle with precision and care."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedServices.map(({ id, title, description, icon, features }, i) => {
            const Icon = iconMap[icon] || Globe;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 border border-white/8 hover:border-gold-500/30 transition-all duration-300 card-hover cursor-pointer overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(230,184,0,0.06), transparent 70%)" }} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors duration-300 group-hover:scale-110 transform"
                    style={{ background: "rgba(230, 184, 0, 0.12)" }}>
                    <Icon className="w-6 h-6 text-gold-400" />
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-2 font-display group-hover:text-gold-300 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-slate-400 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button className="flex items-center gap-2 text-gold-400 text-sm font-medium group/btn">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
