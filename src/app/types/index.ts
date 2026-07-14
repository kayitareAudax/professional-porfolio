export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "certificate" | "award" | "recognition";
  description: string;
  url: string;
  image: string;
}

export interface Article {
  id: string;
  title: string;
  publication: string;
  date: string;
  type: "publication" | "news" | "blog" | "talk";
  summary: string;
  url: string;
  image: string;
}

export type AdminTab =
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "achievements"
  | "articles";

export type ChatMsg = { role: "user" | "bot"; text: string };

export interface FlatSkill {
  id: string;
  name: string;
  categoryName: string;
}