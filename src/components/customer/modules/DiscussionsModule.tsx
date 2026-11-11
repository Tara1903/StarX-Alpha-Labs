"use client";

import React, { useState } from "react";
import { ProjectDiscussionMessage } from "@/types/customerPortal";
import { 
  MessageSquare, 
  Send, 
  User, 
  Sparkles, 
  Paperclip, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";

interface DiscussionsModuleProps {
  messages: ProjectDiscussionMessage[];
  onSendMessage: (text: string) => void;
}

export function DiscussionsModule({
  messages,
  onSendMessage,
}: DiscussionsModuleProps) {
  const [inputText, setInputText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Project Engineering Discussions</h2>
          <p className="text-xs text-slate-400">Direct technical channel with StarX Alpha Labs lead architects &amp; developers</p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
          <ShieldCheck className="w-3 h-3" />
          <span>Encrypted Thread</span>
        </span>
      </div>

      {/* Messages Stream */}
      <div className="p-6 rounded-3xl bg-[#071638] border border-white/10 space-y-4 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400 font-mono space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-500 mx-auto" />
              <p>No messages in this project thread yet. Start the conversation with your engineering lead below.</p>
            </div>
          ) : (
            messages.map((m) => {
              const isAdmin = m.senderType === "admin";

              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isAdmin ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isAdmin
                        ? "bg-gradient-to-tr from-[#087BFF] to-[#00D9FF] text-[#030B24]"
                        : "bg-purple-600 text-white"
                    }`}
                  >
                    {isAdmin ? "SX" : m.senderName[0] || "C"}
                  </div>

                  <div className={`space-y-1 max-w-lg ${isAdmin ? "text-left" : "text-right"}`}>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                      <span className="font-bold text-white">{m.senderName}</span>
                      {isAdmin && (
                        <span className="px-1.5 py-0.2 rounded bg-[#087BFF]/20 text-[#00D9FF] text-[8px] uppercase">
                          StarX Team
                        </span>
                      )}
                      <span>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isAdmin
                          ? "bg-[#08183A] text-slate-200 border border-white/5"
                          : "bg-gradient-to-r from-[#087BFF] to-[#00D9FF] text-white font-medium"
                      }`}
                    >
                      {m.message}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Composer */}
        <form onSubmit={handleSend} className="pt-4 border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            required
            placeholder="Type your message, question, or feedback for the engineering team..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-[#08183A] border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00D9FF] transition-colors"
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#087BFF] to-[#00D9FF] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
