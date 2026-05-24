import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, CheckCircle, Clock, ArrowRight } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUOTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rfqs: any[] = [];
  let paid = 0;
  try {
    [rfqs, paid] = await Promise.all([
      prisma.rFQ.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { payment: true },
      }),
      prisma.payment.count({ where: { rfq: { userId }, status: "PAID" } }),
    ]);
  } catch {
    // DB not ready yet — show empty dashboard
  }

  const pending = rfqs.filter((r) => r.status === "PENDING").length;
  const quoted = rfqs.filter((r) => r.status === "QUOTED").length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold font-display">Welcome, {session!.user.name?.split(" ")[0]}</h1>
        <p className="text-slate-400 text-sm mt-1">Track your RFQs and payments from your FlexPro dashboard.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total RFQs", value: rfqs.length, icon: ClipboardList },
          { label: "Pending", value: pending, icon: Clock },
          { label: "Payments Made", value: paid, icon: CheckCircle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl p-5 border border-white/8"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Icon className="w-5 h-5 text-slate-500 mb-3" />
            <div className="text-2xl font-bold text-white font-display">{value}</div>
            <div className="text-slate-500 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {quoted > 0 && (
        <div className="rounded-2xl p-5 mb-6 border border-purple-500/20"
          style={{ background: "rgba(168,85,247,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">You have {quoted} quoted RFQ{quoted > 1 ? "s" : ""} ready for payment</div>
              <div className="text-slate-400 text-xs mt-0.5">Review the quotes and proceed with payment</div>
            </div>
            <Link href="/dashboard/rfqs" className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-navy-950 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
              View Quotes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/8 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Recent RFQs</h2>
          <Link href="/dashboard/rfqs" className="text-gold-400 text-xs hover:text-gold-300">View all →</Link>
        </div>
        <div className="divide-y divide-white/5">
          {rfqs.map((rfq) => (
            <Link key={rfq.id} href={`/dashboard/rfqs/${rfq.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-white/2 transition-colors group">
              <div>
                <div className="text-white text-sm font-medium group-hover:text-gold-300 transition-colors">{rfq.productRequired}</div>
                <div className="text-slate-500 text-xs mt-0.5">{rfq.quantity} · {new Date(rfq.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex items-center gap-3">
                {rfq.quotedAmount && (
                  <span className="text-gold-400 text-xs">₹{rfq.quotedAmount.toLocaleString()}</span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[rfq.status]}`}>{rfq.status}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
            </Link>
          ))}
          {rfqs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-500 text-sm mb-4">No RFQs yet. Submit your first quote request.</p>
              <Link href="/#rfq" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-950"
                style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
                Request a Quote
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
