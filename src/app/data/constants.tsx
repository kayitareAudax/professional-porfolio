import type { Article, Achievement } from "../types";
import {
  BookOpen,
  Newspaper,
  ArrowUpRight,
  Mic,
  BadgeCheck,
  Trophy,
  Star,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Recognitions", href: "#recognitions" },
  { label: "Contact", href: "#contact" },
];

export const inputCls =
  "w-full bg-input-background border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors";

export const ADMIN_PASSWORD = "portfolio2024";

export const ARTICLE_TYPE_META: Record<
  Article["type"],
  { icon: React.ReactNode; label: string; cls: string }
> = {
  publication: {
    icon: <BookOpen size={11} />,
    label: "Publication",
    cls: "text-primary border-primary/30",
  },
  news: {
    icon: <Newspaper size={11} />,
    label: "Press",
    cls: "text-amber-400 border-amber-400/30",
  },
  blog: {
    icon: <ArrowUpRight size={11} />,
    label: "Blog",
    cls: "text-violet-400 border-violet-400/30",
  },
  talk: {
    icon: <Mic size={11} />,
    label: "Talk / Keynote",
    cls: "text-emerald-400 border-emerald-400/30",
  },
};

export const ACHIEVE_TYPE_META: Record<
  Achievement["type"],
  { icon: React.ReactNode; label: string; cls: string }
> = {
  certificate: {
    icon: <BadgeCheck size={11} />,
    label: "Certificate",
    cls: "text-primary border-primary/30",
  },
  award: {
    icon: <Trophy size={11} />,
    label: "Award",
    cls: "text-amber-400 border-amber-400/30",
  },
  recognition: {
    icon: <Star size={11} />,
    label: "Recognition",
    cls: "text-violet-400 border-violet-400/30",
  },
};