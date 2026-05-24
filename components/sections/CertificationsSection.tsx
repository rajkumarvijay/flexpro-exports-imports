"use client";

import { motion } from "framer-motion";
import { Award, Receipt, Building, CheckCircle2, Sprout, Shield } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { CERTIFICATIONS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Award, Receipt, Building, CheckCircle2, Sprout, Shield,
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Certifications & Compliance"
          title="Licensed, "
          highlight="Certified"
          title2=" & Compliant"
          subtitle="Every certification we hold is a testament to our commitment to legal compliance, quality standards, and ethical trade."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map(({ name, fullName, description, icon }, i) => {
            const Icon = iconMap[icon] || Award;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl p-6 border border-white/8 hover:border-gold-500/30 transition-all duration-300 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(230,184,0,0.06), transparent 70%)" }} />

                <div className="relative z-10">
                  {/* Badge icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "rgba(230,184,0,0.12)" }}>
                      <Icon className="w-6 h-6 text-gold-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full border text-xs font-bold tracking-wider text-gold-400"
                      style={{ borderColor: "rgba(230,184,0,0.3)", background: "rgba(230,184,0,0.08)" }}>
                      {name}
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1.5 leading-tight">{fullName}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{description}</p>

                  {/* Verified badge */}
                  <div className="flex items-center gap-1.5 mt-4 text-green-400 text-xs font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified & Active
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-500/40 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 rounded-2xl p-6 border border-white/8 text-center"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <p className="text-slate-300 text-sm mb-2">
            All certifications are maintained and renewed annually. Available for verification on request.
          </p>
          <p className="text-slate-500 text-xs">
            IEC No: XXXXXXXXXX &nbsp;|&nbsp; GST: XXXXXXXXXXXXX &nbsp;|&nbsp; MSME Udyam: UDYAM-TN-XX-XXXXXXX
          </p>
        </motion.div>
      </div>
    </section>
  );
}
