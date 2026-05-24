import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Globe, LayoutDashboard, ClipboardList, LogOut, ExternalLink } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login?callbackUrl=/dashboard");

  return (
    <div className="flex min-h-screen" style={{ background: "#060d1a" }}>
      <aside className="w-60 flex-shrink-0 border-r border-white/5 flex flex-col"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="px-5 py-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center">
              <Globe className="w-5 h-5 text-navy-950" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-bold text-sm font-display">FlexPro</div>
              <div className="text-gold-400 text-xs">My Account</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
            { label: "My RFQs", href: "/dashboard/rfqs", icon: ClipboardList },
          ].map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pb-4 border-t border-white/5 pt-4 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <ExternalLink className="w-4 h-4" /> Back to Website
          </Link>
          <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="text-white text-xs font-medium truncate">{session.user.name}</div>
            <div className="text-slate-500 text-xs truncate">{session.user.email}</div>
          </div>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
