import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'vite build --mode test && vite preview',
		port: 4173
	},
	testDir: 'e2e',
	testMatch: /.+\.ts/,
	reporter: [['json', { outputFile: 'reports/e2e.json' }]],
	use: {
		screenshot: 'only-on-failure'
	}
};

export default config;
