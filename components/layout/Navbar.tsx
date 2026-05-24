"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, Globe, User, LogOut, LayoutDashboard, ChevronDown, Shield } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-950/98 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/8"
          : "bg-navy-950/85 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-base leading-tight tracking-tight font-display">
                FlexPro
              </div>
              <div className="text-gold-400 text-xs font-medium tracking-wider">
                Exports & Imports
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-gold-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/15 hover:border-white/30 transition-all duration-200 hover:bg-white/5"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              WhatsApp
            </a>

            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full border border-white/10 animate-pulse bg-white/5" />
            ) : session ? (
              /* Logged-in account dropdown */
              <div ref={accountRef} className="relative">
                <button
                  onClick={() => setAccountOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #0a1628 0%, #2255cc 100%)" }}>
                    {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <span className="text-white text-sm font-medium max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {accountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                      style={{ background: "#0d1c36" }}
                    >
                      <div className="px-4 py-3 border-b border-white/8">
                        <div className="text-white text-sm font-semibold truncate">{session.user?.name}</div>
                        <div className="text-slate-500 text-xs truncate mt-0.5">{session.user?.email}</div>
                      </div>
                      <div className="p-2">
                        <Link
                          href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
                        >
                          {session.user?.role === "ADMIN"
                            ? <Shield className="w-4 h-4 text-gold-400" />
                            : <LayoutDashboard className="w-4 h-4 text-gold-400" />}
                          {session.user?.role === "ADMIN" ? "Admin Panel" : "My Dashboard"}
                        </Link>
                        <button
                          onClick={() => { setAccountOpen(false); signOut({ callbackUrl: "/" }); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/8 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Logged-out: Sign In + Register */
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/15 hover:border-white/30 transition-all duration-200 hover:bg-white/5"
                >
                  <User className="w-4 h-4 text-gold-400" />
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-navy-950 transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
                >
                  Register
                </Link>
              </div>
            )}

            <a
              href="#rfq"
              onClick={(e) => { e.preventDefault(); handleNavClick("#rfq"); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-950 transition-all duration-200 hover:scale-105 shadow-md"
              style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
            >
              <Phone className="w-4 h-4" />
              Request Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden overflow-hidden bg-navy-950/98 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.href.replace("#", "")
                      ? "bg-gold-500/10 text-gold-400"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 mt-3">
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  WhatsApp Us
                </a>

                {session ? (
                  <>
                    <Link
                      href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-colors"
                    >
                      {session.user?.role === "ADMIN"
                        ? <Shield className="w-4 h-4 text-gold-400" />
                        : <LayoutDashboard className="w-4 h-4 text-gold-400" />}
                      {session.user?.role === "ADMIN" ? "Admin Panel" : "My Dashboard"}
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/8 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white border border-white/15 hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4 text-gold-400" />
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-navy-950 transition-colors"
                      style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
                    >
                      Create Account
                    </Link>
                  </>
                )}

                <a
                  href="#rfq"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#rfq"); }}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-navy-950 text-center"
                  style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
                >
                  Request a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
