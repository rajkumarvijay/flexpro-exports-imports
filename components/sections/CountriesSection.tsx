"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { COUNTRIES } from "@/lib/constants";

const countryDetails: Record<string, { products: string[]; flag: string }> = {
  India: { products: ["Spices", "Textiles", "Rice", "Pharmaceuticals"], flag: "🇮🇳" },
  UAE: { products: ["Petroleum Products", "Dates", "Machinery"], flag: "🇦🇪" },
  USA: { products: ["Machinery", "Electronics", "Agricultural Products"], flag: "🇺🇸" },
  UK: { products: ["Luxury Goods", "Pharmaceuticals", "Chemicals"], flag: "🇬🇧" },
  Germany: { products: ["Automotive Parts", "Machinery", "Chemicals"], flag: "🇩🇪" },
  Singapore: { products: ["Electronics", "Chemicals", "Refined Products"], flag: "🇸🇬" },
  Australia: { products: ["Minerals", "Agricultural Products", "Wool"], flag: "🇦🇺" },
};

export default function CountriesSection() {
  const [activeCountry, setActiveCountry] = useState<string | null>("India");

  return (
    <section id="countries" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Global Reach"
          title="Countries We "
          highlight="Serve"
          subtitle="Strategic trade partnerships spanning 7 major markets, with active routes across 45+ countries."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Country list */}
          <div className="space-y-2">
            {COUNTRIES.map(({ name }) => {
              const detail = countryDetails[name];
              const isActive = activeCountry === name;
              return (
                <motion.button
                  key={name}
                  onClick={() => setActiveCountry(name)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all duration-200 border ${
                    isActive
                      ? "border-gold-500/40 text-white"
                      : "border-white/5 hover:border-white/15 text-slate-400 hover:text-white"
                  }`}
                  style={isActive ? { background: "rgba(230,184,0,0.08)" } : { background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-2xl">{detail?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm ${isActive ? "text-gold-400" : "text-slate-300"}`}>{name}</div>
                    <div className="text-xs text-slate-500 truncate">{detail?.products.slice(0, 2).join(", ")}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="country-indicator"
                      className="w-2 h-2 rounded-full bg-gold-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Map visualization */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/9]"
              style={{ background: "linear-gradient(135deg, #060d1a 0%, #102560 100%)" }}>
              <div className="absolute inset-0 grid-texture opacity-40" />

              {/* SVG World Map */}
              <svg
                viewBox="0 0 900 500"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Simplified continent shapes */}
                <g fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
                  {/* North America */}
                  <path d="M50 100 Q90 80 140 90 Q180 100 200 130 Q220 160 215 200 Q210 240 190 260 Q170 280 150 270 Q130 260 110 240 Q90 220 75 195 Q60 170 55 145 Z" />
                  {/* South America */}
                  <path d="M150 280 Q175 265 200 275 Q225 285 235 310 Q245 335 235 365 Q225 395 205 410 Q185 425 165 415 Q145 405 138 380 Q131 355 135 325 Q139 295 150 280 Z" />
                  {/* Europe */}
                  <path d="M390 90 Q420 75 455 80 Q490 85 510 100 Q530 115 525 135 Q520 155 500 160 Q480 165 460 155 Q440 145 425 155 Q410 165 400 150 Q390 135 392 115 Z" />
                  {/* Africa */}
                  <path d="M410 165 Q445 150 480 160 Q515 170 530 200 Q545 230 540 265 Q535 300 520 330 Q505 360 480 375 Q455 390 430 380 Q405 370 392 345 Q379 320 380 285 Q381 250 390 220 Q399 190 410 165 Z" />
                  {/* Asia */}
                  <path d="M520 75 Q570 55 630 65 Q690 75 730 95 Q770 115 775 145 Q780 175 760 195 Q740 215 710 215 Q680 215 655 200 Q630 185 610 190 Q590 195 570 180 Q550 165 540 145 Q530 125 520 105 Z" />
                  {/* South Asia (India) */}
                  <path d="M620 190 Q645 178 670 185 Q695 192 700 215 Q705 238 690 255 Q675 272 655 270 Q635 268 622 250 Q609 232 610 212 Z" />
                  {/* Southeast Asia */}
                  <path d="M700 195 Q725 185 750 192 Q775 199 780 220 Q785 241 768 252 Q751 263 730 258 Q709 253 700 235 Q691 217 700 195 Z" />
                  {/* Australia */}
                  <path d="M710 305 Q745 292 780 300 Q815 308 825 335 Q835 362 815 382 Q795 402 765 398 Q735 394 718 372 Q701 350 705 328 Z" />
                </g>

                {/* Trade route lines */}
                {COUNTRIES.map(({ name, x, y }) => {
                  const cx = (x / 100) * 900;
                  const cy = (y / 100) * 500;
                  const indiaX = (66 / 100) * 900;
                  const indiaY = (45 / 100) * 500;
                  if (name === "India") return null;
                  return (
                    <motion.line
                      key={`line-${name}`}
                      x1={indiaX} y1={indiaY}
                      x2={cx} y2={cy}
                      stroke={activeCountry === name ? "#e6b800" : "rgba(230,184,0,0.15)"}
                      strokeWidth={activeCountry === name ? 1.5 : 0.8}
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  );
                })}

                {/* Country dots */}
                {COUNTRIES.map(({ name, x, y }) => {
                  const cx = (x / 100) * 900;
                  const cy = (y / 100) * 500;
                  const isActive = activeCountry === name;
                  return (
                    <g key={name}>
                      {isActive && (
                        <motion.circle
                          cx={cx} cy={cy} r={18}
                          fill="rgba(230,184,0,0.12)"
                          stroke="rgba(230,184,0,0.3)"
                          strokeWidth={1}
                          animate={{ r: [14, 22, 14] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <circle
                        cx={cx} cy={cy}
                        r={isActive ? 7 : 5}
                        fill={isActive ? "#e6b800" : "rgba(230,184,0,0.5)"}
                        stroke={isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}
                        strokeWidth={isActive ? 2 : 1}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveCountry(name)}
                      />
                      <text
                        x={cx} y={cy - 12}
                        textAnchor="middle"
                        fill={isActive ? "#e6b800" : "rgba(255,255,255,0.5)"}
                        fontSize={isActive ? 10 : 8}
                        fontWeight={isActive ? "bold" : "normal"}
                      >
                        {name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Info panel */}
              {activeCountry && (
                <motion.div
                  key={activeCountry}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-56 glass rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{countryDetails[activeCountry]?.flag}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{activeCountry}</div>
                      <div className="flex items-center gap-1 text-gold-400 text-xs">
                        <MapPin className="w-3 h-3" />
                        Active Trade Route
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-400 text-xs mb-1 uppercase tracking-wide">Key Products</div>
                    {countryDetails[activeCountry]?.products.map((p) => (
                      <div key={p} className="flex items-center gap-1.5 text-slate-300 text-xs">
                        <div className="w-1 h-1 rounded-full bg-gold-400" />
                        {p}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Country flags strip */}
            <div className="flex flex-wrap gap-3 mt-5 justify-center">
              {COUNTRIES.map(({ name }) => (
                <motion.button
                  key={name}
                  onClick={() => setActiveCountry(name)}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCountry === name
                      ? "text-navy-950"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10"
                  }`}
                  style={activeCountry === name ? {
                    background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)"
                  } : {}}
                >
                  <span>{countryDetails[name]?.flag}</span>
                  {name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-500 text-sm mt-10 flex items-center justify-center gap-2"
        >
          <Globe className="w-4 h-4 text-gold-500" />
          Plus 38 additional countries on request — contact us for custom routes
        </motion.p>
      </div>
    </section>
  );
}
