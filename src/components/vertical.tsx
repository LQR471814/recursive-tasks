import { Timeframe } from "~/components/timeframe";
import {
	day,
	daypart,
	decade,
	fiveyear,
	month,
	quarter,
	semester,
	week,
	year,
} from "~/lib/timescales";
import { now } from "~/lib/utils";

export function VerticalTimeframes() {
	return (
		<div class="flex flex-col gap-1">
			<Timeframe timescale={decade} time={now()} />
			<Timeframe timescale={fiveyear} time={now()} />
			<Timeframe timescale={year} time={now()} />
			<Timeframe timescale={semester} time={now()} />
			<Timeframe timescale={quarter} time={now()} />
			<Timeframe timescale={month} time={now()} />
			<Timeframe timescale={week} time={now()} />
			<Timeframe timescale={day} time={now()} />
			<Timeframe timescale={daypart} time={now()} />
		</div>
	);
}
