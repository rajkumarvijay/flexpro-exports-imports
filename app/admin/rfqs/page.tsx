"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Search, ChevronDown, Loader2, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";

type RFQ = {
  id: string; fullName: string; companyName: string; country: string;
  productRequired: string; quantity: string; email: string; whatsapp?: string;
  message?: string; status: string; quotedAmount?: number; quotedCurrency?: string;
  adminNotes?: string; createdAt: string;
};

const STATUS_OPTIONS = ["PENDING", "REVIEWING", "QUOTED", "ACCEPTED", "REJECTED", "COMPLETED"];

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  REVIEWING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  QUOTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function AdminRFQsPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RFQ | null>(null);
  const [updating, setUpdating] = useState(false);
  const [formState, setFormState] = useState({ status: "", quotedAmount: "", adminNotes: "" });

  useEffect(() => {
    fetch("/api/rfq").then(r => r.json()).then(data => { setRfqs(data); setLoading(false); });
  }, []);

  const filtered = rfqs.filter(r =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.companyName.toLowerCase().includes(search.toLowerCase()) ||
    r.productRequired.toLowerCase().includes(search.toLowerCase())
  );

  const openRFQ = (rfq: RFQ) => {
    setSelected(rfq);
    setFormState({ status: rfq.status, quotedAmount: rfq.quotedAmount?.toString() ?? "", adminNotes: rfq.adminNotes ?? "" });
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setUpdating(true);
    const res = await fetch(`/api/rfq/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: formState.status,
        quotedAmount: formState.quotedAmount ? parseFloat(formState.quotedAmount) : null,
        adminNotes: formState.adminNotes,
      }),
    });
    setUpdating(false);
    if (res.ok) {
      toast.success("RFQ updated successfully");
      setRfqs(prev => prev.map(r => r.id === selected.id ? { ...r, ...formState, quotedAmount: parseFloat(formState.quotedAmount) } : r));
      setSelected(null);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold font-display">RFQ Management</h1>
          <p className="text-slate-400 text-sm mt-1">{rfqs.length} total quote requests</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, or product..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.04)" }}>
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 text-gold-400 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {["Client", "Product", "Country", "Qty", "Status", "Quote", "Date", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{rfq.fullName}</div>
                      <div className="text-slate-500 text-xs">{rfq.companyName}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{rfq.productRequired}</td>
                    <td className="px-4 py-3 text-slate-400">{rfq.country}</td>
                    <td className="px-4 py-3 text-slate-400">{rfq.quantity}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[rfq.status]}`}>{rfq.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gold-400 text-xs">
                      {rfq.quotedAmount ? `₹${rfq.quotedAmount.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => openRFQ(rfq)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gold-400 border border-gold-500/20 hover:bg-gold-500/10 transition-colors">
                        <ChevronDown className="w-3 h-3" /> Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">No RFQs found</div>
            )}
          </div>
        )}
      </div>

      {/* RFQ Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-3xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto"
            style={{ background: "#0a1628" }} onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-1 font-display">{selected.fullName}</h3>
            <p className="text-slate-400 text-sm mb-5">{selected.companyName} · {selected.country} · {selected.email}</p>

            <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
              {[
                { label: "Product", value: selected.productRequired },
                { label: "Quantity", value: selected.quantity },
                { label: "WhatsApp", value: selected.whatsapp || "—" },
                { label: "Message", value: selected.message || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="col-span-1">
                  <div className="text-slate-500 text-xs mb-0.5">{label}</div>
                  <div className="text-white text-sm">{value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Status</label>
                <select value={formState.status} onChange={e => setFormState(p => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: "#0a1628" }}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">
                  <IndianRupee className="w-3 h-3 inline mr-1" />Quoted Amount (INR)
                </label>
                <input type="number" value={formState.quotedAmount}
                  onChange={e => setFormState(p => ({ ...p, quotedAmount: e.target.value }))}
                  placeholder="e.g. 45000"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Admin Notes</label>
                <textarea value={formState.adminNotes} rows={3}
                  onChange={e => setFormState(p => ({ ...p, adminNotes: e.target.value }))}
                  placeholder="Internal notes visible to customer in dashboard..."
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-400 border border-white/10 hover:bg-white/5">
                Cancel
              </button>
              <button onClick={handleUpdate} disabled={updating}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-navy-950 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
                {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
