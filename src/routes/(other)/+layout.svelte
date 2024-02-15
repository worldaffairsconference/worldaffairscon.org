<script lang="ts">
	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
</script>

<Header />

<main class="mx-auto w-full grow">
	<slot />
</main>

<Footer />
