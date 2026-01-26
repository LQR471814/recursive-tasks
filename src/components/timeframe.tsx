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
import { Chip } from "./task";

export function Timeframe(props: {
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
		<div class="relative border border-muted rounded-xl flex flex-col min-w-[150px] min-h-[200px] max-h-[200px] overflow-y-auto">
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
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
				<p>item 1</p>
			</div>
		</div>
	);
}
