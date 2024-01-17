<script lang="ts">
	import AccordionItem from "./AccordionItem.svelte";

	interface FAQ {
		question: string;
		answer: string;
	}

	const faqs = {
		General: [
			{
				question: "What is WAC?",
				answer: "The World Affairs Conference (WAC) is Canada's oldest annual student-run current affairs conference. At WAC '24, as part of our efforts to reduce our environmental footprint, we are proud to be North America's first carbon-neutral conference. World Affairs Conference annually connects over 2000 students, with a common interest in current affairs, from across the globe. "
			},
			{
				question: "When is WAC?",
				answer: "WAC 2024 will be held on March 6th, 2024. It will be a full-day event filled with exciting discussions and networking opportunities."
			},
			{
				question: "Where is WAC?",
				answer: "WAC is held at Upper Canada College (200 Lonsdale Road) in Toronto, Canada. This year, WAC will be held in a hybrid format with more details to follow!"
			},
			{
				question: "Who can attend WAC?",
				answer: "Any high school students can come to WAC, please email [registration@worldaffairscon.org](mailto:registration@worldaffairscon.org) for more information."
			},
			{
				question: "Who makes WAC happen?",
				answer: "A dedicated team of about 100 high school students from Upper Canada College, in coordination with Branksome Hall, voluntarily contribute their time for many months leading up to the day of WAC to ensure the success and positive experience for each delegate that attends the conference."
			}
		],
		Registration: [
			{
				question: "How much does WAC cost?",
				answer: "WAC is proud to offer free attendance for public schools! For non-public schools, there is a $15 fee for WAC '24. There is a $15 fee for optional lunch purchases at the conference."
			},
			{
				question: "How can I register my school?",
				answer: `**Groups (Schools, Clubs, Organizations):**
-   Each individual participant can sign up on our website and choose their plenary preferences as well as a food plan.
-   Teachers and advisors can reach out to [registration@worldaffairscon.org](mailto:registration@worldaffairscon.org) to pay for the entire group or to change any group registration details. Once payment is validated, we will finalize your plenary selection.

**Independent:**
-   Independent participants can sign up on our website and choose their plenary preferences as well as a food plan.
-   Please email [registration@worldaffairscon.org](mailto:registration@worldaffairscon.org) for payment details.`
			},
			{
				question: "When is registration due?",
				answer: "Registration for WAC '24 will close on February 25th, 2024."
			}
		],
		Keynote: [
			{
				question: "What happens during the Keynote Address?",
				answer: "On the day of the conference, there will be an Opening and Closing Keynote address, and a prominent member of the community will give a keynote on current affairs. The Keynote Address will also feature a Q&A session."
			},
			{
				question: "When does the Keynote Address start?",
				answer: "The registration dashboard will show keynote and plenary times, locations, and speaker details. Based on plenary selections, our registration system will also send calendar invites to participant's inboxes."
			},
			{
				question: "Who can attend the Keynote Address?",
				answer: "Everybody is invited to come to the Opening and Closing Keynotes."
			}
		],
		Plenaries: [
			{
				question: "What happens during the Plenary Address?",
				answer: "There will be three plenary sessions during WAC day. There will be a variety of speaking formats where speakers will discuss their topics and participants will be able to ask the speakers questions at the end of each session."
			},
			{
				question: "Who can attend the Plenary Address?",
				answer: "During each session, attendees have the option to choose to attend one plenary out of the 4 offered simultaneously. We'll try our best to assign each participant's first choices as their plenaries on the day of WAC. The plenary chosen will be displayed on the dashboard as the conference date approaches."
			}
		]
	} as const satisfies Readonly<Record<string, Readonly<FAQ[]>>>;

	const faqSectionNames = Object.keys(faqs) as (keyof typeof faqs)[];

	let activeQuestionID: string = "";
</script>

<section class="pt-[6rem] lg:pt-[9.5rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-xl mx-auto px-6 lg:px-16">
		<div class="mb-10 lg:mb-20 mt-6 text-center">
			<h3 class="mb-2 block md:text-lg font-semibold text-primary">
				FAQ
			</h3>
			<h1
				class="font-bold text-white text-4xl md:text-5xl tracking-tight"
			>
				Any Questions?
			</h1>
		</div>

		<div class="flex flex-col gap-16">
			{#each faqSectionNames as faqSectionName, sectionIndex}
				<div>
					<h3
						class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
					>
						{faqSectionName}
					</h3>

					<div class="flex gap-4 w-full flex-col lg:flex-row">
						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each faqs[faqSectionName] as faq, questionIndex}
								{#if questionIndex % 2 === 0}
									<AccordionItem
										header={faq.question}
										content={faq.answer}
										bind:activeQuestionID
										{sectionIndex}
										{questionIndex}
									/>
								{/if}
							{/each}
						</div>

						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each faqs[faqSectionName] as faq, questionIndex}
								{#if questionIndex % 2 === 1}
									<AccordionItem
										header={faq.question}
										content={faq.answer}
										bind:activeQuestionID
										{sectionIndex}
										{questionIndex}
									/>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
