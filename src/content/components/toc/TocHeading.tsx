import type { Heading } from "./Toc";

type Props = { heading: Heading };
export const TocHeading: React.FC<Props> = ({ heading }) => {
	const isSubheading = heading.depth === 3;
	return (
		<li
			className={`${
				isSubheading ? "ml-6 text-sm" : "flex flex-col"
			} w-full text-base font-body font-medium text-gray-600 hover:text-gray-400 transition-colors list-none`}
		>
			<a className={isSubheading ? "min-h-4" : "min-h-8"} href={`#${heading.slug}`}>
				{heading.text
					.split(" ")
					.map(s => `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`)
					.join(" ")}
				{heading.subheadings.length > 0 && (
					<ul className="my-2 space-y-2">
						{heading.subheadings.map(subheading => (
							<TocHeading key={`${subheading.slug}`} heading={subheading} />
						))}
					</ul>
				)}
			</a>
		</li>
	);
};
