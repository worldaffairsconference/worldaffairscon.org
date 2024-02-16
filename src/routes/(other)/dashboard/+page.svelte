<script lang="ts">
	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";
	import PersonalInformation from "./PersonalInformation.svelte";
	import LunchOptions from "./LunchOptions.svelte";
	import PlenarySelection from "./PlenarySelection.svelte";

	import type { PageData } from "./$types";

	export let data: PageData;
	const avatar = createAvatar(shapes, { seed: data.user.email ?? "" });

	// export let form: ActionData;

	let isPersonalInformationValid: boolean | undefined = undefined;
	let isLunchOptionsValid: boolean | undefined = undefined;
	$: allCompleted = isPersonalInformationValid && isLunchOptionsValid;
</script>

<svelte:head>
	<title>Dashboard - World Affairs Conference</title>
</svelte:head>

<section class="pt-[5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-xl mx-auto px-6 lg:px-24">
		<div class="mb-10 lg:mb-20 mt-6 text-center">
			<h3
				class="mb-1 md:mb-2 block md:text-lg font-semibold text-primary"
			>
				Dashboard
			</h3>
			<h1
				class="font-bold text-white text-4xl md:text-5xl tracking-tight"
			>
				Welcome to WAC!
			</h1>
		</div>

		<div class="flex gap-6 mb-10">
			<img
				src={avatar.toDataUriSync()}
				alt="Avatar"
				class="rounded-lg h-40 hidden md:block"
			/>
			<div class="flex flex-col justify-center text-zinc-400">
				<h3 class="text-white text-2xl md:text-3xl mb-3 font-semibold">
					Hey {data.user.firstName ?? data.user.email}!
				</h3>
				<p class="text-[0.925rem] md:text-base text-left">
					{#if allCompleted}
						<div class="mb-3">
							You're all set! We can't wait to see you at WAC!
						</div>
						<div>
							In the meantime, please contact
							<a
								href="mailto:registration@worldaffairscon.org"
								class="text-blue-400 underline"
							>
								registration@worldaffairscon.org
							</a> for payment if you are an independent non-public
							school student.
						</div>
					{:else}
						<div class="mb-3">
							We're excited to have you at WAC!
						</div>
						<div>
							Please fill out the information below to complete
							your registration.
						</div>
					{/if}
				</p>
			</div>
		</div>

		<div>
			<h3
				class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
			>
				Your Info
			</h3>
			<form method="post" class="flex gap-4 md:gap-10 flex-col">
				<PersonalInformation
					user={data.user}
					possibleSchools={data.possibleSchools}
					bind:isValid={isPersonalInformationValid}
				/>
				<LunchOptions
					user={data.user}
					bind:isValid={isLunchOptionsValid}
				/>
				<PlenarySelection schedule={data.plenarySchedule} />
				<button
					type="submit"
					class="mx-auto w-min py-2 px-10 text-white rounded-md bg-gradient-to-r from-primary to-secondary sticky bottom-4"
				>
					Save
				</button>
			</form>
		</div>
	</div>
</section>
