<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";

	interface $$Props extends HTMLSelectAttributes {
		label: string;
	}

	export let label: $$Props["label"];
	let className: $$Props["class"] = "";
	export { className as class };
</script>

<div class={className}>
	<label class="sm:text-base text-sm">
		<span
			class="text-white font-medium {$$restProps['required'] &&
				"after:content-['*'] after:pl-2 after:text-[110%] after:text-red-500"}"
		>
			{label}
		</span>
		<div
			class="flex justify-between items-center mt-1.5 bg-zinc-700 rounded-md px-3 py-2.5 text-white appearance-none"
		>
			<select
				class="w-full bg-transparent border-none outline-none disabled:text-zinc-300 disabled:cursor-not-allowed"
				{...$$restProps}
			>
				<option hidden disabled value={undefined}>
					Please choose an option
				</option>
				<slot />
			</select>
			<div class="text-[0.9rem] sm:text-[1.25rem]">
				<i class="fa-solid fa-angle-down"></i>
			</div>
		</div>
	</label>
</div>

<style>
	select {
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
	}
</style>
