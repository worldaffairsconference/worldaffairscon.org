<script lang="ts">
	import { page } from "$app/stores";

	import StarField from "$lib/components/StarField.svelte";
</script>

<StarField />
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
