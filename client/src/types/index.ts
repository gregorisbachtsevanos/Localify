export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  defaultLanguage: string;
  languages: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  defaultLanguage: string;
  languages: string[];
}

export interface TranslationKey {
  id: string;
  projectId: string;
  key: string;
  namespace: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KeyFormData {
  key: string;
  namespace: string;
  description?: string;
}

export interface Translation {
  keyId: string;
  languageCode: string;
  value: string;
  updatedAt: string;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
}

export interface ProjectStats {
  totalKeys: number;
  languages: string[];
  completion: Record<string, number>;
  missingCount: Record<string, number>;
}

export type FilterStatus = "all" | "translated" | "missing";
