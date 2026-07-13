import type { Article, Achievement } from "../../types";
import { ARTICLE_TYPE_META, ACHIEVE_TYPE_META } from "../../data/constants";
import { BookOpen, Trophy, ArrowUpRight } from "lucide-react";

function Carousel({
  children,
  speed = 40,
}: {
  children: React.ReactNode[];
  speed?: number;
}) {
  const duplicated = [...children, ...children];
  const duration = `${speed}s`;
  return (
    <div className="overflow-hidden relative">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track { animation: marquee-scroll ${duration} linear infinite; }
        .carousel-track:hover { animation-play-state: paused; }
      `}</style>
      <div
        className="carousel-track flex gap-5"
        style={{ width: "max-content" }}
      >
        {duplicated.map((child, i) => (
          <div key={i} style={{ width: "300px", flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}

function ArticleCard({ item }: { item: Article }) {
  const meta = ARTICLE_TYPE_META[item.type];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative h-44 bg-secondary overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen size={28} className="text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest border px-2 py-1 bg-card/80 backdrop-blur-sm ${meta.cls}`}
        >
          {meta.icon} {meta.label.toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          {item.date} · {item.publication}
        </p>
        <h4 className="font-sans font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {item.summary}
        </p>
        <span className="inline-flex items-center gap-1 text-xs text-primary/60 group-hover:text-primary transition-colors mt-1 font-mono">
          Read more <ArrowUpRight size={11} />
        </span>
      </div>
    </a>
  );
}

function AchievementCard({ item }: { item: Achievement }) {
  const meta = ACHIEVE_TYPE_META[item.type];
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden h-full"
      style={{ borderRadius: "2px" }}
    >
      <div className="relative h-44 bg-secondary overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-60 group-hover:brightness-75"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Trophy size={28} className="text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest border px-2 py-1 bg-card/80 backdrop-blur-sm ${meta.cls}`}
        >
          {meta.icon} {meta.label.toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">
          {item.date} · {item.issuer}
        </p>
        <h4 className="font-sans font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>
        <span className="inline-flex items-center gap-1 text-xs text-primary/60 group-hover:text-primary transition-colors mt-1 font-mono">
          View credential <ArrowUpRight size={11} />
        </span>
      </div>
    </a>
  );
}

export { Carousel, ArticleCard, AchievementCard };