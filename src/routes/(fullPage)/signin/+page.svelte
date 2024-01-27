<script lang="ts">
	import type { DOMAttributes } from "svelte/elements";
	import { signIn } from "@auth/sveltekit/client";
	import { fade } from "svelte/transition";

	import toast from "svelte-french-toast";

	let signInTokenPromise: Promise<Response | undefined> | undefined;

	const onSubmitSignInForm: DOMAttributes<HTMLFormElement>["on:submit"] = (
		event
	) => {
		toast.loading("Verifying email…");
		signInTokenPromise = signIn("magic-link", {
			email: new FormData(event.currentTarget).get("email"),
			callbackUrl: "/dashboard"
		});
	};
</script>

<svelte:head>
	<title>Sign In - World Affairs Conference</title>
</svelte:head>

<section class="absolute inset-0 flex justify-center items-center">
	<div
		class="border rounded-xl shadow-sm bg-zinc-800 border-zinc-700 max-w-md w-full mx-4 p-6 sm:px-8 sm:py-12"
	>
		<div class="text-center">
			<h1 class="block text-2xl md:text-3xl font-bold text-white">
				Register / Sign In
			</h1>
		</div>

		<div class="mt-10">
			<form on:submit|preventDefault={onSubmitSignInForm}>
				<div class="grid gap-y-4">
					<div>
						<label
							for="email"
							class="block mb-2 text-white text-[0.8rem] md:text-[0.95rem]"
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
								class="text-[0.8rem] md:text-[0.95rem] border rounded-lg block pl-10 pr-2.5 py-2.5 md:py-[0.655rem] md:pr-[0.655rem] bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white outline-none w-full"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={!!signInTokenPromise}
						class="text-[0.8rem] md:text-[0.95rem] w-full h-10 py-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:brightness-[1.08] transition-all relative"
					>
						{#if signInTokenPromise}
							<div
								transition:fade
								class="inline-flex justify-center items-center gap-x-2 absolute -translate-x-1/2 -translate-y-1/2"
							>
								<div class="animate-spin">
									<i class="fa-solid fa-spinner"></i>
								</div>
								Processing...
							</div>
						{:else}
							<div
								transition:fade
								class="inline-flex justify-center items-center absolute -translate-x-1/2 -translate-y-1/2"
							>
								Continue
							</div>
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
