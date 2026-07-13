import { useState, useEffect, useCallback } from "react";
import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article } from "./types";
import { DEFAULT_SKILLS, DEFAULT_PROJECTS, DEFAULT_EXPERIENCE, DEFAULT_EDUCATION, DEFAULT_ACHIEVEMENTS, DEFAULT_ARTICLES } from "./data/defaults";
import { loadFromStorage, saveToStorage } from "./utils/storage";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminPanel } from "./components/admin/AdminPanel";

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check if a valid token exists
    const token = localStorage.getItem("token");
    const expires = localStorage.getItem("token_expires");
    if (token && expires) {
      const exp = new Date(expires);
      if (exp > new Date()) return true;
      localStorage.removeItem("token");
      localStorage.removeItem("token_expires");
    }
    return false;
  });

  // Apply dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  // Portfolio data — shared via localStorage with the main portfolio
  const [skills, setSkillsRaw] = useState<SkillGroup[]>(() =>
    loadFromStorage("ar_skills", DEFAULT_SKILLS),
  );
  const [projects, setProjectsRaw] = useState<Project[]>(() =>
    loadFromStorage("ar_projects", DEFAULT_PROJECTS),
  );
  const [experience, setExperienceRaw] = useState<WorkExperience[]>(() =>
    loadFromStorage("ar_experience", DEFAULT_EXPERIENCE),
  );
  const [education, setEducationRaw] = useState<Education[]>(() =>
    loadFromStorage("ar_education", DEFAULT_EDUCATION),
  );
  const [achievements, setAchievementsRaw] = useState<Achievement[]>(() =>
    loadFromStorage("ar_achievements", DEFAULT_ACHIEVEMENTS),
  );
  const [articles, setArticlesRaw] = useState<Article[]>(() =>
    loadFromStorage("ar_articles", DEFAULT_ARTICLES),
  );

  const setSkills = useCallback((v: SkillGroup[]) => {
    setSkillsRaw(v);
    saveToStorage("ar_skills", v);
  }, []);
  const setProjects = useCallback((v: Project[]) => {
    setProjectsRaw(v);
    saveToStorage("ar_projects", v);
  }, []);
  const setExperience = useCallback((v: WorkExperience[]) => {
    setExperienceRaw(v);
    saveToStorage("ar_experience", v);
  }, []);
  const setEducation = useCallback((v: Education[]) => {
    setEducationRaw(v);
    saveToStorage("ar_education", v);
  }, []);
  const setAchievements = useCallback((v: Achievement[]) => {
    setAchievementsRaw(v);
    saveToStorage("ar_achievements", v);
  }, []);
  const setArticles = useCallback((v: Article[]) => {
    setArticlesRaw(v);
    saveToStorage("ar_articles", v);
  }, []);

  if (!loggedIn) {
    return <AdminLogin onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <AdminPanel
      skills={skills}
      setSkills={setSkills}
      projects={projects}
      setProjects={setProjects}
      experience={experience}
      setExperience={setExperience}
      education={education}
      setEducation={setEducation}
      achievements={achievements}
      setAchievements={setAchievements}
      articles={articles}
      setArticles={setArticles}
    />
  );
}