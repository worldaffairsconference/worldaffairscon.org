<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import { onMount } from "svelte";
	import * as THREE from "three?client";
	import { DateTime } from "luxon";
	import toast from "svelte-french-toast";
	import { browser } from "$app/environment";
	import { enhance } from "$app/forms";
	import { PUBLIC_DEPLOY_PRIME_URL } from "$env/static/public";

	import type { ActionData } from "./$types";

	import { gsap } from "gsap?client";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin?client";
	import { ScrollTrigger } from "gsap/ScrollTrigger?client";

	import { type Swiper, Mousewheel } from "swiper";
	import { Swiper as SwiperContainer, SwiperSlide } from "swiper/svelte";

	// Icons
	import TiArrowLeft from "svelte-icons/ti/TiArrowLeft.svelte";
	import TiArrowRight from "svelte-icons/ti/TiArrowRight.svelte";

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
	import trailerThumbnail from "$lib/assets/images/thumbnails/trailer_thumbnail.webp";
	import trailerVideo from "$lib/assets/video/wac_trailer.mp4";

	// Components
	import Tooltip from "$lib/components/Tooltip.svelte";

	let formMessages = {
		added: "You have been added to the mailing list!",
		alreadyAdded: "You are already on the mailing list!",
		invalidEmail: "Please enter a valid email address!",
		unknownError: "An unknown error occurred. Please try again later."
	};

	export let form: ActionData;

	const timeUntilConference = DateTime.local(2024, 3, 6)
		.diff(DateTime.now())
		.toFormat("d");

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
		const progressivelyLoad = (images: string[]) => {
			const texture = new THREE.Texture();
			texture.colorSpace = THREE.SRGBColorSpace;

			// Create an image object
			let imageObj: HTMLImageElement | null = new Image();
			let loadingIx = 0;

			// Set crossorigin to avoid WebGL error
			imageObj.crossOrigin = "anonymous";

			imageObj.onload = () => {
				if (imageObj !== null) {
					texture.image = imageObj;
					texture.needsUpdate = true;

					if (loadingIx < images.length) {
						(imageObj as HTMLImageElement).src = images[
							loadingIx++
						] as string;
					} else {
						imageObj = null;
					}

					texture.needsUpdate = true;
				}
			};

			imageObj.src = images[loadingIx++] as string;

			return texture;
		};
		// Setup scene
		const scene = new THREE.Scene();

		// Setup camera
		const camera = new THREE.PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.position.x = 0;
		camera.position.y = 121;
		camera.position.z = 125;

		scene.add(camera);

		// Lighting
		const ambientLight = new THREE.AmbientLight(0xcccccc, 0.01);
		scene.add(ambientLight);

		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(700, 270, 500);
		scene.add(pointLight);

		// Clouds
		const cloudGeometry = new THREE.SphereGeometry(100.6, 32, 32);
		const cloudMaterial = new THREE.MeshPhongMaterial({
			// map: new THREE.TextureLoader().load("./textures/clouds3.webp"),
			map: progressivelyLoad([
				"./textures/clouds-low.webp",
				"./textures/clouds-high.webp"
			]),
			transparent: true
		});

		const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
		scene.add(cloudMesh);

		// Earth
		const earthGeometry = new THREE.SphereGeometry(100, 128, 128);

		const earthMaterial = new THREE.MeshPhongMaterial({
			map: progressivelyLoad([
				"./textures/map-low.webp",
				"./textures/map-high.webp"
			]),
			bumpMap: new THREE.TextureLoader().load(
				"./textures/earth-topology.webp"
			),
			bumpScale: 0.5
		});

		earthMaterial.specular = new THREE.Color("#021563");
		earthMaterial.shininess = 0;

		const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
		scene.add(earthMesh);

		// earthMesh.rotateX(THREE.MathUtils.degToRad(90));
		// cloudMesh.rotateX(THREE.MathUtils.degToRad(90));

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
			requestAnimationFrame(animate);
			earthMesh.rotation.y += 0.0003;
			cloudMesh.rotation.y += 0.0005;
		};

		// Handles resizing the window
		const handleWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
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

		window.addEventListener("resize", handleWindowResize, false);
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

			return () => ctx.revert();
		}, gsapScope);
	});

	let showVideoPreview = true;

	// Animates out of the video showcase
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

	// Animates into the video showcase
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
					// Stops the video when the user scrolls away
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
	<meta
		property="og:image"
		content="{PUBLIC_DEPLOY_PRIME_URL}/page-previews/page-preview-.png"
	/>
