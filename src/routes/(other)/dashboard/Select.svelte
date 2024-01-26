<script lang="ts">
	import type { HTMLSelectAttributes } from "svelte/elements";

	interface $$Props extends Omit<HTMLSelectAttributes, "class"> {
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
	<div
		class="mt-1.5 bg-zinc-700 rounded-md px-3 py-2.5 text-white disabled:text-zinc-300 disabled:text disabled:cursor-not-allowed appearance-none"
	>
		<select
			class="w-full bg-transparent border-none outline-none"
			{...$$restProps}
		>
			<slot />
		</select>
	</div>
</label>
