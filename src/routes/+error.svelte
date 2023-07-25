<script lang="ts">
	import { page } from "$app/stores";
</script>

<!-- TODO: refine this page and add other error handling -->
{#if $page.status === 404}
	<section class="pt-[8.5rem]">
		<div class="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
			<div class="mx-auto max-w-screen-sm text-center">
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
		</div>
	</section>
{/if}
