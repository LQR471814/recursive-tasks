import type {
	DefaultError,
	MutationOptions,
	QueryOptions,
} from "@tanstack/solid-query";
import {
	type PublicTaskRow,
	type PublicTaskUpdate,
	supabase,
} from "../supabase";

export const tasksQuery = {
	queryKey: ["supabase", "tasks"],
	queryFn: async () => {
		const { data, error } = await supabase.from("task").select();
		if (error) throw error;
		return data;
	},
} satisfies QueryOptions;

export const tasksInsert = {
	mutationKey: ["supabase", "insert", "task"],
	mutationFn: async (newtasks: PublicTaskRow[]) => {
		await supabase.from("task").insert(
			newtasks.map((t) => {
				const { id, ...insert } = t;
				return insert;
			}),
		);
	},
} satisfies MutationOptions<void, DefaultError, PublicTaskRow[]>;

export const tasksUpdate = {
	mutationKey: ["supabase", "update", "task"],
	mutationFn: async (
		updates: (Omit<PublicTaskUpdate, "id"> & { id: number })[],
	) => {
		await Promise.all(
			updates.map((t) => {
				const { id, ...insert } = t;
				return supabase.from("task").update(insert).eq("id", t.id);
			}),
		);
	},
} satisfies MutationOptions<
	void,
	DefaultError,
	(Omit<PublicTaskUpdate, "id"> & { id: number })[]
>;

export const tasksDelete = {
	mutationKey: ["supabase", "delete", "task"],
	mutationFn: async (deletions: number[]) => {
		await supabase.from("task").delete().in("id", deletions);
	},
} satisfies MutationOptions<void, DefaultError, number[]>;