</svelte:head>

<div bind:this={gsapScope}>
	<section
		class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center flex flex-col items-center h-screen w-screen absolute top-0 left-0 z-30"
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

		<div class="flex gap-2 mb-6 text-lg sm:text-xl lg:text-2xl">
			<span class="text-primary">#RollWAC</span>
			<span class="text-secondary cursor-pointer"
				>・ <Tooltip
					text="{timeUntilConference} days away"
					placement="right"
				>
					March 6th 2024
				</Tooltip>
			</span>
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
					class="border text-sm md:text-[0.9rem] rounded-lg block w-60 md:w-80 pl-10 pr-2.5 py-2.5 md:py-[0.655rem] md:pr-[0.655rem] bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-zinc-400 focus:border-zinc-400 outline-none"
					placeholder="name@school.com"
				/>
			</div>
			<button
				class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2.5 sm:py-2 text-white hover:brightness-[1.08] transition-all text-sm md:text-[0.9rem]"
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
					class="max-w-screen-md gap-8 md:gap-16 mx-auto text-white flex justify-between flex-wrap text-center [&>*]:mx-auto"
				>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[6rem] font-bold tracking-tight"
						>
							10k+
						</dt>
						<dd class="text-zinc-400">students</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[6rem] font-bold tracking-tight"
						>
							35+
						</dt>
						<dd class="text-zinc-400">countries</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[6rem] font-bold tracking-tight"
						>
							80+
						</dt>
						<dd class="text-zinc-400">schools</dd>
					</div>
				</dl>
			</div>
			<div
				class="absolute w-full h-screen text-left py-12 flex flex-col"
				id="speakers"
			>
				<h2
					class="text-center text-[2.75rem] sm:text-[4.3rem] font-bold text-white tracking-tight mb-8"
				>
					Past Speakers
				</h2>

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
										loading="lazy"
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
				<div class="self-center">
					<button
						on:click={prevSlide}
						class="h-12 w-12 sm:h-[3.35rem] sm:w-[3.35rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
						aria-label="Go to Previous Speaker"
					>
						<TiArrowLeft />
					</button>
					<button
						on:click={nextSlide}
						class="h-12 w-12 sm:h-[3.35rem] sm:w-[3.35rem] p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
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
			class="-top-5 absolute w-full text-center text-4xl sm:text-5xl text-white tracking-tighter font-semibold"
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
					'opacity-0'} absolute inset-0 z-30 group"
				on:click={onClickVideo}
				id="video"
			>
				<img
					src={trailerThumbnail}
					alt="Trailer video thumbnail"
					class="w-full h-full object-cover object-center sm:rounded-2xl sm:shadow-md"
					loading="lazy"
				/>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[109px] w-[109px] bg-zinc-950/40 backdrop-blur-md rounded-full flex justify-center items-center"
				>
					<div
						class="w-[22px] text-white group-hover:scale-110 transition-all relative ease-linear duration-300 ml-1"
					>
						<svg
							width="100%"
							viewBox="0 0 20 23"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z"
								fill="currentcolor"
							></path>
						</svg>
						<div
							class="opacity-0 group-hover:opacity-100 group-hover:blur-md text-white absolute inset-0 ease-linear duration-300"
						>
							<svg
								width="100%"
								viewBox="0 0 20 23"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 9.76795C20.3333 10.5378 20.3333 12.4623 19 13.2321L3.25 22.3253C1.91667 23.0951 0.250001 22.1329 0.250001 20.5933L0.250002 2.40673C0.250002 0.867131 1.91667 -0.0951185 3.25 0.674682L19 9.76795Z"
									fill="currentcolor"
								></path>
							</svg>
						</div>
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
							on:ended={stopVideo}
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
		class="w-screen px-12 md:px-28 pb-16 py-16 sm:py-20 flex justify-between lg:items-center flex-col lg:flex-row gap-7 bg-zinc-950/50"
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
					class="bg-gradient-to-r from-primary to-secondary rounded-lg px-6 py-2.5 sm:py-2 text-white text-sm hover:brightness-[1.08] transition-all"
				>
					Get Notified
				</button>
			</form>
		</div>
	</section>
</div>
