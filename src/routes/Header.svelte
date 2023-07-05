<script lang="ts">
	import gsap, { Expo } from 'gsap';
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	import logo from '$lib/images/logos/wac_medium.webp';

	interface Route {
		name: string;
		path: string;
	}

	const barTl = gsap.timeline({ reversed: true });

	let toggle: HTMLButtonElement;
	let headerElement: HTMLElement;
	let lastScrollTop: number;

	onMount(() => {
		window.addEventListener('scroll', function () {
			if (headerElement === null) return;

			var scrollTop = window.scrollY || document.documentElement.scrollTop;

			if (scrollTop < 350) {
				headerElement.style.position = 'absolute';
				headerElement.style.backgroundColor = 'transparent';
				headerElement.classList.remove('backdrop-blur-xl');
			} else {
				headerElement.style.position = 'fixed';
				headerElement.style.backgroundColor = 'rgb(0 0 0 / 0.3)';
				headerElement.classList.add('backdrop-blur-xl');
			}

			if (scrollTop >= lastScrollTop) {
				headerElement.style.top = '-200px';
			} else {
				headerElement.style.top = '0';
			}

			lastScrollTop = scrollTop;
		});

		barTl.set('#navbar', {
			className:
				'fixed right-0 bottom-0 z-50 bg-zinc-900 w-[68%] h-full bg-opacity-80 flex backdrop-blur-lg flex-col justify-center items-center text-xl gap-14 text-zinc-300'
		});
		barTl.set('#open', {
			display: 'none',
			duration: 0
		});
		barTl.to('#close', {
			display: 'block',
			duration: 0
		});
		barTl.to('#navbar', {
			duration: 0.3,
			ease: Expo.easeInOut
		});
	});

	const toggleNav = () => {
		// Checking if the hamburger nav is visible
		if (window.getComputedStyle(toggle).getPropertyValue('display') === 'none') return;

		if (barTl.reversed()) {
			barTl.timeScale(1).reversed(false);
		} else {
			barTl.reversed(true).time(0);
		}
	};

	const routes: Route[] = [
		{ name: 'Schedule', path: '/schedule' },
		{ name: 'Team', path: '/team' },
		{ name: 'Past Speakers', path: '/past-speakers' },
		{ name: 'FAQ', path: '/faq' }
	];
</script>

<header
	class="flex items-center justify-between px-6 lg:px-16 h-28 md:h-[8.5rem] w-full z-50 transition-all duration-300 absolute"
	bind:this={headerElement}
>
	<a href="/" class="hover:brightness-110 transition-all">
		<img src={logo} alt="logo" class="h-11 sm:h-14" height={44} />
	</a>
	<nav class="flex items-center gap-4 lg:gap-20">
		<ul class="hidden lg:flex gap-16 text-zinc-300" id="navbar">
			{#each routes as route}
				<li>
					<a
						href={route.path}
						class="text-zinc-300 hover:text-white transition-colors duration-100 hover:shadow-glow
                        {$page.url.pathname === route.path &&
							'underline decoration-primary underline-offset-8'}
                        "
						on:click={toggleNav}
					>
						{route.name}
					</a>
				</li>
			{/each}
		</ul>
		<button
			class="bg-gradient-to-r from-primary to-secondary rounded-full px-10 lg:px-12 py-3 text-white text-xs lg:text-base"
		>
			Login
		</button>
		<button
			class="block lg:hidden z-50"
			aria-label="Toggle navigation"
			bind:this={toggle}
			on:click={toggleNav}
		>
			<!-- Hamburger menu icon -->

			<svg
				height="32px"
				id="open"
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

			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="32px"
				height="32px"
				viewBox="0 0 32 32"
				version="1.1"
				class="h-5 w-5 fill-zinc-300 hidden"
				id="close"
			>
				<g id="surface1">
					<path
						d="M 19.796875 16 L 31.683594 4.117188 C 32.105469 3.695312 32.105469 3.011719 31.683594 2.589844 L 29.410156 0.316406 C 29.210938 0.113281 28.933594 0 28.648438 0 C 28.363281 0 28.085938 0.113281 27.886719 0.316406 L 16 12.203125 L 4.113281 0.316406 C 3.914062 0.113281 3.636719 0 3.351562 0 C 3.066406 0 2.789062 0.113281 2.589844 0.316406 L 0.316406 2.589844 C -0.105469 3.011719 -0.105469 3.695312 0.316406 4.117188 L 12.203125 16 L 0.316406 27.882812 C -0.105469 28.304688 -0.105469 28.988281 0.316406 29.410156 L 2.589844 31.683594 C 2.792969 31.886719 3.066406 32 3.351562 32 C 3.640625 32 3.914062 31.886719 4.117188 31.683594 L 16 19.800781 L 27.882812 31.683594 C 28.085938 31.886719 28.359375 32 28.648438 32 C 28.933594 32 29.207031 31.886719 29.410156 31.683594 L 31.683594 29.410156 C 32.105469 28.988281 32.105469 28.304688 31.683594 27.882812 Z M 19.796875 16 "
					/>
				</g>
			</svg>
		</button>
	</nav>
</header>
