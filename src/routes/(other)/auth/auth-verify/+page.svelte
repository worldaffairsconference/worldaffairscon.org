<script lang="ts">
	import authVerifyScreenshot from "$lib/assets/images/auth-verify-screenshot.png";
</script>

<section class="pt-[8.5rem] md:pt-[10rem]">
	<div class="container mx-auto">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div class="mx-auto mb-10 lg:mb-16 text-center">
					<span class="mb-2 block text-lg font-semibold text-primary">
						Email Verification
					</span>
					<h2
						class="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.5rem]"
					>
						Have you checked your inbox?
					</h2>
					<p class="text-zinc-400">
						You should receive an email like this in the next few
						seconds. Signing in is then as easy as clicking on the
						link!
					</p>
					<div
						class="border-8 mt-4 border-secondary rounded-lg mx-auto max-w-lg w-10/12"
					>
						<img
							class="grayscale hover:grayscale-0 transition ease-in-out delay-150"
							src={authVerifyScreenshot}
							alt="Screenshot of an example magic link email"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
