<script lang="ts">
	import StarField from "$lib/components/StarField.svelte";

	import FaCheckCircle from "svelte-icons/fa/FaCheckCircle.svelte";
</script>

<StarField />
<section class="absolute inset-0 flex justify-center items-center">
	<div
		class="py-16 px-10 mx-4 rounded-xl bg-zinc-800 border-zinc-700 border text-center max-w-screen-sm"
	>
		<div
			class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-400 mx-auto mb-3"
		>
			<FaCheckCircle />
		</div>
		<h2 class="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
			Check your email
		</h2>
		<p class="text-sm sm:text-base text-zinc-400">
			You should receive an email in the next few seconds. Sign in by
			clicking the button in the email.
		</p>
	</div>
</section>
