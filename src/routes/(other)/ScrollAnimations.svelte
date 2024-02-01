<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import { onMount } from "svelte";

	import { Texture } from "three/src/textures/Texture";
	import { SRGBColorSpace } from "three/src/constants";
	import { Scene } from "three/src/scenes/Scene";
	import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
	import { AmbientLight } from "three/src/lights/AmbientLight";
	import { PointLight } from "three/src/lights/PointLight";
	import { SphereGeometry } from "three/src/geometries/SphereGeometry";
	import { MeshPhongMaterial } from "three/src/materials/MeshPhongMaterial";
	import { TextureLoader } from "three/src/loaders/TextureLoader";
	import { Mesh } from "three/src/objects/Mesh";
	import { Color } from "three/src/math/Color";
	import { BufferGeometry } from "three/src/core/BufferGeometry";
	import { PointsMaterial } from "three/src/materials/PointsMaterial";
	import { Float32BufferAttribute } from "three/src/core/BufferAttribute";
	import { Points } from "three/src/objects/Points";
	import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
	import { randFloatSpread } from "three/src/math/MathUtils";

	import { browser } from "$app/environment";

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

	// Constants
	const TOTAL_STARS = 500; // How many stars there are

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

	let mountSpeakers = false;
	let showSpeakers = false;

	let camera: PerspectiveCamera;
	let renderer: WebGLRenderer;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	let videoSection: any;

	onMount(async () => {
		const createProgressivelyLoadedImage = (src: string) => {
			const image = new Image();
			image.crossOrigin = "anonymous";
			image.src = src;

			return image;
		};

		const load = (
			desktopImages: string[],
			mobileImages: string[]
		): Texture => {
			const texture = new Texture();
			texture.colorSpace = SRGBColorSpace;

			let currentUpdatedImageIndex = 0;

			const images =
				window.outerWidth < 600 ? mobileImages : desktopImages;

			images.forEach((image, i) => {
				const imageObj = createProgressivelyLoadedImage(image);

				imageObj.onload = () => {
					if (currentUpdatedImageIndex <= i) {
						texture.image = imageObj;
						texture.needsUpdate = true;
						currentUpdatedImageIndex = i;
					}
				};
			});

			return texture;
		};
		// Setup scene
		const scene = new Scene();

		// Setup camera
		camera = new PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.position.x = 0;
		camera.position.y = 123;
		camera.position.z = 125;

		scene.add(camera);

		// Lighting
		const ambientLight = new AmbientLight(0xcccccc, 0.01);
		scene.add(ambientLight);

		const pointLight = new PointLight(0xffffff, 1);
		pointLight.position.set(700, 270, 500);
		scene.add(pointLight);

		// Clouds
		const cloudGeometry = new SphereGeometry(100.6, 32, 32);
		const cloudMaterial = new MeshPhongMaterial({
			map: load(
				[
					"./textures/clouds-desktop-low.webp",
					"./textures/clouds-desktop-high.webp"
				],
				[]
			),
			transparent: true
		});

		const cloudMesh = new Mesh(cloudGeometry, cloudMaterial);
		scene.add(cloudMesh);

		// Earth
		const earthGeometry = new SphereGeometry(100, 128, 128);

		// const earthTexture = new THREE.TextureLoader().load(
		// 	"./textures/map.webp"
		// );
		// earthTexture.colorSpace = THREE.SRGBColorSpace;

		const earthMaterial = new MeshPhongMaterial({
			map: load(
				[
					"./textures/map-desktop-low.webp",
					"./textures/map-desktop-high.webp"
				],
				["./textures/map-mobile-high.webp"]
			),
			bumpMap: new TextureLoader().load("./textures/earth-topology.webp"),
			bumpScale: 0.5
		});

		earthMaterial.specular = new Color("#021563");
		earthMaterial.shininess = 0;

		const earthMesh = new Mesh(earthGeometry, earthMaterial);
		scene.add(earthMesh);

		// earthMesh.rotateX(degToRad(90));
		// cloudMesh.rotateX(degToRad(90));

		// Stars
		const starsGeometry = new BufferGeometry();
		const starMaterial = new PointsMaterial({ color: 0xffffff });

		const starVertices: number[] = [];

		for (let i = 0; i < TOTAL_STARS; i++) {
			const x = randFloatSpread(500);
			const y = randFloatSpread(500);
			const z = randFloatSpread(600);

			starVertices.push(x, y, z);
		}

		starsGeometry.setAttribute(
			"position",
			new Float32BufferAttribute(starVertices, 3)
		);

		const stars = new Points(starsGeometry, starMaterial);
		scene.add(stars);

		// Render loop
		const animate = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
			earthMesh.rotation.y += 0.0003;
			cloudMesh.rotation.y += 0.0005;
		};

		const createScene = () => {
			renderer = new WebGLRenderer({
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
						y: 109.5,
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

			ScrollTrigger.create({
				trigger: "#stats",
				start: "top+=3400 center",
				end: "top+=4700 center",

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
							new Float32BufferAttribute(
								starVertices.slice(0, starsRendered),
								3
							)
						);
					}
				}
			});
		}, gsapScope);

		videoSection = await import("./Video.svelte");

		return () => {
			renderer.dispose();
			ctx.revert();
		};
	});

	const handleWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
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
</svelte:head>

<svelte:window on:resize={handleWindowResize} />
<div bind:this={gsapScope}>
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
							class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
						>
							10k+
						</dt>
						<dd class="text-zinc-400 text-lg">students</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
						>
							35+
						</dt>
						<dd class="text-zinc-400 text-lg">countries</dd>
					</div>
					<div
						class="flex flex-col items-center justify-center mx-auto"
					>
						<dt
							class="mb-2 text-6xl md:text-[5.92rem] font-bold tracking-tight"
						>
							80+
						</dt>
						<dd class="text-zinc-400 text-lg">schools</dd>
					</div>
				</dl>
			</div>
			<div
				class="absolute inset-0 w-full h-screen text-left py-12 flex flex-col {showSpeakers
					? 'opacity-100 visibile'
					: 'opacity-0 invisible translate-y-1'} transition-all duration-[400ms] ease-in"
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
												<p
													class="text-zinc-200 text-xs"
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
			<canvas bind:this={canvasElement} />
		</div>
	</section>

	<div id="videoSection" class="h-screen">
		{#if videoSection}
			{#await videoSection then { default: Video }}
				<Video {mountSpeakers} />
			{/await}
		{/if}
	</div>
</div>
