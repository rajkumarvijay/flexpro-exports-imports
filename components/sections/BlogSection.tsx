"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { BLOG_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

const categoryColors: Record<string, string> = {
  "Trade Strategy": "bg-blue-100 text-blue-700",
  "Compliance": "bg-purple-100 text-purple-700",
  "Logistics": "bg-amber-100 text-amber-700",
};

const postGradients = [
  "from-navy-900 to-navy-700",
  "from-slate-800 to-navy-800",
  "from-navy-800 to-slate-700",
  "from-slate-900 to-navy-900",
];

export default function BlogSection({ posts: propPosts }: { posts?: BlogPost[] }) {
  const posts = propPosts && propPosts.length > 0 ? propPosts : BLOG_POSTS;
  return (
    <section id="blog" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Insights & Resources"
          title="Trade "
          highlight="Knowledge Hub"
          subtitle="Expert insights on international trade, compliance, and logistics to help your business grow globally."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map(({ id, title, excerpt, date, category, readTime, slug }, i) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white card-hover shadow-sm flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${postGradients[i % postGradients.length]} relative overflow-hidden flex-shrink-0`}>
                <div className="absolute inset-0 grid-texture opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Tag className="w-6 h-6 text-gold-300" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[category] || "bg-slate-100 text-slate-700"}`}>
                    {category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime}
                  </span>
                </div>

                <h3 className="text-navy-900 font-semibold text-sm leading-snug mb-2 group-hover:text-navy-700 transition-colors line-clamp-2 flex-1">
                  {title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{excerpt}</p>

                <a
                  href={`/blog/${slug}`}
                  className="flex items-center gap-1.5 text-gold-600 text-xs font-semibold mt-auto group/link hover:text-gold-700 transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-navy-900 border-2 border-navy-200 hover:border-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-200"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
