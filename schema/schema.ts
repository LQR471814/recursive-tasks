import {
	type AnyPgColumn,
	bigint,
	pgEnum,
	pgTable,
	real,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const timescale_type = pgEnum("timescale_type", [
	"all_time",
	"ten_year",
	"five_year",
	"year",
	"quarter",
	"month",
	"week",
	"day",
	"daypart",
]);

export const implementation_type = pgEnum("implementation_type", [
	"children",
	"hours",
]);

export const taskTable = pgTable("task", {
	id: uuid().primaryKey(),
	name: varchar({ length: 256 }).notNull(),
	comments: varchar().notNull(),

	timescale: timescale_type().notNull(),
	// we don't use timestamp because storing a unix date is much simpler and
	// easier to deal with (since supabase client will turn the timestamp into
	// a string anyway, which is not easy to compare)
	timeframe_start: bigint({ mode: "number" }).notNull(),

	assigned_to: uuid().references(() => executorTable.id),
	parent_id: uuid()
		.notNull()
		.references((): AnyPgColumn => taskTable.id, {
			onUpdate: "cascade",
			onDelete: "cascade",
		}),

	optimistic: real().notNull(),
	expected: real().notNull(),
	pessimistic: real().notNull(),
	implementation: implementation_type().notNull(),
});

export const executorTable = pgTable("executor", {
	id: uuid().primaryKey(),
	name: varchar().notNull(),
	comments: varchar().notNull(),
});

export const executorOccupied = pgTable("executor_occupied", {
	executor_id: uuid()
		.notNull()
		.references(() => executorTable.id),
	start: bigint({ mode: "number" }).notNull(),
	end: bigint({ mode: "number" }).notNull(),
});
