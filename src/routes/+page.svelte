<script lang="ts">
	import "swiper/css";
	import "swiper/css/navigation";

	import { ScrollToPlugin } from "gsap/ScrollToPlugin?client";
	import { ScrollTrigger } from "gsap/ScrollTrigger?client";
	import { gsap } from "gsap?client";
	import { onMount } from "svelte";
	import IoIosPlayCircle from "svelte-icons/io/IoIosPlayCircle.svelte";
	import TiArrowLeft from "svelte-icons/ti/TiArrowLeft.svelte";
	import TiArrowRight from "svelte-icons/ti/TiArrowRight.svelte";
	import type { Swiper } from "swiper";
	import { Swiper as SwiperContainer, SwiperSlide } from "swiper/svelte";
	import * as THREE from "three?client";
	import ThreeGlobe from "three-globe?client";

	import { browser } from "$app/environment";
	import { enhance } from "$app/forms";

	import ckHoffler from "$lib/images/speakers/ck_hoffler.webp";
	import davidOwen from "$lib/images/speakers/david_owen.webp";
	import edwardSnowden from "$lib/images/speakers/edward_snowden.webp";
	import geoffreyHinton from "$lib/images/speakers/geoffrey_hinton.webp";
	import johnStackhouse from "$lib/images/speakers/john_stackhouse.webp";
	import marcGarneau from "$lib/images/speakers/marc_garneau.webp";
	import mehdiHasan from "$lib/images/speakers/mehdi_hasan.webp";
	import mlk from "$lib/images/speakers/mlk.webp";
	import scottGalloway from "$lib/images/speakers/scott_galloway.webp";
	import jamesHansen from "$lib/images/speakers/james_hansen.webp";
	import sarahGallagher from "$lib/images/speakers/sarah_gallagher.webp";
	import trailerThumbnail from "$lib/images/thumbnails/trailer_thumbnail.webp";
	import trailerVideo from "$lib/video/wac_trailer.mp4";
	import toast from "svelte-french-toast";

	import type { ActionData } from "./$types";

	let formMessages = {
		added: "You have been added to the mailing list!",
		alreadyAdded: "You are already on the mailing list!",
		invalidEmail: "Please enter a valid email address!",
		unknownError: "An unknown error occurred. Please try again later."
	};

	export let form: ActionData;

	// TODO: style the toast a bit more
	$: if (form) {
		if (form.success) {
			toast.success(formMessages[form.message]);
		} else {
			toast.error(formMessages[form.message]);
		}
	}

	// Constants
	const TOTAL_STARS = 600; // How many stars there are
	const ATMOSPHERE_RADIUS = 0.1; // How thick the atmosphere is

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

	let canvasElement: HTMLCanvasElement;
	let gsapScope: Element;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	}

	onMount(async () => {
		// Initializing the globe
		const Globe = new ThreeGlobe({ animateIn: false })
			.globeImageUrl("./map.webp")
			.bumpImageUrl("./earth-topology.webp")
			.atmosphereAltitude(ATMOSPHERE_RADIUS)
			.atmosphereColor("#bcd2e3");

		// Rotate the globe on the diagonal axis
		Globe.rotateY(Math.PI / 2);

		// Custom globe material
		const globeMaterial = Globe.globeMaterial() as THREE.MeshPhongMaterial;
		globeMaterial.bumpScale = 10;
		globeMaterial.toneMapped = false;
		globeMaterial.emissiveIntensity = -100;

		new THREE.TextureLoader().load("./earth-water.webp", (texture) => {
			globeMaterial.specularMap = texture;
			globeMaterial.specular = new THREE.Color("#020263");
			globeMaterial.shininess = 0;
		});

		// Setup scene
		const scene = new THREE.Scene();

		scene.add(Globe);

		// Setup camera
		const camera = new THREE.PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.position.x = 0;
		camera.position.y = 121;
		camera.position.z = 125;

		scene.add(camera);

		// Lighting
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
		directionalLight.position.set(1, 1, 1);
		scene.add(new THREE.AmbientLight(0xcccccc));
		scene.add(directionalLight);

		// Stars
		const starsGeometry = new THREE.BufferGeometry();
		const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

		const starVertices: number[] = [];

		for (let i = 0; i < TOTAL_STARS; i++) {
			const x = THREE.MathUtils.randFloatSpread(500);
			const y = THREE.MathUtils.randFloatSpread(500);
			const z = THREE.MathUtils.randFloatSpread(600);

			starVertices.push(x, y, z);
		}

		starsGeometry.setAttribute(
			"position",
			new THREE.Float32BufferAttribute(starVertices, 3)
		);

		const stars = new THREE.Points(starsGeometry, starMaterial);
		scene.add(stars);

		let renderer: THREE.WebGLRenderer;

		// Render loop
		const animate = () => {
			renderer.render(scene, camera);
			Globe.rotateY(-0.00035);
			requestAnimationFrame(animate);
		};

		// Handles resizing the window
		const handleWindowResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		const createScene = () => {
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				canvas: canvasElement,
				alpha: true
			});

			renderer.setPixelRatio(
				window.devicePixelRatio ? window.devicePixelRatio : 1
			);
			renderer.setSize(window.innerWidth, window.innerHeight);

			animate();
		};

		window.addEventListener("resize", handleWindowResize);
		createScene();

		const ctx = gsap.context(() => {
			// Timeline for camera movement
			gsap.timeline({
				scrollTrigger: {
					trigger: "#home",
					start: "top top",
					end: "bottom+=6700 center",
					pin: "#home",
					scrub: true
				}
			})
				.to(
					camera.position,
					{
						duration: 1,
						y: 110,
						z: 60,
						ease: "power2.out"
					},
					0
				)
				// Make the globe zoom in and position to the left side of the screen
				.to(camera.position, {
					duration: 0.75,
					x: 125,
					y: 10,
					z: 150,
					ease: "power2.out",
					delay: 0.25
				})
				.to(camera.position, {
					delay: 0.75
				})
				.to(camera.position, {
					duration: 1.25,
					x: 0,
					y: -65,
					z: 175,
					ease: "sine.out"
				});

			const textTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: "#container",
					start: "top+=900 center",
					end: "top+=2100 center",
					scrub: true
				}
			});

			// Reveals the statistics
			textTimeline
				.to("#stats", {
					opacity: 1,
					y: 10,
					duration: 4,
					display: "block"
				})
				.to("#stats", {
					opacity: 0,
					duration: 1,
					y: -10,
					display: "hidden",
					delay: 5
				});

			const speakerTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: "#stats",
					start: "top+=3300 center",
					end: "top+=5400 center",
					scrub: true
				}
			});

			speakerTimeline.from("#speakers", {
				display: "hidden",
				opacity: 0,
				y: 10,
				duration: 1,
				ease: "sine.out"
			});

			speakerTimeline.to("#speakers", {
				opacity: 0,
				duration: 1,
				y: -10,
				display: "hidden",
				delay: 1.5
			});

			gsap.to(starVertices, {
				scrollTrigger: {
					trigger: "#videoSection",
					start: "top-=200% bottom",
					end: "top bottom",
					scrub: true,
					onUpdate: (self) => {
						// Removing last 10 items from starVertices array on ScrollTrigger on each update
						const starsRendered =
							starVertices.length -
							Math.floor(starVertices.length * self.progress);

						starsGeometry.setAttribute(
							"position",
							new THREE.Float32BufferAttribute(
								starVertices.slice(0, starsRendered),
								3
							)
						);
					}
				}
			});

			gsap.from("#title", {
				duration: 0.9,
				opacity: 0,
				y: 100,
				ease: "sine.out"
			});

			return () => ctx.revert();
		}, gsapScope);
	});

	let showVideoPreview = true;

	const stopVideo = () => {
		showVideoPreview = true;

		const stopVideoTimeline = gsap.timeline();

		stopVideoTimeline
			.to(
				["#videoSection", "#home", gsapScope],
				{
					backgroundColor: "#18181b", // bg-zinc-900
					ease: "sine.out",
					duration: 1
				},
				0
			)
			.to(
				"#videoTitle",
				{
					opacity: 1,
					display: "block",
					duration: 0.4,
					ease: "sine.out",
					delay: 0.2
				},
				0
			)
			.set(
				"#header",
				{
					y: 0,
					delay: 0.25
				},
				0
			);
	};

	const onClickVideo = (e: Event) => {
		const elementRect = (
			e.target as HTMLButtonElement
		).getBoundingClientRect();

		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const centerY =
			elementRect.top +
			scrollTop -
			(window.innerHeight - elementRect.height) / 2;

		const videoTimeline = gsap.timeline();

		videoTimeline
			.set("#header", {
				y: -200
			})
			.to(window, {
				scrollTo: {
					y: centerY,
					autoKill: false
				},
				onComplete: () => {
					ScrollTrigger.create({
						trigger: "#videoSection",
						start: "top top+=40px",
						end: "top+=80px top+=40px",
						onLeaveBack: stopVideo,
						onLeave: stopVideo
					});
					showVideoPreview = false;
				},
				duration: 0.6
			})

			.to(
				["#home", "#videoSection", gsapScope],
				{
					backgroundColor: "#000",
					duration: 0.4,
					ease: "sine.out",
					delay: 0.3
				},
				0
			)
			.to(
				"#videoTitle",
				{
					opacity: 0,
					display: "hidden",
					duration: 0.3,
					ease: "sine.out",
					delay: 0.2
				},
				0
			);
	};

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
	<meta
		name="description"
		content="North America's largest and Canada's oldest annual student-run current events conference."
	/>
