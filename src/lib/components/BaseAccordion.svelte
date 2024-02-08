<script lang="ts">
	import { browser } from "$app/environment";

	export let open = false;
	export let update = false;

	let className = "";
	export { className as class };

	let contentElement: HTMLDivElement | undefined;

	$: update, checkForUpdate();
	$: contentHeight = open ? contentElement?.scrollHeight : 0;

	const checkForUpdate = () => {
		if (update) {
			contentHeight = contentElement?.scrollHeight;
			update = false;
		}
	};
</script>

<svelte:window
	on:resize={() => (contentHeight &&= contentElement?.scrollHeight)}
/>

<!-- TODO: add a better fix instead of on:input -->
<details open={open || browser} class={className}>
	<summary
		class="cursor-pointer"
		on:click={(e) => {
			e.preventDefault();
			open = !open;
		}}
	>
		<slot name="header" />
	</summary>
	<div
		class="w-full overflow-hidden transition-[height] duration-300"
		style={browser ? `height: ${contentHeight}px` : ""}
	>
		<div bind:this={contentElement}>
			<slot name="content" />
		</div>
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
