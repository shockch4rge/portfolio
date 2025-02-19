import "shiki-magic-move/dist/style.css";

import { ShikiMagicMove } from "shiki-magic-move/react";

import { highlighter } from "@util/highlighter";

import type { BundledLanguage } from "shiki/bundle/web";

interface Props {
	code: string;
	lang: BundledLanguage;
}

export const CodeBlock: React.FC<Props> = ({ code, lang }) => {
	return (
		<ShikiMagicMove
			className="my-8 px-8 py-6 [&>span]:text-sm [&>span]:font-display rounded-md border-2 border-gray-600"
			lang="ts"
			theme="github-dark-default"
			highlighter={highlighter}
			code={code}
			options={{ duration: 300, stagger: 0.2 }}
		/>
	);
};
