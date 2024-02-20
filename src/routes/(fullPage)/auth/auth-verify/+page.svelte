<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const verificationCodeLength = 6;

	let verificationCode = "";

	const handleSubmit = async () => {
		window.location.href = `/auth/callback/magic-link?${new URLSearchParams(
			{
				callbackUrl: data.callbackUrl,
				token: verificationCode,
				email: sessionStorage.getItem("email") ?? ""
			}
		)}`;
	};

	const handleInput = (
		event: {
			currentTarget: EventTarget & HTMLInputElement;
		},
		index: number
	) => {
		const digit = event.currentTarget.value;
		if (!/^\d$/.test(digit)) {
			event.currentTarget.value = "";
			return;
		}
		verificationCode =
			verificationCode.slice(0, index) +
			digit +
			verificationCode.slice(index + 1);

		const nextInput = event.currentTarget
			.nextElementSibling as HTMLInputElement | null;
		3;

		if (nextInput && !nextInput.value) {
			nextInput.focus();
		}

		if (verificationCode.length === verificationCodeLength) {
			handleSubmit();
		}
	};

	const handleDelete = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		},
		index: number
	) => {
		event.currentTarget.value = "";

		verificationCode =
			verificationCode.slice(0, index - 1) +
			verificationCode.slice(index);

		const prevInput = event.currentTarget
			.previousElementSibling as HTMLInputElement | null;

		if (prevInput) {
			prevInput.disabled = false;
			prevInput.focus();
		}
	};

	const handlePaste = (event: ClipboardEvent) => {
		event.preventDefault();

		const pastedText = event.clipboardData?.getData("text/plain");
		const digits = pastedText?.match(/\d/g);

		if (!digits) return;

		verificationCode = "";

		for (let i = 0; i < digits.length && i < verificationCodeLength; i++) {
			const input = document.getElementById(
				`digit-${i}`
			) as HTMLInputElement | null;

			if (input) {
				input.value = digits[i] ?? "";
				handleInput(
					{
						currentTarget: input
					},
					i
				);
			}
		}
	};
</script>

<svelte:head>
	<title>Check Your Email - World Affairs Conference</title>
</svelte:head>

<section class="absolute inset-0 flex justify-center items-center">
	<div
		class="py-16 px-6 sm:px-16 mx-4 rounded-xl bg-zinc-800 border-zinc-700 border text-center max-w-screen-sm"
	>
		<div class="text-5xl md:text-6xl text-green-400 mx-auto mb-3">
			<i class="fa-regular fa-circle-check"></i>
		</div>
		<h2
			class="mb-2 md:mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
		>
			Check your email
		</h2>
		<p class="text-sm sm:text-base text-zinc-400">
			Enter the 6-digit code we've sent to your email.
		</p>
		<div class="flex justify-center mt-6 gap-2">
			{#each Array.from( { length: verificationCodeLength } ).map((_, i) => i) as index}
				{@const isDigitEntered = verificationCode[index]}
				<input
					type="text"
					class="text-xl h-11 w-11 sm:text-2xl sm:h-16 sm:w-16 md:text-3xl md:h-[4.5rem] md:w-[4.5rem] text-center bg-zinc-800 text-white rounded-md border-2 {isDigitEntered
						? 'border-primary'
						: 'border-zinc-400'} outline-none"
					maxlength="1"
					id={`digit-${index}`}
					disabled={!!isDigitEntered &&
						index !== verificationCode.length}
					on:input={(event) => handleInput(event, index)}
					on:keydown={(event) => {
						if (event.key === "Backspace") {
							handleDelete(event, index);
						}
					}}
					on:paste={handlePaste}
				/>
			{/each}
		</div>
	</div>
</section>
