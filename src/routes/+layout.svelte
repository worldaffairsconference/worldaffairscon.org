<script lang="ts">
	import './global.css';

	import { user, userData } from '$lib/firebase';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	$user;
	$userData;
</script>

<Header />

<main class="mx-auto w-full grow">
	<slot />
</main>

<Footer />
