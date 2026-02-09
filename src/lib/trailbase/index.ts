import { initClient } from "trailbase";

export const trailBaseClient = initClient(
	import.meta.env.VITE_TRAILBASE_URL ?? window.origin.toString(),
);

export * as executor from "./executor.gen";
export * as executor_occupied from "./executor_occupied.gen";
export * as task from "./task.gen";
