import { createMemo, For } from "solid-js";
import { Timeframe } from "~/components/timeframe";
import { childInstancesOf, type Timescale } from "~/lib/timescales";
import { now } from "~/lib/utils";

export function HorizontalTimeframes(props: {
	parent: Timescale;
	child: Timescale;
}) {
	const instances = createMemo(() => [
		...childInstancesOf(props.parent, props.child, now()),
	]);
	return (
		<div class="flex gap-1 w-full">
			<For each={instances()}>
				{(start) => (
					<Timeframe class="flex-1" timescale={props.child} time={start} />
				)}
			</For>
		</div>
	);
}
