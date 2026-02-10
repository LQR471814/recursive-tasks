import { createFileRoute } from "@tanstack/solid-router";
import { debug } from "src/components/debug";
import { VerticalTimeframes } from "src/components/panes/vertical";
import { CurrentTaskProvider } from "src/context/current-task";
import { ViewProvider } from "src/context/view";

export const Route = createFileRoute("/test/vertical")({
	component: debug(RouteComponent),
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
