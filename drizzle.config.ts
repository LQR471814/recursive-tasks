// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	schema: "./schema/schema.ts",
	tablesFilter: ["!_*"],
	dbCredentials: {
		url: process.env.DB_URL ?? "./traildepot/data/main.db",
	},
});
