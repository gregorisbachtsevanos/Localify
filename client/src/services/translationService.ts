import { MOCK_KEYS, MOCK_TRANSLATIONS } from "@/data/mockData";
import type { TranslationKey, Translation, KeyFormData } from "@/types";

const KEYS_KEY = "localify_keys";
const TRANSLATIONS_KEY = "localify_translations";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function generateId(): string {
  return `key-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadKeys(): TranslationKey[] {
  try {
    const stored = localStorage.getItem(KEYS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function loadTranslations(): Translation[] {
  try {
    const stored = localStorage.getItem(TRANSLATIONS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveKeys(keys: TranslationKey[]): void {
  localStorage.setItem(KEYS_KEY, JSON.stringify(keys));
}

function saveTranslations(translations: Translation[]): void {
  localStorage.setItem(TRANSLATIONS_KEY, JSON.stringify(translations));
}

export const translationService = {
  async getKeysForProject(projectId: string): Promise<TranslationKey[]> {
    await delay(250);
    const keys = loadKeys() ?? MOCK_KEYS;
    if (!loadKeys()) saveKeys(MOCK_KEYS);
    return keys.filter((k) => k.projectId === projectId);
  },

  async getTranslationsForProject(projectId: string): Promise<Translation[]> {
    await delay(200);
    const allKeys = loadKeys() ?? MOCK_KEYS;
    const translations = loadTranslations() ?? MOCK_TRANSLATIONS;
    if (!loadTranslations()) saveTranslations(MOCK_TRANSLATIONS);
    const projectKeyIds = new Set(
      allKeys.filter((k) => k.projectId === projectId).map((k) => k.id),
    );
    return translations.filter((t) => projectKeyIds.has(t.keyId));
  },

  async createKey(
    data: KeyFormData & { projectId: string },
  ): Promise<TranslationKey> {
    await delay(300);
    const keys = loadKeys() ?? [...MOCK_KEYS];
    const key: TranslationKey = {
      id: generateId(),
      projectId: data.projectId,
      key: data.key,
      namespace: data.namespace,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveKeys([...keys, key]);
    return key;
  },

  async updateKey(
    id: string,
    data: Partial<KeyFormData>,
  ): Promise<TranslationKey> {
    await delay(200);
    const keys = loadKeys() ?? [...MOCK_KEYS];
    const index = keys.findIndex((k) => k.id === id);
    if (index === -1) throw new Error(`Key ${id} not found`);
    const updated = {
      ...keys[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    keys[index] = updated;
    saveKeys(keys);
    return updated;
  },

  async deleteKey(id: string): Promise<void> {
    await delay(200);
    const keys = loadKeys() ?? [...MOCK_KEYS];
    const translations = loadTranslations() ?? [...MOCK_TRANSLATIONS];
    saveKeys(keys.filter((k) => k.id !== id));
    saveTranslations(translations.filter((t) => t.keyId !== id));
  },

  async upsertTranslation(
    keyId: string,
    languageCode: string,
    value: string,
  ): Promise<Translation> {
    await delay(100);
    const translations = loadTranslations() ?? [...MOCK_TRANSLATIONS];
    const existingIndex = translations.findIndex(
      (t) => t.keyId === keyId && t.languageCode === languageCode,
    );
    const translation: Translation = {
      keyId,
      languageCode,
      value,
      updatedAt: new Date().toISOString(),
    };
    if (existingIndex >= 0) {
      translations[existingIndex] = translation;
    } else {
      translations.push(translation);
    }
    saveTranslations(translations);
    return translation;
  },

  async deleteTranslation(keyId: string, languageCode: string): Promise<void> {
    await delay(100);
    const translations = loadTranslations() ?? [...MOCK_TRANSLATIONS];
    saveTranslations(
      translations.filter(
        (t) => !(t.keyId === keyId && t.languageCode === languageCode),
      ),
    );
  },
};
