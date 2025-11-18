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
		z-index: -10;
		background: linear-gradient(135deg, #171414, #202434, #171b2b, #150d16);
		background-size: cover;
	}
</style>
