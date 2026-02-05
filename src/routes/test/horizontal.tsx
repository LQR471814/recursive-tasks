import { createFileRoute } from "@tanstack/solid-router";
import { debug } from "src/components/debug";
import { HorizontalControlled } from "src/components/panes/horizontal-controlled";
import { CurrentTaskProvider } from "~/context/current-task";
import { ViewProvider } from "~/context/view";

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
