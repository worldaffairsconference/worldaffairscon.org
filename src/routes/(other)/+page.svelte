<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import { onMount } from "svelte";
	import { page } from "$app/stores";

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

	import type { User } from "@auth/core/types";

	// Components
	import Tooltip from "$lib/components/Tooltip.svelte";

	const user = $page.data.session?.user as User | undefined;

	// let formMessages = {
	// 	added: "You have been added to the mailing list!",
	// 	alreadyAdded: "You are already on the mailing list!",
	// 	invalidEmail: "Please enter a valid email address!",
	// 	unknownError: "An unknown error occurred. Please try again later."
	// };

	// export let form: ActionData;

	// $: if (form) {
	// 	if (form.success) {
	// 		toast.success(formMessages[form.message]);
	// 	} else {
	// 		toast.error(formMessages[form.message]);
	// 	}
	// }

	const calculateDaysUntilDate = (targetDate: Date) => {
		const currentDate = new Date();

		const timeDifference = targetDate.getTime() - currentDate.getTime();

		const localTimeOffset = currentDate.getTimezoneOffset() * 60 * 1000;
		const adjustedDaysDifference =
			(timeDifference + localTimeOffset) / (1000 * 60 * 60 * 24);

		return Math.floor(adjustedDaysDifference);
	};

	const timeUntilConference = calculateDaysUntilDate(new Date(2024, 2, 6));

	// Constants
	const TOTAL_STARS = 500; // How many stars there are

	let canvasElement: HTMLCanvasElement;
	let camera: PerspectiveCamera;
	const starVertices: number[] = [];
	let renderer: WebGLRenderer;
	let starsGeometry: BufferGeometry;
	let pageMounted = false;

	let scrollAnimations: any = null;
	let video: any = null;

	onMount(async () => {
		pageMounted = true;

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
		starsGeometry = new BufferGeometry();
		const starMaterial = new PointsMaterial({ color: 0xffffff });

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

		scrollAnimations = await import("./ScrollAnimations.svelte");
		video = await import("./Video.svelte");

		return () => {
			renderer.dispose();
		};
	});

	// Handles resizing the window
	const handleWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};
</script>

<svelte:head>
	<title>World Affairs Conference</title>
</svelte:head>

<svelte:window on:resize={handleWindowResize} />

<section
	class="md:pt-[11.5rem] text-center flex flex-col items-center h-screen w-screen z-20 {pageMounted
		? 'opacity-100'
		: 'opacity-0 translate-y-7'} {user
		? 'pt-[8rem]'
		: 'pt-[7rem]'} transition-all duration-[600ms] ease-out"
>
	<h2
		class="text-[1.4rem] sm:text-[1.6rem] lg:text-[1.9rem] uppercase mb-2.5 lg:mb-3.5 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary px-3"
	>
		<span>Minds in</span>
		<span class="italic">Motion</span>
	</h2>
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
		<a
			class="text-primary"
			href="https://www.instagram.com/WorldAffairsCon"
			target="_blank"
			rel="noopener noreferrer">#RollWAC</a
		>
		<div class="text-secondary cursor-pointer">
			・ <Tooltip
				text={`${timeUntilConference} days away`}
				placement="right"
			>
				March 6th 2024
			</Tooltip>
		</div>
	</div>

	{#if !user}
		<a
			class="text-sm lg:hidden gap-2 bg-gradient-to-r from-primary to-secondary rounded-full px-10 py-[0.75rem] text-white hover:brightness-[1.08] transition-all"
			href="/signin"
		>
			<span>Register</span>
			<span>|</span>
			<span>Login</span>
		</a>
	{/if}
</section>

{#if scrollAnimations}
	{#await scrollAnimations then { default: ScrollAnimations }}
		<ScrollAnimations {camera} {canvasElement} />
	{/await}
{/if}

<canvas
	bind:this={canvasElement}
	class="absolute inset-0 -z-10 w-screen"
	id="canvas"
/>

<div class="-mt-24 mb-24">
	{#if video}
		{#await video then { default: Video }}
			<Video {starVertices} {starsGeometry} />
		{/await}
	{/if}
</div>

<!--
<section
	class="w-screen px-12 md:px-28 pb-16 py-16 sm:py-20 flex justify-between lg:items-center flex-col lg:flex-row gap-7 bg-zinc-950/60"
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
					class="border text-sm rounded-lg block w-full sm:w-64 md:w-96 pl-10 p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white outline-none"
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
</section> -->
