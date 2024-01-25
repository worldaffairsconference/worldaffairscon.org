<script lang="ts">
	import AccordionItem from "$lib/components/AccordionItem.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { faqByCategories } = data;
</script>

<section class="pt-[6rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
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
			{#each Object.entries(faqByCategories) as [categoryName, records]}
				<div>
					<h3
						class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
					>
						{categoryName}
					</h3>

					<div class="flex gap-4 w-full flex-col lg:flex-row">
						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each records as { question, answer }, i}
								{#if i % 2 === 0}
									<AccordionItem header={question}>
										<div class="markdown">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html answer}
										</div>
									</AccordionItem>
								{/if}
							{/each}
						</div>
						<div class="flex flex-col gap-4 w-full lg:w-1/2">
							{#each records as { question, answer }, i}
								{#if i % 2 === 1}
									<AccordionItem header={question}>
										<div class="text-zinc-300 markdown">
											<!-- eslint-disable-next-line svelte/no-at-html-tags -->
											{@html answer}
										</div>
									</AccordionItem>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
