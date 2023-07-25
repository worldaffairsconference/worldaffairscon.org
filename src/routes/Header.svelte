<script lang="ts">
	// import gsap from "gsap?client";
	import { onMount } from "svelte";

	// import { browser } from "$app/environment";
	// import { page } from "$app/stores";
	import logo from "$lib/assets/images/logos/wac_medium.webp";

	// interface Route {
	// 	name: string;
	// 	path: string;
	// }

	// const barTl = browser
	// 	? gsap.timeline({ reversed: true })
	// 	: (undefined as unknown as gsap.core.Timeline);

	let headerElement: HTMLElement;
	let lastScrollTop: number;
	let navBarFixed = false;
	let navBarShowing = true;

	onMount(async () => {
		window.addEventListener("scroll", () => {
			if (headerElement === null) return;

			var scrollTop =
				window.scrollY || document.documentElement.scrollTop;

			navBarFixed = scrollTop >= 350;
			navBarShowing = scrollTop < lastScrollTop;
			lastScrollTop = scrollTop;
		});

		// barTl
		// 	.to(
		// 		"#navbar",
		// 		{
		// 			duration: 0.7,
		// 			ease: "expo.out",
		// 			right: 0
		// 		},
		// 		0
		// 	)
		// 	.set(
		// 		"#open",
		// 		{
		// 			display: "none",
		// 			duration: 0
		// 		},
		// 		0
		// 	)
		// 	.to(
		// 		"#close",
		// 		{
		// 			display: "block",
		// 			duration: 0
		// 		},
		// 		0
		// 	)
		// 	.to(
		// 		"#navbar > li",
		// 		{
		// 			duration: 0.6,
		// 			ease: "expo.easeOut",
		// 			opacity: 1,
		// 			y: 0,
		// 			stagger: 0.15
		// 		},
		// 		0.4
		// 	);
	});

	// const openNav = () => {
	// 	barTl.reversed(!barTl.reversed()).timeScale(1);
	// };

	// const closeNav = () => {
	// 	barTl.timeScale(2).reversed(!barTl.reversed());
	// };

	// const routes: Route[] = [
	// 	{ name: "Schedule", path: "/schedule" },
	// 	{ name: "Team", path: "/team" },
	// 	{ name: "Past Speakers", path: "/past-speakers" },
	// 	{ name: "FAQ", path: "/faq" }
	// ];
</script>

<header
	class="flex items-center justify-between px-6 lg:px-16 h-28 md:h-[8.5rem] w-full z-50 transition-all duration-[400ms]
	{navBarFixed
		? 'fixed bg-zinc-950/30 backdrop-blur-xl shadow-md shadow-zinc-950/5'
		: 'absolute bg-transparent'} 
	{navBarShowing ? 'top-0' : '-top-[150px]'}"
	bind:this={headerElement}
	id="header"
>
	<a href="/" class="hover:brightness-110 transition-all">
		<img src={logo} alt="logo" class="h-11 sm:h-14" />
	</a>

	<!-- <nav class="flex items-center gap-4 lg:gap-20">
		<ul
			class="fixed -right-[100%] bottom-0 z-50 bg-zinc-900 w-2/3 h-full bg-opacity-80 flex backdrop-blur-lg flex-col justify-center items-center text-2xl gap-12 text-zinc-300 lg:flex lg:gap-16 lg:static lg:bg-transparent lg:h-auto lg:w-auto lg:flex-row lg:items-center lg:justify-end lg:text-base lg:backdrop-blur-none"
			id="navbar"
		>
			{#each routes as route}
				<li
					class="transform translate-y-[75px] opacity-0 lg:translate-y-0 lg:opacity-100"
				>
					<a
						href={route.path}
						class="text-zinc-300 hover:text-white transition-colors duration-100 hover:shadow-glow
                        {$page.url.pathname === route.path &&
							'underline decoration-primary underline-offset-8'}
                        "
						on:click={closeNav}
					>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>

		<button
			class="bg-gradient-to-r from-primary to-secondary rounded-full px-10 lg:px-12 py-3 text-white text-xs lg:text-base hover:brightness-[1.08] transition-all"
		>
			Login
		</button>

		<button
			class="block lg:hidden z-50"
			aria-label="Open navigation"
			id="open"
			on:click={openNav}
		>
			<svg
				height="32px"
				style="enable-background:new 0 0 32 32;"
				version="1.1"
				viewBox="0 0 32 32"
				width="32px"
				xml:space="preserve"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				class="h-7 w-7 fill-zinc-300"
			>
				<path
					d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
				/>
			</svg>
		</button>

		<button
			class="hidden z-50 w-7 h-7"
			aria-label="Close navigation"
			id="close"
			on:click={closeNav}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="32px"
				height="32px"
				viewBox="0 0 32 32"
				version="1.1"
				class="h-5 w-5 fill-zinc-300"
			>
				<g id="surface1">
					<path
						d="M 19.796875 16 L 31.683594 4.117188 C 32.105469 3.695312 32.105469 3.011719 31.683594 2.589844 L 29.410156 0.316406 C 29.210938 0.113281 28.933594 0 28.648438 0 C 28.363281 0 28.085938 0.113281 27.886719 0.316406 L 16 12.203125 L 4.113281 0.316406 C 3.914062 0.113281 3.636719 0 3.351562 0 C 3.066406 0 2.789062 0.113281 2.589844 0.316406 L 0.316406 2.589844 C -0.105469 3.011719 -0.105469 3.695312 0.316406 4.117188 L 12.203125 16 L 0.316406 27.882812 C -0.105469 28.304688 -0.105469 28.988281 0.316406 29.410156 L 2.589844 31.683594 C 2.792969 31.886719 3.066406 32 3.351562 32 C 3.640625 32 3.914062 31.886719 4.117188 31.683594 L 16 19.800781 L 27.882812 31.683594 C 28.085938 31.886719 28.359375 32 28.648438 32 C 28.933594 32 29.207031 31.886719 29.410156 31.683594 L 31.683594 29.410156 C 32.105469 28.988281 32.105469 28.304688 31.683594 27.882812 Z M 19.796875 16 "
					/>
				</g>
			</svg>
		</button>
	</nav> -->
</header>
