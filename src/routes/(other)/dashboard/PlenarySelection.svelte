<script lang="ts">
	import PlenarySelector from "./PlenarySlot.svelte";

	interface Plenary {
		title: string;
		time: string;
		speakers: string[];
	}

	let plenaries: Plenary[] = [
		{
			title: "Plenary 1",
			time: "9:00AM - 10:00AM",
			speakers: [
				"Elon Musk",
				"Sam Altman",
				"Greta Thunberg",
				"Bill Gates",
				"Gabe D'Souza"
			]
		},
		{
			title: "Plenary 2",
			time: "10:00AM - 11:00AM",
			speakers: [
				"Barack Obama",
				"Malala Yousafzai",
				"Stephen Hawking",
				"Albert Einstein",
				"Marie Curie"
			]
		},
		{
			title: "Plenary 3",
			time: "11:00AM - 12:00PM",
			speakers: [
				"Oprah Winfrey",
				"Neil deGrasse Tyson",
				"Angela Merkel",
				"Nelson Mandela",
				"Ada Lovelace"
			]
		}
	];
</script>

<section class="flex justify-center gap-6 flex-wrap lg:flex-nowrap">
	{#each plenaries as plenary}
		<div class="w-full">
			<div class="mb-4 ml-1">
				<h3 class="text-white text-2xl font-semibold text-center">
					{plenary.time}
				</h3>
			</div>
			<PlenarySelector bind:speakers={plenary.speakers} />
		</div>
	{/each}
</section>
