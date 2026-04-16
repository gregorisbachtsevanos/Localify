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

export interface TranslationKey {
  id: string;
  projectId: string;
  key: string;
  namespace: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Translation {
  keyId: string;
  languageCode: string;
  value: string;
  updatedAt: string;
}
