import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div class="flex flex-col gap-3">
			<p>index route</p>
		</div>
	);
}
