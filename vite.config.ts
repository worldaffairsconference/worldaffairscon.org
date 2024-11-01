import { sveltekit } from "@sveltejs/kit/vite";
import { isoImport } from "vite-plugin-iso-import";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [isoImport(), sveltekit()],
	test: {
		globals: true,
		include: ["src/**/*.test.ts"],
		reporters: ["default", "json"],
		outputFile: {
			json: "./reports/unit.json"
		},
		environment: "jsdom",
		setupFiles: ["./setupTest.js"],
		coverage: {
			enabled: true,
			reporter: ["text", ["json", { file: "coverage.json" }]],
			reportsDirectory: "reports",
			all: true,
			include: ["src/lib/**"],
			provider: "v8"
		}
	}
});
