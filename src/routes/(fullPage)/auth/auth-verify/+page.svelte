<script lang="ts">
	// import authVerifyScreenshot from "$lib/assets/images/auth-verify-screenshot.png";
	import StarField from "$lib/components/StarField.svelte";
</script>

<section class="m-auto max-w-md w-full h-full">
	<div class="border rounded-xl shadow-sm bg-zinc-800 border-zinc-700">
		<div class="py-8 px-10 m-auto lg:px-6 text-center">
			<h1
				class="mb-2 text-4xl font-bold md:text-4xl text-secondary lg:pr-2.5"
			>
				Email Verification
			</h1>

			<!-- TODO: Remove additional style when `text-balance` is added to Tailwind -->
			<p
				class="mb-2 text-xl md:text-xl text-white max-w-[1000px]"
				style="text-wrap: balance;"
			>
				You should receive an email in the next few seconds. Signing in
				is then as easy as clicking on the link!
			</p>
		</div>
	</div>
</section>

<StarField />
