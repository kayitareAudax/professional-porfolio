import { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  X,
  Send,
  Bot,
  GraduationCap,
  Briefcase,
  Code2,
  Menu,
  Sun,
  Moon,
  Lock,
  Plus,
  Trash2,
  Settings,
  LogOut,
  FolderOpen,
  UserCheck,
  ChevronRight,
  Trophy,
  BadgeCheck,
  Star,
  Award,
  Newspaper,
  BookOpen,
  Mic,
  ArrowUpRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillGroup {
  category: string;
  items: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
}

interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "certificate" | "award" | "recognition";
  description: string;
  url: string;
  image: string;
}

interface Article {
  id: string;
  title: string;
  publication: string;
  date: string;
  type: "publication" | "news" | "blog" | "talk";
  summary: string;
  url: string;
  image: string;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_SKILLS: SkillGroup[] = [
  { category: "Languages", items: ["Go", "TypeScript", "Rust", "Python", "Java", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "WebGL", "Figma"] },
  { category: "Backend", items: ["Node.js", "gRPC", "REST", "GraphQL", "WebSockets"] },
  { category: "Infrastructure", items: ["Kubernetes", "Docker", "AWS", "Terraform", "Kafka"] },
  { category: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "ClickHouse"] },
  { category: "Practices", items: ["TDD", "CI/CD", "System Design", "Code Review", "Agile"] },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lumen — Real-time Analytics Engine",
    description: "Open-source stream processing engine capable of ingesting 10M+ events/sec. Built with Rust and a custom columnar storage format. Powers dashboards for 200+ companies.",
    tags: ["Rust", "ClickHouse", "Kafka", "WebSockets"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p2",
    title: "Meridian — Distributed Task Scheduler",
    description: "A fault-tolerant distributed cron system with sub-second precision and a visual DAG editor. Handles 50K+ scheduled jobs across 12 regions with automatic failover.",
    tags: ["Go", "etcd", "React", "gRPC"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p3",
    title: "Forge — AI-powered Code Review",
    description: "VS Code extension integrating LLM-based code review directly into the dev workflow. Provides contextual suggestions, complexity analysis, and security scanning on save.",
    tags: ["TypeScript", "Python", "OpenAI API", "AST"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p4",
    title: "Nomad — Self-hosted VPN Mesh",
    description: "Zero-config WireGuard mesh network manager with a web UI, certificate authority, and automatic peer discovery. Deployed in 80+ homelab setups and small teams.",
    tags: ["Go", "WireGuard", "SQLite", "HTMX"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p5",
    title: "Cartographer — OSM Map Renderer",
    description: "High-performance vector tile renderer for OpenStreetMap data. Custom WebGL shaders, offline-first with service workers, renders 1M+ features at 60fps.",
    tags: ["WebGL", "TypeScript", "Rust/WASM", "OSM"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p6",
    title: "Prism — Design Token Pipeline",
    description: "CLI tool that syncs Figma design tokens to code. Generates typed TS constants, CSS custom properties, and Tailwind configs in one command. 3K+ GitHub stars.",
    tags: ["TypeScript", "Figma API", "Node.js", "CLI"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=360&fit=crop&auto=format",
  },
];

const DEFAULT_EXPERIENCE: WorkExperience[] = [
  {
    id: "e1",
    role: "Senior Software Engineer",
    company: "Stripe",
    period: "2023 – Present",
    description: "Lead backend engineer on the Payments Infrastructure team. Architected a distributed event-processing pipeline handling 2M+ transactions per second. Reduced API P99 latency by 38% through cache-layer redesign.",
    tags: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "e2",
    role: "Software Engineer II",
    company: "Figma",
    period: "2021 – 2023",
    description: "Contributed to the real-time collaboration engine powering live multiplayer editing. Built operational transformation algorithms and conflict resolution logic used by millions of designers daily.",
    tags: ["TypeScript", "Rust", "WebSockets", "Redis"],
  },
  {
    id: "e3",
    role: "Junior Software Engineer",
    company: "HubSpot",
    period: "2020 – 2021",
    description: "Developed RESTful APIs and internal tooling for the CRM platform. Shipped features end-to-end within cross-functional squads.",
    tags: ["Java", "Spring Boot", "MySQL", "React"],
  },
];

const DEFAULT_EDUCATION: Education[] = [
  {
    id: "ed1",
    degree: "B.Sc. Computer Science",
    institution: "Massachusetts Institute of Technology",
    period: "2016 – 2020",
    description: "Graduated with honors. Specialization in Distributed Systems and Machine Learning. Dean's List all four years. Thesis: Adaptive Load Balancing in Microservice Architectures.",
  },
  {
    id: "ed2",
    degree: "A.S. Mathematics",
    institution: "Boston Community College",
    period: "2014 – 2016",
    description: "Completed core mathematics and science coursework with a 4.0 GPA before transferring to MIT.",
  },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "Mar 2024",
    type: "certificate",
    description: "Validated expertise in designing distributed systems and selecting appropriate AWS services to build secure, reliable, and cost-optimized architectures at scale.",
    url: "#",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a2",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Sep 2023",
    type: "certificate",
    description: "Demonstrated proficiency in Kubernetes cluster administration, including installation, configuration, networking, storage, and troubleshooting in production environments.",
    url: "#",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a3",
    title: "Best Open Source Infrastructure Tool — OSS Awards",
    issuer: "Open Source Summit North America",
    date: "Jun 2023",
    type: "award",
    description: "Lumen was recognized as the best new open-source infrastructure project of 2023, competing against 340+ nominations across the distributed systems category.",
    url: "#",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a4",
    title: "Google Hash Code — Global Top 2%",
    issuer: "Google",
    date: "Feb 2022",
    type: "recognition",
    description: "Ranked in the global top 2% out of 10,000+ teams in Google's annual competitive programming competition.",
    url: "#",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a5",
    title: "MIT EECS Outstanding Thesis Award",
    issuer: "MIT Department of EECS",
    date: "Jun 2020",
    type: "award",
    description: "Thesis on adaptive load balancing in microservice architectures selected as one of five outstanding B.Sc. theses by the department faculty committee.",
    url: "#",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a6",
    title: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    date: "Jan 2022",
    type: "certificate",
    description: "Certification covering infrastructure-as-code using Terraform — modules, state management, workspaces, and multi-cloud provider configuration.",
    url: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
  },
];

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "ar1",
    title: "How We Reduced Stripe's Payment API Latency by 38%",
    publication: "Stripe Engineering Blog",
    date: "Nov 2024",
    type: "publication",
    summary: "A deep-dive into the cache-layer redesign that eliminated hot-path database reads, including the trade-offs we considered and the rollout strategy we used to de-risk the change in production.",
    url: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar2",
    title: "Building Fault-Tolerant Distributed Systems at Scale",
    publication: "ACM Queue",
    date: "Aug 2024",
    type: "publication",
    summary: "A peer-reviewed paper examining patterns for achieving five-nines reliability in distributed systems — covering consensus protocols, graceful degradation, and chaos engineering methodologies.",
    url: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar3",
    title: "Alex Rivera's Open-Source Lumen Engine Named Tool of the Year",
    publication: "The New Stack",
    date: "Jul 2023",
    type: "news",
    summary: "Coverage of the OSS Awards ceremony where Lumen was recognized as the standout infrastructure project of 2023, with an interview on the design decisions behind its columnar storage format.",
    url: "#",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar4",
    title: "Real-Time Collaboration at Figma: Inside the OT Engine",
    publication: "Figma Engineering Blog",
    date: "Mar 2023",
    type: "publication",
    summary: "Co-authored post detailing how Figma's operational transformation engine handles concurrent edits from millions of users, including the conflict-resolution strategies we shipped in 2022.",
    url: "#",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar5",
    title: "Keynote: The Next Decade of Developer Infrastructure",
    publication: "QCon San Francisco",
    date: "Oct 2024",
    type: "talk",
    summary: "Keynote exploring how AI-assisted tooling, eBPF-based observability, and Wasm are converging to reshape the developer infrastructure stack — with live demos and Q&A.",
    url: "#",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar6",
    title: "Why I Rewrote My Side Project in Rust (and What I Learned)",
    publication: "Personal Blog · dev.to",
    date: "May 2023",
    type: "blog",
    summary: "A candid post-mortem on rewriting a Go service in Rust: what the borrow checker forced me to fix, where performance gains actually materialized, and where they didn't.",
    url: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format",
  },
];

const CHAT_RESPONSES: Record<string, string> = {
  default: "Thanks for reaching out! Feel free to ask about my projects, experience, or tech stack. I'd love to connect.",
  hello: "Hey there! I'm Alex Rivera's portfolio bot. Ask me anything about my background, skills, or projects.",
  hi: "Hi! Great to meet you. What would you like to know about Alex?",
  projects: "Alex has built several major open-source projects — from a Rust-based stream processing engine (Lumen) to a Figma token pipeline (Prism). Check the Projects section for details!",
  skills: "Alex is proficient in Go, TypeScript, Rust, and Python on the backend, and React + WebGL on the front end. Strong infrastructure background with Kubernetes and Kafka.",
  experience: "Alex has 5 years of professional experience — currently a Senior Engineer at Stripe. Previously at Figma building the real-time collaboration engine, and HubSpot before that.",
  education: "Alex graduated from MIT with a B.Sc. in Computer Science, specializing in Distributed Systems and Machine Learning.",
  contact: "You can reach Alex at alex.rivera@email.com, or connect on LinkedIn and GitHub — links are in the footer!",
  hire: "Alex is selectively open to new opportunities! Send a message via the contact form and let's talk.",
};

function getBotResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const key of Object.keys(CHAT_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) return CHAT_RESPONSES[key];
  }
  return CHAT_RESPONSES.default;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase mb-3">
      {children}
    </p>
  );
}

