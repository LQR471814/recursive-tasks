import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/test/resizable")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/test/resizable"!</div>;
}
