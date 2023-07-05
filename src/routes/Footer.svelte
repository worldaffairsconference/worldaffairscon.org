<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	// Icons
	import FaEnvelope from 'svelte-icons/fa/FaEnvelope.svelte';
	import FaFacebook from 'svelte-icons/fa/FaFacebook.svelte';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';

	interface Social {
		name: string;
		icon: typeof SvelteComponent;
		link: string;
	}

	const socials: Social[] = [
		{
			name: 'Email',
			icon: FaEnvelope,
			link: 'mailto:wac@ucc.on.ca'
		},
		{
			name: 'Facebook',
			icon: FaFacebook,
			link: 'https://www.facebook.com/worldaffairsconference'
		},
		{
			name: 'Instagram',
			icon: FaInstagram,
			link: 'https://instagram.com/WorldAffairsCon'
		},
		{
			name: 'Twitter',
			icon: FaTwitter,
			link: 'https://twitter.com/WorldAffairsCon'
		},
		{
			name: 'Github',
			icon: FaGithub,
			link: 'https://github.com/worldaffairsconference/worldaffairs.ucc.on.ca'
		}
	];
</script>

<footer class="bg-zinc-950" id="footer">
	<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between gap-3">
		<span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
			© 2023 The World Affairs Conference. All Rights Reserved.
		</span>
		<div class="flex flex-wrap gap-2.5 items-center mt-3 text-sm font-medium text-zinc-200 sm:mt-0">
			{#each socials as social}
				<a
					href={social.link}
					class="h-6 w-6"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{social.name} page"
				>
					<svelte:component this={social.icon} />
				</a>
			{/each}
		</div>
	</div>
</footer>
