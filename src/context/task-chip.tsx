import { createContext } from "solid-js";

export type TaskChipValue = {
	namespace?: string;
};

export const TaskChipContext = createContext<TaskChipValue>();
