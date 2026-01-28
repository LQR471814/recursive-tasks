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
		return ""
	});
	return (
		<div class="flex gap-2 rounded-md border border-muted shadow-sm">
			<div
				classList={{
					"p-2": true,
					"rounded-full": true,
					[color()]: true,
				}}
			/>
			{props.name}
		</div>
	);
}
