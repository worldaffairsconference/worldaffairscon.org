<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import { page } from "$app/stores";
	import type { User } from "@auth/core/types";

	// Components
	import Tooltip from "$lib/components/Tooltip.svelte";
	import ScrollAnimations from "./ScrollAnimations.svelte";
	import AnnouncementBanner from "$lib/components/AnnouncementBanner.svelte";

	const user = $page.data.session?.user as User | undefined;

	// let formMessages = {
	// 	added: "You have been added to the mailing list!",
	// 	alreadyAdded: "You are already on the mailing list!",
	// 	invalidEmail: "Please enter a valid email address!",
	// 	unknownError: "An unknown error occurred. Please try again later."
	// };

	// export let form: ActionData;

	// $: if (form) {
	// 	if (form.success) {
	// 		toast.success(formMessages[form.message]);
	// 	} else {
	// 		toast.error(formMessages[form.message]);
	// 	}
	// }

	const calculateDaysUntilDate = (targetDate: Date) => {
		const currentDate = new Date();

		const timeDifference = targetDate.getTime() - currentDate.getTime();

		const localTimeOffset = currentDate.getTimezoneOffset() * 60 * 1000;
		const adjustedDaysDifference =
			(timeDifference + localTimeOffset) / (1000 * 60 * 60 * 24);

		return Math.floor(adjustedDaysDifference);
	};

	const timeUntilConference = calculateDaysUntilDate(new Date(2025, 2, 6)); // Change when the date is confirmed
</script>

<section
	class="pt-[8rem] md:pt-[11.5rem] text-center flex flex-col items-center h-screen w-screen absolute inset-0 z-20"
>
	<h2
		class="text-[1.4rem] sm:text-[1.6rem] lg:text-[1.9rem] uppercase mb-2.5 lg:mb-3.5 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary px-3"
	>
		<span>Theme</span>
		<span class="italic">TBD</span>
	</h2>
	<div class="w-5/6 mx-auto">
		<h1
			class="text-[3rem] leading-none sm:text-6xl lg:text-[5.5rem] text-white font-bold mb-5 lg:mb-6 tracking-[-0.03em]"
		>
			World Affairs Conference
		</h1>
		<p
			class="text-zinc-400 text-md lg:text-[1.3rem] mb-3.5 md:px-32 lg:px-48"
		>
			North America's largest and Canada's oldest annual student-run
			current events conference.
		</p>
	</div>

	<div class="flex gap-2 mb-6 text-lg sm:text-xl lg:text-2xl">
		<a
			class="text-primary"
			href="https://www.instagram.com/WorldAffairsCon"
			target="_blank"
			rel="noopener noreferrer">#RollWAC</a
		>
		<div class="text-secondary cursor-pointer">
			・ <Tooltip
				text={`${timeUntilConference} days away`}
				placement="right"
			>
				Coming Soon - Feb 2025
			</Tooltip>
		</div>
	</div>

	{#if !user}
		<a
			class="text-sm lg:hidden gap-2 bg-gradient-to-r from-primary to-secondary rounded-full px-10 py-[0.75rem] text-white hover:brightness-[1.08] transition-all"
			href="/signin"
		>
			<span>Register</span>
			<span>|</span>
			<span>Login</span>
		</a>
	{/if}
</section>

<ScrollAnimations />

<AnnouncementBanner />

<!--
<section
	class="w-screen px-12 md:px-28 pb-16 py-16 sm:py-20 flex justify-between lg:items-center flex-col lg:flex-row gap-7 bg-zinc-950/60"
	id="action"
>
	<h3 class="uppercase">
		<div
			class="text-3xl sm:text-4xl text-zinc-300 font-semibold tracking-tighter"
		>
			Stay
		</div>
		<div
			class="text-5xl sm:text-7xl text-secondary font-bold tracking-tighter"
		>
			Updated
		</div>
	</h3>
	<div>
		<h3 class="text-white font-semibold mb-4 sm:mb-5 sm:text-2xl">
			Sign up for WAC updates
		</h3>
		<form
			class="flex gap-1.5 flex-col sm:flex-row"
			method="post"
			action="?/getNotified"
			use:enhance
		>
			<div class="relative">
				<div
					class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
				>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-zinc-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
						/>
						<path
							d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
						/>
					</svg>
				</div>
				<input
					type="email"
					name="email"
					class="border text-sm rounded-lg block w-full sm:w-64 md:w-96 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white outline-none"
					placeholder="name@school.com"
				/>
			</div>
			<button
				class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2.5 sm:py-2 text-white text-sm hover:brightness-[1.08] transition-all"
			>
				Get Notified
			</button>
		</form>
	</div>
</section> -->
