import type { ComponentProps } from "react";
import "./index.css";

import { cn } from "src/util/cn";

type Props = Pick<
	ComponentProps<"input">,
	"id" | "className" | "defaultValue" | "aria-label" | "children" | "min" | "max" | "alt"
> & {
	onChange: (value: number) => void;
};

export const Slider: React.FC<Props> = ({ id, onChange, className, children, ...props }) => {
	return (
		<>
			<label htmlFor={id} className="text-lg font-semibold">
				{children}
			</label>
			<input
				id={id}
				type="range"
				className={cn(className)}
				onChange={e => {
					e.preventDefault();
					return onChange(+e.target.value);
				}}
				{...props}
			/>
		</>
	);
};
