import {
	type AnySQLiteColumn,
	integer,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const timescale_type = text({
	enum: [
		"all_time",
		"ten_year",
		"five_year",
		"year",
		"quarter",
		"month",
		"week",
		"day",
		"daypart",
	],
});

export const implementation_type = text({ enum: ["children", "hours"] });

export const taskTable = sqliteTable("task", {
	id: text().primaryKey(),
	name: text({ length: 256 }).notNull(),
	comments: text().notNull(),

	timescale: timescale_type.notNull(),
	// we don't use timestamp because storing a unix date is much simpler and
	// easier to deal with (since supabase client will turn the timestamp into
	// a string anyway, which is not easy to compare)
	timeframe_start: integer({ mode: "number" }).notNull(),

	assigned_to: text().references(() => executorTable.id),
	parent_id: text()
		.notNull()
		.references((): AnySQLiteColumn => taskTable.id, {
			onUpdate: "cascade",
			onDelete: "cascade",
		}),

	optimistic: real().notNull(),
	expected: real().notNull(),
	pessimistic: real().notNull(),
	implementation: implementation_type.notNull(),
});

export const executorTable = sqliteTable("executor", {
	id: text().primaryKey(),
	name: text().notNull(),
	comments: text().notNull(),
});

export const executorOccupied = sqliteTable("executor_occupied", {
	executor_id: text()
		.notNull()
		.references(() => executorTable.id),
	start: integer({ mode: "timestamp_ms" }).notNull(),
	end: integer({ mode: "timestamp_ms" }).notNull(),
});
