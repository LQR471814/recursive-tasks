import { createFileRoute } from "@tanstack/solid-router";
import { HorizontalControlled } from "src/components/panes/horizontal-controlled";
import { ViewProvider } from "~/context/view";
import { CurrentTaskProvider } from "~/context/current-task";
import { debug } from "src/components/debug";

export const Route = createFileRoute("/test/horizontal")({
	component: debug(RouteComponent),
});

function RouteComponent() {
	return (
		<ViewProvider>
			<CurrentTaskProvider>
				<HorizontalControlled />
			</CurrentTaskProvider>
		</ViewProvider>
	);
}
