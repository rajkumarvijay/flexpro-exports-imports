"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, CheckCircle, Zap, Shield, Star, TrendingUp, MessageCircle } from "lucide-react";

const trustBadges = [
  { icon: Globe, label: "Global Network", value: "45+ Countries" },
  { icon: Shield, label: "Trusted Suppliers", value: "500+ Verified" },
  { icon: Zap, label: "Fast Logistics", value: "98.7% On-Time" },
  { icon: Star, label: "Quality Assurance", value: "ISO Certified" },
];

const floatingCards = [
  {
    id: "shipment",
    title: "Active Shipments",
    value: "2,847",
    change: "+12%",
    icon: TrendingUp,
    color: "gold",
    top: "12%",
    right: "5%",
  },
  {
    id: "clients",
    title: "Global Clients",
    value: "1,200+",
    change: "Worldwide",
    icon: Globe,
    color: "blue",
    bottom: "28%",
    right: "2%",
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    value: "98.7%",
    change: "This Quarter",
    icon: CheckCircle,
    color: "green",
    bottom: "12%",
    left: "5%",
    hideOnMobile: true,
  },
];

export default function HeroSection() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg grid-texture"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #2255cc, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #e6b800, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 border"
              style={{
                background: "rgba(230, 184, 0, 0.1)",
                borderColor: "rgba(230, 184, 0, 0.3)",
                color: "#e6b800",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block animate-pulse" />
              Trusted Since 2010 — 15+ Years of Global Trade
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-display tracking-tight"
            >
              Trusted Global{" "}
              <span className="gradient-text">Export & Import</span>{" "}
              Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg leading-relaxed mb-8 max-w-lg"
            >
              We help businesses worldwide with sourcing, importing, exporting, logistics support, and reliable international trade partnerships across 45+ countries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#rfq"
                onClick={(e) => { e.preventDefault(); handleNavClick("#rfq"); }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-navy-950 shadow-xl hover:scale-105 transition-transform duration-200"
                style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#products"
                onClick={(e) => { e.preventDefault(); handleNavClick("#products"); }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              >
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {trustBadges.map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="glass rounded-xl p-3 flex flex-col items-center text-center"
                >
                  <div className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center"
                    style={{ background: "rgba(230, 184, 0, 0.15)" }}>
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <div className="text-white text-xs font-bold">{value}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column — Visual */}
          <div className="relative h-[480px] lg:h-[560px]">
            {/* World map SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                {/* Globe circle */}
                <div className="absolute inset-8 rounded-full border border-white/5"
                  style={{ background: "radial-gradient(ellipse at 35% 35%, rgba(34,85,204,0.25), rgba(10,22,40,0.8))" }}
                />
                <div className="absolute inset-12 rounded-full border border-white/5" />
                <div className="absolute inset-16 rounded-full border border-white/5" />

                {/* World map silhouette */}
                <svg
                  viewBox="0 0 800 400"
                  className="absolute inset-0 w-full h-full opacity-15"
                  fill="currentColor"
                >
                  <path className="text-navy-300" d="M100 180 Q120 160 150 165 Q180 170 200 155 Q230 140 260 150 Q290 160 300 175 Q310 190 340 185 Q370 180 390 195 Q410 210 400 230 Q390 250 370 255 Q350 260 330 245 Q310 230 290 235 Q270 240 250 225 Q230 210 210 220 Q190 230 170 220 Q150 210 130 215 Q110 220 100 205 Z" />
                  <path className="text-navy-300" d="M400 130 Q430 110 470 115 Q510 120 540 135 Q570 150 580 170 Q590 190 575 205 Q560 220 535 215 Q510 210 490 225 Q470 240 450 230 Q430 220 415 235 Q400 250 385 240 Q370 230 375 210 Q380 190 395 175 Q400 160 400 130 Z" />
                  <path className="text-navy-300" d="M580 150 Q610 135 645 140 Q680 145 700 160 Q720 175 715 195 Q710 215 690 220 Q670 225 650 215 Q630 205 615 215 Q600 225 590 210 Q580 195 585 175 Z" />
                  <path className="text-navy-300" d="M200 250 Q225 235 255 240 Q285 245 300 260 Q315 275 305 295 Q295 315 270 320 Q245 325 225 310 Q205 295 200 275 Z" />
                  <path className="text-navy-300" d="M500 270 Q525 255 555 260 Q585 265 600 280 Q615 295 605 315 Q595 335 570 340 Q545 345 525 330 Q505 315 500 295 Z" />
                  <path className="text-navy-300" d="M630 260 Q655 250 680 255 Q705 260 715 275 Q725 290 710 305 Q695 320 670 318 Q645 316 635 300 Q625 285 630 260 Z" />
                </svg>

                {/* Trade route lines */}
                <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
                  {[
                    { x1: 580, y1: 180, x2: 400, y2: 200, id: "r1" },
                    { x1: 400, y1: 200, x2: 150, y2: 160, id: "r2" },
                    { x1: 400, y1: 200, x2: 480, y2: 145, id: "r3" },
                    { x1: 400, y1: 200, x2: 660, y2: 180, id: "r4" },
                    { x1: 400, y1: 200, x2: 240, y2: 280, id: "r5" },
                    { x1: 400, y1: 200, x2: 540, y2: 290, id: "r6" },
                  ].map(({ x1, y1, x2, y2, id }) => (
                    <motion.line
                      key={id}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="url(#tradeGrad)"
                      strokeWidth="1.5"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="tradeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e6b800" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#e6b800" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2255cc" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Location dots */}
                {[
                  { cx: 73, cy: 50, label: "India", delay: 1.2 },
                  { cx: 83, cy: 43, label: "Singapore", delay: 1.4 },
                  { cx: 20, cy: 40, label: "USA", delay: 1.6 },
                  { cx: 60, cy: 32, label: "UAE", delay: 1.8 },
                  { cx: 59, cy: 26, label: "Germany", delay: 2.0 },
                  { cx: 30, cy: 62, label: "Australia", delay: 2.2 },
                ].map(({ cx, cy, label, delay }) => (
                  <motion.div
                    key={label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay }}
                    className="absolute"
                    style={{ left: `${cx}%`, top: `${cy}%` }}
                  >
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-gold-400 border-2 border-white/40 shadow-lg" />
                      <div className="absolute inset-0 rounded-full bg-gold-400 animate-ping opacity-30" />
                    </div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-slate-300 font-medium bg-navy-900/80 px-1.5 py-0.5 rounded-sm">
                      {label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating stat cards */}
            {floatingCards.map(({ id, title, value, change, icon: Icon, color, top, right, bottom, left, hideOnMobile }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + Math.random() * 0.5 }}
                className={`absolute glass rounded-xl p-3.5 shadow-2xl ${hideOnMobile ? "hidden md:block" : ""}`}
                style={{ top, right, bottom, left, width: "140px" }}
              >
                <div className={`w-7 h-7 rounded-lg mb-2 flex items-center justify-center ${
                  color === "gold" ? "bg-gold-500/20" : color === "blue" ? "bg-navy-400/20" : "bg-green-500/20"
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${
                    color === "gold" ? "text-gold-400" : color === "blue" ? "text-navy-300" : "text-green-400"
                  }`} />
                </div>
                <div className="text-white text-lg font-bold leading-none">{value}</div>
                <div className="text-slate-400 text-xs mt-1">{title}</div>
                <div className={`text-xs font-medium mt-1 ${
                  color === "gold" ? "text-gold-400" : color === "blue" ? "text-navy-300" : "text-green-400"
                }`}>{change}</div>
              </motion.div>
            ))}

            {/* Central globe icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-dashed border-gold-500/20 opacity-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-2xl">
                <Globe className="w-8 h-8 text-navy-950" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* WhatsApp CTA pill */}
            <motion.a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full glass text-white text-sm font-medium hover:bg-green-500/20 transition-colors duration-200 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
