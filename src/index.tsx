/* @refresh reload */
import "./index.css";
import "temporal-polyfill/global";
import { render } from "solid-js/web";
import "solid-devtools";
import { createRouter, RouterProvider } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import "solid-devtools";
import { attachDevtoolsOverlay } from "@solid-devtools/overlay";
import { queryClient } from "./lib/query";

attachDevtoolsOverlay();

if (import.meta.env.DEV) {
	// @ts-expect-error: add query client for devtools
	window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}

const router = createRouter({ routeTree });

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

if (root) render(() => <RouterProvider router={router} />, root);
