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
	class="bg-zinc-700 border border-zinc-500 m-2 p-3.5 sm:p-4 rounded-md flex gap-1.5"
>
	<div class="flex items-center gap-6" slot="header">
		<span class="ml-1 font-semibold text-white text-2xl">
			{index + 1}
		</span>
		<div class="flex gap-4 w-full justify-between">
			<div class="flex flex-col gap-1.5">
				<h4 class="text-white line-clamp-2 font-semibold">
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

	<div class="ml-8 pt-2.5 text-[0.95rem]" slot="content">
		<!-- TODO: Collapse the columns into a single one when the screen width is too small -->
		<div class="flex gap-4">
			{#each speakers as speaker}
				<div class="text-[0.9rem]" style="flex: 1 1 0px;">
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
