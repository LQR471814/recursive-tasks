import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/solid-db";
import {
	queryClient,
	tasksDelete,
	tasksInsert,
	tasksQuery,
	tasksUpdate,
} from "../query";

export const tasksCollection = createCollection(
	queryCollectionOptions({
		...tasksQuery,
		getKey: (i) => i.id,
		queryClient,
		onInsert: async ({ transaction }) => {
			await tasksInsert.mutationFn(
				transaction.mutations.map((m) => m.modified),
			);
		},
		onUpdate: async ({ transaction }) => {
			await tasksUpdate.mutationFn(
				transaction.mutations.map((m) => ({
					...m.changes,
					id: m.key,
				})),
			);
		},
		onDelete: async ({ transaction }) => {
			await tasksDelete.mutationFn(transaction.mutations.map((m) => m.key));
		},
	}),
);
