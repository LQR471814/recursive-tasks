import sqlite3 from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { ROOT_ID } from "../src/lib/constants";
import { taskTable } from "./schema";

const sql = sqlite3(process.env.DB_URL ?? "./traildepot/data/main.db");
const db = drizzle({ client: sql });

async function main() {
	await db
		.insert(taskTable)
		.values([
			{
				id: ROOT_ID,
				name: "Root",
				comments: "The root task which all tasks originate from.",
				parent_id: ROOT_ID,
				assigned_to: null,
				// the epoch
				timeframe_start: 0,
				timescale: "all_time",
				optimistic: 100,
				expected: 100,
				pessimistic: 100,
				implementation: "children",
			},
		])
		.onConflictDoNothing();
}

main()
	.then(() => {
		console.log("Data seeded.");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
