<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
</script>

<svelte:head>
	<title>World Affairs Conference</title>
</svelte:head>

<Header />

<main class="mx-auto w-full grow">
	<slot />
</main>

<Footer />
