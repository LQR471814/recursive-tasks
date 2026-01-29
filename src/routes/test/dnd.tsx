import { createFileRoute } from "@tanstack/solid-router";
import {
	createDraggable,
	createDroppable,
	DragDropProvider,
	DragDropSensors,
	type DragEventHandler,
	type Id,
} from "@thisbeyond/solid-dnd";
import { createSignal, type ParentComponent, Show } from "solid-js";

export const Route = createFileRoute("/test/dnd")({
	component: RouteComponent,
});

function RouteComponent() {
	return <DragAndDropExample />;
}

const Test = (props: { ref: (el: HTMLButtonElement) => void }) => {
	return (
		<button type="button" class="touch-none" ref={props.ref}>
			Draggable
		</button>
	);
};

const Draggable = () => {
	const draggable = createDraggable("drag_id");
	return <Test ref={(el) => draggable(el)} />;
};

const Droppable: ParentComponent<{ id: string }> = (props) => {
	const droppable = createDroppable(props.id);
	return (
		<button
			type="button"
			use:droppable
			class="w-full border border-blue-500 min-h-14"
			classList={{ "bg-muted": droppable.isActiveDroppable }}
			onDblClick={() => console.log("double clicked!")}
		>
			{props.children}
		</button>
	);
};

const DragAndDropExample = () => {
	const [where, setWhere] = createSignal<Id | undefined>(undefined);

	const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
		console.log(draggable.id, droppable?.id);
		setWhere(droppable?.id);
	};

	return (
		<DragDropProvider onDragEnd={onDragEnd}>
			<DragDropSensors />
			<div class="min-h-14 border border-red-500">
				<Show when={where() === undefined}>
					<Draggable />
				</Show>
			</div>
			<Droppable id="drop_1">
				<Show when={where() === "drop_1"}>
					<Draggable />
				</Show>
			</Droppable>
			<Droppable id="drop_2">
				<Show when={where() === "drop_2"}>
					<Draggable />
				</Show>
			</Droppable>
		</DragDropProvider>
	);
};
