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

	import { speakers2026 } from "$lib/data/speakers2026";

	// Constants
	const TOTAL_STARS = 500; // How many stars there are

	const speakers = speakers2026;

	let canvasElement: HTMLCanvasElement;
	let gsapScope: Element;

	let camera: PerspectiveCamera;
	let renderer: WebGLRenderer;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	let videoSection: any;

	onMount(() => {
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
		const createCircleTexture = () => {
			const size = 64;
			const circleCanvas = document.createElement("canvas");
			circleCanvas.width = size;
			circleCanvas.height = size;

			const context = circleCanvas.getContext("2d");
			if (!context) return undefined;

			const gradient = context.createRadialGradient(
				size / 2,
				size / 2,
				0,
				size / 2,
				size / 2,
				size / 2
			);

			gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
			gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
			gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

			context.fillStyle = gradient;
			context.beginPath();
			context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
			context.fill();

			const texture = new Texture(circleCanvas);
			texture.colorSpace = SRGBColorSpace;
			texture.needsUpdate = true;

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
		const starTexture = createCircleTexture();
		const starMaterial = new PointsMaterial({
			color: 0xffffff,
			size: 4,
			map: starTexture,
			transparent: true,
			alphaTest: 0.2,
			depthWrite: false
		});

		const starVertices: number[] = [];

		for (let i = 0; i < TOTAL_STARS; i++) {
			const x = randFloatSpread(500);
			const y = randFloatSpread(500);
			const z = randFloatSpread(600);

			starVertices.push(x, y, z);
		}

		const extraBottomStars = Math.floor(TOTAL_STARS * 0.35);
		for (let i = 0; i < extraBottomStars; i++) {
			const x = randFloatSpread(500);
			const y = -Math.random() * 250;
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
					end: "bottom+=1400 center",
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
					delay: 0.5,
					duration: 2.5,
					x: 0,
					y: -65,
					z: 240,
					ease: "sine.out"
				});

			const textTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: "#container",
					start: "top+=320 center",
					end: "top+=2600 center",
					scrub: true
				}
			});

			textTimeline
				.set("#aboutWac", { display: "flex", opacity: 1, y: 0 })
				.to("#aboutWac", { opacity: 1, duration: 0.9 })
				.to("#aboutWac", { opacity: 0, y: -12, duration: 0.45 })
				.set("#aboutWac", { display: "none" })
				.fromTo(
					"#wacStory",
					{ display: "flex", opacity: 0, y: 12 },
					{ opacity: 1, y: 0, duration: 0.35 }
				)
				.to("#wacStory", { opacity: 1, duration: 1.6 })
				.to(
					"#wacStory",
					{ opacity: 0, y: -14, duration: 0.3 },
					">+=0.5"
				)
				.set("#wacStory", { display: "none" })
				.fromTo(
					"#stats",
					{ display: "flex", opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 1.8, delay: 0.2 }
				)
				.to("#stats", { opacity: 1, duration: 1.2 });

			gsap.to(starVertices, {
				scrollTrigger: {
					trigger: "#videoSection",
					start: "top bottom",
					end: "top top",
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

		loadVideoSection();

		return () => {
			renderer.dispose();
			ctx.revert();
		};
	});

	async function loadVideoSection() {
		videoSection = await import("./Video.svelte");
	}

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
<div bind:this={gsapScope} class="bg-zinc-900">
	<section
		class="pt-[10rem] md:pt-44 lg:pt-[13.5rem] text-center relative h-screen"
		id="home"
	>
		<div
			class="absolute w-full h-screen flex justify-center inset-0 -z-50"
			id="container"
		>
			<div
				class="absolute inset-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center opacity-0 hidden transition-opacity"
				id="wacStory"
			>
				<div class="story-wrapper">
					<span class="ray ray-one" />
					<span class="ray ray-two" />
					<span class="ray ray-three" />
					<div class="story-card text-slate-100 text-base md:text-lg leading-relaxed space-y-6 px-8 py-10 md:px-14 md:py-12 rounded-3xl border border-white/15 bg-zinc-900/80 shadow-[0_0_65px_rgba(129,140,248,0.45)]">
						<p>
							Since 1983, WAC has been a place for high school students to
							listen, learn, and discuss a variety of topics ranging from STEM,
							education, social justice, sustainability and diversity &
							inclusion. Through keynote speakers, plenary panels, as well as
							interactive sessions such as networking with the speakers
							themselves, students have the opportunity to hear directly from
							world renowned leaders as well as discuss ideas with their peers.
						</p>
						<p>
							Led by a team of students from Upper Canada College and Branksome
							Hall, through many months of hard work WAC each year brings
							together an extraordinary roster of speakers to share their
							perspective on current topics affecting our society.
						</p>
						<p>
							In the end, WAC is more than just a conference; it's a space where
							innovative thinkers get to come together and engage in discussions
							with like minded individuals.
						</p>
					</div>
				</div>
			</div>

			<div
				class="absolute inset-0 w-full h-screen text-left py-12 opacity-0 hidden transition-opacity"
				id="stats"
			>
				<div class="flex flex-col h-full w-full">
					<h2
						class="text-center text-[2.75rem] sm:text-[4.3rem] font-bold text-white tracking-tight mb-8"
					>
						WAC 2026 Speakers
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
									initialSlide={3}
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
											class="absolute bottom-0 w-full backdrop-blur-[8px] bg-zinc-900/30 min-h-[7.25rem] px-3 sm:px-5 flex"
										>
											<div class="my-auto">
												<h3 class="font-semibold text-white tracking-tight mb-[0.075rem]">
													<a
														href={`/2026-speakers#${speaker.slug}`}
														class="hover:underline"
													>
														{speaker.name}
													</a>
												</h3>
												<p
													class="text-zinc-200 text-xs"
												>
													{speaker.title}
													<br>
													<br>
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
			<canvas
				bind:this={canvasElement}
				class="fixed inset-0 w-full h-full -z-10 pointer-events-none"
			/>
		</div>
	</section>

	<div class="relative z-10 flex items-center justify-center py-6 sm:py-8">
		<div class="h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-white/45 to-transparent"></div>
		<div class="mx-4 h-2 w-2 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.7)]"></div>
		<div class="h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-white/45 to-transparent"></div>
	</div>

	<div id="videoSection" class="h-screen">
		{#if videoSection}
			{#await videoSection then { default: Video }}
				<Video />
			{/await}
		{/if}
	</div> 
</div>

<style>
	#wacStory {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.story-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 48rem;
	}

	.story-card {
		width: 100%;
	}

	.ray {
		position: absolute;
		display: block;
		width: 220px;
		height: 6px;
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, 0),
		rgba(255, 255, 255, 0.65),
			rgba(255, 255, 255, 0)
		);
		filter: blur(1px);
		opacity: 0.65;
		pointer-events: none;
		z-index: -1;
		transform: opacity 0.6s ease;
	}

	.ray-one {
		top: 12%;
		left: 10%;
		transform: rotate(-32deg) scaleX(1.1);
	}

	.ray-two {
		bottom: 18%;
		right: 8%;
		transform: rotate(28deg) scaleX(1.7);
		opacity: 0.45;
	}

	.ray-three {
		top: 48%;
		right: 20%;
		transform: rotate(-58deg) scaleX(0.95);
		opacity: 0.5;
	}

	.story-wrapper:hover .ray {
		opacity: 0.85;
	}
</style>
