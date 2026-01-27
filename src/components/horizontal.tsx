import { createMemo, For, useContext } from "solid-js";
import { Timeframe } from "~/components/timeframe";
import { useCurrentTime, ViewContext } from "~/context/view";
import * as timescales from "~/lib/timescales";
import { cn } from "~/lib/utils";

export function Display(props: {
	parent: timescales.Timescale;
	child: timescales.Timescale;
	now: Temporal.ZonedDateTime;
	class?: string;
}) {
	const instances = createMemo(() => [
		...timescales.childInstancesOf(props.parent, props.child, props.now),
	]);
	return (
		<div class={cn("flex gap-1 h-full w-full p-1", props.class)}>
			<For each={instances()}>
				{(start) => (
					<Timeframe class="flex-1" timescale={props.child} time={start} />
				)}
			</For>
		</div>
	);
}

export function Controlled() {
	const ctx = useContext(ViewContext);
	if (!ctx) {
		return <p>ViewContext.Provider is missing</p>;
	}
	const currentTime = useCurrentTime();
	const child = createMemo(() => {
		const p = ctx.state.timescale;
		for (let i = 0; i < timescales.hierarchy.length; i++) {
			if (p === timescales.hierarchy[i]) {
				return timescales.hierarchy[i + 1];
			}
		}
		throw new Error("no child found");
	});
	return (
		<Display parent={ctx.state.timescale} child={child()} now={currentTime()} />
	);
}
