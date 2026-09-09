// @ts-check
import { defineConfig } from "astro/config";
import remarkSectionize from "remark-sectionize";

import mdx from "@astrojs/mdx";
import remarkToc from "remark-toc";

import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import remarkLastUpdatedTime from "./src/util/plugins/last-updated-time.mjs";
import { unified } from "@astrojs/markdown-remark";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ["dev.favteo.com"],
        },
    },
    integrations: [expressiveCode(), mdx(), react()],

    site: "https://favteo.com",
    markdown: {
        processor: unified({
            remarkPlugins: [remarkToc, remarkSectionize, remarkLastUpdatedTime],
        }),
    },
    image: {
        domains: ["svgl.app"],
        remotePatterns: [
            {
                protocol: "https",
            },
        ],
    },
});
