<script lang="ts">
	import AccordionItem from "$lib/components/AccordionItem.svelte";
	import Input from "./Input.svelte";
	import Select from "./Select.svelte";
	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";
	// import { enhance } from "$app/forms";

	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	const { user } = data;
	const avatar = createAvatar(shapes, { seed: user.email ?? "" });

	export let form: ActionData;
</script>

<section class="pt-[8.5rem] md:pt-[10rem] flex flex-col items-center mb-10">
	<div class="container mx-auto">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4">
				<div
					class="mx-auto mb-10 lg:mb-16 text-center flex flex-col justify-center"
				>
					<span class="mb-2 block text-lg font-semibold text-primary">
						Personal Dashboard
					</span>
					<h2
						class="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[2.5rem]"
					>
						Welcome to WAC!
					</h2>
					<p class="text-zinc-400">
						Before you are fully registered, we just need a few more
						details about you.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex gap-5 w-3/4 mb-10">
		<img
			src={avatar.toDataUriSync()}
			alt="Avatar"
			class="rounded-lg h-32"
		/>
		<div class="flex flex-col items-start justify-center">
			<h3 class="text-white sm:text-3xl">
				Hey {user.firstName ?? user.email}
			</h3>
			<p class="text-white sm:text-1xl text-left">
				Excited for the official list of plenaries? We are working on
				it! We will email you once we are ready for your selection, so
				stay tuned! In the near future, we will also need some
				information about dietary restrictions, and financial
				information if you are coming outside of a school context.
			</p>
		</div>
	</div>

	<div class="w-3/4">
		<h3
			class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
		>
			What we need from you
		</h3>
		<div class="-mx-4 flex gap-10 flex-col">
			<AccordionItem header="Personal Information" open>
				<!-- TODO: Fix use:enhance -->
				<form
					method="post"
					action="?/savePersonalInformation"
					class="flex flex-col gap-3"
				>
					<div class="grid md:grid-cols-2 gap-4">
						<Input
							label="First Name"
							name="firstName"
							type="text"
							required
							value={form?.firstName || user.firstName}
						/>
						<Input
							label="Last Name"
							name="lastName"
							type="text"
							required
							value={form?.lastName || user.lastName}
						/>
					</div>
					<Input
						label="Email"
						type="email"
						disabled
						value={user.email}
					/>
					<div class="grid md:grid-cols-2 gap-4">
						<Select label="Grade Level" name="gradeLevel">
							{@const grades = ["7", "8", "9", "10", "11", "12"]}
							{@const gradeLevel =
								form?.gradeLevel ?? user.gradeLevel ?? ""}
							<option
								hidden
								disabled
								selected={gradeLevel === ""}
							>
								Please choose an option
							</option>
							{#each grades as grade}
								<option
									value={grade}
									selected={grade === gradeLevel}
								>
									Grade {grade}
								</option>
							{/each}
							<option
								value="other"
								selected={!grades.includes(gradeLevel)}
							>
								Other
							</option>
						</Select>
						<Select
							label="Attendance"
							name="inPerson"
							value={(
								form?.inPerson ??
								user.inPerson ??
								true
							).toString()}
						>
							<option value="true">In Person</option>
							<option value="false">Online</option>
						</Select>
					</div>
					<button
						type="submit"
						class="mx-auto py-2 px-10 bg-primary text-white rounded-md"
					>
						Save
					</button>
				</form>
			</AccordionItem>
			<AccordionItem header="Lunch Options" open>
				<form
					method="post"
					action="?/saveLunchOptions"
					class="flex flex-col gap-3"
				>
					<Select
						label="Lunch Option"
						name="needsLunch"
						value={(
							form?.needsLunch ??
							user.needsLunch ??
							true
						).toString()}
					>
						<option value="true">
							Purchase lunch at UCC for $15
						</option>
						<option value="false">I will bring my own lunch</option>
					</Select>
					<Input
						label="Dietary Restrictions and Allergies"
						list="dietary-restrictions-suggestions"
						placeholder="Vegan, Vegetarian, Gluten-free, Nuts, etc."
						name="dietaryRestrictions"
						value={form?.dietaryRestrictions ||
							user.dietaryRestrictions}
					/>
					<datalist id="dietary-restrictions-suggestions">
						<option value="Vegan"></option>
						<option value="Vegetarian"></option>
						<option value="Gluten-free"></option>
						<option value="Nuts"></option>
					</datalist>
					<button
						type="submit"
						class="mx-auto py-2 px-10 bg-primary text-white rounded-md"
					>
						Save
					</button>
				</form>
			</AccordionItem>
		</div>
	</div>
</section>

<!-- <Test /> -->
