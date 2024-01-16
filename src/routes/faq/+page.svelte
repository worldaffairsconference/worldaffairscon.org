<script lang="ts">
	import AccordionItem from "./AccordionItem.svelte";

	interface FAQ {
		question: string;
		answer: string;
	}

	const faqs = {
		General: [
			{
				question: "What is the WAC?",
				answer: "The World Affairs Conference (WAC) is Canada's oldest annual student-run current affairs conference. Annually held at Upper Canada College in Toronto, Canada, the World Affairs Conference connects over 1000 students, with a common interest in current affairs, from across North America. A dedicated team of about 100 high school students from Upper Canada College, in coordination with Branksome Hall, voluntarily contribute their time for many months leading up to the day of WAC to ensure the success and positive experience for each delegate that attends the conference. For the first time in history, WAC is going hybrid, with the option to attend both in-person and virtually!"
			},
			{
				question: "When is WAC?",
				answer: "WAC typically spans two days; the Keynote Address on the first day and the Conference day on the second. This year, WAC will take place all in one jam-packed day on February 9th!"
			},
			{
				question: "Where is WAC?",
				answer: "WAC is held at Upper Canada College (200 Lonsdale Road) in Toronto, Canada. This year, WAC will be held virtually as well on Hopin, our virtual events platform."
			},
			{
				question: "Who can attend WAC?",
				answer: "If you are interested in attending WAC in-person, please contact a school teacher and ask them reach out to the team. If you would like to attend virtually, registration is open to all using the link in the navigation bar!"
			}
		]
	} as const satisfies Readonly<Record<string, Readonly<FAQ[]>>>;

	const faqSectionNames = Object.keys(faqs) as (keyof typeof faqs)[];
</script>

<section class="pt-[9rem] md:pt-[10.5rem]">
	<div class="container mx-auto">
		<div class="flex flex-wrap">
			<div class="w-full px-4">
				<div class="mx-auto mb-10 lg:mb-16 text-center">
					<span class="mb-2 block text-lg font-semibold text-primary">
						FAQ
					</span>
					<h2
						class="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.7rem]"
					>
						Any Questions?
					</h2>
					<p class="text-zinc-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Sit, non quo!
					</p>
				</div>
			</div>
		</div>

		{#each faqSectionNames as faqSectionName}
			<h3
				class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
			>
				{faqSectionName}
			</h3>
			<div class="mx-4 flex flex-wrap mb-10">
				<div class="w-full px-4 lg:w-1/2">
					{#each faqs[faqSectionName] as faq, i}
						{#if i % 2 === 0}
							<AccordionItem
								header={faq.question}
								text={faq.answer}
							/>
						{/if}
					{/each}
				</div>
				<div class="w-full px-4 lg:w-1/2">
					{#each faqs[faqSectionName] as faq, i}
						{#if i % 2 === 1}
							<AccordionItem
								header={faq.question}
								text={faq.answer}
							/>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
