<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";

	interface $$Props extends Omit<HTMLSelectAttributes, "class"> {
		label: string;
	}

	export let label: $$Props["label"];
</script>

<label>
	<span class="text-white font-medium">{label}</span>
	<div
		class="bg-zinc-700 rounded-md focus:border-primary focus:ring-0 pl-2 pr-1 py-1 text-white disabled:text-zinc-300 disabled:text disabled:cursor-not-allowed"
	>
		<select class="w-full bg-transparent border-none" {...$$restProps}>
			<slot />
		</select>
	</div>
</label>
