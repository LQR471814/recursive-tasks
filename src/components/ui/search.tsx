// biome-ignore-all lint/suspicious/noExplicitAny: lots of typescript shenanigans happening here

import type { Fn, Pipe, Tuples, Unions } from "hotscript";
import { createMemo } from "solid-js";
import {
	Combobox,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxTrigger,
} from "src/components/ui/combobox";

interface IsValidLabel<T extends Record<string, unknown>> extends Fn {
	return: T[this["arg0"]] extends string | number | Element ? true : false;
}

export function Search<
	T extends Record<string, unknown>,
	IDField extends keyof T,
	LabelField extends Pipe<
		keyof T,
		[Unions.ToTuple, Tuples.Filter<IsValidLabel<T>>, Tuples.ToUnion]
	>,
>(props: {
	name: string;
	selectedId: T[IDField];
	options: T[];
	idField: IDField;
	labelField: LabelField;
	onChange(result: T | null): void;
}) {
	const selected = createMemo(() =>
		props.options.find((o) => o[props.idField] === props.selectedId),
	);
	return (
		<Combobox
			name={props.name}
			value={selected()}
			options={props.options}
			optionValue={props.idField}
			optionTextValue={props.labelField as any}
			optionLabel={props.labelField as any}
			onChange={props.onChange}
			itemComponent={({ item }) => (
				<ComboboxItem item={item}>
					{(item.rawValue as any)[props.labelField]}
				</ComboboxItem>
			)}
		>
			<ComboboxTrigger>
				<ComboboxInput />
			</ComboboxTrigger>
			<ComboboxContent />
		</Combobox>
	);
}
