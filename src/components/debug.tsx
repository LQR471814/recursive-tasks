import type { Component } from "solid-js";

export function debug(cmp: Component, fallback?: Component) {
	return import.meta.env.DEV ? cmp : (fallback ?? (() => <></>));
}
