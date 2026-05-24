"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  title2?: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  title2,
  highlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const titleParts = highlight
    ? title.split(highlight)
    : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 border"
          style={{
            background: "rgba(230, 184, 0, 0.1)",
            borderColor: "rgba(230, 184, 0, 0.3)",
            color: "#e6b800",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block" />
          {badge}
        </motion.span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 font-display tracking-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {highlight ? (
          <>
            {title}
            <span className="gradient-text">{highlight}</span>
            {title2 ?? ""}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${
            light ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
