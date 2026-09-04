import type { SkillGroup, Project, WorkExperience, Education, Achievement, Article } from "../types";
import type {
  ApiSkillResponse,
  ApiCategoryResponse,
  ApiProjectResponse,
  ApiExperienceResponse,
  ApiEducationResponse,
  ApiAwardResponse,
  ApiPaperResponse,
} from "../types/api";
import {
  getSkills,
  getCategories,
  createSkill,
  createCategory,
  deleteSkillById,
  deleteCategoryById,
  getProjects,
  createProject,
  deleteProjectById,
  getExperiences,
  createExperience,
  deleteExperienceById,
  getEducations,
  createEducation,
  deleteEducation,
  getAwards,
  createAward,
  deleteAwardById,
  getPapers,
  createPaper,
  deletePaperById,
  uploadImage,
} from "../utils/api";

// ─── Mappers ─────────────────────────────────────────────────────────

function mapSkillsToGroups(
  skills: ApiSkillResponse[],
  categories: ApiCategoryResponse[],
): SkillGroup[] {
  return categories.map((cat) => ({
    category: cat.name,
    items: skills
      .filter((s) => s.category.id === cat.id)
      .map((s) => s.skillName),
  }));
}

function mapProject(p: ApiProjectResponse): Project {
  return {
    id: p.id,
    title: p.projectName,
    description: p.projectDescription,
    tags: p.skills.map((s) => s.skillName),
    github: p.githubUrl ?? "",
    live: p.projectUrl ?? "",
    image: p.imageUrl ?? "",
  };
}

function mapExperience(e: ApiExperienceResponse): WorkExperience {
  return {
    id: e.id,
    role: e.role,
    company: e.companyName,
    period: formatPeriod(e.startDate, e.endDate),
    description: e.description,
    tags: e.skills.map((s) => s.skillName),
  };
}

function mapEducation(e: ApiEducationResponse): Education {
  return {
    id: e.id,
    degree: e.name,
    institution: "",
    period: formatPeriod(e.startDate, e.endDate),
    description: e.description,
  };
}

function mapAward(a: ApiAwardResponse): Achievement {
  return {
    id: a.id,
    title: a.title,
    issuer: a.issuer,
    date: a.date,
    type: a.type,
    description: a.description,
    url: a.url ?? "",
    image: a.imageUrl ?? "",
  };
}

function mapPaper(p: ApiPaperResponse): Article {
  return {
    id: p.id,
    title: p.title,
    publication: p.publication,
    date: p.date,
    type: p.type,
    summary: p.summary,
    url: p.url ?? "",
    image: p.imageUrl ?? "",
  };
}

function formatPeriod(start: string, end?: string): string {
  const s = new Date(start).getFullYear();
  if (!end) return `${s} – Present`;
  const e = new Date(end).getFullYear();
  return `${s} – ${e}`;
}

// ─── Public portfolio loaders ────────────────────────────────────────

export async function loadPublicSkills(): Promise<SkillGroup[]> {
  const [skillsRes, catsRes] = await Promise.all([getSkills(), getCategories()]);
  return mapSkillsToGroups(skillsRes.data, catsRes.data);
}

export async function loadPublicProjects(): Promise<Project[]> {
  const res = await getProjects();
  return res.data?.map(mapProject);
}

export async function loadPublicExperience(): Promise<WorkExperience[]> {
  const res = await getExperiences();
  return res.data.map(mapExperience);
}

export async function loadPublicEducation(): Promise<Education[]> {
  const res = await getEducations();
  return res.data.map(mapEducation);
}

export async function loadPublicAchievements(): Promise<Achievement[]> {
  const res = await getAwards();
  return res.data.map(mapAward);
}

export async function loadPublicArticles(): Promise<Article[]> {
  const res = await getPapers();
  return res.data.map(mapPaper);
}

export interface FlatSkill {
  id: string;
  name: string;
  categoryName: string;
}

