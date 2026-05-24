"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Users, BarChart3, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

const statIcons = [TrendingUp, Globe, Users, BarChart3];

const highlights = [
  "APEDA & FSSAI certified for food-grade exports",
  "Dedicated trade compliance & documentation team",
  "Direct manufacturer relationships in 12+ countries",
  "Real-time shipment tracking & proactive updates",
  "Flexible payment terms and credit facilities",
];

export default function CompanyOverviewSection() {
  return (
    <section id="about" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              badge="About FlexPro"
              title="Your Reliable Partner in "
              highlight="International Trade"
              subtitle=""
              centered={false}
            />
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              Founded in 2010, FlexPro Exports & Imports has grown into a trusted name in global trade, helping businesses across 45+ countries source premium products, navigate complex customs requirements, and deliver shipments reliably.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Our team of trade specialists, logistics coordinators, and compliance experts work as an extension of your business — ensuring every transaction is smooth, transparent, and profitable.
            </p>
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 text-slate-700 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {STATS.map(({ value, suffix, label }, i) => {
                const Icon = statIcons[i];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative overflow-hidden rounded-2xl p-6 group card-hover gold-border-glow border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 -translate-y-8 translate-x-8"
                      style={{ background: "radial-gradient(circle, #e6b800, transparent)" }} />
                    <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                      style={{ background: "rgba(230, 184, 0, 0.12)" }}>
                      <Icon className="w-5 h-5 text-gold-600" />
                    </div>
                    <div className="text-4xl font-bold text-navy-900 font-display leading-none mb-1">
                      <AnimatedCounter value={value} suffix={suffix} />
                    </div>
                    <div className="text-slate-500 text-sm font-medium">{label}</div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>

            {/* Award banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl p-5 border border-navy-900/10"
              style={{ background: "linear-gradient(135deg, #0a1628 0%, #102560 100%)" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-0.5">$500M+ in Trade Volume</div>
                  <div className="text-slate-400 text-xs">Facilitated across 45+ global markets in 2025</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-gold-400 font-bold text-lg">AAA</div>
                  <div className="text-slate-500 text-xs">Trade Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
