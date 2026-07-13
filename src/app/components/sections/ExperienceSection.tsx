import { useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import type { WorkExperience, Education } from "../../types";
import { SectionLabel } from "../shared/SectionLabel";
import { TimelineCard } from "../shared/TimelineCard";

export function ExperienceSection({
  experience,
  education,
}: {
  experience: WorkExperience[];
  education: Education[];
}) {
  const [tab, setTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Background</SectionLabel>
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2
            className="text-4xl lg:text-5xl font-serif text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Education &amp; Experience
          </h2>
          <div
            className="flex border border-border"
            style={{ borderRadius: "2px" }}
          >
            {(["experience", "education"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-sans font-medium transition-colors duration-200 ${
                  tab === t
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "experience" ? (
                  <Briefcase size={14} />
                ) : (
                  <GraduationCap size={14} />
                )}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12 pl-8">
            {tab === "experience"
              ? experience.map((item) => (
                  <TimelineCard key={item.id}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-sans font-semibold text-foreground">
                          {item.role}
                        </h3>
                        <p className="text-primary font-mono text-sm tracking-wide">
                          {item.company}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest bg-muted px-3 py-1 shrink-0">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-primary/70 border border-primary/20 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </TimelineCard>
                ))
              : education.map((item) => (
                  <TimelineCard key={item.id}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-sans font-semibold text-foreground">
                          {item.degree}
                        </h3>
                        <p className="text-primary font-mono text-sm tracking-wide">
                          {item.institution}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest bg-muted px-3 py-1 shrink-0">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </TimelineCard>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}