const inputCls =
  "w-full bg-input-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors";

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Recognitions", href: "#recognitions" },
  { label: "Contact", href: "#contact" },
];

function NavBar({
  darkMode,
  toggleDark,
  onAdminClick,
}: {
  darkMode: boolean;
  toggleDark: () => void;
  onAdminClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-mono text-sm tracking-widest text-primary uppercase">
          AR.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin */}
          <button
            onClick={onAdminClick}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            title="Admin panel"
          >
            <Lock size={15} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-6">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="font-mono text-xs tracking-[0.25em] text-primary uppercase mb-6">
            Software Engineer
          </p>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.05] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Hello, I'm{" "}
            <span className="text-primary italic">Alex Rivera.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-light max-w-lg">
            I build the infrastructure that makes modern software fast, reliable, and beautiful — from distributed systems at scale to delightful developer tools.
          </p>
          <p className="text-sm font-mono text-muted-foreground/60 mb-10 italic">
            "Systems that think. Code that lasts."
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#projects" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:bg-primary/80 transition-colors" style={{ borderRadius: "2px" }}>
              View Projects <ExternalLink size={14} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 text-sm font-medium tracking-wide hover:border-primary/50 hover:text-primary transition-colors" style={{ borderRadius: "2px" }}>
              Get In Touch
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-indigo-500/20 blur-sm" />
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-secondary overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format"
                alt="Alex Rivera – Software Engineer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-primary" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-primary" />
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 hover:text-muted-foreground transition-colors animate-bounce">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
          <div>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Building systems that{" "}
              <span className="italic text-primary">scale.</span>
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-base text-muted-foreground leading-relaxed">
              I'm a software engineer with 5+ years of experience designing and building high-throughput distributed systems. I care deeply about correctness, performance, and the craft of software — writing code that my future self (and teammates) will still respect in five years.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              My work spans from sub-millisecond payment infrastructure at Stripe to real-time collaborative editing at Figma. I'm equally comfortable diving into kernel networking code and shipping polished user-facing UIs.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              When I'm not in my editor, I contribute to open-source, write about systems design, and occasionally give talks at distributed systems conferences.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "12+", label: "Open Source Projects" },
                { value: "3", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-serif font-bold text-primary">{stat.value}</p>
                  <p className="text-xs font-mono text-muted-foreground tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection({
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
          <h2 className="text-4xl lg:text-5xl font-serif text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Education &amp; Experience
          </h2>
          <div className="flex border border-border" style={{ borderRadius: "2px" }}>
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
                {t === "experience" ? <Briefcase size={14} /> : <GraduationCap size={14} />}
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
                        <h3 className="text-lg font-sans font-semibold text-foreground">{item.role}</h3>
                        <p className="text-primary font-mono text-sm tracking-wide">{item.company}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest bg-muted px-3 py-1 shrink-0">{item.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs text-primary/70 border border-primary/20 px-2 py-0.5">{tag}</span>
                        ))}
                      </div>
                    )}
                  </TimelineCard>
                ))
              : education.map((item) => (
                  <TimelineCard key={item.id}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-sans font-semibold text-foreground">{item.degree}</h3>
                        <p className="text-primary font-mono text-sm tracking-wide">{item.institution}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest bg-muted px-3 py-1 shrink-0">{item.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </TimelineCard>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-8 top-2 w-2 h-2 bg-primary rounded-full ring-4 ring-background" />
      <div className="bg-card border border-border p-6 hover:border-primary/30 transition-colors duration-200">
        {children}
      </div>
    </div>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SectionLabel>Expertise</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Skills &amp; <span className="italic text-primary">Tools</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A curated overview of the technologies, frameworks, and practices I work with across the full stack.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((group) => (
              <div key={group.category} className="border border-border p-5 hover:border-primary/30 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={14} className="text-primary" />
                  <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="text-sm text-foreground/80 bg-secondary px-3 py-1 hover:bg-primary/10 hover:text-primary transition-colors cursor-default" style={{ borderRadius: "2px" }}>
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

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Work</SectionLabel>
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-4xl lg:text-5xl font-serif text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Selected <span className="italic text-primary">Projects</span>
          </h2>
          <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-widest uppercase flex items-center gap-1">
            All on GitHub <ExternalLink size={10} />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="group bg-card border border-border hover:border-primary/40 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="overflow-hidden h-40 bg-secondary relative">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen size={32} className="text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-sans font-semibold text-base text-foreground mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-primary/60 border border-primary/15 px-2 py-0.5">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  {p.github && <a href={p.github} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"><Github size={13} /> Source</a>}
                  {p.live && <a href={p.live} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={13} /> Live Demo</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Recognitions (carousel) ──────────────────────────────────────────────────

const ARTICLE_TYPE_META: Record<Article["type"], { icon: React.ReactNode; label: string; cls: string }> = {
  publication: { icon: <BookOpen size={11} />,    label: "Publication",   cls: "text-primary border-primary/30" },
  news:        { icon: <Newspaper size={11} />,   label: "Press",         cls: "text-amber-400 border-amber-400/30" },
  blog:        { icon: <ArrowUpRight size={11} />,label: "Blog",          cls: "text-violet-400 border-violet-400/30" },
  talk:        { icon: <Mic size={11} />,         label: "Talk / Keynote",cls: "text-emerald-400 border-emerald-400/30" },
};

const ACHIEVE_TYPE_META: Record<Achievement["type"], { icon: React.ReactNode; label: string; cls: string }> = {
  certificate: { icon: <BadgeCheck size={11} />, label: "Certificate",  cls: "text-primary border-primary/30" },
  award:       { icon: <Trophy size={11} />,     label: "Award",        cls: "text-amber-400 border-amber-400/30" },
  recognition: { icon: <Star size={11} />,       label: "Recognition",  cls: "text-violet-400 border-violet-400/30" },
};

function Carousel({ children, speed = 40 }: { children: React.ReactNode[]; speed?: number }) {
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
      <div className="carousel-track flex gap-5" style={{ width: "max-content" }}>
        {duplicated.map((child, i) => (
          <div key={i} style={{ width: "300px", flexShrink: 0 }}>{child}</div>
        ))}
      </div>
      {/* fade edges */}
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
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><BookOpen size={28} className="text-muted-foreground/20" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest border px-2 py-1 bg-card/80 backdrop-blur-sm ${meta.cls}`}>
          {meta.icon} {meta.label.toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">{item.date} · {item.publication}</p>
        <h4 className="font-sans font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{item.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{item.summary}</p>
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
          <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-60 group-hover:brightness-75" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><Trophy size={28} className="text-muted-foreground/20" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <span className={`absolute top-3 left-3 inline-flex items-center gap-1 font-mono text-[9px] tracking-widest border px-2 py-1 bg-card/80 backdrop-blur-sm ${meta.cls}`}>
          {meta.icon} {meta.label.toUpperCase()}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <p className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase">{item.date} · {item.issuer}</p>
        <h4 className="font-sans font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{item.title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{item.description}</p>
        <span className="inline-flex items-center gap-1 text-xs text-primary/60 group-hover:text-primary transition-colors mt-1 font-mono">
          View credential <ArrowUpRight size={11} />
        </span>
      </div>
    </a>
  );
}

function RecognitionsSection({ articles, achievements }: { articles: Article[]; achievements: Achievement[] }) {
  const [tab, setTab] = useState<"papers" | "awards">("papers");

  return (
    <section id="recognitions" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <SectionLabel>Recognitions</SectionLabel>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="text-4xl lg:text-5xl font-serif text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Papers &amp; <span className="italic text-primary">Awards</span>
          </h2>
          <div className="flex border border-border" style={{ borderRadius: "2px" }}>
            {([
              { id: "papers", label: "Papers Published", icon: <BookOpen size={14} /> },
              { id: "awards", label: "Awards & Certificates", icon: <Trophy size={14} /> },
            ] as const).map((t) => (
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

      {tab === "papers" && (
        articles.length > 0 ? (
          <Carousel speed={articles.length > 3 ? 35 : 25}>
            {articles.map((a) => <ArticleCard key={a.id} item={a} />)}
          </Carousel>
        ) : (
          <p className="text-center py-12 font-mono text-sm text-muted-foreground">No articles yet. Add some in the Admin panel.</p>
        )
      )}

      {tab === "awards" && (
        achievements.length > 0 ? (
          <Carousel speed={achievements.length > 3 ? 35 : 25}>
            {achievements.map((a) => <AchievementCard key={a.id} item={a} />)}
          </Carousel>
        ) : (
          <p className="text-center py-12 font-mono text-sm text-muted-foreground">No awards yet. Add some in the Admin panel.</p>
        )
      )}
    </section>
  );
}


// ─── Footer / Contact ─────────────────────────────────────────────────────────

function FooterSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setName(""); setEmail(""); setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let's build something <span className="italic text-primary">together.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
              I'm currently open to senior engineering roles and interesting consulting engagements. If you have a hard problem to solve, let's talk.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: <Mail size={18} />, href: "mailto:alex.rivera@email.com", label: "Email" },
                { icon: <Github size={18} />, href: "#", label: "GitHub" },
                { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
              ].map((link) => (
                <a key={link.label} href={link.href} title={link.label} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Smith" className={inputCls} style={{ borderRadius: "2px" }} />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@company.com" className={inputCls} style={{ borderRadius: "2px" }} />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest text-muted-foreground uppercase mb-2">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Tell me about your project..." className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wide hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
              {sent ? "Message Sent!" : <><Send size={14} /> Send Message</>}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground tracking-widest">AR.</span>
          <span className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Alex Rivera — Built with React</span>
          <div className="flex items-center gap-6">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <a key={link.href} href={link.href} className="font-mono text-[10px] tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors uppercase">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Chat Bot ─────────────────────────────────────────────────────────────────

type ChatMsg = { role: "user" | "bot"; text: string };

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "bot", text: "Hey! I'm Alex's portfolio bot. Ask me about skills, projects, experience, or anything else!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

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
      <button onClick={() => setOpen(!open)} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:bg-primary/80 transition-all hover:scale-110" style={{ borderRadius: "50%" }} title="Chat with Alex's bot">
        {open ? <X size={20} /> : <Bot size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border shadow-2xl flex flex-col overflow-hidden" style={{ borderRadius: "4px", maxHeight: "min(480px, 70vh)" }}>
          <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-sans font-medium text-sm text-foreground">Ask Alex</p>
              <p className="font-mono text-[10px] text-primary tracking-widest">ONLINE</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`} style={{ borderRadius: "2px" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary px-3 py-2 flex items-center gap-1" style={{ borderRadius: "2px" }}>
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
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
            <button onClick={send} className="w-9 h-9 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-colors shrink-0" style={{ borderRadius: "2px" }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "portfolio2024";

type AdminTab = "skills" | "projects" | "experience" | "education" | "achievements" | "articles";

function AdminPanel({
  onClose,
  skills, setSkills,
  projects, setProjects,
  experience, setExperience,
  education, setEducation,
  achievements, setAchievements,
  articles, setArticles,
}: {
  onClose: () => void;
  skills: SkillGroup[]; setSkills: (v: SkillGroup[]) => void;
  projects: Project[]; setProjects: (v: Project[]) => void;
  experience: WorkExperience[]; setExperience: (v: WorkExperience[]) => void;
  education: Education[]; setEducation: (v: Education[]) => void;
  achievements: Achievement[]; setAchievements: (v: Achievement[]) => void;
  articles: Article[]; setArticles: (v: Article[]) => void;
}) {
  const [tab, setTab] = useState<AdminTab>("skills");

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "skills", label: "Skills", icon: <Code2 size={15} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={15} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={15} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={15} /> },
    { id: "achievements", label: "Awards", icon: <Trophy size={15} /> },
    { id: "articles", label: "Articles", icon: <BookOpen size={15} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-2xl bg-card border-l border-border flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/50">
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-primary" />
            <div>
              <p className="font-sans font-semibold text-sm text-foreground">Admin Panel</p>
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest">PORTFOLIO EDITOR</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-secondary/30 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-sans font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "skills" && <AdminSkills skills={skills} setSkills={setSkills} />}
          {tab === "projects" && <AdminProjects projects={projects} setProjects={setProjects} />}
          {tab === "experience" && <AdminExperience experience={experience} setExperience={setExperience} />}
          {tab === "education" && <AdminEducation education={education} setEducation={setEducation} />}
          {tab === "achievements" && <AdminAchievements achievements={achievements} setAchievements={setAchievements} />}
          {tab === "articles" && <AdminArticles articles={articles} setArticles={setArticles} />}
        </div>
      </div>
    </div>
  );
}

// ── Admin: Skills ─────────────────────────────────────────────────────────────

function AdminSkills({ skills, setSkills }: { skills: SkillGroup[]; setSkills: (v: SkillGroup[]) => void }) {
  const [newSkill, setNewSkill] = useState("");
  const [selectedCat, setSelectedCat] = useState(skills[0]?.category ?? "");
  const [newCat, setNewCat] = useState("");

  const addSkill = () => {
    if (!newSkill.trim() || !selectedCat) return;
    const updated = skills.map((g) =>
      g.category === selectedCat ? { ...g, items: [...g.items, newSkill.trim()] } : g
    );
    setSkills(updated);
    setNewSkill("");
  };

  const addCategory = () => {
    if (!newCat.trim() || skills.find((g) => g.category === newCat.trim())) return;
    setSkills([...skills, { category: newCat.trim(), items: [] }]);
    setSelectedCat(newCat.trim());
    setNewCat("");
  };

  const removeSkill = (cat: string, item: string) => {
    setSkills(skills.map((g) => g.category === cat ? { ...g, items: g.items.filter((i) => i !== item) } : g));
  };

  const removeCat = (cat: string) => {
    setSkills(skills.filter((g) => g.category !== cat));
    if (selectedCat === cat) setSelectedCat(skills.find((g) => g.category !== cat)?.category ?? "");
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Add New Category</p>
        <div className="flex gap-2">
          <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="e.g. DevOps" className={`${inputCls} flex-1`} style={{ borderRadius: "2px" }} onKeyDown={(e) => e.key === "Enter" && addCategory()} />
          <button onClick={addCategory} className="px-4 bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors flex items-center gap-1" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">Add Skill to Category</p>
        <div className="flex gap-2 mb-3">
          <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className={`${inputCls} flex-1`} style={{ borderRadius: "2px" }}>
            {skills.map((g) => <option key={g.category} value={g.category}>{g.category}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g. Terraform" className={`${inputCls} flex-1`} style={{ borderRadius: "2px" }} onKeyDown={(e) => e.key === "Enter" && addSkill()} />
          <button onClick={addSkill} className="px-4 bg-primary text-primary-foreground text-sm hover:bg-primary/80 transition-colors flex items-center gap-1" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Skills</p>
        {skills.map((g) => (
          <div key={g.category} className="border border-border p-4" style={{ borderRadius: "2px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary tracking-widest uppercase">{g.category}</span>
              <button onClick={() => removeCat(g.category)} className="text-muted-foreground hover:text-destructive transition-colors" title="Remove category">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="flex items-center gap-1 text-sm bg-secondary px-2 py-0.5 text-foreground/80" style={{ borderRadius: "2px" }}>
                  {item}
                  <button onClick={() => removeSkill(g.category, item)} className="text-muted-foreground hover:text-destructive transition-colors ml-1">
                    <X size={11} />
                  </button>
                </span>
              ))}
              {g.items.length === 0 && <span className="text-xs text-muted-foreground italic">No skills yet</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin: Projects ───────────────────────────────────────────────────────────

function AdminProjects({ projects, setProjects }: { projects: Project[]; setProjects: (v: Project[]) => void }) {
  const blank = (): Project => ({ id: crypto.randomUUID(), title: "", description: "", tags: [], github: "", live: "", image: "" });
  const [form, setForm] = useState<Project>(blank());
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.title.trim()) return;
    const proj: Project = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    if (editingId) {
      setProjects(projects.map((p) => p.id === editingId ? proj : p));
      setEditingId(null);
    } else {
      setProjects([...projects, proj]);
    }
    setForm(blank());
    setTagsInput("");
  };

  const startEdit = (p: Project) => {
    setForm(p);
    setTagsInput(p.tags.join(", "));
    setEditingId(p.id);
  };

  const remove = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    if (editingId === id) { setForm(blank()); setTagsInput(""); setEditingId(null); }
  };

  const field = (label: string, key: keyof Project, placeholder: string, type = "text") => (
    <div>
      <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{label}</label>
      <input type={type} value={form[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder} className={inputCls} style={{ borderRadius: "2px" }} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="border border-border p-5 space-y-4" style={{ borderRadius: "2px" }}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{editingId ? "Edit Project" : "Add New Project"}</p>
        {field("Title", "title", "Lumen — Real-time Analytics Engine")}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the project..." rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Tags (comma separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Go, React, PostgreSQL" className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        {field("GitHub URL", "github", "https://github.com/...")}
        {field("Live URL", "live", "https://...")}
        {field("Image URL", "image", "https://images.unsplash.com/...")}
        <div className="flex gap-2 pt-2">
          <button onClick={save} className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> {editingId ? "Update Project" : "Add Project"}
          </button>
          {editingId && (
            <button onClick={() => { setForm(blank()); setTagsInput(""); setEditingId(null); }} className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors" style={{ borderRadius: "2px" }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Projects ({projects.length})</p>
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors" style={{ borderRadius: "2px" }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
              <div className="flex gap-1 flex-wrap mt-1">
                {p.tags.slice(0, 3).map((t) => <span key={t} className="font-mono text-[9px] text-primary/60 border border-primary/15 px-1.5 py-0.5">{t}</span>)}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronRight size={15} /></button>
              <button onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin: Experience ─────────────────────────────────────────────────────────

function AdminExperience({ experience, setExperience }: { experience: WorkExperience[]; setExperience: (v: WorkExperience[]) => void }) {
  const blank = (): WorkExperience => ({ id: crypto.randomUUID(), role: "", company: "", period: "", description: "", tags: [] });
  const [form, setForm] = useState<WorkExperience>(blank());
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.role.trim()) return;
    const item: WorkExperience = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    if (editingId) {
      setExperience(experience.map((e) => e.id === editingId ? item : e));
      setEditingId(null);
    } else {
      setExperience([item, ...experience]);
    }
    setForm(blank()); setTagsInput("");
  };

  const startEdit = (e: WorkExperience) => { setForm(e); setTagsInput(e.tags.join(", ")); setEditingId(e.id); };
  const remove = (id: string) => { setExperience(experience.filter((e) => e.id !== id)); if (editingId === id) { setForm(blank()); setTagsInput(""); setEditingId(null); } };

  return (
    <div className="space-y-8">
      <div className="border border-border p-5 space-y-4" style={{ borderRadius: "2px" }}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{editingId ? "Edit Entry" : "Add Work Experience"}</p>
        {(["role", "company", "period"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{key}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key === "period" ? "2023 – Present" : key === "company" ? "Stripe" : "Senior Software Engineer"} className={inputCls} style={{ borderRadius: "2px" }} />
          </div>
        ))}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your role and impact..." rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Tags (comma separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Go, Kubernetes, PostgreSQL" className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={save} className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> {editingId ? "Update" : "Add Entry"}
          </button>
          {editingId && <button onClick={() => { setForm(blank()); setTagsInput(""); setEditingId(null); }} className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors" style={{ borderRadius: "2px" }}>Cancel</button>}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Experience ({experience.length})</p>
        {experience.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors" style={{ borderRadius: "2px" }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{e.role}</p>
              <p className="font-mono text-xs text-primary">{e.company} · {e.period}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(e)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronRight size={15} /></button>
              <button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin: Education ──────────────────────────────────────────────────────────

function AdminEducation({ education, setEducation }: { education: Education[]; setEducation: (v: Education[]) => void }) {
  const blank = (): Education => ({ id: crypto.randomUUID(), degree: "", institution: "", period: "", description: "" });
  const [form, setForm] = useState<Education>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.degree.trim()) return;
    if (editingId) {
      setEducation(education.map((e) => e.id === editingId ? form : e));
      setEditingId(null);
    } else {
      setEducation([form, ...education]);
    }
    setForm(blank());
  };

  const startEdit = (e: Education) => { setForm(e); setEditingId(e.id); };
  const remove = (id: string) => { setEducation(education.filter((e) => e.id !== id)); if (editingId === id) { setForm(blank()); setEditingId(null); } };

  return (
    <div className="space-y-8">
      <div className="border border-border p-5 space-y-4" style={{ borderRadius: "2px" }}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{editingId ? "Edit Entry" : "Add Education"}</p>
        {(["degree", "institution", "period"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{key}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key === "period" ? "2016 – 2020" : key === "institution" ? "MIT" : "B.Sc. Computer Science"} className={inputCls} style={{ borderRadius: "2px" }} />
          </div>
        ))}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your studies, honors, thesis..." rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={save} className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> {editingId ? "Update" : "Add Entry"}
          </button>
          {editingId && <button onClick={() => { setForm(blank()); setEditingId(null); }} className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors" style={{ borderRadius: "2px" }}>Cancel</button>}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Education ({education.length})</p>
        {education.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors" style={{ borderRadius: "2px" }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{e.degree}</p>
              <p className="font-mono text-xs text-primary">{e.institution} · {e.period}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(e)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronRight size={15} /></button>
              <button onClick={() => remove(e.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Login Gate ─────────────────────────────────────────────────────────

// ── Admin: Achievements ───────────────────────────────────────────────────────

function AdminAchievements({ achievements, setAchievements }: { achievements: Achievement[]; setAchievements: (v: Achievement[]) => void }) {
  const blank = (): Achievement => ({ id: crypto.randomUUID(), title: "", issuer: "", date: "", type: "certificate", description: "", url: "", image: "" });
  const [form, setForm] = useState<Achievement>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      setAchievements(achievements.map((a) => a.id === editingId ? form : a));
      setEditingId(null);
    } else {
      setAchievements([form, ...achievements]);
    }
    setForm(blank());
  };

  const startEdit = (a: Achievement) => { setForm(a); setEditingId(a.id); };
  const remove = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
    if (editingId === id) { setForm(blank()); setEditingId(null); }
  };

  return (
    <div className="space-y-8">
      <div className="border border-border p-5 space-y-4" style={{ borderRadius: "2px" }}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{editingId ? "Edit Entry" : "Add Achievement"}</p>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Achievement["type"] })} className={inputCls} style={{ borderRadius: "2px" }}>
            <option value="certificate">Certificate</option>
            <option value="award">Award</option>
            <option value="recognition">Recognition</option>
          </select>
        </div>
        {(["title", "issuer", "date"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{key}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key === "date" ? "Mar 2024" : key === "issuer" ? "Amazon Web Services" : "AWS Certified Solutions Architect"} className={inputCls} style={{ borderRadius: "2px" }} />
          </div>
        ))}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Credential URL (optional)</label>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Cover Image URL (optional)</label>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={save} className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> {editingId ? "Update" : "Add Entry"}
          </button>
          {editingId && <button onClick={() => { setForm(blank()); setEditingId(null); }} className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors" style={{ borderRadius: "2px" }}>Cancel</button>}
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Achievements ({achievements.length})</p>
        {achievements.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors" style={{ borderRadius: "2px" }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              <p className="font-mono text-xs text-primary">{a.issuer} · {a.date}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(a)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronRight size={15} /></button>
              <button onClick={() => remove(a.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Admin: Articles ───────────────────────────────────────────────────────────

function AdminArticles({ articles, setArticles }: { articles: Article[]; setArticles: (v: Article[]) => void }) {
  const blank = (): Article => ({ id: crypto.randomUUID(), title: "", publication: "", date: "", type: "publication", summary: "", url: "", image: "" });
  const [form, setForm] = useState<Article>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      setArticles(articles.map((a) => a.id === editingId ? form : a));
      setEditingId(null);
    } else {
      setArticles([form, ...articles]);
    }
    setForm(blank());
  };

  const startEdit = (a: Article) => { setForm(a); setEditingId(a.id); };
  const remove = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    if (editingId === id) { setForm(blank()); setEditingId(null); }
  };

  return (
    <div className="space-y-8">
      <div className="border border-border p-5 space-y-4" style={{ borderRadius: "2px" }}>
        <p className="font-mono text-xs tracking-widest text-primary uppercase">{editingId ? "Edit Article" : "Add Article"}</p>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Article["type"] })} className={inputCls} style={{ borderRadius: "2px" }}>
            <option value="publication">Publication</option>
            <option value="news">Press / News</option>
            <option value="talk">Talk / Keynote</option>
            <option value="blog">Blog Post</option>
          </select>
        </div>
        {(["title", "publication", "date"] as const).map((key) => (
          <div key={key}>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">{key === "publication" ? "Publication / Venue" : key}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key === "date" ? "Nov 2024" : key === "publication" ? "Stripe Engineering Blog" : "Article title..."} className={inputCls} style={{ borderRadius: "2px" }} />
          </div>
        ))}
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Summary</label>
          <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="A brief summary of the article or talk..." rows={3} className={`${inputCls} resize-none`} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">URL</label>
          <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-1.5">Cover Image URL (optional)</label>
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." className={inputCls} style={{ borderRadius: "2px" }} />
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={save} className="flex-1 bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Plus size={14} /> {editingId ? "Update" : "Add Article"}
          </button>
          {editingId && <button onClick={() => { setForm(blank()); setEditingId(null); }} className="px-4 border border-border text-muted-foreground hover:text-foreground text-sm transition-colors" style={{ borderRadius: "2px" }}>Cancel</button>}
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Current Articles ({articles.length})</p>
        {articles.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-3 border border-border px-4 py-3 hover:border-primary/30 transition-colors" style={{ borderRadius: "2px" }}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              <p className="font-mono text-xs text-muted-foreground">{a.publication} · {a.date}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => startEdit(a)} className="text-muted-foreground hover:text-primary transition-colors"><ChevronRight size={15} /></button>
              <button onClick={() => remove(a.id)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Login Gate ─────────────────────────────────────────────────────────

function AdminLogin({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onSuccess(); setErr(false); }
    else { setErr(true); setPw(""); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border p-8 w-full max-w-sm shadow-2xl" style={{ borderRadius: "4px" }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X size={16} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 flex items-center justify-center" style={{ borderRadius: "2px" }}>
            <UserCheck size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground">Admin Access</p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">PORTFOLIO EDITOR</p>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setErr(false); }}
              placeholder="Enter admin password"
              autoFocus
              className={`${inputCls} ${err ? "border-destructive" : ""}`}
              style={{ borderRadius: "2px" }}
            />
            {err && <p className="font-mono text-[10px] text-destructive mt-1.5">Incorrect password. Try again.</p>}
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2" style={{ borderRadius: "2px" }}>
            <Lock size={14} /> Unlock Admin Panel
          </button>
        </form>
        <p className="font-mono text-[10px] text-muted-foreground/50 text-center mt-4">Hint: portfolio2024</p>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Portfolio data — initialized from localStorage, persisted on change
  const [skills, setSkillsRaw] = useState<SkillGroup[]>(() => loadFromStorage("ar_skills", DEFAULT_SKILLS));
  const [projects, setProjectsRaw] = useState<Project[]>(() => loadFromStorage("ar_projects", DEFAULT_PROJECTS));
  const [experience, setExperienceRaw] = useState<WorkExperience[]>(() => loadFromStorage("ar_experience", DEFAULT_EXPERIENCE));
  const [education, setEducationRaw] = useState<Education[]>(() => loadFromStorage("ar_education", DEFAULT_EDUCATION));
  const [achievements, setAchievementsRaw] = useState<Achievement[]>(() => loadFromStorage("ar_achievements", DEFAULT_ACHIEVEMENTS));
  const [articles, setArticlesRaw] = useState<Article[]>(() => loadFromStorage("ar_articles", DEFAULT_ARTICLES));

  // Admin state
  const [adminState, setAdminState] = useState<"closed" | "login" | "open">("closed");

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist helpers
  const setSkills = useCallback((v: SkillGroup[]) => { setSkillsRaw(v); saveToStorage("ar_skills", v); }, []);
  const setProjects = useCallback((v: Project[]) => { setProjectsRaw(v); saveToStorage("ar_projects", v); }, []);
  const setExperience = useCallback((v: WorkExperience[]) => { setExperienceRaw(v); saveToStorage("ar_experience", v); }, []);
  const setEducation = useCallback((v: Education[]) => { setEducationRaw(v); saveToStorage("ar_education", v); }, []);
  const setAchievements = useCallback((v: Achievement[]) => { setAchievementsRaw(v); saveToStorage("ar_achievements", v); }, []);
  const setArticles = useCallback((v: Article[]) => { setArticlesRaw(v); saveToStorage("ar_articles", v); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar
        darkMode={darkMode}
        toggleDark={() => setDarkMode((d) => !d)}
        onAdminClick={() => setAdminState("login")}
      />
      <HeroSection />
      <AboutSection />
      <ExperienceSection experience={experience} education={education} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <RecognitionsSection articles={articles} achievements={achievements} />
      <FooterSection />
      <ChatBot />

      {/* Admin login gate */}
      {adminState === "login" && (
        <AdminLogin
          onSuccess={() => setAdminState("open")}
          onClose={() => setAdminState("closed")}
        />
      )}

      {/* Admin panel */}
      {adminState === "open" && (
        <AdminPanel
          onClose={() => setAdminState("closed")}
          skills={skills} setSkills={setSkills}
          projects={projects} setProjects={setProjects}
          experience={experience} setExperience={setExperience}
          education={education} setEducation={setEducation}
          achievements={achievements} setAchievements={setAchievements}
          articles={articles} setArticles={setArticles}
        />
      )}

      {/* Admin logout badge (visible when open) */}
      {adminState === "open" && (
        <button
          onClick={() => setAdminState("closed")}
          className="fixed top-20 right-6 z-[101] flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-mono tracking-wide hover:bg-primary/80 transition-colors shadow-lg"
          style={{ borderRadius: "2px" }}
        >
          <LogOut size={12} /> Close Admin
        </button>
      )}
    </div>
  );
}
