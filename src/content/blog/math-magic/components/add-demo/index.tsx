import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { ComponentProps, JSX } from "react";
type Props = ComponentProps<"div"> & Record<`step-${string}`, JSX.Element>;

type Direction = -1 | 1;

export const AddDemo: React.FC<Props> = props => {
	const [[step, direction], setStep] = useState<[number, Direction]>([0, 1]);
	const maxSteps = 5;

	const variants = {
		enter: (direction: Direction) => ({
			// x: direction === 1 ? 1000 : -1000,
			opacity: 0,
			scaleX: 0.9,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scaleX: 1,
		},
		exit: (direction: Direction) => ({
			zIndex: 0,
			// x: direction === -1 ? 1000 : -1000,
			opacity: 0,
			scaleX: 0.9,
		}),
	};

	const steps = Array(maxSteps)
		.fill(0)
		.map((_, i) => props[`step-${i + 1}`]);

	const paginate = (newDirection: Direction) => {
		if (step + newDirection < 0 || step + newDirection >= maxSteps) {
			return;
		}

		setStep([step + newDirection, newDirection]);
	};

	return (
		<div
			// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
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
			<div className="mt-8 self-center flex items-center space-x-6">
				<button
					type="button"
					disabled={step === 0}
					onClick={() => paginate(-1)}
					className="p-2 flex justify-center items-center border-2 border-slate-700 disabled:border-slate-800 not-disabled:active:scale-95 bg-gray-900 hover:bg-slate-700 disabled:bg-transparent text-gray-400 disabled:text-gray-600 text-xl rounded-full transition-colors"
				>
					<i className="ph-bold ph-caret-left">previous</i>
				</button>
				<p className="text-center font-display">Step {step + 1}</p>
				<button
					type="button"
					disabled={step === maxSteps - 1}
					onClick={() => paginate(1)}
					className="p-2 flex justify-center items-center border-2 border-slate-700 disabled:border-slate-800 not-disabled:active:scale-95 bg-gray-900 hover:bg-slate-700 disabled:bg-transparent text-gray-400 disabled:text-gray-600 text-xl rounded-full transition-colors"
				>
					<i className="ph-bold ph-caret-right">next</i>
				</button>
			</div>
			<div className="min-h-80 relative">
				<AnimatePresence initial={false} custom={direction}>
					{steps.map(
						(s, i) =>
							i === step && (
								<motion.div
									key={step}
									variants={variants}
									custom={direction}
									transition={{
										duration: 0.2,
										ease: [0.18, 0.89, 0.23, 1],
									}}
									className="absolute inset-x-12"
									initial="enter"
									animate="center"
									exit="exit"
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
