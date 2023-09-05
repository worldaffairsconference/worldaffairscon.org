<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";

	import { Scene } from "three/src/scenes/Scene";
	import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
	import { AmbientLight } from "three/src/lights/AmbientLight";
	import { PointLight } from "three/src/lights/PointLight";
	import { BufferGeometry } from "three/src/core/BufferGeometry";
	import { PointsMaterial } from "three/src/materials/PointsMaterial";
	import { Float32BufferAttribute } from "three/src/core/BufferAttribute";
	import { Points } from "three/src/objects/Points";
	import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
	import { randFloatSpread } from "three/src/math/MathUtils";

	let canvasElement: HTMLCanvasElement;

	// Constants
	const TOTAL_STARS = 600; // How many stars there are

	onMount(() => {
		// Setup scene
		const scene = new Scene();

		// Setup camera
		const camera = new PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.position.x = 0;
		camera.position.y = 121;
		camera.position.z = 125;

		scene.add(camera);

		// Lighting
		const ambientLight = new AmbientLight(0xcccccc, 0.01);
		scene.add(ambientLight);

		const pointLight = new PointLight(0xffffff, 1);
		pointLight.position.set(700, 270, 500);
		scene.add(pointLight);

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

		let renderer: WebGLRenderer;

		// Render loop
		const animate = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};

		// Handles resizing the window
		const handleWindowResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
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

		window.addEventListener("resize", handleWindowResize, false);
		createScene();
	});
</script>

<!-- TODO: refine this page and add other error handling -->
{#if $page.status === 404}
	<section class="absolute inset-0 z-10 bg-zinc-900">
		<div class="relative flex flex-col h-full w-full">
			<div class="py-8 px-4 m-auto lg:px-6 text-center z-50">
				<h1
					class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-secondary"
				>
					404
				</h1>
				<p
					class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white"
				>
					It looks like you're lost...
				</p>
				<p class="mb-4 text-lg font-light text-zinc-400">
					the page you are looking for does not exist.
				</p>
				<a
					href="/"
					class="inline-flex text-white bg-gradient-to-r from-primary to-secondary rounded-lg text-sm px-5 py-2.5 text-center my-4"
				>
					Go Back Home
				</a>
			</div>
			<div class="absolute inset-0 -z-50">
				<canvas bind:this={canvasElement} />
			</div>
		</div>
	</section>
{/if}
