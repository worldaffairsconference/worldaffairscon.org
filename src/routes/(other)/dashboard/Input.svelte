<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface $$Props extends Omit<HTMLInputAttributes, "class"> {
		label: string;
	}

	export let label: $$Props["label"];
</script>

<label class="sm:text-base text-sm">
	<span
		class="text-white font-medium {$$restProps['required'] &&
			"after:content-['*'] after:pl-2 after:text-[110%] after:text-red-500"}"
	>
		{label}
	</span>
	<input
		class="mt-1.5 block w-full rounded-md bg-zinc-700 border-transparent px-3 py-2.5 text-white disabled:text-zinc-300 disabled:text disabled:cursor-not-allowed outline-none"
		{...$$restProps}
	/>
</label>
