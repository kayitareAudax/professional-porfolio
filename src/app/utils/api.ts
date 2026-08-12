import axios from "axios";
import type {
  ApiSkillResponse,
  ApiSkillRequest,
  ApiCategoryResponse,
  ApiCategoryRequest,
  ApiProjectResponse,
  ApiProjectRequest,
  ApiExperienceResponse,
  ApiExperienceRequest,
  ApiEducationResponse,
  ApiEducationRequest,
  ApiLoginResponse,
  ApiRegisterRequest,
  ApiAwardResponse,
  ApiAwardRequest,
  ApiPaperResponse,
  ApiPaperRequest,
  ApiUploadResponse,
} from "../types/api";

const api = axios.create({
  baseURL: "https://professional-porfolio-backend.onrender.com",
});

// Attach auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ────────────────────────────────────────────────────────────

export async function login(username: string, password: string) {
  const resp = await api.post<ApiLoginResponse>("/users/login", { username, password });
  // expiresIn is epoch millis — store it as an ISO string
  const expiresDate = new Date(resp.data.expiresIn);
  localStorage.setItem("token", resp.data.token);
  localStorage.setItem("token_expires", expiresDate.toISOString());
  return resp;
}

export function register(data: ApiRegisterRequest) {
  return api.post("/users/register", data);
}

// ─── Skills ──────────────────────────────────────────────────────────

export function getSkills() {
  return api.get<ApiSkillResponse[]>("/skills");
}

export function getSkillById(id: string) {
  return api.get<ApiSkillResponse>(`/skills/${id}`);
}

export function createSkill(data: ApiSkillRequest) {
  return api.post<ApiSkillResponse>("/skills", data);
}

export function deleteSkillById(id: string) {
  return api.delete(`/skills/${id}`);
}

// ─── Categories ──────────────────────────────────────────────────────

export function getCategories() {
  return api.get<ApiCategoryResponse[]>("/categories");
}

export function getCategoryById(id: string) {
  return api.get<ApiCategoryResponse>(`/categories/${id}`);
}

export function createCategory(data: ApiCategoryRequest) {
  return api.post<ApiCategoryResponse>("/categories", data);
}

export function deleteCategoryById(id: string) {
  return api.delete(`/categories/${id}`);
}

// ─── Projects ────────────────────────────────────────────────────────

export function getProjects() {
  return api.get<ApiProjectResponse[]>("/projects");
}

export function getProjectById(id: string) {
  return api.get<ApiProjectResponse>(`/projects/${id}`);
}

export function createProject(data: ApiProjectRequest) {
  return api.post<ApiProjectResponse>("/projects", data);
}

export function deleteProjectById(id: string) {
  return api.delete(`/projects/${id}`);
}

// ─── Experiences ─────────────────────────────────────────────────────

export function getExperiences() {
  return api.get<ApiExperienceResponse[]>("/experiences");
}

export function getExperienceById(id: string) {
  return api.get<ApiExperienceResponse>(`/experiences/${id}`);
}

export function createExperience(data: ApiExperienceRequest) {
  return api.post<ApiExperienceResponse>("/experiences", data);
}

export function deleteExperienceById(id: string) {
  return api.delete(`/experiences/${id}`);
}

// ─── Educations ──────────────────────────────────────────────────────

export function getEducations() {
  return api.get<ApiEducationResponse[]>("/educations");
}

export function getEducationById(id: string) {
  return api.get<ApiEducationResponse>(`/educations/${id}`);
}

export function createEducation(data: ApiEducationRequest) {
  return api.post<ApiEducationResponse>("/educations", data);
}

export function deleteEducation(id: string) {
  return api.delete(`/educations/${id}`);
}

// ─── Awards ──────────────────────────────────────────────────────────

export function getAwards() {
  return api.get<ApiAwardResponse[]>("/awards");
}

export function getAwardById(id: string) {
  return api.get<ApiAwardResponse>(`/awards/${id}`);
}

export function createAward(data: ApiAwardRequest) {
  return api.post<ApiAwardResponse>("/awards", data);
}

export function deleteAwardById(id: string) {
  return api.delete(`/awards/${id}`);
}

// ─── Papers ──────────────────────────────────────────────────────────

export function getPapers() {
  return api.get<ApiPaperResponse[]>("/papers");
}

export function getPaperById(id: string) {
  return api.get<ApiPaperResponse>(`/papers/${id}`);
}

export function createPaper(data: ApiPaperRequest) {
  return api.post<ApiPaperResponse>("/papers", data);
}

export function deletePaperById(id: string) {
  return api.delete(`/papers/${id}`);
}

// ─── Uploads ─────────────────────────────────────────────────────────

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return api.post<ApiUploadResponse>("/uploads/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export default api;