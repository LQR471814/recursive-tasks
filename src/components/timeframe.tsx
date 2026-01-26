import {
	and,
	createCollection,
	gte,
	liveQueryCollectionOptions,
	lte,
	useLiveQuery,
} from "@tanstack/solid-db";
import { For } from "solid-js";
import { tasksCollection } from "~/lib/db";
import type { Timescale } from "~/lib/timescales";
import { cn } from "~/lib/utils";
import { Chip } from "./task";

export function Timeframe(props: {
	class?: string;
	timescale: Timescale;
	time: Temporal.ZonedDateTime;
}) {
	const instance = props.timescale.instance(props.time);

	const timeframeTasks = createCollection(
		liveQueryCollectionOptions({
			query: (q) =>
				q
					.from({ task: tasksCollection })
					.select(({ task }) => ({
						id: task.id,
						name: task.name,
						status: task.status,
						blocked: task.blocked_by !== null,
					}))
					.where(({ task }) =>
						and(
							gte(task.timeframe_start, instance.start),
							lte(task.timeframe_start, instance.end),
						),
					),
		}),
	);

	const query = useLiveQuery((q) => q.from({ timeframeTasks }));

	return (
		<div
			class={cn(
				"relative border border-muted rounded-lg flex flex-col min-h-[100px] overflow-y-auto",
				props.class,
			)}
		>
			<div class="sticky top-0 bg-background border-b border-muted px-2 py-1">
				<p>{instance.name}</p>
			</div>
			<div class="flex flex-col gap-2 px-2 py-1">
				<For each={query()}>
					{(task) => (
						<Chip
							{...task}
							onClick={() => {
								console.log("clicked!");
							}}
						/>
					)}
				</For>
			</div>
			{/* <Button */}
			{/* 	class="absolute right-1 bottom-1 px-2 py-1 h-min w-min" */}
			{/* 	variant="outline" */}
			{/* > */}
			{/* 	＋ */}
			{/* </Button> */}
		</div>
	);
}
