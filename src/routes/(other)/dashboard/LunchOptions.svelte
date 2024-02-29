<script lang="ts">
	import type { PageData } from "./$types";
	import Input from "$lib/components/form/Input.svelte";
	import Select from "$lib/components/form/Select.svelte";
	import FieldSet from "$lib/components/form/FieldSet.svelte";

	export let disabled: boolean;
	export let user: PageData["user"];
	export let isValid: boolean | undefined = undefined;
</script>

<FieldSet header="Lunch Options" bind:isValid>
	<Select
		label="Lunch Option"
		name="needsLunch"
		required
		value={user.needsLunch}
		class="col-span-full"
		{disabled}
	>
		<option value={true}>Purchase lunch from UCC for $15</option>
		<option value={false}>I will bring my own lunch</option>
	</Select>

	<Input
		label="Dietary Restrictions and Allergies"
		name="dietaryRestrictions"
		type="list"
		placeholder="Vegan, Vegetarian, Gluten-free, Nuts, etc."
		list={[
			"Vegan",
			"Vegetarian",
			"Gluten-free",
			"Nuts",
			"Dairy",
			"Eggs",
			"Shellfish",
			"Soy"
		]}
		value={user.dietaryRestrictions}
		class="col-span-full"
		{disabled}
	/>
</FieldSet>
