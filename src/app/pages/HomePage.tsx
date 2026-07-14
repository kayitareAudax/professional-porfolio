import { useState, useEffect } from "react";
import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article } from "../types";
import { loadPublicSkills, loadPublicProjects, loadPublicExperience, loadPublicEducation } from "../services/portfolio";
import { NavBar } from "../components/layout/NavBar";
import { FooterSection } from "../components/layout/FooterSection";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { RecognitionsSection } from "../components/sections/RecognitionsSection";
import { ChatBot } from "../components/chatbot/ChatBot";

export function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements] = useState<Achievement[]>([]);
  const [articles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    async function load() {
      try {
        const [s, p, e, ed] = await Promise.all([
          loadPublicSkills(),
          loadPublicProjects(),
          loadPublicExperience(),
          loadPublicEducation(),
        ]);
        setSkills(s);
        setProjects(p);
        setExperience(e);
        setEducation(ed);
      } catch (err) {
        console.error("Failed to load portfolio data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar darkMode={darkMode} toggleDark={() => setDarkMode((d) => !d)} />
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