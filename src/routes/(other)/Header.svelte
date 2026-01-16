<script lang="ts">
	import { fly } from "svelte/transition";
	import type { User } from "@auth/core/types";

	import { page } from "$app/stores";
	import wacLogo from "$lib/assets/images/logos/wac_medium.webp";
	import { signOut } from "@auth/sveltekit/client";

	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";

	const user = $page.data.session?.user as User | undefined;

	type Route = {
		name: string;
	} & ({ path: string } | { action: () => void });

	let showDropdown = false;
	let navBarOpen = false;

	const toggleDropdown = () => {
		showDropdown = !showDropdown;
	};

	const closeDropdown = () => {
		showDropdown = false;
	};

	const openNavBar = () => {
		navBarOpen = true;

		setTimeout(() => {
			document.body.style.overflow = "hidden";
		}, 200);
	};

	const closeNavBar = () => {
		navBarOpen = false;

		setTimeout(() => {
			document.body.style.overflow = "auto";
		}, 200);
	};

	$: routes = [
		// { name: "Schedule", path: "/schedule" },
		// { name: "Past Speakers", path: "/past-speakers" },
		{ name: "2026 Speakers", path: "/2026-speakers" },
		{ name: "Contact Us", path: "/contact-us" },
		{ name: "Past Years", path: "/past-years" },
		{ name: "WAC Explained", path: "/wac-explained" },
		{ name: "Team", path: "/team" }
	] satisfies Route[];
</script>

<svelte:window on:click={closeDropdown} />

<header
	class="flex items-center justify-between px-6 lg:px-16 h-[5.5rem] sm:h-28 md:h-[8.5rem] w-full absolute top-0 left-0 z-50 bg-transparent"
	id="header"
>
	<a
		href="/"
		class="hover:brightness-110 transition-all z-50"
		on:click={closeNavBar}
	>
		<img
			src={wacLogo}
			alt="World Affairs Conference Logo"
			class="h-9 sm:h-14"
		/>
	</a>

	<nav class="flex items-center gap-4 lg:gap-10">
		<ul class="text-zinc-300 hidden lg:flex gap-16 items-center">
			{#each routes as route}
				<li class="transform translate-y-0 opacity-100">
					{#if route.external}
						<a
							href={route.path}
							target="_blank"
							rel="noopener noreferrer"
							class="text-zinc-300 hover:text-white transition-colors duration-100 cursor-pointer"
							on:click={closeNavBar}
						>
							{route.name}
						</a>
					{:else}
						<a
							href={route.path}
							class="text-zinc-300 hover:text-white transition-colors duration-100 cursor-pointer
								{$page.url.pathname === route.path
								? 'underline decoration-primary decoration-[1.5px] underline-offset-8'
								: ''}"
							on:click={closeNavBar}
						>
							{route.name}
						</a>
					{/if}
				</li>
			{/each}
		</ul>

		{#if navBarOpen}
			<div
				class="absolute inset-0 h-screen w-screen z-30 bg-zinc-900/90 backdrop-blur-3xl flex flex-col p-8"
				transition:fly={{ x: "-100%", duration: 600 }}
			>
				<ul class="flex flex-col gap-10 h-full mt-20 text-xl">
					{#each routes as route}
						<li>
							<a
								href={route.path}
								class="text-zinc-300 hover:text-white transition-colors duration-100 cursor-pointer
                        {$page.url.pathname === route.path &&
									'underline decoration-primary decoration-[1.5px] underline-offset-8'}
                        "
								on:click={closeNavBar}
							>
								{route.name}
							</a>
						</li>
					{/each}
				</ul>
				{#if !user}
					<div>
						<hr class="border-zinc-700 mb-8" />

						<!-- <a
							class="block text-base text-center lg:hidden gap-2 bg-gradient-to-r from-primary to-secondary rounded-full px-10 py-[0.825rem] text-white hover:brightness-[1.08] transition-all"
							href="/signin"
							on:click={closeNavBar}
						>
							<span>Register</span>
							<span>|</span>
							<span>Login</span>
						</a> -->
					</div>
				{/if}
			</div>
		{/if}

		<button
			class="z-50 text-[1.7rem] text-zinc-300 {!navBarOpen
				? 'block lg:hidden'
				: 'hidden'}"
			aria-label="Open navigation"
			on:click={openNavBar}
		>
			<i class="fa-solid fa-bars-staggered"></i>
		</button>

		<button
			class="z-50 text-[1.9rem] px-0.5 text-zinc-300 {navBarOpen
				? 'block lg:hidden'
				: 'hidden'}"
			aria-label="Close navigation"
			on:click={closeNavBar}
		>
			<i class="fa-solid fa-xmark"></i>
		</button>

		{#if user}
			{@const avatar = createAvatar(shapes, {
				seed: $page.data.session?.user?.email ?? ""
			})}
			<div class="relative lg:ml-5 mr-2 lg:mr-0 z-50">
				<button
					class="flex items-center gap-3 sm:gap-4"
					on:click|stopPropagation={toggleDropdown}
				>
					<div class="flex items-center gap-3">
						<img
							src={avatar.toDataUriSync()}
							alt="Avatar"
							class="w-10 h-10 sm:w-11 sm:h-11 rounded-full"
						/>
						<span class="text-white hidden sm:block">
							{#if user.firstName}
								{user.firstName}
							{:else}
								{user.email}
							{/if}
						</span>
					</div>
					<div
						class="relative text-zinc-300 text-[1rem] sm:text-[1.15rem] mt-0.5"
					>
						<div
							class="duration-200 transition-opacity {showDropdown &&
								'opacity-0'}"
						>
							<i class="fa-solid fa-angle-down"></i>
						</div>
						<div
							class="absolute inset-0 duration-200 transition-opacity {!showDropdown &&
								'opacity-0'}"
						>
							<i class="fa-solid fa-angle-up"></i>
						</div>
					</div>
				</button>

				{#if showDropdown}
					<div
						class="block absolute right-0 mt-3.5 p-3.5 w-56 z-10 border rounded-lg shadow-sm bg-zinc-800 border-zinc-700 text-zinc-400"
						transition:fly={{ y: 8, duration: 200 }}
					>
						<a
							href="/dashboard"
							class="block px-4 py-3 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
							on:click|stopPropagation={toggleDropdown}
						>
							Dashboard
						</a>
						<a
							href="/schedule"
							class="block px-4 py-3 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
							on:click|stopPropagation={toggleDropdown}
						>
							Schedule
						</a>
						<button
							class="w-full text-left px-4 py-3 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors"
							on:click|stopPropagation={() => signOut()}
						>
							Sign Out
						</button>
					</div>
				{/if}
			</div>
		{:else}
			<!-- Temporarily commented out register/login button
			<a
				class="hidden lg:flex gap-2 bg-gradient-to-r from-primary to-secondary rounded-full px-10 py-[0.825rem] text-white hover:brightness-[1.08] transition-all"
				href="https://reg.worldaffairscon.org/"
			>
				<span>Register</span>
				<span>|</span>
				<span>Login</span>
			</a>
			-->
		{/if}
	</nav>
</header>
