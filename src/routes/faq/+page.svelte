<script lang="ts">
    interface FAQ {
        question: string;
        answer: string;
    }

    const faqs: { [key: string]: FAQ[] } = {
        General: [
            {
                question: "What is the WAC?",
                answer: "The World Affairs Conference (WAC) is Canada's oldest annual student-run current affairs conference. Annually held at Upper Canada College in Toronto, Canada, the World Affairs Conference connects over 1000 students, with a common interest in current affairs, from across North America. A dedicated team of about 100 high school students from Upper Canada College, in coordination with Branksome Hall, voluntarily contribute their time for many months leading up to the day of WAC to ensure the success and positive experience for each delegate that attends the conference. For the first time in history, WAC is going hybrid, with the option to attend both in-person and virtually!",
            },
            {
                question: "When is WAC?",
                answer: "WAC typically spans two days; the Keynote Address on the first day and the Conference day on the second. This year, WAC will take place all in one jam-packed day on February 9th!",
            },
            {
                question: "Where is WAC?",
                answer: "WAC is held at Upper Canada College (200 Lonsdale Road) in Toronto, Canada. This year, WAC will be held virtually as well on Hopin, our virtual events platform.",
            },
            {
                question: "Who can attend WAC?",
                answer: "If you are interested in attending WAC in-person, please contact a school teacher and ask them reach out to the team. If you would like to attend virtually, registration is open to all using the link in the navigation bar!",
            },
        ],
        SPRINT: [
            {
                question: "Is there a cost associated with SPRINT?",
                answer: "No, it is absolutely free!",
            },
            {
                question: "How will I know if I am accepted?",
                answer: "After completing the form associated with the application process, acceptances will be sent out on a later date. !",
            },
            {
                question: "Where can I find more information on this?",
                answer: 'Click the red "SPRINT" button in the navbar!',
            },
        ],
    };

    const faqStates = Object.keys(faqs).reduce((acc, key) => {
        acc[key] = Array(faqs[key].length).fill(false);
        return acc;
    }, {} as { [key: string]: boolean[] });
</script>

<svelte:head>
    <title>World Affairs Conference | FAQ</title>
    <meta
        name="description"
        content="North America's largest and Canada's oldest annual student-run current events conference."
    />
</svelte:head>

<section class="pt-[8.5rem] md:pt-[10rem]">
    <div class="container mx-auto">
        <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4">
                <div class="mx-auto mb-10 lg:mb-16 text-center">
                    <span class="mb-2 block text-lg font-semibold text-primary">
                        FAQ
                    </span>
                    <h2
                        class="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.5rem]"
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
        {#each Object.keys(faqs) as faqSectionName}
            <h3
                class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
            >
                {faqSectionName}
            </h3>
            <div class="-mx-4 flex flex-wrap mb-10">
                {#each faqs[faqSectionName] as faq, i}
                    <div class="w-full px-4 lg:w-1/2">
                        <div
                            class="mb-8 w-full rounded-lg border border-zinc-600 bg-zinc-800 p-3 sm:p-4 md:p-6"
                        >
                            <div class="flex w-full text-left items-center">
                                <button
                                    class="mr-5 flex h-10 w-full max-w-[2.5rem] items-center justify-center rounded-lg bg-secondary bg-opacity-5"
                                    on:click={() => {
                                        faqStates[faqSectionName][i] =
                                            !faqStates[faqSectionName][i];
                                    }}
                                    aria-label="Toggle FAQ"
                                >
                                    <svg
                                        width="17"
                                        height="10"
                                        viewBox="0 0 17 10"
                                        class="fill-secondary stroke-secondary"
                                    >
                                        <path
                                            d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
                                        />
                                    </svg>
                                </button>
                                <div class="w-full">
                                    <h4
                                        class="text-base sm:text-lg font-semibold text-white"
                                    >
                                        {faq.question}
                                    </h4>
                                </div>
                            </div>
                            <div
                                class="pl-[62px] {!faqStates[faqSectionName][
                                    i
                                ] && 'hidden'}"
                            >
                                <p
                                    class="py-3 text-base leading-relaxed text-zinc-300"
                                >
                                    {faq.answer}{faqStates[faqSectionName]}
                                </p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</section>
