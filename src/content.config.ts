import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, getCollection, reference } from "astro:content";

import type { CollectionEntry } from "astro:content";

const post = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  draft: z.boolean().optional().default(false),
  tags: z.array(reference("tags")).optional().default([]),
  related: z.array(reference("blog")).optional().default([]),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/blog",
  }),
  schema: post,
});

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/projects",
  }),
  schema: z
    .object({
      url: z.string().optional(),
      githubUrl: z.string().optional(),
    })
    .extend(post.shape),
});

const tags = defineCollection({
  loader: file("./src/content/tags.json"),
  schema: z.object({
    id: z.string(),
    iconUrl: z.string().optional(),
  }),
});

export type BlogPost = CollectionEntry<"blog">;
export type Project = CollectionEntry<"projects">;
export type Tag = CollectionEntry<"tags">;

export const getProjects = async (options?: { withDraft: true }): Promise<Project[]> => {
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

export const getTags = async (): Promise<Tag[]> => {
  const tags = await getCollection("tags");
  return tags;
};

export const collections = { blog, projects, tags };
