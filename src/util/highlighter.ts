import type { Component, JSX } from "react";
import type { BundledLanguage } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/web";

export async function highlight(code: string, lang: BundledLanguage, component: (props: any) => React.ReactNode) {
	const out = await codeToHast(code, {
		lang,
		theme: "github-dark",
	});

	return toJsxRuntime(out, {
		Fragment,
		jsx,
		jsxs,
		components: {
			// your custom `pre` element
			pre: component,
		},
	}) as JSX.Element;
}
