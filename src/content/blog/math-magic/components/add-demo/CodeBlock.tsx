import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { motion } from "motion/react";
import { Fragment, useLayoutEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/web";

import type { JSX } from "react";
interface Props {
	code: string;
	className: string;
}

export const CodeBlock: React.FC<Props> = ({ code }) => {
	const [out, setOut] = useState<any>(null);

	useLayoutEffect(() => {
		codeToHast(code, {
			lang: "ts",
			theme: "github-dark",
		}).then(setOut);
	}, [code]);

	return out ? (
		(toJsxRuntime(out, {
			Fragment,
			jsx,
			jsxs,
			components: {
				pre: props => <motion.pre data-custom-codeblock {...props} />,
			},
		}) as JSX.Element)
	) : (
		<p>Loading</p>
	);
};
