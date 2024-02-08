<script lang="ts">
	import LargeAccordion from "$lib/components/LargeAccordion.svelte";
	import flowchart1 from "$lib/assets/images/registration/flowcharts/1.png";
	import flowchart2 from "$lib/assets/images/registration/flowcharts/2.png";
	import flowchart3 from "$lib/assets/images/registration/flowcharts/3.png";
</script>

<svelte:head>
	<title>Authentication Error</title>
</svelte:head>

<section
	class="absolute inset-0 flex justify-center items-center overflow-scroll"
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
				<p class="text-sm sm:text-base text-zinc-400 mb-2">
					We have <a
						href="https://imgs.xkcd.com/comics/flow_charts.png"
						>flowcharts</a
					> for you!
				</p>
				<div class="grid grid-cols-3">
					<img src={flowchart1} alt="Flowchart 1" />
					<img src={flowchart2} alt="Flowchart 2" />
					<img src={flowchart3} alt="Flowchart 3" />
				</div>
			</LargeAccordion>
		</div>
	</div>
</section>
