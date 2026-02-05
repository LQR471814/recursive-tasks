import { trailBaseCollectionOptions } from "@tanstack/trailbase-db-collection";
import { executors } from "../query";
import { publicExecutorRowSchema } from "../supabase";
import { tableQueryCollection } from "./utils";

export const tasksCollection = createCollection(trailBaseCollectionOptions({}));
tasksCollection.createIndex((row) => row.parent_id);

export const executorsCollection = tableQueryCollection(
	executors,
	(i) => i.id,
	publicExecutorRowSchema,
);
