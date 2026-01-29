import { createDraggable } from "@thisbeyond/solid-dnd";
import { createMemo, useContext } from "solid-js";
import { TaskChipContext } from "src/context/task-chip";
import { cn } from "src/lib/utils";

function Display(props: {
	class?: string;
	name: string;
	color: string;
	onClick: () => void;
	ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
}) {
	return (
		<button
			type="button"
			class={cn(
				"flex items-center gap-2 rounded-md border shadow-sm px-2 cursor-default hover:bg-primary/5 transition-colors touch-none bg-background",
				props.class,
			)}
			onClick={props.onClick}
			ref={props.ref}
		>
			<div
				classList={{
					"aspect-square": true,
					"p-1": true,
					"rounded-full": true,
					[props.color]: true,
				}}
			/>
			{props.name}
		</button>
	);
}

export function TaskChip(props: {
	id: string;
	name: string;
	color: string;
	onClick: () => void;
	class?: string;
}) {
	const ctx = useContext(TaskChipContext);
	const id = createMemo(() =>
		ctx?.namespace ? `${ctx.namespace}:${props.id}` : props.id,
	);
	try {
		const draggable = createMemo(() =>
			createDraggable(id(), { taskId: props.id }),
		);
		return (
			<Display
				class={cn("draggable", props.class)}
				name={props.name}
				color={props.color}
				onClick={props.onClick}
				ref={draggable()}
			/>
		);
	} catch {
		return (
			<Display
				class={cn("draggable", props.class)}
				name={props.name}
				color={props.color}
				onClick={props.onClick}
			/>
		);
	}
}
