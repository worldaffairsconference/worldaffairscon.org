<script lang="ts">
	import { browser } from "$app/environment";

	export let isCompleted: boolean | null = null;
	export let header: string;

	let contentElement: HTMLDivElement | undefined;

	let open = false;

	$: contentHeight = open ? contentElement?.scrollHeight : 0;
</script>

<svelte:window
	on:resize={() => (contentHeight &&= contentElement?.scrollHeight)}
/>

<!-- TODO: add a better fix instead of on:input -->
<details
	open={open || browser}
	class="rounded-lg border border-zinc-600 bg-zinc-800 py-3 px-4 sm:p-5"
	on:input={() => (contentHeight &&= contentElement?.scrollHeight)}
>
	<summary
		class="text-base sm:text-lg font-semibold text-white flex items-center justify-between cursor-pointer gap-3"
		on:click={(e) => {
			e.preventDefault();
			open = !open;
		}}
	>
		<div class="flex items-center grow">
			<div
				class="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-secondary bg-opacity-5 text-secondary"
			>
				<svg
					class="duration-300 ease-in-out fill-secondary stroke-secondary"
					class:-rotate-90={!open}
					width="17"
					height="10"
					viewBox="0 0 17 10"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
						fill=""
						stroke=""
					/>
				</svg>
			</div>
			<span class="text-left">
				{header}
			</span>
		</div>
		{#if isCompleted !== null}
			<div>
				{#if isCompleted === true}
					<div class="text-[1.5rem] text-green-400">
						<i class="fa-solid fa-circle-check"></i>
					</div>
				{:else}
					<div class="text-[1.5rem] text-red-400">
						<i class="fa-solid fa-circle-xmark"></i>
					</div>
				{/if}
			</div>
		{/if}
	</summary>
	<div
		class="px-1 w-full overflow-hidden transition-[height] duration-300"
		style={browser ? `height: ${contentHeight}px` : ""}
	>
		<div class="pt-3 pb-1" bind:this={contentElement}><slot /></div>
	</div>
</details>

<style>
	details > summary {
		list-style: none;
		&::-webkit-details-marker {
			display: none;
		}
	}
</style>
