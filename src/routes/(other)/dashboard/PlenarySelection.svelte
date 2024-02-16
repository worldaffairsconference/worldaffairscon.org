<script lang="ts">
	import LargeAccordion from "$lib/components/LargeAccordion.svelte";
	import type { PageData } from "./$types";
	import PlenarySelector from "./PlenarySelector.svelte";

	export let schedule: PageData["plenarySchedule"];

	$: encodedPreferences = JSON.stringify(
		(schedule ?? []).flatMap((s) => s.plenaries.map(({ id }) => id))
	);
</script>

<LargeAccordion header="Plenary Selection" open={!!schedule}>
	<input hidden name="rankedPlenaries" value={encodedPreferences} />
	{#if schedule}
		<p class="text-zinc-400 mb-6 md:mb-10 text-[0.925rem] sm:text-base">
			Drag and drop to order the plenary speakers for each time slot
			according to your preference.
		</p>
		<section class="grid lg:grid-cols-3 gap-6">
			{#each schedule as scheduleSlot}
				<div class="w-full flex flex-col">
					<div class="mb-4 ml-1">
						<h3
							class="text-white text-2xl font-semibold text-center"
						>
							{scheduleSlot.startTime?.toLocaleTimeString([], {
								hour: "numeric",
								minute: "numeric",
								hour12: false
							})} - {scheduleSlot.endTime?.toLocaleTimeString(
								[],
								{
									hour: "numeric",
									minute: "numeric",
									hour12: false
								}
							)}
						</h3>
					</div>
					<div class="grow">
						<PlenarySelector
							on:drop
							bind:plenaries={scheduleSlot.plenaries}
						/>
					</div>
				</div>
			{/each}
		</section>
	{:else}
		<p class="text-zinc-400">
			The final plenary list has not yet been announced. We will email you
			once it is available.
		</p>
	{/if}
</LargeAccordion>
