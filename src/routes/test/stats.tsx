import { createFileRoute } from "@tanstack/solid-router";
import { debug } from "src/components/debug";

export const Route = createFileRoute("/test/stats")({
	component: debug(RouteComponent),
});

function RouteComponent() {
	return <div>Hello "/test/stats"!</div>;
}
