import { useState, useEffect, useCallback } from "react";
import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article, FlatSkill } from "../types";
import type { AdminTab } from "../types";
import { AdminLogin } from "../components/admin/AdminLogin";
import { AdminPanel } from "../components/admin/AdminPanel";
import {
  adminLoadSkills,
  adminLoadProjects,
  adminLoadExperiences,
  adminLoadEducations,
  adminLoadFlatSkills,
  adminLoadAchievements,
  adminLoadArticles,
} from "../services/portfolio";

export function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => {
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

  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [flatSkills, setFlatSkills] = useState<FlatSkill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => { document.documentElement.classList.remove("dark"); };
  }, []);

  // Load data from API when logged in
  useEffect(() => {
    if (!loggedIn) return;
    async function load() {
      try {
        const [s, fs, p, e, ed, aw, ar] = await Promise.all([
          adminLoadSkills(),
          adminLoadFlatSkills(),
          adminLoadProjects(),
          adminLoadExperiences(),
          adminLoadEducations(),
          adminLoadAchievements(),
          adminLoadArticles(),
        ]);
        setSkills(s);
        setFlatSkills(fs);
        setProjects(p);
        setExperience(e);
        setEducation(ed);
        setAchievements(aw);
        setArticles(ar);
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setDataLoaded(true);
      }
    }
    load();
  }, [loggedIn]);

  const refreshSkills = useCallback(async () => {
    const [s, fs] = await Promise.all([adminLoadSkills(), adminLoadFlatSkills()]);
    setSkills(s);
    setFlatSkills(fs);
  }, []);
  const refreshProjects = useCallback(async () => {
    const p = await adminLoadProjects();
    setProjects(p);
  }, []);
  const refreshExperience = useCallback(async () => {
    const e = await adminLoadExperiences();
    setExperience(e);
  }, []);
  const refreshEducation = useCallback(async () => {
    const ed = await adminLoadEducations();
    setEducation(ed);
  }, []);
  const refreshAchievements = useCallback(async () => {
    const aw = await adminLoadAchievements();
    setAchievements(aw);
  }, []);
  const refreshArticles = useCallback(async () => {
    const ar = await adminLoadArticles();
    setArticles(ar);
  }, []);

  if (!loggedIn) {
    return <AdminLogin onSuccess={() => setLoggedIn(true)} />;
  }

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="font-mono text-sm text-muted-foreground">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <AdminPanel
      skills={skills}
      flatSkills={flatSkills}
      setSkills={refreshSkills}
      projects={projects}
      setProjects={refreshProjects}
      experience={experience}
      setExperience={refreshExperience}
      education={education}
      setEducation={refreshEducation}
      achievements={achievements}
      setAchievements={refreshAchievements}
      articles={articles}
      setArticles={refreshArticles}
    />
  );
}