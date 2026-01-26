import { createContext, createSignal, type ParentComponent } from "solid-js";
import type { TimescaleInstance } from "~/lib/timescales";

export type CurrentTaskState = {
	selectedTaskId?: number;
	newChildTimeframe?: TimescaleInstance;
};

export type CurrentTaskActions = {
	selectTask(taskId: number): void;
	newChild(timeframe: TimescaleInstance): void;
};

export const CurrentTaskContext = createContext<
	CurrentTaskState & CurrentTaskActions
>();

export const CurrentTaskProvider: ParentComponent = (props) => {
	const [state, setState] = createSignal<CurrentTaskState>();
	return (
		<CurrentTaskContext.Provider
			value={{
				...state(),
				selectTask(taskId) {
					setState({ selectedTaskId: taskId });
				},
				newChild(timeframe) {
					setState({ newChildTimeframe: timeframe });
				},
			}}
		>
			{props.children}
		</CurrentTaskContext.Provider>
	);
};
