import { executors, tasks } from "../query";
import { publicExecutorRowSchema, publicTaskRowSchema } from "../supabase";
import { tableQueryCollection } from "./utils";
import { trailBaseCollectionOptions } from "@tanstack/trailbase-db-collection";

export const tasksCollection = createCollection(trailBaseCollectionOptions({}));
tasksCollection.createIndex((row) => row.parent_id);

export const executorsCollection = tableQueryCollection(
	executors,
	(i) => i.id,
	publicExecutorRowSchema,
);
