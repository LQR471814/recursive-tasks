import { type ClassValue, clsx } from "clsx";
import { createEffect, createRoot, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const [now, setNow] = createSignal(Temporal.Now.zonedDateTimeISO());
createRoot(() => {
	createEffect(() => {
		const interval = setInterval(
			() => {
				setNow(Temporal.Now.zonedDateTimeISO());
			},
			60 * 1000 * 1000,
		);
		return () => {
			clearInterval(interval);
		};
	});
});
export { now };

export function currentTz() {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
