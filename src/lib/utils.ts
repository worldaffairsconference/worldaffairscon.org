export const mode =
	import.meta.env.MODE === 'dev'
		? 'dev'
		: import.meta.env.MODE === 'prod'
		? 'prod'
		: import.meta.env.MODE === 'test'
		? 'test'
		: 'unknown';
if (mode === 'unknown') console.warn('Unknown runtime mode');
