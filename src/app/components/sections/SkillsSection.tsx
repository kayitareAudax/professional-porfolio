import { Code2 } from "lucide-react";
import type { SkillGroup } from "../../types";
import { SectionLabel } from "../shared/SectionLabel";

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl font-serif text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Skills &amp; <span className="italic text-primary">Tools</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A curated overview of the technologies, frameworks, and practices
              I work with across the full stack.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div
                key={group.category}
                className="border border-border p-5 hover:border-primary/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={14} className="text-primary" />
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    {group.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-foreground/80 bg-secondary px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                      style={{ borderRadius: "2px" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}