"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Package } from "lucide-react";
import toast from "react-hot-toast";

type Product = { id: string; title: string; category: string; description: string; active: boolean; featured: boolean };

const CATEGORIES = ["Agricultural", "Spices", "Textiles", "Industrial", "Food Products", "Raw Materials"];

const emptyForm = { title: "", category: "Agricultural", description: "", active: true, featured: false };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products?includeInactive=true").then(r => r.json()).then(data => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    setSaving(true);
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/products/${editing}` : "/api/products";
    const res = await fetch(url, {
      method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(editing ? "Product updated" : "Product created");
      setShowForm(false); setEditing(null); setForm(emptyForm); fetchProducts();
    } else {
      toast.error("Save failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Product deleted"); fetchProducts(); }
    else toast.error("Delete failed");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold font-display">Products</h1>
          <p className="text-slate-400 text-sm mt-1">{products.length} products in catalogue</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-navy-950"
          style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-gold-400 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} className="rounded-2xl border border-white/8 p-5 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex items-center gap-1">
                  {p.featured && <span className="px-1.5 py-0.5 rounded text-xs bg-gold-500/10 text-gold-400 border border-gold-500/20">Featured</span>}
                  {!p.active && <span className="px-1.5 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/20">Inactive</span>}
                </div>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{p.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{p.category}</div>
                <div className="text-slate-400 text-xs mt-2 line-clamp-2">{p.description}</div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button onClick={() => { setForm({ title: p.title, category: p.category, description: p.description, active: p.active, featured: p.featured }); setEditing(p.id); setShowForm(true); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gold-400 border border-gold-500/20 hover:bg-gold-500/10 transition-colors">
                  <Pencil className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(p.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setShowForm(false)}>
          <div className="w-full max-w-md rounded-3xl border border-white/10 p-6"
            style={{ background: "#0a1628" }} onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-5">{editing ? "Edit Product" : "New Product"}</h3>
            <div className="space-y-3">
              {["title", "description"].map(field => (
                <div key={field}>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1 capitalize">{field}</label>
                  {field === "description" ? (
                    <textarea value={form[field as keyof typeof form] as string} rows={3}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30 resize-none" />
                  ) : (
                    <input value={form[field as keyof typeof form] as string}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30" />
                  )}
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm outline-none focus:ring-2 focus:ring-gold-500/30">
                  {CATEGORIES.map(c => <option key={c} value={c} style={{ background: "#0a1628" }}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                {(["active", "featured"] as const).map(field => (
                  <label key={field} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[field]}
                      onChange={e => setForm(p => ({ ...p, [field]: e.target.checked }))}
                      className="w-4 h-4 accent-amber-500 rounded" />
                    <span className="text-slate-300 text-sm capitalize">{field}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 border border-white/10 hover:bg-white/5">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-navy-950 disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, #e6b800, #c9a100)" }}>
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
