import { createFileRoute } from "@tanstack/solid-router";
import { VerticalTimeframes } from "~/components/panes/vertical";
import { CurrentTaskProvider } from "~/context/current-task";
import { ViewProvider } from "~/context/view";

export const Route = createFileRoute("/test/vertical")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ViewProvider>
			<CurrentTaskProvider>
				<VerticalTimeframes />
			</CurrentTaskProvider>
		</ViewProvider>
	);
}
