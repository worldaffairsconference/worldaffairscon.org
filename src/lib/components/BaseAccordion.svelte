<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import type { HTMLDetailsAttributes } from "svelte/elements";

	interface $$Props extends HTMLDetailsAttributes {
		open?: boolean;
	}

	export let open: $$Props["open"] = false;

	let contentElement: HTMLDivElement | undefined;
	let contentHeight = contentElement?.scrollHeight ?? 0;

	onMount(() => {
		if (!contentElement) return;
		const observer = new ResizeObserver(() => {
			// The animation needs to be removed to prevent a
			// delay when an accordion is placed within an accordion
			if (contentElement?.parentElement)
				contentElement.parentElement.style.transitionDuration = "0s";
			contentHeight = contentElement?.scrollHeight ?? 0;
			setTimeout(
				// The duration needs to be reset, but this needs to
				// happen in the next macrotask to allow the browser to
				// update the height before the animation is restored
				() => {
					if (contentElement?.parentElement)
						contentElement.parentElement.style.transitionDuration =
							"";
				},
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
		style:height={browser ? (open ? `${contentHeight}px` : 0) : ""}
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
