import "dotenv/config"; // Load environment variables from .env file
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed.ts`, // npx prisma db seed
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
