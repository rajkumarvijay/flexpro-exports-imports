"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = TESTIMONIALS.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Client Testimonials"
          title="Trusted by Businesses "
          highlight="Worldwide"
          subtitle="Hear from our global clients about their experience working with FlexPro."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center"
              >
                <div className="p-8 md:p-12 w-full">
                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                    style={{ background: "rgba(230,184,0,0.1)" }}>
                    <Quote className="w-6 h-6 text-gold-600" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: TESTIMONIALS[current].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-navy-800 text-base md:text-lg leading-relaxed mb-8 italic">
                    &ldquo;{TESTIMONIALS[current].review}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0a1628 0%, #2255cc 100%)" }}>
                      {TESTIMONIALS[current].avatar}
                    </div>
                    <div>
                      <div className="text-navy-900 font-semibold text-sm">{TESTIMONIALS[current].name}</div>
                      <div className="text-slate-500 text-xs">{TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}</div>
                      <div className="text-gold-600 text-xs font-medium mt-0.5">{TESTIMONIALS[current].country}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-navy-900 transition-colors shadow-sm"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current
                      ? "linear-gradient(135deg, #e6b800, #c9a100)"
                      : "rgba(100,116,139,0.3)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-navy-900 transition-colors shadow-sm"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {TESTIMONIALS.slice(0, 4).map(({ id, name, country, avatar, rating }, i) => (
              <motion.button
                key={id}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl p-3 text-left transition-all duration-200 border ${
                  current === i ? "border-gold-300 bg-gold-50" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #0a1628 0%, #2255cc 100%)" }}>
                    {avatar}
                  </div>
                  <div className="text-xs font-medium text-navy-900 truncate">{name.split(" ")[0]}</div>
                </div>
                <div className="text-slate-400 text-xs">{country}</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: rating }).map((_, ri) => (
                    <Star key={ri} className="w-2.5 h-2.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
