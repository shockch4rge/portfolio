import { useState } from "react";

import { Slider } from "@content/components/slider/Slider";

export const GridExample = () => {
	const [width, setWidth] = useState(100);

	return (
		<>
			<div style={{ width: `${width}%` }} className="@container min-w-48 h-96 bg-white/5 rounded-md p-2">
				<div className="h-full grid grid-cols-1 @xs:grid-cols-[3fr_1fr] @md:grid-cols-[1fr_16rem_8rem_1fr] @[38rem]:grid-cols-[1fr_22rem_10em_1fr] justify-center relative gap-2">
					<div className="hidden @md:grid place-items-center col-span-1 row-span-full border-2 border-dashed border-gray-300 rounded-sm text-white font-bold">
						1fr
					</div>
					<div className="grid place-items-center bg-slate-800 col-start-1 @md:col-start-2 col-span-1 row-span-full rounded-sm border-2 border-dashed border-indigo-400 text-white font-bold">
						CONTENT
					</div>
					<div className="hidden @xs:grid @xs:min-w-24 place-items-center bg-slate-800 col-start-2 @md:col-start-3 col-span-1 row-span-full rounded-sm border-2 border-dashed border-indigo-400 text-lg text-white font-bold">
						TOC
					</div>
					<div
						key="grid-example-col-4"
						className="hidden @md:grid place-items-center col-span-1 row-span-full border-2 border-dashed border-gray-300 rounded-sm text-white font-bold"
					>
						1fr
					</div>
				</div>
			</div>
			<div className="mt-8 mb-6 my-4 w-full px-12 md:px-24 flex flex-col justify-center items-center space-y-4">
				<Slider id="slider" defaultValue={100} onChange={setWidth}>
					<span className="text-white">Current width: </span>
					<span className="text-primary">{width}%</span>
				</Slider>
			</div>
		</>
	);
};
