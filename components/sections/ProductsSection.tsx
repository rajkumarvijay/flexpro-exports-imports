"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, ArrowRight, Package, ShoppingBag } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/types";

const categoryColors: Record<string, string> = {
  Agricultural: "bg-green-100 text-green-700",
  Spices: "bg-amber-100 text-amber-700",
  Textiles: "bg-purple-100 text-purple-700",
  Industrial: "bg-slate-100 text-slate-700",
  "Food Products": "bg-orange-100 text-orange-700",
  "Raw Materials": "bg-stone-100 text-stone-700",
};

const categoryGradients: Record<string, string> = {
  Agricultural: "from-green-900/40 to-green-800/20",
  Spices: "from-amber-900/40 to-amber-800/20",
  Textiles: "from-purple-900/40 to-purple-800/20",
  Industrial: "from-slate-700/40 to-slate-600/20",
  "Food Products": "from-orange-900/40 to-orange-800/20",
  "Raw Materials": "from-stone-700/40 to-stone-600/20",
};

export default function ProductsSection({ products: propProducts }: { products?: Product[] }) {
  const products = propProducts && propProducts.length > 0 ? propProducts : PRODUCTS;
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Product Range"
          title="Global "
          highlight="Product Categories"
          title2=" We Trade"
          subtitle="Sourcing and exporting premium quality products across major commodity sectors to buyers worldwide."
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "text-navy-950 shadow-md scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              style={activeCategory === cat ? {
                background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)"
              } : {}}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(({ id, title, category, description }) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white card-hover gold-border-glow shadow-sm"
              >
                {/* Image placeholder */}
                <div className={`h-48 bg-gradient-to-br ${categoryGradients[category] || "from-navy-900/40 to-navy-800/20"} relative overflow-hidden`}
                  style={{ background: `linear-gradient(135deg, #0a1628 0%, #102560 100%)` }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30">
                    <Package className="w-16 h-16 text-gold-300" strokeWidth={1} />
                  </div>
                  <div className="absolute inset-0 grid-texture" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[category] || "bg-slate-100 text-slate-700"}`}>
                      {category}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <h3 className="text-navy-900 font-semibold text-base mb-1.5 font-display group-hover:text-navy-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{category}</span>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-navy-950 hover:scale-105 transition-transform"
                      style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Request Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="#rfq"
            onClick={(e) => { e.preventDefault(); document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-navy-950 shadow-lg hover:scale-105 transition-transform"
            style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
          >
            Request a Custom Quote
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-slate-400 text-sm mt-3">Don&apos;t see your product? We source custom commodities on request.</p>
        </motion.div>
      </div>
    </section>
  );
}
