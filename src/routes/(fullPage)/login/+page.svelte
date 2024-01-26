<script lang="ts">
	import type { DOMAttributes } from "svelte/elements";
	import { signIn } from "@auth/sveltekit/client";

	import toast from "svelte-french-toast";

	const onSubmitSignInForm: DOMAttributes<HTMLFormElement>["on:submit"] = (
		event
	) => {
		toast.loading("Verifying email…");
		signIn("email", {
			...Object.fromEntries(new FormData(event.currentTarget)),
			callbackUrl: "/dashboard"
		});
	};
</script>

<section class="m-auto max-w-md w-full">
	<div class="border rounded-xl shadow-sm bg-zinc-800 border-zinc-700">
		<div class="p-4 sm:p-7">
			<div class="text-center">
				<h1 class="block text-2xl font-bold text-white">Login</h1>
			</div>

			<div class="mt-5">
				<form on:submit|preventDefault={onSubmitSignInForm}>
					<div class="grid gap-y-4">
						<div>
							<label
								for="email"
								class="block text-sm mb-2 text-white"
							>
								Email address
							</label>

							<div class="relative">
								<div
									class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
								>
									<svg
										aria-hidden="true"
										class="w-5 h-5 text-zinc-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
										/>
										<path
											d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
										/>
									</svg>
								</div>
								<input
									type="email"
									name="email"
									required
									placeholder="Please use your school email"
									class="border text-sm md:text-[0.9rem] rounded-lg block pl-10 pr-2.5 py-2.5 md:py-[0.655rem] md:pr-[0.655rem] bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white outline-none w-full"
								/>
							</div>

							<p class="hidden text-xs text-red-600 mt-2">
								Please include a valid email address so we can
								get back to you
							</p>
						</div>

						<button
							type="submit"
							class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent bg-gradient-to-r from-primary to-secondary text-white hover:brightness-[1.08] transition-all"
						>
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
