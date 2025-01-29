import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		fontFamily: {
			display: ["JetBrains Mono", "monospace"],
			body: ["Satoshi Variable", ...defaultTheme.fontFamily.sans],
		},
		extend: {
			screens: {
				xxs: "400px",
				"2lg": "1160px",
			},
			container: {
				padding: {
					lg: "16rem",
				},
			},
			colors: {
				primary: "#FFE292",
				secondary: "#0F1522",
			},
			keyframes: {
				slide: {
					from: {
						transform: "translateX(-20%)",
					},
					to: {
						transform: "translateX(calc(-120% - 1.5rem))",
					},
				},

				"fade-in": {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
			},
			animation: {
				carousel: "slide 10s linear infinite",
				"fade-in": "fade-in 0.2s ease-in-out",
			},
		},
	},
	plugins: [require("@tailwindcss/container-queries")],
};
