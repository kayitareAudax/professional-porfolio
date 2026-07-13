import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article } from "../types";

export const DEFAULT_SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Go", "TypeScript", "Rust", "Python", "Java", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "WebGL", "Figma"],
  },
  {
    category: "Backend",
    items: ["Node.js", "gRPC", "REST", "GraphQL", "WebSockets"],
  },
  {
    category: "Infrastructure",
    items: ["Kubernetes", "Docker", "AWS", "Terraform", "Kafka"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Redis", "MongoDB", "ClickHouse"],
  },
  {
    category: "Practices",
    items: ["TDD", "CI/CD", "System Design", "Code Review", "Agile"],
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lumen — Real-time Analytics Engine",
    description:
      "Open-source stream processing engine capable of ingesting 10M+ events/sec. Built with Rust and a custom columnar storage format. Powers dashboards for 200+ companies.",
    tags: ["Rust", "ClickHouse", "Kafka", "WebSockets"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p2",
    title: "Meridian — Distributed Task Scheduler",
    description:
      "A fault-tolerant distributed cron system with sub-second precision and a visual DAG editor. Handles 50K+ scheduled jobs across 12 regions with automatic failover.",
    tags: ["Go", "etcd", "React", "gRPC"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p3",
    title: "Forge — AI-powered Code Review",
    description:
      "VS Code extension integrating LLM-based code review directly into the dev workflow. Provides contextual suggestions, complexity analysis, and security scanning on save.",
    tags: ["TypeScript", "Python", "OpenAI API", "AST"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p4",
    title: "Nomad — Self-hosted VPN Mesh",
    description:
      "Zero-config WireGuard mesh network manager with a web UI, certificate authority, and automatic peer discovery. Deployed in 80+ homelab setups and small teams.",
    tags: ["Go", "WireGuard", "SQLite", "HTMX"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p5",
    title: "Cartographer — OSM Map Renderer",
    description:
      "High-performance vector tile renderer for OpenStreetMap data. Custom WebGL shaders, offline-first with service workers, renders 1M+ features at 60fps.",
    tags: ["WebGL", "TypeScript", "Rust/WASM", "OSM"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: "p6",
    title: "Prism — Design Token Pipeline",
    description:
      "CLI tool that syncs Figma design tokens to code. Generates typed TS constants, CSS custom properties, and Tailwind configs in one command. 3K+ GitHub stars.",
    tags: ["TypeScript", "Figma API", "Node.js", "CLI"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=360&fit=crop&auto=format",
  },
];

export const DEFAULT_EXPERIENCE: WorkExperience[] = [
  {
    id: "e1",
    role: "Senior Software Engineer",
    company: "Stripe",
    period: "2023 – Present",
    description:
      "Lead backend engineer on the Payments Infrastructure team. Architected a distributed event-processing pipeline handling 2M+ transactions per second. Reduced API P99 latency by 38% through cache-layer redesign.",
    tags: ["Go", "Kafka", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "e2",
    role: "Software Engineer II",
    company: "Figma",
    period: "2021 – 2023",
    description:
      "Contributed to the real-time collaboration engine powering live multiplayer editing. Built operational transformation algorithms and conflict resolution logic used by millions of designers daily.",
    tags: ["TypeScript", "Rust", "WebSockets", "Redis"],
  },
  {
    id: "e3",
    role: "Junior Software Engineer",
    company: "HubSpot",
    period: "2020 – 2021",
    description:
      "Developed RESTful APIs and internal tooling for the CRM platform. Shipped features end-to-end within cross-functional squads.",
    tags: ["Java", "Spring Boot", "MySQL", "React"],
  },
];

export const DEFAULT_EDUCATION: Education[] = [
  {
    id: "ed1",
    degree: "B.Sc. Computer Science",
    institution: "Massachusetts Institute of Technology",
    period: "2016 – 2020",
    description:
      "Graduated with honors. Specialization in Distributed Systems and Machine Learning. Dean's List all four years. Thesis: Adaptive Load Balancing in Microservice Architectures.",
  },
  {
    id: "ed2",
    degree: "A.S. Mathematics",
    institution: "Boston Community College",
    period: "2014 – 2016",
    description:
      "Completed core mathematics and science coursework with a 4.0 GPA before transferring to MIT.",
  },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    date: "Mar 2024",
    type: "certificate",
    description:
      "Validated expertise in designing distributed systems and selecting appropriate AWS services to build secure, reliable, and cost-optimized architectures at scale.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a2",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "Sep 2023",
    type: "certificate",
    description:
      "Demonstrated proficiency in Kubernetes cluster administration, including installation, configuration, networking, storage, and troubleshooting in production environments.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a3",
    title: "Best Open Source Infrastructure Tool — OSS Awards",
    issuer: "Open Source Summit North America",
    date: "Jun 2023",
    type: "award",
    description:
      "Lumen was recognized as the best new open-source infrastructure project of 2023, competing against 340+ nominations across the distributed systems category.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a4",
    title: "Google Hash Code — Global Top 2%",
    issuer: "Google",
    date: "Feb 2022",
    type: "recognition",
    description:
      "Ranked in the global top 2% out of 10,000+ teams in Google's annual competitive programming competition.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a5",
    title: "MIT EECS Outstanding Thesis Award",
    issuer: "MIT Department of EECS",
    date: "Jun 2020",
    type: "award",
    description:
      "Thesis on adaptive load balancing in microservice architectures selected as one of five outstanding B.Sc. theses by the department faculty committee.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "a6",
    title: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    date: "Jan 2022",
    type: "certificate",
    description:
      "Certification covering infrastructure-as-code using Terraform — modules, state management, workspaces, and multi-cloud provider configuration.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
  },
];

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: "ar1",
    title: "How We Reduced Stripe's Payment API Latency by 38%",
    publication: "Stripe Engineering Blog",
    date: "Nov 2024",
    type: "publication",
    summary:
      "A deep-dive into the cache-layer redesign that eliminated hot-path database reads, including the trade-offs we considered and the rollout strategy we used to de-risk the change in production.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar2",
    title: "Building Fault-Tolerant Distributed Systems at Scale",
    publication: "ACM Queue",
    date: "Aug 2024",
    type: "publication",
    summary:
      "A peer-reviewed paper examining patterns for achieving five-nines reliability in distributed systems — covering consensus protocols, graceful degradation, and chaos engineering methodologies.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar3",
    title: "Alex Rivera's Open-Source Lumen Engine Named Tool of the Year",
    publication: "The New Stack",
    date: "Jul 2023",
    type: "news",
    summary:
      "Coverage of the OSS Awards ceremony where Lumen was recognized as the standout infrastructure project of 2023, with an interview on the design decisions behind its columnar storage format.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar4",
    title: "Real-Time Collaboration at Figma: Inside the OT Engine",
    publication: "Figma Engineering Blog",
    date: "Mar 2023",
    type: "publication",
    summary:
      "Co-authored post detailing how Figma's operational transformation engine handles concurrent edits from millions of users, including the conflict-resolution strategies we shipped in 2022.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar5",
    title: "Keynote: The Next Decade of Developer Infrastructure",
    publication: "QCon San Francisco",
    date: "Oct 2024",
    type: "talk",
    summary:
      "Keynote exploring how AI-assisted tooling, eBPF-based observability, and Wasm are converging to reshape the developer infrastructure stack — with live demos and Q&A.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: "ar6",
    title: "Why I Rewrote My Side Project in Rust (and What I Learned)",
    publication: "Personal Blog · dev.to",
    date: "May 2023",
    type: "blog",
    summary:
      "A candid post-mortem on rewriting a Go service in Rust: what the borrow checker forced me to fix, where performance gains actually materialized, and where they didn't.",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&auto=format",
  },
];