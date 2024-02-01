<script lang="ts">
	import Test from "./Test.svelte";

	interface Plenary {
		title: string;
		time: string;
		speakers: string[];
	}

	let plenaries: Plenary[] = [
		{
			title: "Plenary 1",
			time: "9:00AM to 10:00AM",
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
			time: "10:00AM to 11:00AM",
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
			time: "11:00AM to 12:00PM",
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

<section class="max-w-screen-lg mx-auto">
	<div class="flex justify-center gap-6 mb-4">
		{#each plenaries as plenary}
			<div class="w-full">
				<div class="mb-4 ml-1">
					<h3 class="text-white text-3xl font-semibold mb-0.5">
						{plenary.title}
					</h3>
					<p class="text-zinc-400">9:00AM to 10:00AM</p>
				</div>
				<Test bind:speakers={plenary.speakers} />
			</div>
		{/each}
	</div>
</section>
