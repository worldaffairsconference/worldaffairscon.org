<script lang="ts">
	import LargeAccordion from "$lib/components/LargeAccordion.svelte";
	import DOMPurify from "dompurify";

	// Static FAQ data
	interface FAQRecord {
		question: string;
		answer: string;
	}

	type FAQCategories = {
		[category: string]: FAQRecord[];
	};

	const faqByCategories: FAQCategories = {
		"General": [
			{
				question: "What is WAC?",
				answer: "The World Affairs Conference (WAC) is Canada’s oldest annual student-run conference on current affairs. WAC annually connects over 2000 students, with a common interest in current affairs, from across the globe."
			},
			{
				question: "Where is WAC?",
				answer: "WAC is held at Upper Canada College (200 Lonsdale Road) in Toronto, Canada."
			},
			{
				question: "Who makes WAC happen?",
				answer: "A team of around 100 dedicated high school students from Upper Canada College and Branksome Hall, in collaboration with faculty, voluntarily work for many months leading up to the day of the conference to ensure that WAC is a success and that everyone who attends has a positive and valuable experience."
			},
			{
				question: "When is WAC?",
				answer: "WAC 2026 will be held on Wednesday, February 25th, 2026. It is an event that runs all day, filled with exciting and thoughtful discussions as well as networking opportunities."
			},
			{
				question: "Who can attend WAC?",
				answer: "Any high school student can attend WAC. If you are interested in attending the conference, please contact a school teacher and ask them to reach out to wac@ucc.on.ca."
			},
			{
				question: "What happens if I can’t come to WAC anymore?",
				answer: "No worries! If you have already registered, kindly email us at wac@ucc.on.ca. Unfortunately, after Friday, February 28th 2025, all lunch orders are final and your school will be charged for all orders as they appear on that date."
			}
		],
		"Registration": [
			{
				question: "How much does WAC cost?",
				answer: "WAC is fully free for all attendees this year! Lunch will be provided for an additional cost that will be communicated to attendees."
			},
			{
				question: "When is registration due?",
				answer: "Registration deadlines will be announced at a later date. Please be reminded that attendee spots are first come, first serve and fill up quickly!"
			},
			{
				question: "How can I register my school?",
				answer: "Teachers are kindly asked to register their schools at <a href='https://reg.worldaffairscon.org/tregister'>https://reg.worldaffairscon.org/tregister</a>. Once a teacher account has been created, a school-specific registration link will be generated for students to register themselves. Unfortunately, individual students are unable to register themselves this year."
			},
			{
				question:
					"What should I do if I encounter problems during registration?",
				answer: "For any inquiries or concerns, please contact wac@ucc.on.ca. Our team will be happy to assist you!"
			}
		],
		"Keynote Address": [
			{
				question: "What happens during the Keynote Address?",
				answer: "On the day of the conference, there will be an Opening and Closing Keynote address, and a prominent member of the community will give a keynote on current affairs. The Keynote Address will also feature a Q&A session."
			},
			{
				question: "When does the Keynote Address start?",
				answer: "The registration dashboard will show keynote and plenary times, locations, and speaker details."
			},
			{
				question: "Who can attend the Keynote Address?",
				answer: "Everybody is invited to come to the Opening and Closing Keynotes."
			}
		],
		"Plenaries": [
			{
				question: "What happens during the Plenary Address?",
				answer: "Plenary sessions include a variety of speaking formats, including fireside chats and presentations where speakers will discuss their topics and participants will be able to ask the speakers questions at the end of each session."
			},
			{
				question: "Who can attend the Plenary Address?",
				answer: "During each plenary session, attendees have the option to choose to attend one plenary out of the 4 offered during the same time. We'll try our best to assign each participant's first choices as their plenaries on the day of WAC. Further information about participants’ chosen plenaries will be shared as the conference date approaches."
			},
			{
				question: "When do Plenary sessions start?",
				answer: "The conference schedule, which will be shared at a later time, will outline the times for plenary sessions, lunch, and networking."
			}
		]
	};

	const sanitizeHtml = (html: string) => DOMPurify.sanitize(html);
</script>

<svelte:head>
	<title>FAQ - World Affairs Conference</title>
</svelte:head>

<section
	class="faq-section pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]"
>
	<div class="max-w-screen-xl mx-auto px-6 lg:px-16">
		<div class="mb-10 lg:mb-20 mt-6 text-center">
			<h3
				class="mb-1 md:mb-2 block md:text-lg font-semibold text-primary"
			>
				FAQ
			</h3>
			<h1
				class="font-bold text-white text-4xl md:text-5xl tracking-tight"
			>
				Any Questions?
			</h1>
		</div>

		<div class="flex flex-col gap-16">
			{#each Object.entries(faqByCategories) as [categoryName, records]}
				<div>
					<h3
						class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
					>
						{categoryName}
					</h3>

					<div class="flex gap-4 w-full flex-col lg:flex-row">
						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each records as record, i}
								{#if i % 2 === 0}
									<LargeAccordion header={record.question}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<div class="markdown">
											{@html sanitizeHtml(record.answer)}
										</div>
									</LargeAccordion>
								{/if}
							{/each}
						</div>
						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each records as record, i}
								{#if i % 2 === 1}
									<LargeAccordion header={record.question}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										<div class="text-zinc-300 markdown">
											{@html sanitizeHtml(record.answer)}
										</div>
									</LargeAccordion>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
