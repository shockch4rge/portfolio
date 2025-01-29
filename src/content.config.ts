import { file, glob } from "astro/loaders";
import { defineCollection, getCollection, reference, z } from "astro:content";

import type { InferEntrySchema } from "astro:content";

const blog = defineCollection({
	loader: glob({
		pattern: "**/*.mdx",
		base: "./src/content/blog",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().optional().default(false),
		tags: z.array(reference("tags")).optional(),
		related: z.array(reference("blog")).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({
		pattern: "**/*.mdx",
		base: "./src/content/projects",
	}),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		githubUrl: z.string().optional(),
		url: z.string().optional(),
		draft: z.boolean().optional().default(false),
		tags: z.array(reference("tags")).optional(),
		related: z.array(reference("projects")).optional(),
	}),
});

const tags = defineCollection({
	loader: file("./src/content/tags.json"),
	schema: z.object({
		id: z.string(),
		iconUrl: z.string().optional(),
	}),
});

export type BlogPost = InferEntrySchema<"blog"> & { id: string };
export type Project = InferEntrySchema<"projects"> & { id: string };
export type Tag = InferEntrySchema<"tags">;

export const getProjects = async (options?: { withDraft: true }) => {
	const withDraft = options?.withDraft;
	const projects = await getCollection("projects");

	if (withDraft) {
		return projects;
	}

	return projects.filter(p => !p.data.draft);
};

export const getBlogPosts = async (options?: { withDraft: true }) => {
	const withDraft = options?.withDraft;
	const blogPosts = await getCollection("blog");

	if (withDraft) {
		return blogPosts;
	}

	return blogPosts.filter(p => !p.data.draft);
};

export const collections = { blog, projects, tags };
