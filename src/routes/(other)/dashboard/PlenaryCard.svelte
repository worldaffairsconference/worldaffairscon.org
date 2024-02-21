<script lang="ts">
	import BaseAccordion from "$lib/components/BaseAccordion.svelte";

	export let index: number;

	export let theme: string | null | undefined;
	export let speakers: {
		id: string;
		name: string | null | undefined;
		title: string | null | undefined;
		shortBio: string | null | undefined;
	}[];
	// export let preferenceRank: number;

	let open = false;
</script>

<BaseAccordion
	bind:open
	class="bg-zinc-700 border border-zinc-500 m-1.5 sm:m-2 p-3 sm:p-4 rounded-md"
>
	<div class="flex items-center gap-3" slot="header">
		<span class="ml-1 font-semibold text-white text-xl w-4">
			{index + 1}
		</span>
		<div class="flex gap-4 w-full justify-between">
			<div class="flex flex-col gap-1.5">
				<h4
					class="text-white font-semibold leading-snug text-sm sm:text-base"
				>
					{theme}
				</h4>
			</div>

			<div class="relative text-zinc-400">
				<div
					class="duration-200 transition-opacity {open &&
						'opacity-0'}"
				>
					<i class="fa-solid fa-angle-down"></i>
				</div>
				<div
					class="absolute inset-0 duration-200 transition-opacity {!open &&
						'opacity-0'}"
				>
					<i class="fa-solid fa-angle-up"></i>
				</div>
			</div>
		</div>
	</div>

	<div class="ml-1 sm:ml-8 pt-3 text-[0.95rem]" slot="content">
		<div class="flex gap-4 flex-col sm:flex-row">
			{#each speakers as speaker}
				<div class="text-[0.9rem] grow min-w-[20%]">
					<div class="mb-1">
						<div class="text-zinc-200 font-semibold -m-px">
							{speaker.name}
						</div>
						<div class="text-zinc-300">{speaker.title}</div>
					</div>
					<p class="text-zinc-400">
						{speaker.shortBio ?? "N / A"}
					</p>
				</div>
			{/each}
		</div>
	</div>
</BaseAccordion>
