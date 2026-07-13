import { useState, useEffect, useCallback } from "react";
import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article } from "./types";
import { DEFAULT_SKILLS, DEFAULT_PROJECTS, DEFAULT_EXPERIENCE, DEFAULT_EDUCATION, DEFAULT_ACHIEVEMENTS, DEFAULT_ARTICLES } from "./data/defaults";
import { loadFromStorage, saveToStorage } from "./utils/storage";
import { NavBar } from "./components/layout/NavBar";
import { FooterSection } from "./components/layout/FooterSection";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { RecognitionsSection } from "./components/sections/RecognitionsSection";
import { ChatBot } from "./components/chatbot/ChatBot";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Portfolio data — initialized from localStorage, persisted on change
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

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Persist helpers
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar
        darkMode={darkMode}
        toggleDark={() => setDarkMode((d) => !d)}
      />
      <HeroSection />
      <AboutSection />
      <ExperienceSection experience={experience} education={education} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <RecognitionsSection articles={articles} achievements={achievements} />
      <FooterSection />
      <ChatBot />
    </div>
  );
}