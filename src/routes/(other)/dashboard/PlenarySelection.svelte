<script lang="ts">
	import type { PageData } from "./$types";
	import PlenarySelector from "./PlenarySelector.svelte";

	export let schedule: Exclude<PageData["plenarySchedule"], undefined>;
</script>

<section class="flex justify-center gap-6 flex-wrap lg:flex-nowrap">
	{#each schedule as scheduleSlot}
		<div class="w-full">
			<div class="mb-4 ml-1">
				<h3 class="text-white text-2xl font-semibold text-center">
					{scheduleSlot.startTime?.toLocaleTimeString([], {
						hour: "numeric",
						minute: "numeric",
						hour12: false
					})} - {scheduleSlot.endTime?.toLocaleTimeString([], {
						hour: "numeric",
						minute: "numeric",
						hour12: false
					})}
				</h3>
			</div>
			<PlenarySelector on:drop bind:plenaries={scheduleSlot.plenaries} />
		</div>
	{/each}
</section>
