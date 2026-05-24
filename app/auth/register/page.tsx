"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Mail, Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    // Step 1: create the account
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoading(false);
      toast.error(data.error || "Registration failed");
      return;
    }
    // Step 2: auto sign-in so user lands directly on dashboard
    const signInRes = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (signInRes?.error) {
      toast.success("Account created! Please sign in.");
      router.push("/auth/login");
    } else {
      toast.success("Welcome to FlexPro!");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #102560 100%)" }}>
      <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-2xl mb-4">
            <Globe className="w-7 h-7 text-navy-950" strokeWidth={2} />
          </div>
          <h1 className="text-white text-2xl font-bold font-display">Create Account</h1>
          <p className="text-slate-400 text-sm mt-1">Join FlexPro to track your RFQs</p>
        </div>

        <div className="rounded-3xl border border-white/10 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name" as const, label: "Full Name", type: "text", placeholder: "John Smith", icon: User },
                { name: "email" as const, label: "Email Address", type: "email", placeholder: "john@company.com", icon: Mail },
                { name: "password" as const, label: "Password", type: "password", placeholder: "Min. 8 characters", icon: Lock },
                { name: "confirm" as const, label: "Confirm Password", type: "password", placeholder: "Repeat password", icon: Lock },
              ].map(({ name, label, type, placeholder, icon: Icon }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={type} required
                      value={form[name]}
                      onChange={(e) => setForm(p => ({ ...p, [name]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 transition-all"
                    />
                  </div>
                </div>
              ))}

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-navy-950 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100 mt-2"
                style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : "Create Account"}
              </button>
            </form>

            <p className="text-center text-slate-500 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-6">
          <Link href="/" className="hover:text-slate-400 transition-colors">← Back to FlexPro website</Link>
        </p>
      </motion.div>
    </div>
  );
}
