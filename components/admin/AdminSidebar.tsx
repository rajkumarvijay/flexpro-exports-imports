"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Globe, LayoutDashboard, Package, FileText, MessageSquare, ClipboardList, LogOut, ExternalLink } from "lucide-react";

interface Props {
  user: { name?: string | null; email?: string | null };
}

export default function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);

  // Poll for pending RFQ count every 30s so badge stays live
  useEffect(() => {
    const load = () =>
      fetch("/api/admin/stats")
        .then((r) => r.json())
        .then((d) => setPendingCount(d.pendingRFQs ?? 0))
        .catch(() => {});
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, []);

  const navItems = [
    { label: "Dashboard",  href: "/admin",          icon: LayoutDashboard, badge: 0 },
    { label: "RFQs",       href: "/admin/rfqs",      icon: ClipboardList,   badge: pendingCount },
    { label: "Products",   href: "/admin/products",  icon: Package,         badge: 0 },
    { label: "Blog",       href: "/admin/blog",       icon: FileText,        badge: 0 },
    { label: "Messages",   href: "/admin/messages",   icon: MessageSquare,   badge: 0 },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/5 flex flex-col"
      style={{ background: "rgba(255,255,255,0.02)" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
            <Globe className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-white font-bold text-sm font-display">FlexPro Admin</div>
            <div className="text-gold-400 text-xs">Management Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-gold-400 border border-gold-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              style={isActive ? { background: "rgba(230,184,0,0.08)" } : {}}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{label}</span>
              {badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 min-w-[20px] text-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/5 pt-4 space-y-2">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="text-white text-xs font-medium truncate">{user.name}</div>
          <div className="text-slate-500 text-xs truncate">{user.email}</div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
