<script lang="ts">
	import { v4 as uuid } from "uuid";
	import { createPopper, type Placement } from "@popperjs/core";
	import { onMount } from "svelte";

	export let text: string;
	export let placement: Placement = "auto";

	let target: HTMLSpanElement;
	let tooltip: HTMLDivElement;

	const id = uuid();

	onMount(() => {
		createPopper(target, tooltip, {
			placement,
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [0, 10]
					}
				}
			]
		});
	});
</script>

<span aria-describedby={id} class="target" bind:this={target}><slot /></span>
<div
	role="tooltip"
	{id}
	class="tooltip"
	data-popper-placement={placement}
	bind:this={tooltip}
>
	{text}
	<div class="arrow" data-popper-arrow />
</div>

<style>
	.target:hover + .tooltip {
		opacity: 100%;
	}

	.tooltip {
		opacity: 0%;
		background-color: #333;
		color: white;
		padding: 10px 10px;
		border-radius: 4px;
		font-size: 13px;
		z-index: 1000;
		transition: opacity 125ms ease-in-out;
		line-height: 13px;
	}

	.arrow,
	.arrow::before {
		position: absolute;
		width: 10px;
		height: 10px;
		z-index: -1;
	}

	.arrow::before {
		content: "";
		transform: translate(-50%, 0%) rotate(45deg);
		background: #333;
	}

	.tooltip[data-popper-placement^="top"] > .arrow {
		bottom: -5px;
	}

	.tooltip[data-popper-placement^="bottom"] > .arrow {
		top: -5px;
	}

	.tooltip[data-popper-placement^="left"] > .arrow {
		right: -5px;
	}

	.tooltip[data-popper-placement^="right"] > .arrow {
		left: -5px;
	}
</style>
