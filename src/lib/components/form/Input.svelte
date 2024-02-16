<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { v4 as uuid } from "uuid";

	interface $$Props extends Omit<HTMLInputAttributes, "list"> {
		label: string;
		list?: string[] | undefined | null;
	}

	export let label: $$Props["label"];
	export let list: $$Props["list"] = undefined;
	let className: $$Props["class"] = "";
	export { className as class };

	const listId = uuid();
</script>

<div class={className}>
	<label class="sm:text-base text-sm">
		<span
			class="text-white font-medium {$$restProps['required'] &&
				"after:content-['*'] after:pl-2 after:text-[110%] after:text-red-500"}"
		>
			{label}
		</span>
		<input
			class="mt-1.5 block w-full rounded-md bg-zinc-700 border-transparent px-3 py-2.5 text-white disabled:text-zinc-300 disabled:text disabled:cursor-not-allowed outline-none"
			list={list ? listId : undefined}
			{...$$restProps}
		/>
		{#if list}
			<datalist id={listId}>
				{#each list as item}
					<option value={item} />
				{/each}
			</datalist>
		{/if}
	</label>
</div>
