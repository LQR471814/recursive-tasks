import { createFileRoute } from "@tanstack/solid-router";
import { HorizontalTimeframes } from "~/components/horizontal";
import { day, week } from "~/lib/timescales";

export const Route = createFileRoute("/test/horizontal")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <HorizontalTimeframes parent={week} child={day} />
  );
}
