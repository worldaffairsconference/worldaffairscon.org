<script lang="ts">
	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";
	import PersonalInformation from "./PersonalInformation.svelte";
	import LunchOptions from "./LunchOptions.svelte";
	import PlenarySelection from "./PlenarySelection.svelte";
	import toast, { Toaster } from "svelte-french-toast";

	import { page } from "$app/stores";

	import type { PageData } from "./$types";
	import { onMount } from "svelte";

	export let data: PageData;
	const avatar = createAvatar(shapes, { seed: data.user.email ?? "" });

	let isPersonalInformationValid: boolean | undefined = undefined;
	let isLunchOptionsValid: boolean | undefined = undefined;
	$: allCompleted = isPersonalInformationValid && isLunchOptionsValid;

	let formElement: HTMLFormElement;
	let originalFormData: ReturnType<typeof getDataFromForm>;
	let areUnsavedChanges = false;

	onMount(() => {
		originalFormData = getDataFromForm();
	});

	const getDataFromForm = () => {
		const formData = new FormData(formElement);
		return Object.fromEntries(formData.entries());
	};

	const checkIfFormDataIsEdited = () => {
		const currentFormData = getDataFromForm();

		const isEdited = Object.keys(currentFormData).some(
			(key) => originalFormData[key] !== currentFormData[key]
		);

		areUnsavedChanges = isEdited;
	};

	$: if ($page.form) {
		toast.success("Your changes have been saved!", {
			duration: 3000,
			position: "top-right"
		});
	}
</script>

<svelte:head>
	<title>Dashboard - World Affairs Conference</title>
</svelte:head>

<Toaster />

<section class="pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-lg mx-auto px-5 lg:px-20">
		<div class="mb-8 lg:mb-20 mt-6 text-center">
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
				<h3 class="text-white text-xl md:text-3xl mb-3 font-semibold">
					Hey {data.user.firstName ?? data.user.email}!
				</h3>
				{#if data.isRegistrationOpen}
					<p class="text-[0.9rem] md:text-base text-left">
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
								Please fill out the information below to
								complete your registration.
							</div>
						{/if}
					</p>
				{:else}
					<p class="text-[0.9rem] md:text-base text-left">
						Registration is now closed. Below are the records on
						file. If you need to make any changes, please contact
						<a
							href="mailto:registration@worldaffairscon.org"
							class="text-blue-400 underline"
						>
							registration@worldaffairscon.org
						</a>
					</p>
				{/if}
			</div>
		</div>

		<div>
			<h3
				class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
			>
				Your Info
			</h3>
			<form
				method="post"
				class="flex gap-4 md:gap-10 flex-col"
				on:input={checkIfFormDataIsEdited}
				bind:this={formElement}
			>
				<PersonalInformation
					user={data.user}
					possibleSchools={data.possibleSchools}
					bind:isValid={isPersonalInformationValid}
					disabled={!data.isRegistrationOpen}
				/>
				<LunchOptions
					user={data.user}
					bind:isValid={isLunchOptionsValid}
					disabled={!data.isRegistrationOpen}
				/>
				<PlenarySelection
					schedule={data.plenarySchedule}
					bind:areUnsavedChanges
					disabled={!data.isRegistrationOpen}
				/>
				{#if areUnsavedChanges}
					<div
						class="fixed bottom-4 bg-zinc-700 p-3 left-1/2 -translate-x-1/2 flex gap-12 items-center rounded-xl border-2 border-zinc-600 text-sm"
					>
						<span class="ml-2 text-white">
							You have unsaved changes
						</span>
						<div class="flex gap-1">
							<button
								class="mx-auto w-min py-2 px-5 text-white rounded-lg hover:bg-zinc-800/50 transition-colors"
								on:click={(e) => {
									e.preventDefault();

									// TODO: Implement undo functionality without refreshing the page
									window.location.reload();
								}}
							>
								Undo
							</button>
							<button
								type="submit"
								class="mx-auto w-min py-2 px-5 text-white rounded-lg bg-gradient-to-r from-primary to-secondary"
							>
								Save
							</button>
						</div>
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>
