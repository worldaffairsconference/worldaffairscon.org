<script lang="ts">
	import { browser } from "$app/environment";

	export let open = false;

	let className: string = "";
	export { className as class };

	let contentElement: HTMLDivElement | undefined;

	$: contentHeight = open ? contentElement?.scrollHeight : 0;
</script>

<svelte:window
	on:resize={() => (contentHeight &&= contentElement?.scrollHeight)}
/>

<!-- TODO: add a better fix instead of on:input -->
<details
	open={open || browser}
	on:input={() => (contentHeight &&= contentElement?.scrollHeight)}
	class={className}
>
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
