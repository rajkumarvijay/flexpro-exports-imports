import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import RazorpayPaymentButton from "@/components/customer/RazorpayPaymentButton";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUOTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default async function RFQDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  const { id } = await params;
  const rfq = await prisma.rFQ.findUnique({ where: { id }, include: { payment: true } });
  if (!rfq) notFound();
  if (rfq.userId !== session.user.id) notFound();

  const details = [
    { label: "Product Required", value: rfq.productRequired },
    { label: "Quantity", value: rfq.quantity },
    { label: "Company", value: rfq.companyName },
    { label: "Country", value: rfq.country },
    { label: "WhatsApp", value: rfq.whatsapp || "—" },
    { label: "Submitted", value: new Date(rfq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/dashboard/rfqs" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to RFQs
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-bold font-display">{rfq.productRequired}</h1>
          <p className="text-slate-400 text-sm mt-1">RFQ #{rfq.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[rfq.status]}`}>
          {rfq.status}
        </span>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-white/8 p-6 mb-5"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="grid grid-cols-2 gap-4">
          {details.map(({ label, value }) => (
            <div key={label}>
              <div className="text-slate-500 text-xs mb-0.5">{label}</div>
              <div className="text-white text-sm">{value}</div>
            </div>
          ))}
        </div>
        {rfq.message && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="text-slate-500 text-xs mb-1">Your Message</div>
            <p className="text-slate-300 text-sm">{rfq.message}</p>
          </div>
        )}
      </div>

      {/* Quote section */}
      {rfq.status === "QUOTED" && rfq.quotedAmount && (
        <div className="rounded-2xl border border-purple-500/20 p-6 mb-5"
          style={{ background: "rgba(168,85,247,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Quote Ready</h2>
            <span className="text-purple-400 text-xs border border-purple-500/30 px-2 py-0.5 rounded-full">Awaiting Payment</span>
          </div>
          <div className="text-3xl font-bold text-white font-display mb-1">
            ₹{rfq.quotedAmount.toLocaleString("en-IN")}
          </div>
          <div className="text-slate-400 text-xs mb-4">{rfq.quotedCurrency ?? "INR"} — Quote valid for 30 days</div>
          {rfq.adminNotes && (
            <div className="rounded-xl p-4 mb-4 text-sm text-slate-300 border border-white/8"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="text-slate-500 text-xs mb-1">Note from FlexPro</div>
              {rfq.adminNotes}
            </div>
          )}
          {rfq.payment?.status !== "PAID" ? (
            <RazorpayPaymentButton rfqId={rfq.id} amount={rfq.quotedAmount} />
          ) : (
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              ✓ Payment Received — Our team will be in touch shortly.
            </div>
          )}
        </div>
      )}

      {rfq.payment?.status === "PAID" && (
        <div className="rounded-2xl border border-green-500/20 p-5"
          style={{ background: "rgba(34,197,94,0.06)" }}>
          <div className="text-green-400 font-semibold text-sm mb-1">✓ Payment Confirmed</div>
          <div className="text-slate-400 text-xs">Payment ID: {rfq.payment.razorpayPaymentId}</div>
          <div className="text-slate-400 text-xs mt-0.5">Amount: ₹{rfq.payment.amount.toLocaleString("en-IN")}</div>
        </div>
      )}

      {rfq.status === "PENDING" && (
        <div className="rounded-2xl border border-amber-500/20 p-5"
          style={{ background: "rgba(245,158,11,0.06)" }}>
          <div className="text-amber-400 font-medium text-sm mb-1">Under Review</div>
          <div className="text-slate-400 text-xs">Our team will review your request and send a quote within 24 hours.</div>
        </div>
      )}

      {rfq.status === "REJECTED" && (
        <div className="rounded-2xl border border-red-500/20 p-5"
          style={{ background: "rgba(239,68,68,0.06)" }}>
          <div className="text-red-400 font-medium text-sm mb-1">Quote Declined</div>
          {rfq.adminNotes && <div className="text-slate-400 text-xs">{rfq.adminNotes}</div>}
        </div>
      )}
    </div>
  );
}
