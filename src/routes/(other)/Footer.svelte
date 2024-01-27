<script lang="ts">
	import branksomeLogo from "$lib/assets/images/logos/branksome.webp";
	import uccLogo from "$lib/assets/images/logos/ucc.webp";
	import xataLogo from "$lib/assets/images/logos/xata.webp";
	import famersEdgeLogo from "$lib/assets/images/logos/farmers-edge.webp";

	interface Social {
		name: string;
		icon: string;
		link: string;
	}

	interface Credit {
		name: string;
		logo: string;
	}

	const socials: Social[] = [
		{
			name: "Email",
			icon: "fa fa-envelope",
			link: "mailto:support@worldaffairscon.org"
		},
		{
			name: "Instagram",
			icon: "fa-brands fa-instagram",
			link: "https://instagram.com/WorldAffairsCon"
		},
		{
			name: "LinkedIn",
			icon: "fa-brands fa-linkedin",
			link: "https://ca.linkedin.com/company/world-affairs-conference"
		}
	];

	const organizers: Credit[] = [
		{
			name: "Upper Canada College",
			logo: uccLogo
		},
		{
			name: "Branksome Hall",
			logo: branksomeLogo
		}
	];

	const supporters: Credit[] = [
		{
			name: "Xata",
			logo: xataLogo
		},
		{
			name: "Farmers Edge",
			logo: famersEdgeLogo
		}
	];
</script>

<footer class="bg-zinc-950">
	<div class="w-full mx-auto max-w-screen-xl pb-1 p-8 sm:p-10 flex flex-col">
		<div class="sm:flex sm:items-center sm:justify-between gap-3 mb-4">
			<div class="flex gap-6">
				<div class="w-[calc(50%-0.0625rem)]">
					<div
						class="text-zinc-400 mb-3 text-[0.7rem] lg:text-[0.8rem] uppercase"
					>
						Organizers
					</div>
					<div
						class="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center mb-5 sm:mb-4"
					>
						{#each organizers as organizer}
							<img
								src={organizer.logo}
								alt="{organizer.name} Logo"
								class="h-[2rem] lg:h-[2.25rem] w-fit"
							/>
						{/each}
					</div>
				</div>

				<!-- Vertical divider -->
				<div class="w-0.5 bg-zinc-600 my-6 md:my-3"></div>

				<div class="w-[calc(50%-0.0625rem)]">
					<div
						class="text-zinc-400 mb-3 text-[0.7rem] lg:text-[0.8rem] uppercase"
					>
						Supporters
					</div>
					<div
						class="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center mb-5 sm:mb-4"
					>
						{#each supporters as supporter}
							<img
								src={supporter.logo}
								alt="{supporter.name} Logo"
								class="h-[2rem] lg:h-[2.25rem] w-fit"
							/>
						{/each}
					</div>
				</div>
			</div>

			<div>
				<div
					class="uppercase text-zinc-400 mb-1.5 hidden sm:block text-[0.925rem]"
				>
					Socials
				</div>
				<div
					class="flex flex-wrap gap-3 items-center justify-center sm:justify-start text-sm font-medium text-zinc-200"
				>
					{#each socials as social}
						<a
							href={social.link}
							class="text-[1.4rem] sm:text-[1.5rem]"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="{social.name} page"
						>
							<!-- <svelte:component this={social.icon} /> -->
							<i class={social.icon}></i>
						</a>
					{/each}
				</div>
			</div>
		</div>
		<span class="text-xs md:text-sm text-zinc-400 mb-3 sm:mb-0">
			© 2024 Upper Canada College. All Rights Reserved.
		</span>
	</div>
</footer>
