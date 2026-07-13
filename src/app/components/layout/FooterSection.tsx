import { useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { inputCls, NAV_LINKS } from "../../data/constants";

export function FooterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl font-serif text-foreground mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Let's build something{" "}
              <span className="italic text-primary">together.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              I'm currently open to senior engineering roles and interesting
              consulting engagements. If you have a hard problem to solve, let's
              talk.
            </p>
            <div className="flex items-center gap-6">
              {[
                {
                  icon: <Mail size={18} />,
                  href: "mailto:alex.rivera@email.com",
                  label: "Email",
                },
                { icon: <Github size={18} />, href: "#", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Jane Smith"
                  className={inputCls}
                  style={{ borderRadius: "2px" }}
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="jane@company.com"
                  className={inputCls}
                  style={{ borderRadius: "2px" }}
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className={`${inputCls} resize-none`}
                style={{ borderRadius: "2px" }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wide hover:bg-primary/80 transition-colors flex items-center justify-center gap-2"
              style={{ borderRadius: "2px" }}
            >
              {sent ? (
                "Message Sent!"
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground tracking-widest">
            AR.
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Alex Rivera — Built with React
          </span>
          <div className="flex items-center gap-6">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}