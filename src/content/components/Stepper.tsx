import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "src/util/cn";

import { CodeBlock } from "./CodeBlock";

import type { ComponentProps, JSX } from "react";

type Props = ComponentProps<"div"> &
	Record<`${string}-step-${string}`, JSX.Element> & {
		maxSteps: number;
		stepId: string;
		code: string[];
	};

export const Stepper: React.FC<Props> = ({ maxSteps, stepId, code, ...props }) => {
	const [step, setStep] = useState(0);
	// we need react state to animate shiki
	const [currentCode, setCurrentCode] = useState(code[0]);
	const shouldReduceMotion = useReducedMotion();
	const ticker = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const stepVisual = step + 1;

	const paginate = (direction: -1 | 1) => {
		setStep(step => step + direction);
	};

	useEffect(() => {
		setCurrentCode(code[step]);
	}, [code[step], step]);

	return (
		<div
			// biome-ignore lint/a11y/noNoninteractiveTabindex: create a focusable context for arrow keys
			tabIndex={0}
			className="w-full flex flex-col"
			onKeyDown={e => {
				switch (e.key) {
					case "ArrowLeft": {
						if (step !== 0) {
							paginate(-1);
						}

						return;
					}
					case "ArrowRight": {
						if (step !== maxSteps - 1) {
							paginate(1);
						}

						return;
					}
				}
			}}
		>
			<div className="mt-8 px-12 flex items-center justify-center space-x-6">
				<button
					type="button"
					disabled={step === 0}
					onClick={() => paginate(-1)}
					className={cn(
						"p-2 flex justify-center items-center",
						"bg-gray-900 hover:bg-slate-700 disabled:bg-transparent",
						"text-gray-300 disabled:text-gray-600 text-xl",
						"border-2 border-slate-700 disabled:border-slate-800",
						"not-disabled:active:scale-95 not-disabled:hover:scale-105",
						"rounded-lg transition"
					)}
				>
					<i className="ph-bold ph-caret-left">previous</i>
				</button>
				<div className="flex h-8 text-center text-2xl text-primary font-bold font-display [&_span]:block [&_span]:leading-[32px] overflow-y-hidden">
					<div className="mr-2 text-white">Step </div>
					<motion.div
						transition={shouldReduceMotion ? { duration: 0 } : undefined}
						animate={{
							y: -Math.floor(stepVisual / 10) * 32,
						}}
					>
						{ticker.map(d => (
							<span key={`${stepId}-step-${d}-left`}>{d}</span>
						))}
					</motion.div>
					<motion.div
						initial={{ y: -32 }}
						transition={shouldReduceMotion ? { duration: 0 } : undefined}
						animate={{
							y: -Math.round(((stepVisual / 10) % 1) * 10) * 32,
						}}
					>
						{ticker.map(d => (
							<span key={`${stepId}-step-${d}-right`}>{d}</span>
						))}
					</motion.div>
				</div>
				<button
					type="button"
					disabled={step === maxSteps - 1}
					onClick={() => paginate(1)}
					className={cn(
						"p-2 flex justify-center items-center",
						"bg-gray-900 hover:bg-slate-700 disabled:bg-transparent",
						"text-gray-300 disabled:text-gray-600 text-xl",
						"border-2 border-slate-700 disabled:border-slate-800",
						"not-disabled:active:scale-95 not-disabled:hover:scale-105",
						"rounded-lg transition"
					)}
				>
					<i className="ph-bold ph-caret-right">next</i>
				</button>
			</div>
			<div className="min-h-fit mx-8 grid grid-cols-1 relative">
				<div key={`${stepId}${step}`} className="col-start-1 row-start-1">
					<CodeBlock code={currentCode} lang="ts" />
				</div>
			</div>
		</div>
	);
};