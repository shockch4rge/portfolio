import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import ecTwoSlash from "expressive-code-twoslash";
import { defineEcConfig } from "astro-expressive-code";
import { pluginCodeCaption } from "@fujocoded/expressive-code-caption";

export default defineEcConfig({
	plugins: [pluginCollapsibleSections(), pluginCodeCaption(), ecTwoSlash()],
	themes: ["github-dark-default"],
});
