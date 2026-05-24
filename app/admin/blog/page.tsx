"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, Search, Calendar, Clock, Tag, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  published: boolean;
  date: string;
}

const emptyForm = { title: "", slug: "", excerpt: "", category: "", readTime: "5 min read", published: true, date: "" };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?all=true");
      const data = await res.json();
      setPosts(data);
    } catch {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      published: post.published,
      date: post.date.split("T")[0],
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.excerpt) {
      toast.error("Title, slug and excerpt are required");
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/blog/${editing.slug}` : "/api/blog";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success(editing ? "Post updated" : "Post created");
      setShowModal(false);
      fetchPosts();
    } catch {
      toast.error("Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Post deleted");
      fetchPosts();
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold font-display">Blog Posts</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} articles</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-navy-950 hover:scale-105 transition-transform shadow-md"
          style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/40 transition-all"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="flex items-start justify-between rounded-2xl border border-white/8 p-5 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold text-sm truncate">{post.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${post.published ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-slate-500 text-xs line-clamp-1 mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-slate-600 text-xs">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(post)}
                  className="w-8 h-8 rounded-lg border border-white/8 hover:border-blue-500/40 bg-blue-500/5 hover:bg-blue-500/10 flex items-center justify-center text-blue-400 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  disabled={deleting === post.slug}
                  className="w-8 h-8 rounded-lg border border-white/8 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 flex items-center justify-center text-red-400 transition-all disabled:opacity-50"
                >
                  {deleting === post.slug ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600">No posts found.</div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            style={{ background: "#0d1c36" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <h2 className="text-white font-semibold">{editing ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {[
                { label: "Title", key: "title", type: "text", placeholder: "Post title" },
                { label: "Slug", key: "slug", type: "text", placeholder: "post-url-slug" },
                { label: "Category", key: "category", type: "text", placeholder: "Trade Strategy" },
                { label: "Read Time", key: "readTime", type: "text", placeholder: "5 min read" },
                { label: "Date", key: "date", type: "date", placeholder: "" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
                  <input
                    type={type}
                    value={form[key as keyof typeof form] as string}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Short description for the post..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-600 text-sm outline-none focus:ring-2 focus:ring-gold-500/30 transition-all resize-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 rounded accent-gold-500"
                />
                <span className="text-slate-300 text-sm">Published</span>
              </label>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-white/8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-navy-950 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
                style={{ background: "linear-gradient(135deg, #e6b800 0%, #c9a100 100%)" }}
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : (editing ? "Update Post" : "Create Post")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
