import { Search as CoreSearch } from "@kobalte/core/search";
import { RiDeviceRestartLine, RiSystemSearchLine } from "solid-icons/ri";
import { createSignal } from "solid-js";
import "./style.css";

export function Search<
	T,
	Field extends
	| keyof Exclude<T, null>
	| ((option: Exclude<T, null>) => string | number)
	| undefined,
	FieldLabel extends
	| keyof Exclude<T, null>
	| ((option: Exclude<T, null>) => string)
	| undefined,
>(props: {
	field: Field;
	fieldLabel: FieldLabel;
	label(val: T): string;
	query(text: string): T[];
	onChange(result: T | null): void;
}) {
	const [options, setOptions] = createSignal<T[]>([]);
	return (
		<CoreSearch
			triggerMode="focus"
			options={options()}
			onInputChange={(query) => setOptions(props.query(query))}
			onChange={props.onChange}
			optionValue={props.field}
			optionLabel={props.fieldLabel}
			placeholder="Search an emoji…"
			itemComponent={(p) => (
				<CoreSearch.Item item={p.item} class="search__item">
					<CoreSearch.ItemLabel>
						{props.label(p.item.rawValue)}
					</CoreSearch.ItemLabel>
				</CoreSearch.Item>
			)}
		>
			<CoreSearch.Control class="search__control" aria-label="Emoji">
				<CoreSearch.Indicator
					class="search__indicator"
					loadingComponent={
						<CoreSearch.Icon class="load__icon">
							<RiDeviceRestartLine class="spin__icon" />
						</CoreSearch.Icon>
					}
				>
					<CoreSearch.Icon class="search__icon">
						<RiSystemSearchLine class="center__icon" />
					</CoreSearch.Icon>
				</CoreSearch.Indicator>
				<CoreSearch.Input class="search__input" />
			</CoreSearch.Control>
			<CoreSearch.Portal>
				<CoreSearch.Content
					class="search__content"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<CoreSearch.Listbox class="search__listbox" />
					<CoreSearch.NoResult class="search__no_result">
						No results found
					</CoreSearch.NoResult>
				</CoreSearch.Content>
			</CoreSearch.Portal>
		</CoreSearch>
	);
}
