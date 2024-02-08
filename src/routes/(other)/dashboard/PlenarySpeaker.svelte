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
	<div class="flex justify-between items-center" slot="header">
		<div>
			<span class="font-bold text-white mr-1.5">
				{index}.
			</span>
			<span class="text-zinc-100">
				{label}
			</span>
		</div>

		<div class="relative text-zinc-400 text-[1rem]">
			<div class="duration-200 transition-opacity {open && 'opacity-0'}">
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

	<p class="text-zinc-400 pt-2 text-[0.925rem]" slot="content">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsam,
		inventore reiciendis, laudantium, non enim magnam necessitatibus tenetur
		debitis nisi cupiditate vel repellendus eum doloremque beatae ratione
		magni. Tenetur, voluptates!
	</p>
</BaseAccordion>
