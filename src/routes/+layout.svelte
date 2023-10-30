<script lang="ts">
	import "./global.css";

	import { Toaster } from "svelte-french-toast";

	import Footer from "./Footer.svelte";
	import Header from "./Header.svelte";
</script>

<Header />

<main class="mx-auto w-full grow">
	<slot />
</main>

<Footer />

<Toaster />
