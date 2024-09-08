<script lang="ts">
    import { onMount } from 'svelte';
    import LargeAccordion from "$lib/components/LargeAccordion.svelte";

    interface FAQRecord {
        question: string;
        answer: string;
    }

    type FAQCategories = {
        [category: string]: FAQRecord[];
    };

    let faqByCategories: FAQCategories | null = null;
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            const response = await fetch('/faqData.json');
            if (!response.ok) {
                throw new Error("Failed to load FAQ data");
            }
            faqByCategories = await response.json();
            console.log("faqByCategories in Svelte:", faqByCategories);
        } catch (err) {
            if (err instanceof Error) {
                error = err.message;
            } else {
                error = "An unknown error occurred";
            }
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>FAQ - World Affairs Conference</title>
</svelte:head>

<section class="faq-section pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
    <div class="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div class="mb-10 lg:mb-20 mt-6 text-center">
            <h3 class="mb-1 md:mb-2 block md:text-lg font-semibold text-primary">FAQ</h3>
            <h1 class="font-bold text-white text-4xl md:text-5xl tracking-tight">Any Questions?</h1>
        </div>

        {#if loading}
            <p class="text-white">Loading...</p>
        {:else if error}
            <p class="text-red-500">{error}</p>
        {:else if faqByCategories}
            <div class="flex flex-col gap-16">
                {#each Object.entries(faqByCategories) as [categoryName, records]}
                    <div>
                        <h3 class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center">
                            {categoryName}
                        </h3>

                        <div class="flex gap-4 w-full flex-col lg:flex-row">
                            <div class="flex flex-col gap-4 w-full lg:w-1/2">
                                {#each records as record, i}
                                    {#if i % 2 === 0}
                                        <LargeAccordion header={record.question}>
                                            <div class="markdown">
                                                {@html record.answer}
                                            </div>
                                        </LargeAccordion>
                                    {/if}
                                {/each}
                            </div>
                            <div class="flex flex-col gap-4 w-full lg:w-1/2">
                                {#each records as record, i}
                                    {#if i % 2 === 1}
                                        <LargeAccordion header={record.question}>
                                            <div class="text-zinc-300 markdown">
                                                {@html record.answer}
                                            </div>
                                        </LargeAccordion>
                                    {/if}
                                {/each}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>
