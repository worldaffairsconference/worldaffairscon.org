<script lang="ts">
	import { onMount } from "svelte";
	import { smoothDnD } from "smooth-dnd";

	let container: HTMLDivElement | undefined;

	let elems = ["A", "B", "C", "D", "E"];
	let orderedElems = [...elems];

	onMount(() => {
		if (!container) return;

		smoothDnD(container, {
			dropPlaceholder: true,
			lockAxis: "y",
			onDrop({ removedIndex, addedIndex }) {
				if (removedIndex === null || addedIndex === null) return;
				const [moved] = orderedElems.splice(removedIndex, 1);
				if (!moved) throw new Error("Moved element is undefined");
				orderedElems.splice(addedIndex, 0, moved);
				orderedElems = orderedElems;
			}
		});
	});
</script>

<div id="container" class="bg-orange-300 w-32" bind:this={container}>
	{#each elems as label (label)}
		<div class="cursor-pointer bg-purple-300 h-12 w-full">
			{label} — {orderedElems.indexOf(label)}
		</div>
	{/each}
</div>

<!-- <style>
	:global(.card-ghost-drop) {
		@apply border-8;
	}
</style> -->
