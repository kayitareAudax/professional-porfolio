import { useState } from "react";
import { BookOpen, Trophy } from "lucide-react";
import type { Article, Achievement } from "../../types";
import { SectionLabel } from "../shared/SectionLabel";
import { Carousel, ArticleCard, AchievementCard } from "../shared/Carousel";

export function RecognitionsSection({
  articles,
  achievements,
}: {
  articles: Article[];
  achievements: Achievement[];
}) {
  const [tab, setTab] = useState<"papers" | "awards">("papers");

  return (
    <section id="recognitions" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <SectionLabel>Recognitions</SectionLabel>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2
            className="text-4xl lg:text-5xl font-serif text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Papers &amp; <span className="italic text-primary">Awards</span>
          </h2>
          <div
            className="flex border border-border"
            style={{ borderRadius: "2px" }}
          >
            {(
              [
                {
                  id: "papers",
                  label: "Papers Published",
                  icon: <BookOpen size={14} />,
                },
                {
                  id: "awards",
                  label: "Awards & Certificates",
                  icon: <Trophy size={14} />,
                },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-sans font-medium transition-colors duration-200 ${
                  tab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === "papers" &&
        (articles.length > 0 ? (
          <Carousel speed={articles.length > 3 ? 35 : 25}>
            {articles.map((a) => (
              <ArticleCard key={a.id} item={a} />
            ))}
          </Carousel>
        ) : (
          <p className="text-center py-12 font-mono text-sm text-muted-foreground">
            No articles yet. Add some in the Admin panel.
          </p>
        ))}

      {tab === "awards" &&
        (achievements.length > 0 ? (
          <Carousel speed={achievements.length > 3 ? 35 : 25}>
            {achievements.map((a) => (
              <AchievementCard key={a.id} item={a} />
            ))}
          </Carousel>
        ) : (
          <p className="text-center py-12 font-mono text-sm text-muted-foreground">
            No awards yet. Add some in the Admin panel.
          </p>
        ))}
    </section>
  );
}