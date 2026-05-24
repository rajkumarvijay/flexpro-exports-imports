import { prisma } from "@/lib/prisma";
import { Mail, CheckCircle2 } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <h1 className="text-white text-2xl font-bold font-display mb-2">Contact Messages</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
  <p className="text-slate-400 text-sm mb-6">{(messages as any[]).filter((m) => m.status === "UNREAD").length} unread</p>

      <div className="space-y-3">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {(messages as any[]).map((msg) => (
          <div key={msg.id} className="rounded-2xl border border-white/8 p-5"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy-400/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{msg.name}</div>
                  <div className="text-slate-500 text-xs">{msg.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {msg.status === "UNREAD" && (
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                )}
                {msg.status === "REPLIED" && (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                )}
                <span className="text-slate-500 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{msg.message}</p>
            <div className="mt-3 flex gap-2">
              <a href={`mailto:${msg.email}?subject=Re: Your inquiry to FlexPro`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-gold-400 border border-gold-500/20 hover:bg-gold-500/10 transition-colors">
                Reply via Email
              </a>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-sm">No messages yet</div>
        )}
      </div>
    </div>
  );
}
