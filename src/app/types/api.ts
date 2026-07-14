// ─── DTOs from the API ───────────────────────────────────────────────

export interface ApiCategoryRequest {
  name: string;
  description?: string;
}

export interface ApiCategoryResponse {
  id: string;
  name: string;
  description?: string;
}

export interface ApiSkillRequest {
  skillName: string;
  category: ApiCategoryRequest;
}

export interface ApiSkillResponse {
  id: string;
  skillName: string;
  category: ApiCategoryResponse;
}

export interface ApiProjectRequest {
  projectName: string;
  projectDescription: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  skillIds?: string[];
  newSkills?: ApiSkillRequest[];
  skills?: ApiSkillRequest[];
}

export interface ApiProjectResponse {
  id: string;
  projectName: string;
  projectDescription: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  skills: ApiSkillResponse[];
}

export interface ApiCategoryWithSkillsResponse {
  id: string;
  name: string;
  description?: string;
  skills: ApiSkillResponse[];
}

export interface ApiExperienceRequest {
  role: string;
  description: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  skillIds?: string[];
  newSkills?: ApiSkillRequest[];
  skills?: ApiSkillRequest[];
}

export interface ApiExperienceResponse {
  id: string;
  role: string;
  description: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  skills: ApiSkillResponse[];
}

export interface ApiEducationRequest {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  skillIds?: string[];
}

export interface ApiEducationResponse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  skills: ApiSkillResponse[];
}

export interface ApiLoginResponse {
  token: string;
  username: string;
  expiresIn: number; // epoch millis
}

export interface ApiRegisterRequest {
  username: string;
  password: string;
}