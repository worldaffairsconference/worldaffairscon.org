<script lang="ts">
	import { page } from "$app/stores";
	import { PUBLIC_DEPLOY_PRIME_URL } from "$env/static/public";
	import "./global.css";
</script>

<svelte:head>
	<meta
		property="og:image"
		content="{PUBLIC_DEPLOY_PRIME_URL}/page-previews/page-preview{$page.url.pathname.replaceAll(
			'/',
			'-'
		)}.png"
	/>
</svelte:head>

<slot />
