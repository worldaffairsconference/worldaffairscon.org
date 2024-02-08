<script lang="ts">
	import { onMount } from "svelte";
	import { smoothDnD } from "smooth-dnd";
	import PlenarySpeaker from "./PlenarySpeaker.svelte";

	export let speakers: string[] = [];

	const initialSpeakers = [...speakers];

	let container: HTMLDivElement | undefined;

	onMount(() => {
		if (!container) return;

		smoothDnD(container, {
			dropPlaceholder: {
				animationDuration: 200,
				showOnTop: true,
				className: "cards-drop-preview"
			},
			lockAxis: "y",
			dragClass: "card-ghost",
			dropClass: "card-ghost-drop",
			onDrop({ removedIndex, addedIndex }) {
				if (removedIndex === null || addedIndex === null) return;
				const [moved] = speakers.splice(removedIndex, 1);
				if (!moved) throw new Error("Moved element is undefined");
				speakers.splice(addedIndex, 0, moved);
				speakers = speakers;
			}
		});
	});
</script>

<div class="p-2 sm:p-4 rounded-lg border border-zinc-600 bg-zinc-800">
	<div bind:this={container}>
		{#each initialSpeakers as label}
			<PlenarySpeaker {label} index={speakers.indexOf(label) + 1} />
		{/each}
	</div>
</div>

<style>
	:global(.cards-drop-preview) {
		@apply m-2 border-2 border-dashed border-zinc-600 bg-zinc-600/30 rounded-md;
	}

	:global(.card-ghost) {
		@apply transition-transform;
		transform: rotateZ(4deg);
	}

	:global(.card-ghost-drop) {
		@apply transition-transform ease-in-out;
		transform: rotateZ(0deg);
	}
</style>
