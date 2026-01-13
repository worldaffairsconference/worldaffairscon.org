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
	import wacWLarge from "$lib/assets/images/team/wac_w_large.jpg";

	// Track expanded state per speaker (by name)
	let expanded: Record<string, boolean> = {};

	const toggleExpanded = (name: string) => {
		expanded[name] = !expanded[name];
	};

	// Constants
	const TOTAL_STARS = 500; // How many stars there are

	interface Speaker {
		name: string;
		title: string;
		image: string;
		bio: string;
		tag?: string;
	}

	const speakers: Speaker[] = [
		{
			name: "Paul Goddard",
			title: "CEO and President of Pizza Pizza",
			image: wacWLarge,
			bio: "Paul Goddard holds a Bachelor of Science degree with Honours, Mechanical Engineering, from Queen's University, is a licensed Professional Engineer, and holds an MBA from London Business School, United Kingdom. Paul joined Pizza Pizza as Chief Information Officer and Vice President, Enterprise Development, before being appointed Chief Executive Officer in 2010."
		},
		{
			name: "Chris Hadfield",
			title: "Astronaut and Former Commander of the International Space Station",
			image: wacWLarge,
			bio: "",
			tag: "Keynote Speaker"
		},
		{
			name: "Martin Kon",
			title: "Former CFO of YouTube, President Emeritus of Cohere",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Arwa Damon",
			title: "Former CNN Senior International Correspondent, Founder of INARA",
			image: wacWLarge,
			bio: "Arwa Damon is a five-time Emmy winning former CNN Senior International Correspondent. While her career has taken her across the globe, she is best known for her coverage of the Middle East, especially out of Iraq and Syria, and for the human stories she brings into her reporting. She is also the recipient of numberous Peabody Awards, the Investigative Reporters and Editors award for her coverage of the 2012 attack on the US Consulate in Benghazi, and the prestigious \"Courage in Journalism\" award by the International Women's Media Foundations."
		},
		{
			name: "Marci Shore",
			title: "Chair of Intellectual European History at U of T, Former Yale Professor",
			image: wacWLarge,
			bio: "Marci Shore began a position as Chair in European Intellectual History at the Munk School for Global Affairs and Public Policy at the University of Toronto in 2025. She was previously professor of history at Yale University; she has also been a regular visiting fellow at the Institut für die Wissenschaften vom Menschen in Vienna since 2004. Her articles and essays have appeared in The New Yorker, Foreign Policy, Eurozine, the Atlantic, The Yale Review, The New York Review of Books, The Times Literary Supplement, The New York Times, and The Wall Street Journal. She is the recipient of a Guggenheim Fellowship for her book project about phenomenology in East-Central Europe tentatively titled \"In Pursuit of Certainty Lost: Central European Encounters on the Way to Truth.\""
		},
		{
			name: "Malcolm McAdie",
			title: "Wildlife Veterinarian, Saved Canada's Most Endangered Mammal",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Myck Kabongo",
			title: "Former NBA Player, D1 College Coach",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Neil Hetherington",
			title: "CEO of Daily Bread Food Bank",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Tzeporah Berman",
			title: "Founder of Fossil Fuel Non-Proliferation Treaty Initiative",
			image: wacWLarge,
			bio: "Tzeporah Berman BA, MES, LLD (honoris causa) has been designing climate justice and environmental advocacy campaigns and advising governments for over 30 years. She is the Co-founder and International Program Director at Stand.earth and the Founder and Chair of the Fossil Fuel Non-Proliferation Treaty Initiative."
		},
		{
			name: "Mark Cohon",
			title: "Former CFL Commissioner",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Joseph Lace",
			title: "Managing Director of JP Morgan",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Jack Armstrong",
			title: "Play by Play Commentator for the Toronto Raptors",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Isaac Lax",
			title: "Head of Roster Planning for the Toronto Raptors",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Greg Meredith",
			title: "Retired NHL Player, Serial Entrepreneur",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Michael Serbinis",
			title: "Founder and CEO of League and Three Angels Capital, Former CEO at Kobo, Critical Path, DocSpace, Zip2",
			image: wacWLarge,
			bio: ""
		},
		{
			name: "Alaa Murabit",
			title: "Founder of The Voice of Libyan Women",
			image: wacWLarge,
			bio: ""
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
					end: "bottom+=600 center",
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
					start: "top+=360 center",
					end: "top+=1680 center",
					scrub: true
				}
			});

			textTimeline
				.set("#aboutWac", { display: "flex" })
				.fromTo(
					"#aboutWac",
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.7, delay: 0.15 }
				)
				.to("#aboutWac", { opacity: 0, y: -12, duration: 0.45 })
				.set("#aboutWac", { display: "none" })
				.fromTo(
					"#wacStory",
					{ display: "flex", opacity: 0, y: 16 },
					{ opacity: 1, y: 0, duration: 2.7, delay: 0.25 }
				)
				.to(
					"#wacStory",
					{ opacity: 0, y: -14, duration: 0.6 },
					">+=0.2"
				)
				.set("#wacStory", { display: "none" })
				.fromTo(
					"#stats",
					{ display: "flex", opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 1.8, delay: 0.2 }
				);

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
				class="absolute inset-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center opacity-0 hidden transition-opacity"
				id="wacStory"
			>
				<div class="story-wrapper">
					<span class="ray ray-one" />
					<span class="ray ray-two" />
					<span class="ray ray-three" />
					<div class="story-card text-slate-100 text-base md:text-lg leading-relaxed space-y-6 px-8 py-10 md:px-14 md:py-12 rounded-3xl border border-white/15 bg-white/12 backdrop-blur-2xl shadow-[0_0_65px_rgba(129,140,248,0.45)]">
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
												<h3
													class="font-semibold text-white tracking-tight mb-[0.075rem]"
												>
													{speaker.name}
												</h3>
												<p
													class="text-zinc-200 text-xs"
												>
													{speaker.title}
													<br>
													<br>
												</p>
												<div class="text-zinc-200 text-xs">
													{#if expanded[speaker.name]}
														{speaker.bio}
													{:else}
														<div class="line-clamp-1">{speaker.bio}</div>
													{/if}
												</div>
												{#if speaker.bio && speaker.bio.split(/\s+/).length > 20}
													<button
														class="text-primary text-sm font-medium hover:underline"
														on:click={() => toggleExpanded(speaker.name)}
														aria-label={expanded[speaker.name] ? "Show less" : "Read more"}
													>
														{expanded[speaker.name] ? "Show less" : "Read more"}
													</button>
												{/if}
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
