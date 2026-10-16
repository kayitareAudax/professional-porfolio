import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";
import type { ChatMsg } from "../../types";
import { getBotResponse } from "../../data/chat";
import { inputCls } from "../../data/constants";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "bot",
      text: "Hey! I'm Audax's portfolio bot. Ask me about skills, projects, experience, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", text: t }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((p) => [...p, { role: "bot", text: getBotResponse(t) }]);
    }, 900);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:bg-primary/80 transition-all hover:scale-110"
        style={{ borderRadius: "50%" }}
        title="Chat with Audax's bot"
      >
        {open ? <X size={20} /> : <Bot size={22} />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
          style={{ borderRadius: "4px", maxHeight: "min(480px, 70vh)" }}
        >
          <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-sans font-medium text-sm text-foreground">
                Ask Audax
              </p>
              <p className="font-mono text-[10px] text-primary tracking-widest">
                ONLINE
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}
                  style={{ borderRadius: "2px" }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="bg-secondary px-3 py-2 flex items-center gap-1"
                  style={{ borderRadius: "2px" }}
                >
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className={`${inputCls} flex-1`}
              style={{ borderRadius: "2px" }}
            />
            <button
              onClick={send}
              className="w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors shrink-0"
              style={{ borderRadius: "2px" }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}