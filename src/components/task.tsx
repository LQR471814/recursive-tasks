import { createMemo } from "solid-js";

export function Chip(props: {
	name: string;
	blocked: boolean;
	onClick: () => void;
}) {
	const color = createMemo(() => {
		const status = "pending" as string;
		switch (status) {
			case "pending":
				return "bg-gray-500";
			case "completed":
				return "bg-green-500";
			case "dropped":
				return "bg-red-500";
		}
		return "";
	});
	return (
		<button
			type="button"
			class="flex items-center gap-2 rounded-md border shadow-sm px-2 cursor-default hover:bg-primary/5 transition-colors"
			onClick={props.onClick}
		>
			<div
				classList={{
					"aspect-square": true,
					"p-1": true,
					"rounded-full": true,
					[color()]: true,
				}}
			/>
			{props.name}
		</button>
	);
}
