import type { MarkdownHeading } from "astro";
import { motion } from "motion/react";
import { useMemo } from "react";
import { cn } from "src/util/cn.ts";

import { TocHeading } from "./TocHeading.tsx";

type Props = {
	headings: MarkdownHeading[];
};

export type Heading = MarkdownHeading & {
	subheadings: Heading[];
};

export const Toc: React.FC<Props> = ({ headings }) => {
	const buildToc = (headings: MarkdownHeading[]) => {
		const toc: Heading[] = [];
		const parentHeadings = new Map<number, Heading>();

		for (const h of headings) {
			if (h.depth === 1) continue;
			const heading = { ...h, subheadings: [] };
			parentHeadings.set(heading.depth, heading);

			if (heading.depth === 2) {
				toc.push(heading);
				continue;
			}

			parentHeadings.get(heading.depth - 1)!.subheadings.push(heading);
		}

		return toc;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const toc = useMemo(() => buildToc(headings), [headings]);

	return (
		<motion.nav
			id="toc"
			className={cn(
				"place-self-end self-start col-start-3 col-span-1 contents-center",
				"row-start-1 row-[span_1_/_span_300]",
				"hidden lg:block",
				"sticky top-40", // height of navbar + top container padding
				"text-slate-700 rounded-xs scroll-mt-8"
			)}
			aria-label="Table of contents"
			initial={{
				opacity: 0,
				translateY: 30,
			}}
			animate={{
				opacity: 1,
				translateY: 0,
				transition: {
					ease: [0.18, 0.89, 0.23, 1],
					duration: 1.4,
				},
			}}
		>
			<div className="mb-4 text-lg text-primary font-bold font-body tracking-[0.2rem]">CONTENTS</div>
			<ul>
				{toc.map(h => (
					<TocHeading key={h.slug} heading={h} />
				))}
			</ul>
		</motion.nav>
	);
};
