<script lang="ts">
	interface ScheduleItem {
		title: string;
		startTime: number;
		endTime: number;
		location: string;
		description: string;
	}

	const schedule: ScheduleItem[] = [
		{
			title: "Opening Ceremony",
			startTime: 1648396800,
			endTime: 1648400400,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},
		{
			title: "Keynote Speaker",
			startTime: 1648400400,
			endTime: 1648404000,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},
		{
			title: "Panel 1",
			startTime: 1648407600,
			endTime: 1648411200,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},
		{
			title: "Panel 2",
			startTime: 1648411200,
			endTime: 1648414800,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},

		{
			title: "Panel 3",
			startTime: 1648418400,
			endTime: 1648422000,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},
		{
			title: "Panel 4",
			startTime: 1648422000,
			endTime: 1648425600,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		},
		{
			title: "Closing Ceremony",
			startTime: 1648425600,
			endTime: 1648429200,
			location: "Main Stage",
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente atque repellat asperiores qui aliquam, libero pariatur ipsa ex maxime facilis?"
		}
	];
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
					item.startTime * 1000
				).toLocaleTimeString("en-US", {
					timeZone: "America/New_York",
					hour: "numeric",
					minute: "2-digit"
				})}
				{@const endTimeDisplay = new Date(
					item.endTime * 1000
				).toLocaleTimeString("en-US", {
					timeZone: "America/New_York",
					hour: "numeric",
					minute: "2-digit"
				})}
				<div class="flex md:gap-8 gap-2 md:flex-row flex-col">
					<div class="w-48 text-zinc-400">
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
