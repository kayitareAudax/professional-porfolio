import { SectionLabel } from "../shared/SectionLabel";

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div>
            <SectionLabel>About Me</SectionLabel>
            <h2
              className="text-4xl lg:text-5xl font-serif text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Building systems that{" "}
              <span className="italic text-primary">scale.</span>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base text-muted-foreground leading-relaxed">
              I'm a software engineer with 3+ years of experience designing and
              building high-throughput distributed systems. I care deeply about
              correctness, performance, and the craft of software — writing code
              that my future self (and teammates) will still in more years to come.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              My work spans from creating AI and ML systems such as agents and chatbots at the HKU's Innovation Academy as an AI research assistant.
              On top of that, I serve as a Chief Technological officer at Atlas Travel matrix where we created a hotels and flight booking system.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              When I'm not in my editor, I contribute to open-source, crack some leetcode questions, and engage in AI research.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "2+", label: "Open Source Projects" },
                { value: "3", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-serif font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}