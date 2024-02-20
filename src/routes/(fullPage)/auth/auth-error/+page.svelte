<script lang="ts">
	import LargeAccordion from "$lib/components/LargeAccordion.svelte";
	import FlowChartCarousel from "./FlowChartCarousel.svelte";

	import flowchart1 from "$lib/assets/images/registration/flowcharts/1-small.jpg";
	import flowchart2 from "$lib/assets/images/registration/flowcharts/2-small.jpg";

	let showCarousel = false;

	const openCarousel = () => {
		showCarousel = true;
	};
</script>

<svelte:head>
	<title>Authentication Error - World Affairs Conference</title>
</svelte:head>

<section
	class="absolute inset-0 flex justify-center items-center overflow-scroll z-50"
>
	<div
		class="p-3 sm:p-10 mx-4 rounded-xl bg-zinc-800 border-zinc-700 border text-center max-w-screen-sm"
	>
		<div
			class="text-[2.5rem] sm:text-[3rem] md:text-[3.25rem] text-red-500 mx-auto mb-2"
		>
			<i class="fa-regular fa-circle-xmark"></i>
		</div>
		<h2
			class="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-[2rem]"
		>
			Your school does not seem to be registered with us
		</h2>
		<div class="flex flex-col gap-4">
			<p
				class="text-sm sm:text-base text-zinc-400"
				style="text-wrap: balance;"
			>
				If you think this is a mistake (as in, your school is
				registered, but you are unable to sign in), please contact the
				registration team. Otherwise, please ask a teacher of yours to
				register your school by emailing us.
			</p>
			<p>
				<a
					href="mailto:registration@worldaffairscon.org"
					class="text-blue-400 underline"
				>
					registration@worldaffairscon.org
				</a>
			</p>
			<hr class="border-zinc-400 my-3" />

			<LargeAccordion header="Want more information on the process?">
				<button on:click={openCarousel} class="cursor-zoom-in">
					<p class="text-sm sm:text-base text-zinc-400 mb-2">
						We have <a
							href="https://imgs.xkcd.com/comics/flow_charts.png"
							>flowcharts</a
						> for you! Click to view them.
					</p>
					<div class="grid grid-cols-2">
						{#each [flowchart1, flowchart2] as image, i}
							<img src={image} alt="Flowchart Image {i}" />
						{/each}
					</div>
				</button>
			</LargeAccordion>
		</div>
	</div>
</section>

<FlowChartCarousel bind:showCarousel />
