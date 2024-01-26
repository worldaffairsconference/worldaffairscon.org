<script lang="ts">
	import { onMount } from "svelte";

	import { Scene } from "three/src/scenes/Scene";
	import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
	import { BufferGeometry } from "three/src/core/BufferGeometry";
	import { PointsMaterial } from "three/src/materials/PointsMaterial";
	import { Float32BufferAttribute } from "three/src/core/BufferAttribute";
	import { Points } from "three/src/objects/Points";
	import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";

	let canvasElement: HTMLCanvasElement;

	// Constants
	const TOTAL_STARS = 1500; // How many stars there are

	onMount(() => {
		// Setup scene
		const scene = new Scene();

		// Setup camera
		const camera = new PerspectiveCamera();
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		camera.rotation.x = Math.PI / 2;
		camera.position.z = 1;

		scene.add(camera);

		// Stars
		const starsGeometry = new BufferGeometry();
		const starMaterial = new PointsMaterial({ color: 0xffffff, size: 6 });

		const starVertices: number[] = [];

		for (let i = 0; i < TOTAL_STARS; i++) {
			starVertices.push(
				Math.random() * 3000 - 1500,
				Math.random() * 10000 - 3000,
				Math.random() * 3000 - 1500
			);
		}

		starsGeometry.setAttribute(
			"position",
			new Float32BufferAttribute(starVertices, 3)
		);

		const stars = new Points(starsGeometry, starMaterial);
		scene.add(stars);

		let renderer: WebGLRenderer;

		const rotationAmount = 0.003;
		let currentSpeed = 5.0;

		// Render loop
		const animate = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(animate);

			const position = stars.geometry.attributes["position"];

			if (!position) return;

			for (let i = 0; i < TOTAL_STARS; i++) {
				let y = position.getY(i) - currentSpeed;

				if (y < 0) y = Math.random() * 10000 - 300;

				position.setY(i, y);
			}

			stars.rotation.y += rotationAmount;

			position.needsUpdate = true;
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

		return () => {
			renderer.dispose();
		};
	});
</script>

StarField

<div
	class="absolute inset-0 z-10 bg-zinc-900 h-screen w-screen overflow-hidden"
>
	<slot />

	<div class="absolute inset-0 -z-50">
		<canvas bind:this={canvasElement} />
	</div>
</div>
