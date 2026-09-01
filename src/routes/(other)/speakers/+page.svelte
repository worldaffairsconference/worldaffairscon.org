<script lang="ts">
	import { speakers2026 } from "$lib/data/speakers2026";
</script>

<section class="px-6 pb-16 pt-40 sm:pt-44 md:pt-52 lg:pt-56">
	<div class="mx-auto w-full max-w-5xl text-white">
		<div class="mb-12 text-center">
			<h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
				2026 Speakers
			</h1>
			<p class="mt-4 text-base sm:text-lg text-zinc-300">
				Meet the 2026 speakers and explore their full biographies.
			</p>
		</div>

		<div class="space-y-10">
			{#each speakers2026 as speaker}
				<article
					id={speaker.slug}
					class="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur"
				>
					<div class="flex flex-col gap-6 md:flex-row md:items-start">
						<img
							src={speaker.image}
							alt="{speaker.name}'s Headshot"
							class="h-36 w-36 shrink-0 rounded-2xl object-cover"
						/>
						<div class="space-y-3">
							<div class="flex flex-wrap items-center gap-3">
								<h2 class="text-2xl sm:text-3xl font-semibold">
									{speaker.name}
								</h2>
								<span
									class="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-200"
								>
									{speaker.tag || "Plenary Speaker"}
								</span>
							</div>
							<p class="text-base text-zinc-200">{speaker.title}</p>
						</div>
					</div>
					<p class="text-sm sm:text-base leading-relaxed text-zinc-200">
						{speaker.bio}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
