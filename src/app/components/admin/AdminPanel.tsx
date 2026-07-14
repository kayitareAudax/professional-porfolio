import { useState } from "react";
import { Code2, FolderOpen, Briefcase, GraduationCap, Trophy, BookOpen, Settings, ArrowLeft } from "lucide-react";
import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article, FlatSkill, AdminTab } from "../../types";
import { AdminSkills } from "./AdminSkills";
import { AdminProjects } from "./AdminProjects";
import { AdminExperience } from "./AdminExperience";
import { AdminEducation } from "./AdminEducation";
import { AdminAchievements } from "./AdminAchievements";
import { AdminArticles } from "./AdminArticles";

export function AdminPanel({
  skills,
  flatSkills,
  setSkills,
  projects,
  setProjects,
  experience,
  setExperience,
  education,
  setEducation,
  achievements,
  setAchievements,
  articles,
  setArticles,
}: {
  skills: SkillGroup[];
  flatSkills: FlatSkill[];
  setSkills: () => Promise<void>;
  setProjects: () => Promise<void>;
  setExperience: () => Promise<void>;
  setEducation: () => Promise<void>;
  achievements: Achievement[];
  setAchievements: () => void;
  articles: Article[];
  setArticles: () => void;
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-3">
          <Settings size={18} className="text-primary" />
          <div>
            <p className="font-sans font-semibold text-sm text-foreground">
              Admin Panel
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-widest">
              PORTFOLIO EDITOR
            </p>
          </div>
        </div>
        <a
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono tracking-wide"
        >
          <ArrowLeft size={14} /> Back to Portfolio
        </a>
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
        {tab === "skills" && (
          <AdminSkills skills={skills} setSkills={setSkills} />
        )}
        {tab === "projects" && (
          <AdminProjects projects={projects} setProjects={setProjects} flatSkills={flatSkills} />
        )}
        {tab === "experience" && (
          <AdminExperience experience={experience} setExperience={setExperience} flatSkills={flatSkills} />
        )}
        {tab === "education" && (
          <AdminEducation education={education} setEducation={setEducation} />
        )}
        {tab === "achievements" && (
          <AdminAchievements achievements={achievements} setAchievements={setAchievements} />
        )}
        {tab === "articles" && (
          <AdminArticles articles={articles} setArticles={setArticles} />
        )}
      </div>
    </div>
  );
}