// ─── Admin: Load flat skill list for dropdowns ──────────────────────

export async function adminLoadFlatSkills(): Promise<FlatSkill[]> {
  const [skillsRes, catsRes] = await Promise.all([getSkills(), getCategories()]);
  return skillsRes.data.map((s) => ({
    id: s.id,
    name: s.skillName,
    categoryName: catsRes.data.find((c) => c.id === s.category.id)?.name ?? s.category.name,
  }));
}

export async function adminLoadSkills(): Promise<SkillGroup[]> {
  const [skillsRes, catsRes] = await Promise.all([getSkills(), getCategories()]);
  return mapSkillsToGroups(skillsRes.data, catsRes.data);
}

export async function adminAddCategory(name: string) {
  await createCategory({ name });
}

export async function adminDeleteCategory(id: string) {
  await deleteCategoryById(id);
}

export async function adminAddSkill(skillName: string, categoryId: string, categoryName: string) {
  await createSkill({
    skillName,
    category: { name: categoryName },
  });
}

export async function adminDeleteSkill(id: string) {
  await deleteSkillById(id);
}

// ─── Admin: Projects ─────────────────────────────────────────────────

export async function adminLoadProjects(): Promise<Project[]> {
  const res = await getProjects();
  return res.data.map(mapProject);
}

export async function adminCreateProject(data: {
  projectName: string;
  projectDescription: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  skillIds: string[];
}) {
  await createProject({
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    projectUrl: data.projectUrl,
    githubUrl: data.githubUrl,
    imageUrl: data.imageUrl,
    skillIds: data.skillIds,
  });
}

export async function adminDeleteProject(id: string) {
  await deleteProjectById(id);
}

// ─── Admin: Experiences ──────────────────────────────────────────────

export async function adminLoadExperiences(): Promise<WorkExperience[]> {
  const res = await getExperiences();
  return res.data.map(mapExperience);
}

export async function adminCreateExperience(data: {
  role: string;
  description: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  skillIds: string[];
}) {
  await createExperience({
    role: data.role,
    description: data.description,
    companyName: data.companyName,
    startDate: data.startDate,
    endDate: data.endDate,
    skillIds: data.skillIds,
  });
}

export async function adminDeleteExperience(id: string) {
  await deleteExperienceById(id);
}

// ─── Admin: Educations ───────────────────────────────────────────────

export async function adminLoadEducations(): Promise<Education[]> {
  const res = await getEducations();
  return res.data.map(mapEducation);
}

export async function adminCreateEducation(data: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
}) {
  await createEducation(data);
}

export async function adminDeleteEducation(id: string) {
  await deleteEducation(id);
}

// ─── Admin: Achievements (Awards) ─────────────────────────────────────

export async function adminLoadAchievements(): Promise<Achievement[]> {
  const res = await getAwards();
  return res.data.map(mapAward);
}

export async function adminCreateAchievement(data: {
  title: string;
  issuer: string;
  date: string;
  type: Achievement["type"];
  description: string;
  url?: string;
  imageUrl?: string;
}) {
  await createAward(data);
}

export async function adminDeleteAchievement(id: string) {
  await deleteAwardById(id);
}

// ─── Admin: Articles (Papers) ─────────────────────────────────────────

export async function adminLoadArticles(): Promise<Article[]> {
  const res = await getPapers();
  return res.data.map(mapPaper);
}

export async function adminCreateArticle(data: {
  title: string;
  publication: string;
  date: string;
  type: Article["type"];
  summary: string;
  url?: string;
  imageUrl?: string;
}) {
  await createPaper(data);
}

export async function adminDeleteArticle(id: string) {
  await deletePaperById(id);
}

// ─── Admin: Image upload ───────────────────────────────────────────────

export async function adminUploadImage(file: File): Promise<string> {
  const res = await uploadImage(file);
  return res.data.url;
}