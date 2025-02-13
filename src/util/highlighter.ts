import { createHighlighterCore } from "shiki/bundle/web";
import { createJavaScriptRegexEngine } from "shiki/engine-javascript.mjs";

export const highlighter = await createHighlighterCore({
	themes: [import("@shikijs/themes/github-dark-default")],
	langs: [import("@shikijs/langs/typescript")],
	engine: createJavaScriptRegexEngine(),
});
