<script lang="ts">
	interface TeamMember {
		name: string;
		position: string;
		image: string;
	}

	const executives: TeamMember[] = [
		{
			name: "Ray Woo",
			position: "President",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		},
		{
			name: "Shaya Woo",
			position: "Other President",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		},
		{
			name: "Sam Woo",
			position: "Tech Person",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		},
		{
			name: "Jungly Chen",
			position: "Something",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		},
		{
			name: "Jefferson Ding",
			position: "Conference Chair",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		},
		{
			name: "Rahul Nanda",
			position: "Conference Chair",
			image: "https://i.imgur.com/oPyoVMy.jpg"
		}
	];
	const seniorTeam: TeamMember[] = [
		{
			name: "Alex Woolsey",
			position: "Assistant Head of Programs",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		},
		{
			name: "Duo Yang",
			position: "Assistant Head of Programs",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		},
		{
			name: "Karen Liu",
			position: "Assistant Head of Plenaries",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		},
		{
			name: "Evan Rosenberg",
			position: "Assistant Head of SPRINT",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		},
		{
			name: "Jennifer Yang",
			position: "Assistant Head of SPRINT",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		},
		{
			name: "Adrian Mak",
			position: "Assistant Head of Marketing",
			image: "https://i.imgur.com/nsm5SnU.jpg"
		}
	];
</script>

<svelte:head>
	<title>World Affairs Conference | Team</title>
	<meta
		name="description"
		content="North America's largest and Canada's oldest annual student-run current events conference."
	/>
</svelte:head>

<section class="pt-[8.5rem]">
	<!-- TODO: add a title or something say "Wac 2023 Team" -->
	<div class="px-4 pt-4 sm:pt-10 md:pt-16 mx-auto md:px-24 lg:px-8">
		<div
			class="max-w-xl mb-10 sm:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
		>
			<h2
				class="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto"
			>
				Executives
			</h2>
		</div>
		<div
			class="grid gap-5 sm:gap-7 lg:gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg"
		>
			{#each executives as member}
				<div>
					<div
						class="relative pb-56 mb-4 rounded-md overflow-hidden shadow lg:pb-64"
					>
						<img
							class="absolute object-cover w-full h-full"
							src={member.image}
							alt="{member.name} Headshot"
						/>
					</div>
					<div class="flex flex-col sm:text-center">
						<p class="text-lg font-bold text-white">
							{member.name}
						</p>
						<p class="mb-5 text-xs text-zinc-300">
							{member.position}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div
		class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
	>
		<div
			class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
		>
			<h2
				class="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto"
			>
				Senior Team
			</h2>
		</div>
		<div
			class="grid gap-5 sm:gap-7 lg:gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each seniorTeam as member}
				<div class="flex">
					<img
						class="object-cover w-20 h-20 mr-4 rounded-full shadow"
						src={member.image}
						alt="Person"
					/>
					<div class="flex flex-col justify-center">
						<p class="text-lg font-bold text-white">
							{member.name}
						</p>
						<p class="text-sm text-zinc-300">{member.position}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
