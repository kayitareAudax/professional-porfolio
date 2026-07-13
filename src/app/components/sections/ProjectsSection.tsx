import { Github, ExternalLink, FolderOpen } from "lucide-react";
import type { Project } from "../../types";
import { SectionLabel } from "../shared/SectionLabel";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Work</SectionLabel>
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2
            className="text-4xl lg:text-5xl font-serif text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Selected <span className="italic text-primary">Projects</span>
          </h2>
          <a
            href="#"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase flex items-center gap-1"
          >
            All on GitHub <ExternalLink size={10} />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="overflow-hidden h-40 bg-secondary relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen
                      size={32}
                      className="text-muted-foreground/30"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-sans font-semibold text-base text-foreground mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-primary/60 border border-primary/15 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  {p.github && (
                    <a
                      href={p.github}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={13} /> Source
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}