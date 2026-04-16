import type {
  Language,
  Project,
  TranslationKey,
  Translation,
} from "./types/mockData.types";

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", rtl: true },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Marketing Website",
    slug: "marketing-website",
    description:
      "Public-facing marketing site with multiple landing pages and SEO content",
    defaultLanguage: "en",
    languages: ["en", "fr", "de", "es", "pt"],
    color: "#6366f1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    slug: "mobile-app",
    description: "iOS and Android mobile application for end users",
    defaultLanguage: "en",
    languages: ["en", "fr", "de", "es", "ja", "zh", "ko"],
    color: "#f59e0b",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-03-12T11:00:00Z",
  },
  {
    id: "proj-3",
    name: "Admin Dashboard",
    slug: "admin-dashboard",
    description: "Internal admin panel for the operations team",
    defaultLanguage: "en",
    languages: ["en", "fr", "de"],
    color: "#10b981",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-03-08T16:45:00Z",
  },
  {
    id: "proj-4",
    name: "Help Center",
    slug: "help-center",
    description: "Customer support documentation, FAQs and tutorials",
    defaultLanguage: "en",
    languages: ["en", "es", "pt", "fr"],
    color: "#ec4899",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
  },
];

export const MOCK_KEYS: TranslationKey[] = [
  // Project 1: Marketing Website
  {
    id: "key-1",
    projectId: "proj-1",
    key: "app.name",
    namespace: "common",
    description: "Application name",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-2",
    projectId: "proj-1",
    key: "nav.home",
    namespace: "common",
    description: "Navigation home link",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-3",
    projectId: "proj-1",
    key: "nav.about",
    namespace: "common",
    description: "Navigation about link",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-4",
    projectId: "proj-1",
    key: "nav.pricing",
    namespace: "common",
    description: "Navigation pricing link",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-5",
    projectId: "proj-1",
    key: "nav.contact",
    namespace: "common",
    description: "Navigation contact link",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-6",
    projectId: "proj-1",
    key: "hero.title",
    namespace: "homepage",
    description: "Main hero heading",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-7",
    projectId: "proj-1",
    key: "hero.subtitle",
    namespace: "homepage",
    description: "Hero subtitle text",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-8",
    projectId: "proj-1",
    key: "hero.cta",
    namespace: "homepage",
    description: "Call to action button",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-9",
    projectId: "proj-1",
    key: "pricing.title",
    namespace: "homepage",
    description: "Pricing section title",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-10",
    projectId: "proj-1",
    key: "pricing.monthly",
    namespace: "homepage",
    description: "Monthly billing label",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-11",
    projectId: "proj-1",
    key: "auth.login",
    namespace: "auth",
    description: "Login button text",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-12",
    projectId: "proj-1",
    key: "auth.signup",
    namespace: "auth",
    description: "Sign up button text",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-13",
    projectId: "proj-1",
    key: "auth.email",
    namespace: "auth",
    description: "Email field label",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-14",
    projectId: "proj-1",
    key: "auth.password",
    namespace: "auth",
    description: "Password field label",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "key-15",
    projectId: "proj-1",
    key: "auth.forgot_password",
    namespace: "auth",
    description: "Forgot password link",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // Project 2: Mobile App
  {
    id: "key-101",
    projectId: "proj-2",
    key: "common.ok",
    namespace: "common",
    description: "OK button label",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-102",
    projectId: "proj-2",
    key: "common.cancel",
    namespace: "common",
    description: "Cancel button label",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-103",
    projectId: "proj-2",
    key: "common.save",
    namespace: "common",
    description: "Save button label",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-104",
    projectId: "proj-2",
    key: "common.delete",
    namespace: "common",
    description: "Delete button label",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-105",
    projectId: "proj-2",
    key: "onboarding.welcome",
    namespace: "onboarding",
    description: "Welcome screen title",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-106",
    projectId: "proj-2",
    key: "onboarding.skip",
    namespace: "onboarding",
    description: "Skip onboarding button",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-107",
    projectId: "proj-2",
    key: "home.title",
    namespace: "home",
    description: "Home screen title",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-108",
    projectId: "proj-2",
    key: "home.greeting",
    namespace: "home",
    description: "Personalized greeting with name",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-109",
    projectId: "proj-2",
    key: "profile.edit",
    namespace: "profile",
    description: "Edit profile button",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "key-110",
    projectId: "proj-2",
    key: "profile.logout",
    namespace: "profile",
    description: "Log out button",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  // Project 3: Admin Dashboard
  {
    id: "key-201",
    projectId: "proj-3",
    key: "dashboard.title",
    namespace: "dashboard",
    description: "Dashboard page title",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    id: "key-202",
    projectId: "proj-3",
    key: "dashboard.welcome",
    namespace: "dashboard",
    description: "Welcome message",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    id: "key-203",
    projectId: "proj-3",
    key: "users.title",
    namespace: "users",
    description: "Users page title",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    id: "key-204",
    projectId: "proj-3",
    key: "users.add_user",
    namespace: "users",
    description: "Add user button",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    id: "key-205",
    projectId: "proj-3",
    key: "settings.title",
    namespace: "settings",
    description: "Settings page title",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  // Project 4: Help Center
  {
    id: "key-301",
    projectId: "proj-4",
    key: "help.search_placeholder",
    namespace: "help",
    description: "Search input placeholder",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "key-302",
    projectId: "proj-4",
    key: "help.contact_support",
    namespace: "help",
    description: "Contact support link",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    id: "key-303",
    projectId: "proj-4",
    key: "faq.title",
    namespace: "faq",
    description: "FAQ section title",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
];

export const MOCK_TRANSLATIONS: Translation[] = [
  // key-1: app.name (proj-1 all langs)
  {
    keyId: "key-1",
    languageCode: "en",
    value: "Acme Corp",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-1",
    languageCode: "fr",
    value: "Acme Corp",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-1",
    languageCode: "de",
    value: "Acme Corp",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-1",
    languageCode: "es",
    value: "Acme Corp",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-1",
    languageCode: "pt",
    value: "Acme Corp",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-2: nav.home (all)
  {
    keyId: "key-2",
    languageCode: "en",
    value: "Home",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-2",
    languageCode: "fr",
    value: "Accueil",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-2",
    languageCode: "de",
    value: "Startseite",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-2",
    languageCode: "es",
    value: "Inicio",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-2",
    languageCode: "pt",
    value: "Início",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-3: nav.about (missing es, pt)
  {
    keyId: "key-3",
    languageCode: "en",
    value: "About",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-3",
    languageCode: "fr",
    value: "À propos",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-3",
    languageCode: "de",
    value: "Über uns",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-4: nav.pricing (missing pt)
  {
    keyId: "key-4",
    languageCode: "en",
    value: "Pricing",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-4",
    languageCode: "fr",
    value: "Tarifs",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-4",
    languageCode: "de",
    value: "Preise",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-4",
    languageCode: "es",
    value: "Precios",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-5: nav.contact (missing de, es, pt)
  {
    keyId: "key-5",
    languageCode: "en",
    value: "Contact",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-5",
    languageCode: "fr",
    value: "Contact",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-6: hero.title (all)
  {
    keyId: "key-6",
    languageCode: "en",
    value: "Build products your customers love",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-6",
    languageCode: "fr",
    value: "Créez des produits que vos clients adorent",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-6",
    languageCode: "de",
    value: "Erstellen Sie Produkte, die Ihre Kunden lieben",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-6",
    languageCode: "es",
    value: "Crea productos que tus clientes amen",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-6",
    languageCode: "pt",
    value: "Crie produtos que seus clientes amam",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-7: hero.subtitle (missing de, es, pt)
  {
    keyId: "key-7",
    languageCode: "en",
    value: "The fastest way to ship localized products to global markets",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-7",
    languageCode: "fr",
    value:
      "Le moyen le plus rapide de lancer des produits localisés sur les marchés mondiaux",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-8: hero.cta (missing es, pt)
  {
    keyId: "key-8",
    languageCode: "en",
    value: "Get Started Free",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-8",
    languageCode: "fr",
    value: "Commencer gratuitement",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-8",
    languageCode: "de",
    value: "Kostenlos starten",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-9: pricing.title (only en)
  {
    keyId: "key-9",
    languageCode: "en",
    value: "Simple, transparent pricing",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-10: pricing.monthly
  {
    keyId: "key-10",
    languageCode: "en",
    value: "Monthly",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-10",
    languageCode: "fr",
    value: "Mensuel",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-10",
    languageCode: "de",
    value: "Monatlich",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-11: auth.login (all)
  {
    keyId: "key-11",
    languageCode: "en",
    value: "Log in",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-11",
    languageCode: "fr",
    value: "Se connecter",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-11",
    languageCode: "de",
    value: "Anmelden",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-11",
    languageCode: "es",
    value: "Iniciar sesión",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-11",
    languageCode: "pt",
    value: "Entrar",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-12: auth.signup (missing es, pt)
  {
    keyId: "key-12",
    languageCode: "en",
    value: "Sign up",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-12",
    languageCode: "fr",
    value: "S'inscrire",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-12",
    languageCode: "de",
    value: "Registrieren",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-13: auth.email (missing de, es, pt)
  {
    keyId: "key-13",
    languageCode: "en",
    value: "Email address",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-13",
    languageCode: "fr",
    value: "Adresse e-mail",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-14: auth.password (missing pt)
  {
    keyId: "key-14",
    languageCode: "en",
    value: "Password",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-14",
    languageCode: "fr",
    value: "Mot de passe",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-14",
    languageCode: "de",
    value: "Passwort",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    keyId: "key-14",
    languageCode: "es",
    value: "Contraseña",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // key-15: auth.forgot_password (only en)
  {
    keyId: "key-15",
    languageCode: "en",
    value: "Forgot your password?",
    updatedAt: "2024-01-15T10:00:00Z",
  },

  // Project 2: Mobile App
  {
    keyId: "key-101",
    languageCode: "en",
    value: "OK",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "fr",
    value: "OK",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "de",
    value: "OK",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "es",
    value: "Aceptar",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "ja",
    value: "OK",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "zh",
    value: "确定",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-101",
    languageCode: "ko",
    value: "확인",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-102",
    languageCode: "en",
    value: "Cancel",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-102",
    languageCode: "fr",
    value: "Annuler",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-102",
    languageCode: "de",
    value: "Abbrechen",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-102",
    languageCode: "es",
    value: "Cancelar",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-102",
    languageCode: "ja",
    value: "キャンセル",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-103",
    languageCode: "en",
    value: "Save",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-103",
    languageCode: "fr",
    value: "Enregistrer",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-103",
    languageCode: "de",
    value: "Speichern",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-103",
    languageCode: "es",
    value: "Guardar",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-104",
    languageCode: "en",
    value: "Delete",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-104",
    languageCode: "fr",
    value: "Supprimer",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-104",
    languageCode: "de",
    value: "Löschen",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-105",
    languageCode: "en",
    value: "Welcome to the App!",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-105",
    languageCode: "fr",
    value: "Bienvenue dans l'application!",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-105",
    languageCode: "de",
    value: "Willkommen in der App!",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-105",
    languageCode: "es",
    value: "¡Bienvenido a la App!",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-105",
    languageCode: "ja",
    value: "アプリへようこそ！",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-106",
    languageCode: "en",
    value: "Skip",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-106",
    languageCode: "fr",
    value: "Passer",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-106",
    languageCode: "de",
    value: "Überspringen",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-107",
    languageCode: "en",
    value: "Home",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-107",
    languageCode: "fr",
    value: "Accueil",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-107",
    languageCode: "de",
    value: "Startseite",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-108",
    languageCode: "en",
    value: "Good morning, {name}!",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-108",
    languageCode: "fr",
    value: "Bonjour, {name}!",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-109",
    languageCode: "en",
    value: "Edit Profile",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-109",
    languageCode: "fr",
    value: "Modifier le profil",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  {
    keyId: "key-110",
    languageCode: "en",
    value: "Log Out",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-110",
    languageCode: "fr",
    value: "Se déconnecter",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-110",
    languageCode: "de",
    value: "Abmelden",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    keyId: "key-110",
    languageCode: "es",
    value: "Cerrar sesión",
    updatedAt: "2024-02-01T09:00:00Z",
  },

  // Project 3: Admin Dashboard
  {
    keyId: "key-201",
    languageCode: "en",
    value: "Dashboard",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-201",
    languageCode: "fr",
    value: "Tableau de bord",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-201",
    languageCode: "de",
    value: "Dashboard",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  {
    keyId: "key-202",
    languageCode: "en",
    value: "Welcome back, Admin",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-202",
    languageCode: "fr",
    value: "Re-bonjour, Admin",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  {
    keyId: "key-203",
    languageCode: "en",
    value: "Users",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-203",
    languageCode: "fr",
    value: "Utilisateurs",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-203",
    languageCode: "de",
    value: "Benutzer",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  {
    keyId: "key-204",
    languageCode: "en",
    value: "Add User",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  {
    keyId: "key-205",
    languageCode: "en",
    value: "Settings",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-205",
    languageCode: "fr",
    value: "Paramètres",
    updatedAt: "2024-02-15T08:00:00Z",
  },
  {
    keyId: "key-205",
    languageCode: "de",
    value: "Einstellungen",
    updatedAt: "2024-02-15T08:00:00Z",
  },

  // Project 4: Help Center
  {
    keyId: "key-301",
    languageCode: "en",
    value: "Search for help articles...",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    keyId: "key-301",
    languageCode: "es",
    value: "Buscar artículos de ayuda...",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    keyId: "key-301",
    languageCode: "pt",
    value: "Pesquisar artigos de ajuda...",
    updatedAt: "2024-03-01T10:00:00Z",
  },

  {
    keyId: "key-302",
    languageCode: "en",
    value: "Contact Support",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    keyId: "key-302",
    languageCode: "fr",
    value: "Contacter le support",
    updatedAt: "2024-03-01T10:00:00Z",
  },

  {
    keyId: "key-303",
    languageCode: "en",
    value: "Frequently Asked Questions",
    updatedAt: "2024-03-01T10:00:00Z",
  },
  {
    keyId: "key-303",
    languageCode: "fr",
    value: "Questions fréquemment posées",
    updatedAt: "2024-03-01T10:00:00Z",
  },
];
