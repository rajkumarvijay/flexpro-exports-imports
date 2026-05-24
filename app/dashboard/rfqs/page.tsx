import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FileText, Clock } from "lucide-react";

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUOTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default async function CustomerRFQsPage() {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const rfqs = await prisma.rFQ.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { payment: true },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold font-display">My RFQs</h1>
          <p className="text-slate-400 text-sm mt-1">{rfqs.length} quote request{rfqs.length !== 1 ? "s" : ""} submitted</p>
        </div>
        <Link
          href="/#rfq"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-950 hover:scale-105 transition-transform shadow-md"
          style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
        >
          New RFQ
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {rfqs.length === 0 ? (
        <div className="rounded-2xl border border-white/8 p-16 text-center"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No RFQs yet</h3>
          <p className="text-slate-400 text-sm mb-6">Submit your first quote request and our team will respond within 24 hours.</p>
          <Link
            href="/#rfq"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-navy-950"
            style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
          >
            Request a Quote
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(rfqs as any[]).map((rfq) => (
            <Link
              key={rfq.id}
              href={`/dashboard/rfqs/${rfq.id}`}
              className="group flex items-center justify-between rounded-2xl border border-white/8 hover:border-white/15 p-5 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(230,184,0,0.1)" }}>
                  <FileText className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm group-hover:text-gold-300 transition-colors">
                    {rfq.productRequired}
                  </div>
                  <div className="text-slate-500 text-xs mt-0.5">
                    Qty: {rfq.quantity} · {rfq.companyName} · {rfq.country}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs mt-1.5">
                    <Clock className="w-3 h-3" />
                    {new Date(rfq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {rfq.status === "QUOTED" && rfq.payment?.status !== "PAID" && (
                  <span className="text-xs text-purple-400 font-medium">Quote ready</span>
                )}
                {rfq.quotedAmount && (
                  <span className="text-white font-semibold text-sm">
                    ₹{rfq.quotedAmount.toLocaleString("en-IN")}
                  </span>
                )}
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[rfq.status]}`}>
                  {rfq.status}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
