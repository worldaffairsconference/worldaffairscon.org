<script lang="ts">
	import type { PageData } from "./$types";
	import PlenarySelector from "./PlenarySelector.svelte";

	export let schedule: Exclude<PageData["plenarySchedule"], undefined>;
</script>

<section class="grid lg:grid-cols-3 gap-6">
	{#each schedule as scheduleSlot}
		<div class="w-full flex flex-col">
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
			<div class="grow">
				<PlenarySelector
					on:drop
					bind:plenaries={scheduleSlot.plenaries}
				/>
			</div>
		</div>
	{/each}
</section>
