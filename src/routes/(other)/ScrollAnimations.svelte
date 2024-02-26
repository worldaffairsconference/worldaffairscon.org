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
	import alexCui from "$lib/assets/images/speakers/alex-cui.webp";
	import bobDameron from "$lib/assets/images/speakers/bob-dameron.webp";
	import carolineCodsi from "$lib/assets/images/speakers/caroline-codsi.webp";
	import chrisOShaughnessy from "$lib/assets/images/speakers/chris-o-shaughnessy.webp";
	import cosmianMorariu from "$lib/assets/images/speakers/cosmian-morariu.webp";
	import eskoAho from "$lib/assets/images/speakers/esko-aho.webp";
	import franciscoSagasti from "$lib/assets/images/speakers/francisco-sagasti.webp";
	import kathrynHume from "$lib/assets/images/speakers/kathryn-hume.webp";
	import bruceKuwabara from "$lib/assets/images/speakers/bruce-kuwabara.webp";
	import nikolasBadminton from "$lib/assets/images/speakers/nikolas-badminton.webp";
	import robertaBondar from "$lib/assets/images/speakers/roberta-bondar.webp";
	import sandraHawken from "$lib/assets/images/speakers/sandra-hawken.webp";
	import tomHeintzman from "$lib/assets/images/speakers/tom-heintzman.webp";
	import odedGalor from "$lib/assets/images/speakers/oded-galor.webp";
	import bobRae from "$lib/assets/images/speakers/bob-rae.webp";
	import faresKady from "$lib/assets/images/speakers/fares-kady.webp";

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
			name: "Bob Dameron '75",
			title: "Head of Business Development of Multiverse Computing",
			image: bobDameron
		},
		{
			name: "Tom Heintzman '82",
			title: "Managing Director and Vice-Chair, Energy Transition & Sustainability CIBC Capital Markets",
			image: tomHeintzman
		},
		{
			name: "Kathryn Hume",
			title: "VP of Digital Channels Technology at Royal Bank of Canada",
			image: kathrynHume
		},
		{
			name: "Nikolas Badminton",
			title: "Futurist",
			image: nikolasBadminton
		},
		{
			name: "Sandra Hawken",
			title: "President and CEO of Holland Bloorview Kids Rehabilitation Hospital Foundation",
			image: sandraHawken,
			tag: "Keynote Speaker"
		},
		{
			name: "Bob Rae",
			title: "Canadian Ambassador to UN",
			image: bobRae
		},
		{
			name: "Roberta Bondar",
			title: "Roberta L Bondar, C.C. O.Ont. MD PhD FRSC ICD.D, Canada’s First Female Astronaut in Space",
			image: robertaBondar
		},
		{
			name: "Francisco Sagasti",
			title: "Former President of Peru (2020-2021)",
			image: franciscoSagasti
		},
		{
			name: "Esko Aho",
			title: "Former PM of Finland",
			image: eskoAho
		},
		{
			name: "Bruce Kuwabara, O. C.",
			title: "Architect",
			image: bruceKuwabara
		},
		{
			name: "Alex Cui",
			title: "CTO @ GPTZero",
			image: alexCui
		},
		{
			name: "Oded Galor",
			title: "Founder of Unified Growth Theory, Herbert Goldberger Professor of Economics at Brown University",
			image: odedGalor
		},
		{
			name: "Cosmina Morariu",
			title: "Global Partner of Fragomen LPP",
			image: cosmianMorariu
		},
		{
			name: "Caroline Codsi",
			title: "President of Women in Governance",
			image: carolineCodsi
		},
		{
			name: "Chris O'Shaugnessy",
			title: "Author",
			image: chrisOShaughnessy
		},
		{
			name: "Fares Kady",
			title: "Head of Aleppo Office, World Health Organization",
			image: faresKady
		}
	];

	let canvasElement: HTMLCanvasElement;
	let gsapScope: Element;

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
					end: "bottom+=3000 center",
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
				.to(camera.position, {
					delay: 0.75,
					duration: 1.25,
					x: 0,
					y: -65,
					z: 240,
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
				class="absolute inset-0 w-full h-screen text-left py-12 opacity-0 hidden transition-opacity"
				id="stats"
			>
				<div class="flex flex-col h-full w-full">
					<h2
						class="text-center text-[2.75rem] sm:text-[4.3rem] font-bold text-white tracking-tight mb-8"
					>
						2024 Speakers
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
										/>

										<div
											class="absolute bottom-0 w-full backdrop-blur-[8px] bg-zinc-900/30 h-[6.25rem] px-3 sm:px-5 flex"
										>
											<div class="my-auto">
												<h3
													class="font-semibold text-white tracking-tight mb-[0.075rem]"
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
			</div>
			<canvas bind:this={canvasElement} />
		</div>
	</section>

	<div id="videoSection" class="h-screen">
		{#if videoSection}
			{#await videoSection then { default: Video }}
				<Video />
			{/await}
		{/if}
	</div>
</div>
