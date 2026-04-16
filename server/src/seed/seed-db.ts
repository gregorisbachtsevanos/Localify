import "dotenv/config";
import { MongoClient } from "mongodb";
import {
  AVAILABLE_LANGUAGES,
  MOCK_PROJECTS,
  MOCK_TRANSLATIONS,
} from "./mock/mockData";

const uri = process.env.DATABASE_URL;

if (!uri) {
  throw new Error("❌ DATABASE_URL is missing");
}

async function seed() {
  console.log({ uri });
  const client = new MongoClient(uri as string);

  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB || "translations-db");

    const languagesCollection = db.collection("languages");
    const projectsCollection = db.collection("projects");
    const translationsCollection = db.collection("translations");

    await Promise.all([
      languagesCollection.deleteMany({}),
      projectsCollection.deleteMany({}),
      translationsCollection.deleteMany({}),
    ]);

    await languagesCollection.insertMany(AVAILABLE_LANGUAGES);

    await projectsCollection.insertMany(
      MOCK_PROJECTS.map((p) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      })),
    );

    await translationsCollection.insertMany(
      MOCK_TRANSLATIONS.map((t) => ({
        ...t,
        updatedAt: new Date(t.updatedAt),
      })),
    );

    console.log("✅ Seed completed successfully");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  } finally {
    await client.close();
  }
}

seed();
