<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import { onMount } from "svelte";
	import { browser } from "$app/environment";

	import type { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";

	import { gsap } from "gsap?client";
	import { ScrollTrigger } from "gsap/ScrollTrigger?client";

	import { type Swiper, Mousewheel } from "swiper";
	import { Swiper as SwiperContainer, SwiperSlide } from "swiper/svelte";

	// Images
	import ckHoffler from "$lib/assets/images/speakers/ck_hoffler.webp";
	import davidOwen from "$lib/assets/images/speakers/david_owen.webp";
	import edwardSnowden from "$lib/assets/images/speakers/edward_snowden.webp";
	import geoffreyHinton from "$lib/assets/images/speakers/geoffrey_hinton.webp";
	import johnStackhouse from "$lib/assets/images/speakers/john_stackhouse.webp";
	import marcGarneau from "$lib/assets/images/speakers/marc_garneau.webp";
	import mehdiHasan from "$lib/assets/images/speakers/mehdi_hasan.webp";
	import mlk from "$lib/assets/images/speakers/mlk.webp";
	import scottGalloway from "$lib/assets/images/speakers/scott_galloway.webp";
	import jamesHansen from "$lib/assets/images/speakers/james_hansen.webp";
	import sarahGallagher from "$lib/assets/images/speakers/sarah_gallagher.webp";

	export let camera: PerspectiveCamera;
	export let canvasElement: HTMLCanvasElement;

	interface Speaker {
		name: string;
		title: string;
		image: string;
		tag?: string;
	}

	const speakers: Speaker[] = [
		{
			name: "CK Hoffler",
			title: "CEO of The CK Hoffler Firm",
			image: ckHoffler,
			tag: "Keynote Speaker"
		},
		{
			name: "Martin Luther King III",
			title: "American Human Rights Activist",
			image: mlk,
			tag: "Keynote Speaker"
		},
		{
			name: "Edward Snowden",
			title: "Former NSA Consultant & Whistleblower",
			image: edwardSnowden,
			tag: "Keynote Speaker"
		},
		{
			name: "Dr. Geoffrey Hinton",
			title: "2018 recipient of the Turing Award for Computer Science",
			image: geoffreyHinton,
			tag: "Keynote Speaker"
		},
		{
			name: "Marc Garneau",
			title: "Former Canadian Astronaut",
			image: marcGarneau
		},
		{
			name: "Scott Galloway",
			title: "Professor of Marketing at NYU Stern School of Business",
			image: scottGalloway,
			tag: "Keynote Speaker"
		},
		{
			name: "Mehdi Hasan",
			title: "British-American Political Journalist, Broadcaster and Author",
			image: mehdiHasan,
			tag: "Keynote Speaker"
		},
		{
			name: "John Stackhouse",
			title: "Former Editor-in-Chief of The Globe and Mail",
			image: johnStackhouse
		},
		{
			name: "David Owen",
			title: "Former British Foreign Secretary",
			image: davidOwen
		},
		{
			name: "Dr. James Hansen",
			title: '"Father of climate change awareness"',
			image: jamesHansen,
			tag: "Keynote Speaker"
		},
		{
			name: "Dr. Sarah Gallagher",
			title: "Science Advisor to the Canadian Space Agency",
			image: sarahGallagher
		}
	];

	let gsapScope: Element;
	let showSpeakers = false;
	let mountSpeakers = false;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	onMount(async () => {
		const ctx = gsap.context(() => {
			// Timeline for camera movement
			gsap.timeline({
				scrollTrigger: {
					trigger: "#home",
					start: "top bottom",
					end: "bottom+=5350 center",
					pin: canvasElement,
					scrub: true
				}
			})
				.to(
					camera.position,
					{
						duration: 1,
						y: 109.5,
						z: 60
					},
					0
				)
				.to(
					"#stats",
					{
						delay: 0.5,
						opacity: 1,
						y: 10,
						duration: 0.5,
						display: "block"
					},
					0
				)
				.to(
					"#stats",
					{
						duration: 10
					},
					1
				);

			gsap.timeline({
				scrollTrigger: {
					trigger: "#home",
					start: "bottom bottom",
					end: "bottom+=5500 center",
					pin: "#home",
					scrub: true
				}
			})
				.to("#stats", {
					opacity: 0,
					delay: 0.15,
					duration: 0.25,
					y: -10,
					display: "hidden"
				})
				// Make the globe zoom in and position to the left side of the screen
				.to(camera.position, {
					delay: 0.1,
					duration: 0.75,
					x: 125,
					y: 10,
					z: 150
				})
				.to(camera.position, {
					delay: 1,
					duration: 0.5,
					x: 0,
					y: -65,
					z: 175
				});

			ScrollTrigger.create({
				trigger: "#stats",
				start: "top+=3600 center",
				end: "top+=4525 center",
				onEnter: () => {
					showSpeakers = true;
					mountSpeakers = true;
				},
				onLeave: () => {
					showSpeakers = false;
				},
				onEnterBack: () => {
					showSpeakers = true;
				},
				onLeaveBack: () => {
					showSpeakers = false;
				}
			});

			return () => ctx.revert();
		}, gsapScope);
	});

	let swiperInstance: Swiper;

	const prevSlide = () => {
		swiperInstance.slidePrev();
	};

	const nextSlide = () => {
		swiperInstance.slideNext();
	};
</script>

<svelte:head>
	<title>World Affairs Conference</title>
</svelte:head>

<div bind:this={gsapScope}>
	<section
		class="text-center fixed transform top-[15%] sm:top-1/4 -translate-y-[15%] sm:-translate-y-1/4 left-1/2 -translate-x-1/2 opacity-0 hidden transition-opacity w-5/6 mx-auto"
		id="stats"
	>
		<div class="h-full w-full">
			<h2 class="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10">
				WAC has reached:
			</h2>
			<dl
				class="max-w-screen-md gap-8 md:gap-16 mx-auto text-white flex justify-between flex-wrap text-center [&>*]:mx-auto"
			>
				<div class="flex flex-col items-center justify-center mx-auto">
					<dt
						class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
					>
						10k+
					</dt>
					<dd class="text-zinc-400 text-lg">students</dd>
				</div>
				<div class="flex flex-col items-center justify-center mx-auto">
					<dt
						class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
					>
						35+
					</dt>
					<dd class="text-zinc-400 text-lg">countries</dd>
				</div>
				<div class="flex flex-col items-center justify-center mx-auto">
					<dt
						class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
					>
						80+
					</dt>
					<dd class="text-zinc-400 text-lg">schools</dd>
				</div>
			</dl>
		</div>
	</section>

	<!-- Adding this container around speakers makes the initial scroll smoother -->
	<section class="relative h-screen z-20" id="home">
		<div
			class="absolute w-full h-screen text-left py-12 flex flex-col {showSpeakers
				? 'opacity-100 visibile'
				: 'opacity-0 invisible translate-y-2'} transition-all duration-[400ms] ease-in"
		>
			<h2
				class="text-center text-[2.75rem] sm:text-[4.3rem] font-bold text-white tracking-tight mb-8"
			>
				Past Speakers
			</h2>

			{#if mountSpeakers}
				<div class="grow overflow-hidden relative mb-6">
					<div
						class="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[200vw] md:w-[160vw] lg:w-[130vw] select-none"
					>
						<SwiperContainer
							modules={[Mousewheel]}
							spaceBetween={18}
							slidesPerView={3}
							freeMode={true}
							mousewheel={{
								releaseOnEdges: true,
								forceToAxis: true,
								thresholdDelta: 10
							}}
							class="w-full h-full"
							loop={true}
							navigation
							on:init={(swiper) => {
								swiperInstance = swiper.detail[0];
							}}
							breakpoints={{
								"@0.7": {
									slidesPerView: 4
								},
								"@0.9": {
									slidesPerView: 5
								},
								"@1.00": {
									slidesPerView: 6
								}
							}}
						>
							{#each speakers as speaker}
								<SwiperSlide
									class="rounded-md relative overflow-hidden select-none"
								>
									<img
										src={speaker.image}
										alt="{speaker.name}'s Headshot"
										class="w-full h-full object-cover transition-all"
									/>

									<div
										class="absolute bottom-0 w-full backdrop-blur-[8px] bg-zinc-900/30 h-20 px-3 sm:px-5 flex"
									>
										<div class="my-auto">
											<h3
												class="font-semibold text-white text-lg mdtext-xl tracking-tight mb-[0.075rem]"
											>
												{speaker.name}
											</h3>
											<p class="text-zinc-200 text-xs">
												{speaker.title}
											</p>
										</div>
									</div>
									<div
										class="absolute top-3 left-3 p-2 bg-zinc-900/50 rounded-md text-xs text-white"
									>
										{speaker.tag || "Plenary Speaker"}
									</div>
								</SwiperSlide>
							{/each}
						</SwiperContainer>
					</div>
				</div>
			{/if}
			<div class="self-center">
				<button
					on:click={prevSlide}
					class="text-[1.15rem] sm:text-[1.45rem] w-12 h-12 sm:w-16 sm:h-16 p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
					aria-label="Go to Previous Speaker"
				>
					<i class="fa-solid fa-arrow-left"></i>
				</button>
				<button
					on:click={nextSlide}
					class="text-[1.15rem] sm:text-[1.45rem] w-12 h-12 sm:w-16 sm:h-16 p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
					aria-label="Go to Next Speaker"
				>
					<i class="fa-solid fa-arrow-right"></i>
				</button>
			</div>
		</div>
	</section>
</div>
