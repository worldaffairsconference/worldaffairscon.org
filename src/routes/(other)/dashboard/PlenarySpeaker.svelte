<script lang="ts">
	import BaseAccordion from "$lib/components/BaseAccordion.svelte";

	export let label: string;
	export let index: number;

	let open = false;
</script>

<BaseAccordion
	bind:open
	class="bg-zinc-700 border border-zinc-500 m-2 p-3.5 sm:p-4 rounded-md flex gap-1.5"
>
	<div class="flex justify-between items-center text-zinc-100" slot="header">
		<div>
			<span class="font-bold text-white mr-1">
				{index}.
			</span>
			<span>
				{label}
			</span>
		</div>

		<div>
			<svg
				class="duration-300 ease-in-out text-zinc-400 transition-all"
				fill="none"
				height="20"
				width="20"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				class:-rotate-180={open}
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</div>
	</div>

	<p class="text-zinc-400 pt-2 text-sm" slot="content">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsam,
		inventore reiciendis, laudantium, non enim magnam necessitatibus tenetur
		debitis nisi cupiditate vel repellendus eum doloremque beatae ratione
		magni. Tenetur, voluptates!
	</p>
</BaseAccordion>
