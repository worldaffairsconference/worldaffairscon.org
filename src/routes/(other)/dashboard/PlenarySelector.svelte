<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import { smoothDnD } from "smooth-dnd";
	import PlenarySpeaker from "./PlenarySpeaker.svelte";
	import type { PageData } from "./$types";

	export let plenaries: Exclude<
		PageData["plenarySchedule"],
		undefined
	>[number]["plenaries"];

	const dispatch = createEventDispatcher<{
		drop: boolean;
	}>();

	const initialPlenaries = [...plenaries];

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
			onDrop(data) {
				const { removedIndex, addedIndex } = data;
				if (removedIndex === null || addedIndex === null) return;
				const [moved] = plenaries.splice(removedIndex, 1);
				if (!moved) throw new Error("Moved element is undefined");
				plenaries.splice(addedIndex, 0, moved);
				plenaries = plenaries;

				const isEdited = plenaries.some((plenary, index) => {
					if (plenary !== initialPlenaries[index]) {
						return true;
					}
				});

				dispatch("drop", isEdited);
			}
		});
	});
</script>

<div class="p-2 rounded-lg border border-zinc-600 bg-zinc-800 h-full">
	<div bind:this={container}>
		{#each initialPlenaries as info}
			<PlenarySpeaker
				speakerTitle={info.speakerTitle ?? ""}
				theme={info.theme ?? ""}
				speakerName={info.speakerName ?? ""}
				description={info.description ?? ""}
				index={plenaries.indexOf(info) + 1}
			/>
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
