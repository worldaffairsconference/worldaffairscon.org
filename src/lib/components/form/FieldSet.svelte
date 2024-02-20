<script lang="ts">
	import { onMount } from "svelte";
	import LargeAccordion from "../LargeAccordion.svelte";

	export let header: string;
	export let open = false;
	export let isValid: boolean | undefined = undefined;

	let fieldset: HTMLFieldSetElement | undefined;

	const checkValidity = () => {
		if (!fieldset) return (isValid = undefined);

		const inputs = Array.from(
			fieldset.querySelectorAll("input,select,textarea")
		) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];

		isValid = inputs.every((input) => input.validity.valid);
	};

	onMount(checkValidity);
</script>

<LargeAccordion {header} bind:open>
	<svelte:fragment slot="header-status">
		{#if isValid !== undefined}
			{#if isValid === true}
				<div class="text-[1.5rem] text-green-400">
					<i class="fa-solid fa-circle-check"></i>
				</div>
			{:else}
				<div class="text-[1.5rem] text-red-400">
					<i class="fa-solid fa-circle-xmark"></i>
				</div>
			{/if}
		{/if}
	</svelte:fragment>
	<fieldset
		class="grid sm:grid-cols-2 gap-y-3 sm:gap-y-5 gap-x-2"
		bind:this={fieldset}
		on:input={checkValidity}
	>
		<slot />
	</fieldset>
</LargeAccordion>
