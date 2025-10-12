<script lang="ts">
	import { onMount } from "svelte";

	import logo from "$lib/assets/images/logos/wac_medium.webp";
	import StarField from "$lib/components/StarField.svelte";

	let headerElement: HTMLElement | undefined;
	let lastScrollTop: number;
	let navBarFixed = false;
	let navBarShowing = true;

	onMount(async () => {
		window.addEventListener("scroll", () => {
			if (headerElement === undefined) return;

			var scrollTop =
				window.scrollY || document.documentElement.scrollTop;

			navBarFixed = scrollTop >= 350;
			navBarShowing = scrollTop < lastScrollTop;
			lastScrollTop = scrollTop;
		});
	});
</script>

<header
	class="flex items-center justify-between px-6 lg:px-16 h-[5.5rem] sm:h-28 md:h-[8.5rem] w-full z-50 transition-all duration-[400ms]
	{navBarFixed ? '' : 'absolute bg-transparent'} 
	{navBarFixed ? (navBarShowing ? 'top-0' : '-top-[150px]') : ''}"
	bind:this={headerElement}
	id="header"
>
	<a href="/" class="hover:brightness-110 transition-all">
		<img src={logo} alt="logo" class="h-9 sm:h-14" />
	</a>
</header>

<StarField speed={2.5}>
	<slot />
</StarField>
