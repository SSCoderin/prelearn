import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_LK1UD9uIPFyl@ep-wild-thunder-a5trbvlc-pooler.us-east-2.aws.neon.tech/prelearn?sslmode=require"
  },
});
