// @ts-check
import { defineConfig } from "astro/config";
import remarkSectionize from "remark-sectionize";

import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";

import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import ecTwoSlash from "expressive-code-twoslash";
import { pluginCodeCaption } from "@fujocoded/expressive-code-caption";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		expressiveCode({
			plugins: [pluginCollapsibleSections(), pluginCodeCaption(), ecTwoSlash()],
			themes: ["github-dark-default"],
		}),
		mdx({
			remarkPlugins: [remarkSectionize],
		}),
		react(),
	],

	site: "https://favteo.com",
	markdown: {
		remarkPlugins: [remarkToc],
	},
	image: {
		domains: ["svgl.app"],
		remotePatterns: [
			{
				protocol: "https",
			},
		],
	},
	experimental: {
		svg: true,
	},
});
