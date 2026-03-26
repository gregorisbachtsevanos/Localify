import { MOCK_PROJECTS } from "@/data/mockData";
import type { Project, ProjectFormData } from "@/types";

const STORAGE_KEY = "localify_projects";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function generateId(): string {
  return `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function loadFromStorage(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveToStorage(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    await delay(300);
    const stored = loadFromStorage();
    if (stored && stored.length > 0) return stored;
    saveToStorage(MOCK_PROJECTS);
    return [...MOCK_PROJECTS];
  },

  async getById(id: string): Promise<Project | null> {
    await delay(150);
    const projects = loadFromStorage() ?? MOCK_PROJECTS;
    return projects.find((p) => p.id === id) ?? null;
  },

  async create(data: ProjectFormData): Promise<Project> {
    await delay(400);
    const projects = loadFromStorage() ?? [...MOCK_PROJECTS];
    const project: Project = {
      id: generateId(),
      name: data.name,
      slug: generateSlug(data.name),
      description: data.description,
      defaultLanguage: data.defaultLanguage,
      languages: data.languages,
      color: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [project, ...projects];
    saveToStorage(updated);
    return project;
  },

  async update(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    await delay(300);
    const projects = loadFromStorage() ?? [...MOCK_PROJECTS];
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error(`Project ${id} not found`);
    const updated: Project = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = updated;
    saveToStorage(projects);
    return updated;
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const projects = loadFromStorage() ?? [...MOCK_PROJECTS];
    const updated = projects.filter((p) => p.id !== id);
    saveToStorage(updated);
  },
};
