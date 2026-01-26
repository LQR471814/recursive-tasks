import { createFileRoute } from "@tanstack/solid-router";
import { Timeframe } from "~/components/timeframe";
import { childInstancesOf, day, week } from "~/lib/timescales";
import { now } from "~/lib/utils";
import { createMemo, For } from "solid-js";

export const Route = createFileRoute("/horizontal")({
  component: RouteComponent,
});

function RouteComponent() {
  const parent = week;
  const child = day;
  const instances = createMemo(() => [
    ...childInstancesOf(parent, child, now()),
  ]);
  return (
    <div class="flex">
      <For each={instances()}>
        {(start) => <Timeframe timescale={day} time={start} />}
      </For>
    </div>
  );
}
