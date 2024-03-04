<script lang="ts">
	import type { PageData } from "./$types";

	interface ScheduleItem {
		title: string;
		startTime: Date;
		endTime: Date;
		location: string;
		description: string;
	}

	export let data: PageData;

	const schedule: ScheduleItem[] = [
		{
			title: "Opening Keynote",
			startTime: new Date("March 6, 2024 9:30:00"),
			endTime: new Date("March 6, 2024 10:30:00"),
			location: "Laidlaw Hall",
			description:
				"Masai Ujiri (Giants of Africa, CEO of Toronto Raptors)"
		},
		{
			title: "Lunch & Networking",
			startTime: new Date("March 6, 2024 12:25:00"),
			endTime: new Date("March 6, 2024 13:25:00"),
			location: "Whole School",
			description: ""
		},
		{
			title: "Closing Keynote",
			startTime: new Date("March 6, 2024 14:25:00"),
			endTime: new Date("March 6, 2024 15:25:00"),
			location: "Laidlaw Hall",
			description:
				"Roberta L. Bondar (C.C. O.Ont. MD PhD FRSC ICD.D, Astronaut | Physician | Scientist | Photographer)"
		},
		...data.schedule
	].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
</script>

<svelte:head>
	<title>Schedule - World Affairs Conference</title>
</svelte:head>

<section class="pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-xl mx-auto px-6 lg:px-24">
		<div class="mb-8 sm:mb-14 mt-6 text-center">
			<h3
				class="mb-1 md:mb-2 block md:text-lg font-semibold text-primary"
			>
				Schedule
			</h3>
			<h1
				class="font-bold text-white text-4xl md:text-5xl tracking-tight"
			>
				Your Schedule
			</h1>
		</div>
		<div class="flex justify-center mb-7 sm:mb-12">
			<div
				class="flex gap-2 items-center bg-secondary py-1 px-2 rounded-md text-zinc-800/80 w-fit"
			>
				<div class="text-sm">
					<i class="fa-solid fa-clock"></i>
				</div>
				<span class="text-xs">Eastern Standard Time</span>
			</div>
		</div>
		<div>
			{#each schedule as item}
				{@const startTimeDisplay = new Date(
					item.startTime
				).toLocaleTimeString([], {
					hour: "numeric",
					minute: "numeric"
				})}
				{@const endTimeDisplay = new Date(
					item.endTime
				).toLocaleTimeString([], {
					hour: "numeric",
					minute: "numeric"
				})}
				<div class="flex md:gap-8 gap-2 md:flex-row flex-col">
					<div class="w-40 text-zinc-400 flex-shrink-0">
						{startTimeDisplay} - {endTimeDisplay}
					</div>
					<div class="flex-col md:flex hidden">
						<div class="w-px bg-zinc-500 grow"></div>
					</div>
					<div class="mb-10 md:mb-14">
						<div class="flex gap-3">
							<div class="text-white font-bold text-xl mb-4">
								{item.title}
							</div>
							<div
								class="p-1 px-2.5 bg-gradient-to-r from-primary to-secondary rounded-md h-min text-white text-sm"
							>
								{item.location}
							</div>
						</div>
						<div class="text-zinc-400">
							{item.description}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
