"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, User, Building2, Globe, Package, Hash, Mail, Phone, MessageSquare, Loader2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { RFQFormData } from "@/types";

const initialForm: RFQFormData = {
  fullName: "",
  companyName: "",
  country: "",
  productRequired: "",
  quantity: "",
  email: "",
  whatsapp: "",
  message: "",
};

const fields = [
  { name: "fullName" as const, label: "Full Name", placeholder: "John Smith", icon: User, type: "text", required: true },
  { name: "companyName" as const, label: "Company Name", placeholder: "Your Company Ltd.", icon: Building2, type: "text", required: true },
  { name: "country" as const, label: "Country", placeholder: "United Kingdom", icon: Globe, type: "text", required: true },
  { name: "productRequired" as const, label: "Product Required", placeholder: "e.g. Basmati Rice, Turmeric", icon: Package, type: "text", required: true },
  { name: "quantity" as const, label: "Quantity / Volume", placeholder: "e.g. 5 MT per month", icon: Hash, type: "text", required: true },
  { name: "email" as const, label: "Email Address", placeholder: "john@company.com", icon: Mail, type: "email", required: true },
  { name: "whatsapp" as const, label: "WhatsApp Number", placeholder: "+44 7700 900000", icon: Phone, type: "tel", required: false },
];

export default function RFQSection() {
  const [form, setForm] = useState<RFQFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<RFQFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<RFQFormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.productRequired.trim()) newErrors.productRequired = "Product is required";
    if (!form.quantity.trim()) newErrors.quantity = "Quantity is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setIsSuccess(true);
      setForm(initialForm);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      setErrors({ email: "Failed to send. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rfq" className="section-padding bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30"
          style={{ background: "radial-gradient(ellipse at right, rgba(230,184,0,0.05), transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <SectionHeader
              badge="Get a Quote"
              title="Request For "
              highlight="Quote (RFQ)"
              subtitle="Fill out the form and our trade specialists will respond within 24 hours with a competitive quote tailored to your requirements."
              centered={false}
            />

            <div className="space-y-4 mt-2">
              {[
                { step: "01", title: "Submit Your RFQ", desc: "Fill in product details, quantity, and destination country." },
                { step: "02", title: "Receive Your Quote", desc: "Our team prepares a detailed quote within 24 business hours." },
                { step: "03", title: "Confirm & Trade", desc: "Review terms, confirm the order, and we handle the rest." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full text-navy-950 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
                    {step}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-slate-500 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl p-5 border border-white/10"
              style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #102560 100%)" }}>
              <p className="text-slate-300 text-sm mb-3">Prefer to talk directly?</p>
              <a href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-950 hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
                <Phone className="w-4 h-4" />
                WhatsApp Us Now
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="px-8 py-5 border-b border-white/5"
                style={{ background: "linear-gradient(135deg, #0d1f3c 0%, #102560 100%)" }}>
                <h3 className="text-white font-semibold text-lg font-display">Request for Quote</h3>
                <p className="text-slate-400 text-sm mt-0.5">Typical response time: within 24 hours</p>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="text-white font-bold text-xl mb-2">Quote Request Sent!</h4>
                      <p className="text-slate-500 text-sm">Our team will contact you within 24 hours with a competitive quote.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {fields.map(({ name, label, placeholder, icon: Icon, type, required }) => (
                          <div key={name} className={name === "email" || name === "whatsapp" ? "" : ""}>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                              {label} {required && <span className="text-red-400">*</span>}
                            </label>
                            <div className="relative">
                              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type={type}
                                value={form[name]}
                                onChange={(e) => {
                                  setForm((prev) => ({ ...prev, [name]: e.target.value }));
                                  if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
                                }}
                                placeholder={placeholder}
                                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 ${
                                  errors[name] ? "border-red-500/40 bg-red-500/5" : "border-white/10 bg-white/5"
                                }`}
                              />
                            </div>
                            {errors[name] && (
                              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                          Additional Message
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                          <textarea
                            value={form.message}
                            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                            placeholder="Any specific requirements, packaging preferences, delivery timeline, or questions..."
                            rows={4}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 resize-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Quote Request
                          </>
                        )}
                      </button>

                      <p className="text-center text-slate-400 text-xs">
                        By submitting, you agree to our{" "}
                        <a href="#" className="text-gold-600 hover:underline">Privacy Policy</a>.
                        We never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
