<script lang="ts">
	import "swiper/css";
	import "swiper/css/mousewheel";

	import flowchart1 from "$lib/assets/images/registration/flowcharts/1-large.jpg";
	import flowchart2 from "$lib/assets/images/registration/flowcharts/2-large.jpg";

	import { type Swiper, Mousewheel } from "swiper";
	import { Swiper as SwiperContainer, SwiperSlide } from "swiper/svelte";

	export let showCarousel = false;

	let swiperInstance: Swiper;

	const prevSlide = () => {
		swiperInstance.slidePrev();
	};

	const nextSlide = () => {
		swiperInstance.slideNext();
	};
</script>

{#if showCarousel}
	<section
		class="z-50 fixed inset-0 h-screen w-screen flex items-center bg-zinc-900 px-4 md:px-7"
	>
		<button
			class="z-50 text-[1.9rem] md:text-[2rem] px-0.5 text-zinc-300 absolute top-6 left-6 md:top-8 md:left-8"
			aria-label="Close navigation"
			on:click={() => (showCarousel = false)}
		>
			<i class="fa-solid fa-xmark"></i>
		</button>
		<button
			on:click={prevSlide}
			class="text-[1.15rem] sm:text-[1.45rem] w-12 h-12 sm:w-16 sm:h-16 p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
			aria-label="Go to Previous Speaker"
		>
			<i class="fa-solid fa-arrow-left"></i>
		</button>
		<SwiperContainer
			modules={[Mousewheel]}
			mousewheel={{
				releaseOnEdges: true,
				forceToAxis: true,
				thresholdDelta: 10
			}}
			navigation
			loop={true}
			class="w-2/3 md:w-1/2"
			on:init={(swiper) => {
				swiperInstance = swiper.detail[0];
			}}
		>
			{#each [flowchart1, flowchart2] as image, i}
				<SwiperSlide class="rounded-md select-none">
					<img
						src={image}
						alt="Flowchart {i}"
						class="w-full h-full object-cover transition-all"
					/>
				</SwiperSlide>
			{/each}
		</SwiperContainer>
		<button
			on:click={nextSlide}
			class="text-[1.15rem] sm:text-[1.45rem] w-12 h-12 sm:w-16 sm:h-16 p-1.5 rounded-full bg-black text-white hover:bg-white hover:text-black transition-colors duration-150 ease-in"
			aria-label="Go to Next Speaker"
		>
			<i class="fa-solid fa-arrow-right"></i>
		</button>
	</section>
{/if}
