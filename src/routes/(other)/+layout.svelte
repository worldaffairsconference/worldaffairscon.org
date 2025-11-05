<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
	import StarField from "$lib/components/StarField.svelte";
</script>

<StarField speed={2.5}>
	<div class="gradient-bg"></div>

	<Header />

	<main class="mx-auto w-full grow">
		<slot />
	</main>

	<Footer />
</StarField>

<style>
	.gradient-bg {
		position: fixed;
		inset: 0;
		z-index: -5;
		background: linear-gradient(135deg, #0a0a0a, #1a1d29, #141825, #120c13);
		background-size: cover;
	}
</style>
