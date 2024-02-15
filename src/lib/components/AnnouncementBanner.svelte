<script>
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import waterBottleImage from "$lib/assets/images/merch/water-bottles.png";
	import pinImage from "$lib/assets/images/merch/pins.png";

	export let isOpen = false;

	$: isOpen, updateBodyOverflow();

	// Prevents the body from scrolling when the modal is open
	const updateBodyOverflow = () => {
		if (!browser) return;

		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	};

	onMount(() => {
		const wasAnnouncementShownAlready = localStorage.getItem(
			"wasAnnouncementShownAlready"
		);
		const wasAnnouncementShown = wasAnnouncementShownAlready === "true";

		if (!wasAnnouncementShown) {
			setTimeout(() => {
				isOpen = true;
				localStorage.setItem("wasAnnouncementShownAlready", "true");
			}, 2000);
		}
	});
</script>

<div
	class="fixed inset-0 flex items-center justify-center z-50 bg-zinc-950/20 backdrop-blur-md {isOpen
		? 'visible opacity-100'
		: 'invisible opacity-0'} transition-all duration-300 ease-in"
>
	<div
		class="bg-zinc-700 border-2 border-zinc-500 rounded-2xl py-9 px-6 sm:px-16 max-w-screen-sm m-4 relative"
	>
		<button
			class="text-[1.7rem] absolute right-5 top-5 text-zinc-300"
			on:click={() => (isOpen = false)}
		>
			<i class="fa-solid fa-xmark"></i>
		</button>
		<div
			class="text-[3.5rem] sm:text-[4.25rem] text-primary text-center mb-2"
		>
			<i class="fa fa-bullhorn" aria-hidden="true"></i>
		</div>
		<h1
			class="text-white text-3xl sm:text-4xl text-center font-semibold tracking-tight mb-4 sm:mb-5"
		>
			WAC Merch is Available!
		</h1>
		<p class="text-zinc-400 mb-5">
			To support sustainability, WAC will not provide single use water
			bottles this year. You can either bring your own water bottle or
			support WAC by purchasing a WAC-branded water bottle at the
			conference. You can also buy other merchandise like pins and
			stickers on conference day with cash or credit card.
		</p>
		<div class="flex justify-center gap-10 items-center">
			<img
				src={waterBottleImage}
				alt="WAC Water Bottles"
				class="h-32 sm:h-36"
			/>
			<img src={pinImage} alt="WAC Water Bottles" class="h-20 sm:h-24" />
		</div>
	</div>
</div>
