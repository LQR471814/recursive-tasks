import { createFileRoute } from "@tanstack/solid-router";
import { DragDropProvider, DragDropSensors } from "@thisbeyond/solid-dnd";
import { HorizontalControlled } from "src/components/panes/horizontal-controlled";
import { tasksCollection } from "src/lib/db";
import { Timescale, timescaleTypeOf } from "src/lib/timescales";
import { TaskProperties } from "~/components/panes/task-properties";
import { VerticalTimeframes } from "~/components/panes/vertical";
import { ViewController } from "~/components/panes/view-controller";
import { Separator } from "~/components/ui/separator";
import { CurrentTaskProvider } from "~/context/current-task";
import { ViewProvider } from "~/context/view";

export const Route = createFileRoute("/test/resizable")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<DragDropProvider
			onDragEnd={async (e) => {
				if (!e.droppable) {
					return;
				}
				const dragData = e.draggable.data as {
					taskId: string;
				};
				const dropData = e.droppable.data as {
					time: Temporal.ZonedDateTime;
					timescale: Timescale;
				};
				const time = dropData.time.toInstant().toString();
				const timescale = timescaleTypeOf(dropData.timescale);
				const result = tasksCollection.update(dragData.taskId, (val) => {
					val.timeframe_start = time;
					val.timescale = timescale;
				});
				await result.isPersisted.promise;
			}}
		>
			<DragDropSensors />
			<ViewProvider>
				<CurrentTaskProvider>
					<div class="grid grid-rows-[min-content,min-content,minmax(0,1fr)] rounded-lg border h-full">
						<ViewController />
						<Separator />
						<div class="flex flex-1">
							<div class="min-w-[200px] overflow-y-auto">
								<VerticalTimeframes />
							</div>
							<Separator orientation="vertical" />
							<div class="flex flex-col flex-1">
								<HorizontalControlled />
								<Separator />
								<TaskProperties />
							</div>
						</div>
					</div>
				</CurrentTaskProvider>
			</ViewProvider>
		</DragDropProvider>
	);
}
