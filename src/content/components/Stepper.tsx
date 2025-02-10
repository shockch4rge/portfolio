import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "src/util/cn";

import type { ComponentProps, JSX } from "react";

type Props = ComponentProps<"div"> &
	Record<`${string}-step-${string}`, JSX.Element> & {
		maxSteps: number;
		stepId: string;
	};

export const Stepper: React.FC<Props> = ({ maxSteps, stepId, ...props }) => {
	const [step, setStep] = useState(0);
	const stepVisual = step + 1;
    const ticker = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	const steps = Array(maxSteps)
		.fill(0)
		.map((_, i) => props[`${stepId}-step-${i}`]);

	const paginate = (direction: -1 | 1) => {
		setStep(step => step + direction);
	};

	return (
		<div
			// biome-ignore lint/a11y/noNoninteractiveTabindex: we need to create a focusable context for arrow keys
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
						animate={{
							y: -Math.floor(stepVisual / 10) * 32,
						}}
					>
						{ticker.map(d => (
							<span key={`${stepId}-step-${d}-left`}>{d}</span>
						))}
					</motion.div>
					<motion.div
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
			<div className="min-h-96 relative">
				<AnimatePresence initial={false}>
					{steps.map(
						(s, i) =>
							i === step && (
								<motion.div
									key={step}
									transition={{
										duration: 0.2,
										ease: [0.18, 0.89, 0.23, 1],
									}}
									className="absolute inset-x-12"
									initial={{
										opacity: 0,
										scaleX: 0.9,
									}}
									animate={{
										zIndex: 1,
										x: 0,
										opacity: 1,
										scaleX: 1,
									}}
									exit={{
										zIndex: 0,
										opacity: 0,
										scaleX: 0.9,
									}}
								>
									{s}
								</motion.div>
							)
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};
