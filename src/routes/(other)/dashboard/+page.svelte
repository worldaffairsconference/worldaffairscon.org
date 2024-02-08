<script lang="ts">
	import LargeAccordion from "$lib/components/LargeAccordion.svelte";
	import Input from "./Input.svelte";
	import Select from "./Select.svelte";
	import { createAvatar } from "@dicebear/core";
	import { shapes } from "@dicebear/collection";
	import { v4 as uuid } from "uuid";
	import PlenarySelection from "./PlenarySelection.svelte";

	import type { ActionData, PageData } from "./$types";

	export let data: PageData;
	const { user } = data;
	const avatar = createAvatar(shapes, { seed: user.email ?? "" });

	export let form: ActionData;

	let dataChanged = false;

	type Option = {
		label: string;
		name?: string;
		fullWidth?: boolean;
		required?: boolean;
		disabled?: boolean;
		value?: string;
	} & (
		| { type: "text"; placeholder?: string }
		| { type: "email"; placeholder?: string }
		| {
				type: "select";
				options?: { value: string; label: string }[];
				hasOther?: boolean;
		  }
		| { type: "list"; items: string[]; placeholder?: string }
	);

	interface CategorizedSettings {
		category: string;
		updateRoute: string;
		settings: Option[];
	}

	const categorizedSettings: CategorizedSettings[] = [
		{
			category: "Personal Information",
			updateRoute: "?/savePersonalInformation",
			settings: [
				{
					label: "First Name",
					name: "firstName",
					type: "text",
					required: true,
					value: form?.firstName || user.firstName || "",
					fullWidth: false
				},
				{
					label: "Last Name",
					name: "lastName",
					type: "text",
					required: true,
					value: form?.lastName || user.lastName || "",
					fullWidth: false
				},
				{
					label: "Email",
					type: "email",
					disabled: true,
					value: user.email || "",
					fullWidth: false
				},
				{
					label: "School",
					name: "school",
					type: "select",
					required: true,
					options: data.possibleSchools.map((school) => ({
						value: school.id,
						label: school.name ?? ""
					})),
					disabled: data.possibleSchools.length < 2,
					value: form?.school ?? user.school?.id ?? "",
					hasOther: true,
					fullWidth: false
				},
				{
					label: "Grade Level",
					name: "gradeLevel",
					type: "select",
					required: true,
					options: ["7", "8", "9", "10", "11", "12"]
						.map((grade) => ({
							value: grade,
							label: `Grade ${grade}`
						}))
						.concat([{ value: "Teacher", label: "Teacher" }]),
					value: form?.gradeLevel ?? user.gradeLevel ?? "",
					fullWidth: false,
					hasOther: true
				},
				{
					label: "Attendance",
					name: "inPerson",
					type: "select",
					required: true,
					options: [
						{
							value: "true",
							label: "In Person"
						},
						{
							value: "false",
							label: "Online"
						}
					],
					value: (form?.inPerson ?? user.inPerson ?? "").toString(),
					fullWidth: false
				}
			]
		},
		{
			category: "Lunch Options",
			updateRoute: "?/saveLunchOptions",
			settings: [
				{
					label: "Lunch Option",
					name: "needsLunch",
					type: "select",
					required: true,
					options: [
						{
							value: "true",
							label: "Purchase lunch at UCC for $15"
						},
						{
							value: "false",
							label: "I will bring my own lunch"
						}
					],
					value: (
						form?.needsLunch ??
						user.needsLunch ??
						""
					).toString()
				},
				{
					label: "Dietary Restrictions and Allergies",
					type: "list",
					placeholder: "Vegan, Vegetarian, Gluten-free, Nuts, etc.",
					items: [
						"Vegan",
						"Vegetarian",
						"Gluten-free",
						"Nuts",
						"Dairy",
						"Eggs",
						"Shellfish",
						"Soy"
					],
					name: "dietaryRestrictions",
					value:
						form?.dietaryRestrictions ??
						user.dietaryRestrictions ??
						""
				}
			]
		}
	];

	const checkIfCompleted = (options: Option[]) => {
		for (const option of options) {
			if (option.required && option.value === "") {
				return false;
			}
		}
		return true;
	};

	$: allCompleted = categorizedSettings.every(({ settings }) =>
		checkIfCompleted(settings)
	);
</script>

<section class="pt-[5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-xl mx-auto px-6 lg:px-20">
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
					Hey {user.firstName ?? user.email}!
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
			<div class="flex gap-4 md:gap-10 flex-col">
				{#each categorizedSettings as { category, settings, updateRoute }}
					<LargeAccordion
						header={category}
						isCompleted={checkIfCompleted(settings)}
					>
						<form
							method="post"
							action={updateRoute}
							class="grid sm:grid-cols-2 gap-y-3 sm:gap-y-5 gap-x-2"
							on:input={() => {
								dataChanged = true;
							}}
						>
							{#each settings as setting}
								<div
									class={setting.fullWidth !== false
										? "col-span-full"
										: "col-span-1"}
								>
									{#if setting.type === "text"}
										<Input {...setting} />
									{:else if setting.type === "select"}
										<Select
											label={setting.label}
											name={setting.name}
											required={setting.required || false}
										>
											<option
												hidden
												disabled
												selected={setting.value === ""}
											>
												Please choose an option
											</option>
											{#if setting.options}
												{#each setting.options as option}
													<option
														value={option.value}
														selected={option.value ===
															setting.value}
													>
														{option.label}
													</option>
												{/each}
											{/if}
											{#if setting.hasOther}
												<option
													value="Other"
													selected={setting.options?.every(
														({ value }) =>
															value !==
															setting.value
													)}
												>
													Other
												</option>
											{/if}
										</Select>
									{:else if setting.type === "email"}
										<Input {...setting} />
									{:else if setting.type === "list"}
										{@const listId = uuid()}
										<Input
											placeholder={setting.placeholder}
											{...setting}
										/>
										<datalist id={listId}>
											{#each setting.items as item}
												<option value={item} />
											{/each}
										</datalist>
									{/if}
								</div>
							{/each}
							{#if dataChanged}
								<button
									type="submit"
									class="w-min py-2 px-10 text-white rounded-md bg-gradient-to-r from-primary to-secondary"
								>
									Save
								</button>
							{/if}
						</form>
					</LargeAccordion>
				{/each}
				<LargeAccordion header="Plenary Selection" open>
					<p
						class="text-zinc-400 mb-6 md:mb-10 mt-1.5 sm:mt-3 text-[0.925rem] sm:text-base"
					>
						Drag and drop to order the plenary speakers for each
						time slot according to your preference.
					</p>
					<PlenarySelection />
				</LargeAccordion>
			</div>
		</div>
	</div>
</section>
