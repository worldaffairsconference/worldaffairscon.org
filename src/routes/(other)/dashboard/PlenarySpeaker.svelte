<script lang="ts">
	import BaseAccordion from "$lib/components/BaseAccordion.svelte";

	export let speakerTitle: string;
	export let theme: string;
	export let speakerName: string;
	export let description: string;
	export let index: number;

	let open = false;
</script>

<BaseAccordion
	bind:open
	class="bg-zinc-700 border border-zinc-500 m-2 p-3.5 sm:p-4 rounded-md flex gap-1.5"
>
	<div class="flex items-center gap-6" slot="header">
		<span class="ml-1 font-semibold text-white text-2xl">
			{index}
		</span>
		<div class="flex gap-4 w-full justify-between">
			<div class="flex flex-col gap-1.5">
				<h4 class="text-white line-clamp-2 font-semibold">
					{theme}
				</h4>
				<div class="text-[0.9rem]">
					<div class="text-zinc-200 font-semibold -m-px">
						{speakerName}
					</div>
					<div class="text-zinc-300">{speakerTitle}</div>
				</div>
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
		<p class="text-zinc-400">
			{description}
		</p>
	</div>
</BaseAccordion>
