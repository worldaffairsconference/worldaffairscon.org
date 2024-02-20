<script lang="ts">
	import type { PageData } from "./$types";
	import Input from "$lib/components/form/Input.svelte";
	import Select from "$lib/components/form/Select.svelte";
	import FieldSet from "$lib/components/form/FieldSet.svelte";

	export let user: PageData["user"];
	export let possibleSchools: PageData["possibleSchools"];
	export let isValid: boolean | undefined = undefined;

	const defaultValues = {
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		school:
			possibleSchools.length < 2
				? possibleSchools[0]?.id
				: user.school?.id,
		gradeLevel: user.gradeLevel,
		inPerson: user.inPerson
	};
</script>

<FieldSet header="Personal Information" bind:isValid>
	<Input
		label="First Name"
		name="firstName"
		required
		value={defaultValues.firstName}
	/>
	<Input
		label="Last Name"
		name="lastName"
		required
		value={defaultValues.lastName}
	/>

	<Input label="Email" type="email" disabled value={defaultValues.email} />
	<Select label="School" name="school" required value={defaultValues.school}>
		{#each possibleSchools as school}
			<option value={school.id}>{school.name}</option>
		{/each}
	</Select>

	<Select
		label="Grade Level"
		name="gradeLevel"
		required
		value={defaultValues.gradeLevel}
	>
		{#each ["7", "8", "9", "10", "11", "12"] as grade}
			<option value={grade}>Grade {grade}</option>
		{/each}

		<option value="other">Other</option>
	</Select>
	<Select
		label="Attendance"
		name="inPerson"
		required
		value={defaultValues.inPerson}
	>
		<option value={true}>In Person</option>
		<option value={false}>Online</option>
	</Select>
</FieldSet>
