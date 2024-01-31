/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "#4ea59c",
				secondary: "#52a7dc"
			},
			fontFamily: {
				sans: ['"Poppins"', "sans-serif"]
			}
		}
	},
	plugins: []
};
