<script lang="ts">
	let verificationCode = "";

	const handleInput = (
		event: Event & {
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
			.nextElementSibling as HTMLInputElement;

		if (nextInput && !nextInput.value) {
			nextInput.disabled = false;
			nextInput.focus();
		}
	};

	const isInputDisabled = (index: number, verificationCode: string) => {
		return index !== verificationCode.length;
	};
</script>

<svelte:head>
	<title>Check Your Email - World Affairs Conference</title>
</svelte:head>

<section class="absolute inset-0 flex justify-center items-center">
	<div
		class="py-16 px-6 sm:px-10 mx-4 rounded-xl bg-zinc-800 border-zinc-700 border text-center max-w-screen-sm"
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
			{#each Array.from({ length: 6 }) as _, index}
				{@const isDigitEntered = verificationCode[index]}
				<input
					type="text"
					class="text-xl h-11 w-11 sm:text-2xl sm:h-16 sm:w-16 md:text-3xl md:h-[4.5rem] md:w-[4.5rem] text-center bg-zinc-800 text-white rounded-md border-2 {isDigitEntered
						? 'border-primary'
						: 'border-zinc-400'} outline-none"
					maxlength="1"
					id={`digit-${index}`}
					disabled={isInputDisabled(index, verificationCode)}
					on:input={(event) => handleInput(event, index)}
				/>
			{/each}
		</div>
		<button
			class="w-min py-2.5 px-10 text-white rounded-md bg-gradient-to-r from-primary to-secondary mt-6 text-sm sm:text-base"
		>
			Verify
		</button>
	</div>
</section>