</svelte:head>

<div bind:this={gsapScope}>
	<section
		class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center flex flex-col items-center h-screen w-screen absolute top-0 left-0 z-30"
		id="title"
	>
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

		<div class="flex gap-2 mb-6 text-xl lg:text-2xl">
			<!-- <span class="text-primary">#BeThere</span> -->
			<span class="text-primary">#RollWac</span>
			<span class="text-secondary">・ March 6th 2024</span>
		</div>

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
					class="border text-sm rounded-lg block w-56 md:w-80 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-zinc-400 focus:border-zinc-400 outline-none"
					placeholder="name@school.com"
				/>
			</div>
			<button
				class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2 text-white text-sm hover:brightness-[1.08] transition-all"
			>
				Get Notified
			</button>
		</form>
	</section>

	<section
		class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center relative h-screen bg-zinc-900"
		id="home"
	>
		<div
			class="absolute w-full h-screen flex justify-center inset-0 -z-50"
			id="container"
		>
			<div
				class="absolute top-[20%] sm:top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-[20%] sm:-translate-y-1/4 w-5/6 mx-auto opacity-0 hidden transition-opacity"
				id="stats"
			>
				<h2 class="text-lg sm:text-xl md:text-2xl text-zinc-300 mb-10">
					WAC has reached:
				</h2>
				<dl
					class="max-w-screen-md gap-8 mx-auto text-white flex justify-between flex-wrap text-center [&>*]:mx-auto"
				>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[5.4rem] font-bold tracking-tight"
						>
							10k+
						</dt>
						<dd class="text-zinc-400">students</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[5.4rem] font-bold tracking-tight"
						>
							35+
						</dt>
						<dd class="text-zinc-400">countries</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[5.4rem] font-bold tracking-tight"
						>
							80+
						</dt>
						<dd class="text-zinc-400">schools</dd>
					</div>
				</dl>
			</div>
			<div
				class="absolute w-full h-screen text-left py-12 sm:py-16 flex flex-col"
				id="speakers"
			>
				<h2
					class="text-center text-[2.75rem] sm:text-7xl font-bold text-white tracking-tight mb-8 sm:mb-12"
				>
					Past Speakers
				</h2>

				<div class="grow overflow-hidden relative mb-6">
					<div
						class="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[160vw] sm:w-[130vw]"
					>
						<SwiperContainer
							spaceBetween={20}
							slidesPerView={3}
							class="flex gap-6 w-full h-full"
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
									class="rounded-md relative overflow-hidden"
								>
									<img
										src={speaker.image}
										alt="{speaker.name}'s Headshot"
										class="w-full h-full object-cover transition-all"
									/>

									<div
										class="absolute bottom-0 w-full backdrop-blur-[8px] bg-zinc-900/30 h-20 px-3 flex"
									>
										<div class="my-auto">
											<h3
												class="font-semibold text-white sm:text-lg md:text-xl"
											>
												{speaker.name}
											</h3>
											<p
												class="text-zinc-300 text-[0.6rem] md:text-xs"
											>
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
				<div class="self-center">
					<button
						on:click={prevSlide}
						class="h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
						aria-label="Go to Previous Speaker"
					>
						<TiArrowLeft />
					</button>
					<button
						on:click={nextSlide}
						class="h-11 w-11 sm:h-[3.25rem] sm:w-[3.25rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
						aria-label="Go to Next Speaker"
					>
						<TiArrowRight />
					</button>
				</div>
			</div>
			<canvas bind:this={canvasElement} />
		</div>
	</section>

	<section class="h-screen w-screen relative flex flex-col" id="videoSection">
		<h2
			class="-top-3 absolute w-full text-center text-4xl sm:text-5xl text-white tracking-tighter font-semibold"
			id="videoTitle"
		>
			WAC 2023
		</h2>
		{#if !showVideoPreview}
			<button
				class="h-full w-full absolute inset-0 z-10 cursor-default"
				on:click={stopVideo}
			/>
		{/if}
		<div class="w-full sm:w-5/6 h-4/5 m-auto relative">
			<button
				class="transition-opacity duration-500 {!showVideoPreview &&
					'opacity-0'} absolute inset-0 z-30"
				on:click={onClickVideo}
				id="video"
			>
				<img
					src={trailerThumbnail}
					alt="Trailer video thumbnail"
					class="w-full h-full object-cover object-center sm:rounded-2xl sm:shadow-md"
				/>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				>
					<div class="h-24 w-24 text-white">
						<IoIosPlayCircle />
					</div>
				</div>
			</button>
			<div
				class="transition-opacity duration-500 {showVideoPreview &&
					'opacity-0'} absolute inset-0"
			>
				<div class="relative h-full w-full">
					{#if !showVideoPreview}
						<!-- TODO: <video> elements must have a <track kind="captions"> -->
						<!-- svelte-ignore a11y-media-has-caption -->
						<video
							class="w-full h-full sm:rounded-2xl sm:shadow-md absolute inset-0 z-50"
							autoplay
							controls
						>
							<source src={trailerVideo} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section
		class="w-screen px-12 md:px-28 pb-16 sm:py-20 flex justify-between lg:items-center flex-col lg:flex-row gap-7"
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
						class="border text-sm rounded-lg block w-full sm:w-64 md:w-96 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-zinc-400 focus:border-zinc-400 outline-none"
						placeholder="name@school.com"
					/>
				</div>
				<button
					class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2 text-white text-sm"
				>
					Get Notified
				</button>
			</form>
		</div>
	</section>
</div>
