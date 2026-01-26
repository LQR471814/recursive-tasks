import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/test/resizable/create-task")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div class="absolute right-0 h-full">Create task</div>;
}
