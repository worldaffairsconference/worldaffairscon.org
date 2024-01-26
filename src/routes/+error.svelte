<script lang="ts">
	import { page } from "$app/stores";
<<<<<<< HEAD

	import FullPageStars from "$lib/components/FullPageStars.svelte";
</script>

<!-- 
<section
	class="absolute inset-0 z-10 bg-zinc-900 h-screen w-screen overflow-hidden"
>
=======
	import StarField from "$lib/components/StarField.svelte";
</script>

<!-- TODO: refine this page and add other error handling -->
<section class="h-screen w-screen overflow-hidden">
>>>>>>> main
	<div class="relative flex flex-col h-full w-full">
		
		<div class="absolute inset-0 -z-50">
			<canvas bind:this={canvasElement} />
		</div>
	</div>
</section> -->

<FullPageStars>
	<div
		class="py-8 px-10 lg:px-6 text-center z-50 h-screen flex justify-center items-center"
	>
		<div>
			<h1
				class="mb-2 text-8xl font-bold md:text-9xl lg:text-[12rem] text-secondary lg:pr-2.5"
			>
				{$page.status}
			</h1>
			{#if $page.status === 404}
				<p
					class="mb-2 text-xl font-bold md:text-3xl lg:text-4xl text-white"
				>
					It looks like you're lost…
				</p>
				<p class="mb-4 text-zinc-400 text-sm md:text-base">
					The page you are looking for does not exist
				</p>
			{:else if $page.status === 401}
				<p
					class="mb-2 text-xl font-bold md:text-3xl lg:text-4xl text-white"
				>
					{$page.error?.message}…
				</p>
				<p class="mb-4 text-zinc-400 text-sm md:text-base">
					This is probably because your school does not allow
					self-registration
				</p>
			{:else}
				<p
					class="mb-2 text-xl font-bold md:text-3xl lg:text-4xl text-white"
				>
					{$page.error?.message}…
				</p>
			{/if}
			<a
				href="/"
				class="inline-flex text-white bg-gradient-to-r from-primary to-secondary rounded-lg text-xs md:text-sm px-5 py-3 text-center my-4 hover:brightness-[1.08] transition-all"
			>
				Go Back Home
			</a>
		</div>
	</div>
<<<<<<< HEAD
</FullPageStars>
=======
</section>

<StarField />
>>>>>>> main
