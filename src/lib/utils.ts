import { type ClassValue, clsx } from "clsx";
import { createEffect, createRoot, createSignal } from "solid-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const [now, setNow] = createSignal(Temporal.Now.zonedDateTimeISO());
createRoot(() => {
	createEffect(() => {
		const interval = setInterval(() => {
			setNow(Temporal.Now.zonedDateTimeISO());
		}, 10000);
		return () => {
			clearInterval(interval);
		};
	});
});
export { now }
