/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "#4ea59c",
				secondary: "#52a7dc",
				neutral: "#2B2C32"
			},
			fontFamily: {
				sans: ['"Poppins"', "sans-serif"]
			},
			transitionTimingFunction: {
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)"
			}
		}
	},
	plugins: []
};
