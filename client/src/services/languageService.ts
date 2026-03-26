import { AVAILABLE_LANGUAGES } from "@/data/mockData";
import type { Language } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const languageService = {
  async getAll(): Promise<Language[]> {
    await delay(100);
    return [...AVAILABLE_LANGUAGES];
  },

  getByCode(code: string): Language | undefined {
    return AVAILABLE_LANGUAGES.find((l) => l.code === code);
  },

  getByCodeSync(codes: string[]): Language[] {
    return codes
      .map((code) => AVAILABLE_LANGUAGES.find((l) => l.code === code))
      .filter(Boolean) as Language[];
  },
};
