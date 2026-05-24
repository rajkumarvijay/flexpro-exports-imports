"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2, Globe } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const contactItems = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@flexproexports.com",
    sub: "We reply within 2 business hours",
    href: "mailto:hello@flexproexports.com",
    color: "blue",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 90000 00000",
    sub: "Mon–Sat, 9AM–6PM IST",
    href: "tel:+919000000000",
    color: "gold",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 90000 00000",
    sub: "Quick responses, 24/7",
    href: "https://wa.me/919000000000",
    color: "green",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Chennai, Tamil Nadu",
    sub: "India — 600001",
    href: "#",
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "rgba(59,130,246,0.1)", text: "text-blue-500" },
  gold: { bg: "rgba(230,184,0,0.1)", text: "text-gold-500" },
  green: { bg: "rgba(34,197,94,0.1)", text: "text-green-500" },
  purple: { bg: "rgba(168,85,247,0.1)", text: "text-purple-500" },
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Contact Us"
          title="Let&apos;s Start a "
          highlight="Conversation"
          subtitle="Have questions, need a quote, or ready to start trading? Our team is here to help."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {contactItems.map(({ icon: Icon, label, value, sub, href, color }, i) => {
                const styles = colorMap[color] || colorMap.gold;
                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.02 }}
                    className="group rounded-2xl p-5 border border-white/8 hover:border-white/20 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                      style={{ background: styles.bg }}>
                      <Icon className={`w-5 h-5 ${styles.text}`} />
                    </div>
                    <div className="text-slate-400 text-xs mb-1">{label}</div>
                    <div className="text-white font-semibold text-sm">{value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                  </motion.a>
                );
              })}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-white/8 h-52 relative"
              style={{ background: "linear-gradient(135deg, #060d1a 0%, #102560 100%)" }}
            >
              <div className="absolute inset-0 grid-texture opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-gold-400" />
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold text-sm">Chennai, Tamil Nadu, India</div>
                  <div className="text-slate-400 text-xs mt-1">View on Google Maps</div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-navy-950 hover:scale-105 transition-transform"
                  style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}
                >
                  Open in Maps
                </a>
              </div>
              {/* Decorative dots */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gold-400/30"
                  style={{
                    left: `${15 + i * 14}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Right — Quick inquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-3xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="px-8 py-5 border-b border-white/8 flex items-center gap-3">
                <Globe className="w-5 h-5 text-gold-400" />
                <div>
                  <h3 className="text-white font-semibold text-base">Quick Inquiry</h3>
                  <p className="text-slate-500 text-xs">We respond within 2 hours</p>
                </div>
              </div>

              <div className="p-8">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7 text-green-400" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                    <p className="text-slate-400 text-sm">We&apos;ll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { name: "name" as const, label: "Your Name", placeholder: "John Smith", type: "text" },
                      { name: "email" as const, label: "Email Address", placeholder: "john@company.com", type: "email" },
                    ].map(({ name, label, placeholder, type }) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
                        <input
                          type={type}
                          value={form[name]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                          placeholder={placeholder}
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 transition-all"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your trade requirements..."
                        rows={5}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-navy-950 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100 shadow-lg"
                      style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
