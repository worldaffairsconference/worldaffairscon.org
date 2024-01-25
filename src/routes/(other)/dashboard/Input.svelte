<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface $$Props extends Omit<HTMLInputAttributes, "class"> {
		label: string;
	}

	export let label: $$Props["label"];
</script>

<label>
	<span class="text-white font-medium">{label}</span>
	<input
		class="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-primary focus:ring-0 px-2 py-1 text-white disabled:text-zinc-300 disabled:text disabled:cursor-not-allowed"
		{...$$restProps}
	/>
</label>
