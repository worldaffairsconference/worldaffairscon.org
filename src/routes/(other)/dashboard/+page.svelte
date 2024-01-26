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

	let dataChanged = false;

	interface Option {
		label: string;
		name?: string;
		type: "text" | "select" | "email";
		fullWidth?: boolean;
		required?: boolean;
		disabled?: boolean;
		value?: string;
		options?: { value: string; label: string }[];
		list?: string;
		placeholder?: string;
	}

	const categorizedSettings: { [key: string]: Option[] } = {
		"Personal Information": [
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
				value: user.email || ""
			},
			{
				label: "Grade Level",
				name: "gradeLevel",
				type: "select",
				required: true,
				options: ["7", "8", "9", "10", "11", "12"].map((grade) => ({
					value: grade,
					label: `Grade ${grade}`
				})),
				value: form?.gradeLevel ?? user.gradeLevel ?? ""
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
				value: (form?.inPerson ?? user.inPerson ?? true).toString()
			}
		],
		"Lunch Options": [
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
				value: (form?.needsLunch ?? user.needsLunch ?? true).toString()
			},
			{
				label: "Dietary Restrictions and Allergies",
				list: "dietary-restrictions-suggestions",
				type: "text",
				placeholder: "Vegan, Vegetarian, Gluten-free, Nuts, etc.",
				name: "dietaryRestrictions",
				value:
					form?.dietaryRestrictions || user.dietaryRestrictions || ""
			}
		]
	};

	const checkIfCompleted = (options: Option[]) => {
		for (const option of options) {
			if (option.required && !option.value) {
				return false;
			}
		}
		return true;
	};
</script>

<section class="pt-[6rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="max-w-screen-lg mx-auto px-6 lg:px-16">
		<div class="mb-10 lg:mb-20 mt-6 text-center">
			<h3 class="mb-2 block md:text-lg font-semibold text-primary">
				Dashboard
			</h3>
			<h1
				class="font-bold text-white text-4xl md:text-5xl tracking-tight"
			>
				Welcome to WAC!
			</h1>
			<p class="text-zinc-400 mt-3">
				Before you are fully registered, we just need a few more details
				about you.
			</p>
		</div>

		<div class="flex gap-6 mb-10">
			<img
				src={avatar.toDataUriSync()}
				alt="Avatar"
				class="rounded-lg h-36 hidden md:block"
			/>
			<div class="flex flex-col justify-center">
				<h3 class="text-white text-2xl md:text-3xl mb-2 md:mb-3">
					Hey {user.firstName ?? user.email}!
				</h3>
				<p class="text-sm md:text-base text-left text-zinc-400">
					We're excited to have you at WAC! Please fill out the
					following information to complete your registration.
				</p>
			</div>
		</div>

		<div>
			<h3
				class="text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-8 text-center"
			>
				Your Info
			</h3>
			<div class="flex gap-10 flex-col">
				{#each Object.entries(categorizedSettings) as [category, settings]}
					<AccordionItem
						header={category}
						isCompleted={checkIfCompleted(settings)}
					>
						<form
							method="post"
							action="?/savePersonalInformation"
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
										</Select>
									{:else if setting.type === "email"}
										<Input {...setting} />
									{/if}
								</div>
							{/each}
							{#if dataChanged}
								<button
									type="submit"
									class="w-min py-2 px-10 bg-primary text-white rounded-md border border-transparent bg-gradient-to-r from-primary to-secondary"
								>
									Save
								</button>
							{/if}
						</form>
					</AccordionItem>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- <Test /> -->
