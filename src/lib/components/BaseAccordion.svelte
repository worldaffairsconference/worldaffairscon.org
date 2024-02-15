<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import type { HTMLDetailsAttributes } from "svelte/elements";

	interface $$Props extends HTMLDetailsAttributes {
		open: boolean;
	}

	export let open: $$Props["open"] = false;

	let contentElement: HTMLDivElement | undefined;
	let contentHeight = contentElement?.scrollHeight ?? 0;

	onMount(() => {
		if (!contentElement) return;
		const observer = new ResizeObserver(() => {
			// The animation needs to be removed to prevent a
			// delay when an accordion is placed within an accordion
			contentElement?.parentElement?.classList.remove("duration-300");
			contentElement?.parentElement?.classList.add("duration-0");
			contentHeight = contentElement?.scrollHeight ?? 0;
			setTimeout(
				// The duration needs to be reset, but this needs to
				// happen in the next macrotask to allow the browser to
				// update the height before the animation is restored
				() =>
					contentElement?.parentElement?.classList.remove(
						"duration-0"
					),
				0
			);
		});
		observer.observe(contentElement);
		return () => observer.disconnect();
	});
</script>

<details open={open || browser} {...$$restProps}>
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
		style={browser ? `height: ${open ? contentHeight : 0}px` : ""}
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
