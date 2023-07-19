<!-- <script lang="ts">
	import { z } from 'zod';

	import Component from '$lib/Component.svelte';
	import { docStore } from '$lib/firebase';

	const test = docStore(
		'test/hi',
		z.object({ test: z.boolean() }).strict(),
		z.object({ test: z.boolean().catch(true) })
	);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<pre><code>{JSON.stringify($test, null, 2)}</code></pre>

<Component />
<Component />
<Component />
<Component /> -->
