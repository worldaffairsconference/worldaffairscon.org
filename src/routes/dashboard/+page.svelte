<script lang="ts">
	import AccordionItem from "$lib/components/AccordionItem.svelte";
	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";

	import type { PageData } from "./$types";

	export let data: PageData;
	const { user } = data;
	const avatar = createAvatar(shapes, { seed: user.email ?? "" });
</script>

<section class="pt-[8.5rem] md:pt-[10rem] flex flex-col items-center">
	<div class="container mx-auto">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div
					class="mx-auto mb-10 lg:mb-16 text-center flex flex-col justify-center"
				>
					<span class="mb-2 block text-lg font-semibold text-primary">
						Personal Dashboard
					</span>
					<h2
						class="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.5rem]"
					>
						Welcome to WAC!
					</h2>
					<p class="text-zinc-400">
						Before you are fully registered, we just need a few more
						details about you.
					</p>
				</div>
			</div>
		</div>

		<!-- {#each faqSectionNames as faqSectionName}
			<h3
				class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
			>
				{faqSectionName}
			</h3>
			<div class="-mx-4 flex flex-wrap mb-10">
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
		{/each} -->
	</div>

	<div class="flex gap-5 w-3/4 mb-10">
		<img
			src={avatar.toDataUriSync()}
			alt="Avatar"
			class="rounded-lg h-32"
		/>
		<div class="flex flex-col items-start justify-center">
			<h3 class="text-white sm:text-3xl">
				Hey {user.firstName ?? user.email}
			</h3>
			<p class="text-white sm:text-1xl text-left">
				Excited for the official list of plenaries? We are working on
				it! We will email you once we are ready for your selection, so
				stay tuned! In the near future, we will also need some
				information about diatery restrictions, and financial
				information if you are coming outside of a school context.
			</p>
		</div>
	</div>

	<div class="w-3/4">
		<h3
			class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
		>
			General
		</h3>
		<div class="-mx-4 flex flex-wrap mb-10">
			<div class="w-full">
				<AccordionItem header="Personal Information" text="" />
				<AccordionItem header="Plenary Selection" text="" />
				<AccordionItem header="Dietary Information" text="" />
				<AccordionItem header="Payment Information" text="" />
			</div>
		</div>
	</div>
</section>
