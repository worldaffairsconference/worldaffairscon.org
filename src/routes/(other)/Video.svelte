<script lang="ts">
	import { gsap } from "gsap?client";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin?client";
	import { ScrollTrigger } from "gsap/ScrollTrigger?client";
	import { browser } from "$app/environment";

	import trailerThumbnail from "$lib/assets/images/thumbnails/trailer_thumbnail.png";
	import trailerVideo from "$lib/assets/video/wac_trailer.mp4";

	let showVideoPreview = true;

	if (browser) {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	}

	// Animates out of the video showcase
	const stopVideo = () => {
		showVideoPreview = true;

		const stopVideoTimeline = gsap.timeline();

		stopVideoTimeline
			.to(
				["#home", "#videoSection"],
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
				["#home", "#videoSection"],
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
</script>

<section
	class="h-screen w-screen relative flex flex-col mt-12 md:mt-20"
	id="videoSection"
>
	<h2
		class="w-full text-center text-4xl sm:text-5xl text-white tracking-tighter font-semibold"
		id="videoTitle"
	>
		WAC 2025 (Video Coming Soon)
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
			aria-label="Play WAC 2024 Trailer"
			id="video"
		>
			<img
				src={trailerThumbnail}
				alt="Trailer video thumbnail"
				class="w-full h-full object-cover object-center sm:rounded-2xl sm:shadow-md"
			/>

			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90px] w-[90px] lg:h-[109px] lg:w-[109px] bg-zinc-950/40 backdrop-blur-md rounded-full flex justify-center items-center"
			>
				<div
					class="w-[18px] lg:w-[22px] text-white group-hover:scale-110 transition-all relative ease-linear duration-300 ml-1"
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
