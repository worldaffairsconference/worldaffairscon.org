<script lang="ts">
	import type { SvelteComponent } from "svelte";

	// Icons
	import FaEnvelope from "svelte-icons/fa/FaEnvelope.svelte";
	import FaInstagram from "svelte-icons/fa/FaInstagram.svelte";
	import FaLinkedin from "svelte-icons/fa/FaLinkedin.svelte";

	import branksome from "$lib/assets/images/logos/branksome.webp";
	import ucc from "$lib/assets/images/logos/ucc.webp";

	interface Social {
		name: string;
		icon: typeof SvelteComponent;
		link: string;
	}

	const socials: Social[] = [
		{
			name: "Email",
			icon: FaEnvelope,
			link: "mailto:support@worldaffairscon.org"
		},
		{
			name: "Instagram",
			icon: FaInstagram,
			link: "https://instagram.com/WorldAffairsCon"
		},
		{
			name: "LinkedIn",
			icon: FaLinkedin,
			link: "https://ca.linkedin.com/company/world-affairs-conference"
		}
	];
</script>

<footer class="bg-zinc-950">
	<div class="w-full mx-auto max-w-screen-xl p-8 sm:p-11 flex flex-col">
		<div class="sm:flex sm:items-center sm:justify-between gap-3 sm:mb-0">
			<div class="sm:flex hidden gap-6 items-center mb-5 sm:mb-4">
				<img
					src={ucc}
					alt="UCC Logo"
					class="h-[2.85rem] sm:h-[3.125rem]"
				/>
				<img
					src={branksome}
					alt="Branksome Hall Logo"
					class="h-[2.85rem] sm:h-[3.125rem]"
				/>
			</div>

			<div>
				<div
					class="uppercase text-zinc-400 mb-1 sm:mb-1.5 hidden sm:block"
				>
					Socials
				</div>
				<div
					class="flex flex-wrap gap-2.5 items-center text-sm font-medium text-zinc-200"
				>
					{#each socials as social}
						<a
							href={social.link}
							class="h-[1.4rem] w-[1.4rem] sm:h-6 sm:w-6"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="{social.name} page"
						>
							<svelte:component this={social.icon} />
						</a>
					{/each}
				</div>
			</div>
		</div>
		<span
			class="text-sm text-zinc-400 order-first sm:order-none mb-3 sm:mb-0"
		>
			© 2023 The World Affairs Conference. All Rights Reserved.
		</span>
	</div>
</footer>
