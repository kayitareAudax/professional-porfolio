import { ChevronDown, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase mb-6">
            AI Engineer & Data Scientist
          </p>
          <h1
            className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hello, I'm <span className="text-primary italic">Audax Kayitare.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-light max-w-lg">
            I build the infrastructure that makes modern software fast,
            reliable, and beautiful — from distributed systems at scale to
            delightful developer tools.
          </p>
          <p className="text-sm font-mono text-muted-foreground/60 mb-10 italic">
            "Systems that think. Code that lasts."
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:bg-primary/80 transition-colors"
              style={{ borderRadius: "2px" }}
            >
              View Projects <ExternalLink size={14} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium tracking-wide hover:border-primary/50 hover:text-primary transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-indigo-500/20 blur-sm" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-secondary overflow-hidden">
              <img
                src="https://plain-apac-prod-public.komododecks.com/202607/13/QD3cdhUTTede4GfRsu0N/image.jpg?w=500&h=500&fit=crop&auto=format"
                alt="Kayitare Audax – Software Engineer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-primary" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-primary" />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors animate-bounce"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}