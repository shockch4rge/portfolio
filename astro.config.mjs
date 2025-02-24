// @ts-check
import { defineConfig } from "astro/config";
import remarkSectionize from "remark-sectionize";

import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";

import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import remarkLastUpdatedTime from "./src/util/plugins/last-updated-time.mjs";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		expressiveCode(),
		mdx({
			remarkPlugins: [remarkSectionize, remarkLastUpdatedTime],
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
