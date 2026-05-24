import { prisma } from "@/lib/prisma";
import { ClipboardList, Package, MessageSquare, IndianRupee, Clock, CheckCircle, TrendingUp } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUOTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

async function getStats() {
  const [totalRFQs, pendingRFQs, products, unreadMessages, recentRFQs, revenue] = await Promise.all([
    prisma.rFQ.count(),
    prisma.rFQ.count({ where: { status: "PENDING" } }),
    prisma.product.count({ where: { active: true } }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.rFQ.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: { id: true, fullName: true, companyName: true, country: true, productRequired: true, status: true, createdAt: true, quotedAmount: true },
    }),
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
  ]);
  return { totalRFQs, pendingRFQs, products, unreadMessages, recentRFQs, totalRevenue: revenue._sum.amount ?? 0 };
}

export default async function AdminDashboard() {
  const { totalRFQs, pendingRFQs, products, unreadMessages, recentRFQs, totalRevenue } = await getStats();

  const statCards = [
    { label: "Total RFQs", value: totalRFQs, icon: ClipboardList, color: "blue" },
    { label: "Pending Review", value: pendingRFQs, icon: Clock, color: "amber" },
    { label: "Active Products", value: products, icon: Package, color: "green" },
    { label: "Unread Messages", value: unreadMessages, icon: MessageSquare, color: "purple" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold font-display">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here&apos;s your trade activity overview.</p>
      </div>

      {/* Revenue banner */}
      <div className="rounded-2xl p-5 mb-6 flex items-center justify-between border border-gold-500/20"
        style={{ background: "linear-gradient(135deg, rgba(230,184,0,0.08), rgba(230,184,0,0.03))" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs">Total Revenue Collected</div>
            <div className="text-gold-400 text-2xl font-bold font-display">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
        <TrendingUp className="w-8 h-8 text-gold-500/30" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-5 border border-white/8"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Icon className="w-5 h-5 text-slate-400 mb-3" />
            <div className="text-2xl font-bold text-white font-display">{value}</div>
            <div className="text-slate-500 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent RFQs */}
      <div className="rounded-2xl border border-white/8 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Recent RFQs</h2>
          <a href="/admin/rfqs" className="text-gold-400 text-xs hover:text-gold-300 transition-colors">View all →</a>
        </div>
        <div className="divide-y divide-white/5">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(recentRFQs as any[]).map((rfq) => (
            <a key={rfq.id} href={`/admin/rfqs?id=${rfq.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/2 transition-colors group">
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate group-hover:text-gold-300 transition-colors">
                  {rfq.fullName} — {rfq.productRequired}
                </div>
                <div className="text-slate-500 text-xs mt-0.5">{rfq.companyName} · {rfq.country}</div>
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                {rfq.quotedAmount && (
                  <span className="text-gold-400 text-xs font-medium">₹{rfq.quotedAmount.toLocaleString()}</span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[rfq.status]}`}>
                  {rfq.status}
                </span>
              </div>
            </a>
          ))}
          {recentRFQs.length === 0 && (
            <div className="px-6 py-8 text-center text-slate-500 text-sm">No RFQs yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
