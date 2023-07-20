<script>
	import { inc } from "./library";
	let count = 0;
</script>

<button on:click={() => (count = inc(count))}>{count}</button>
