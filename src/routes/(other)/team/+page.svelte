<script lang="ts">
	import { lazyLoad } from "$lib/lazyLoad";

	// Team Members
	import jenniferYang from "$lib/assets/images/team/jennifer_yang.jpg";
	import katherineMa from "$lib/assets/images/team/katherine_ma.jpg";
	import shayaFarahmand from "$lib/assets/images/team/shaya_farahmand.jpg";
	import karenLiu from "$lib/assets/images/team/karen_liu.jpg";
	import darwinLi from "$lib/assets/images/team/darwin_li.jpg";
	import annieDeng from "$lib/assets/images/team/annie_deng.jpg";
	import yaraBhaloo from "$lib/assets/images/team/yara_bhaloo.jpg";
	import jaiSandhu from "$lib/assets/images/team/jai_sandhu.jpg";
	import anyaDua from "$lib/assets/images/team/anya_dua.jpg";
	import alexaStewart from "$lib/assets/images/team/alexa_stewart.jpg";
	import alexChen from "$lib/assets/images/team/alex_chen.jpg";
	import lincolnDugasNishisato from "$lib/assets/images/team/lincoln_dugas_nishisato.jpg";
	import gordonWu from "$lib/assets/images/team/gordon_wu.jpg";
	import malekElhaddad from "$lib/assets/images/team/malek_elhaddad.jpg";
	import stellaPakGuenette from "$lib/assets/images/team/stella_pak_guenette.jpg";
	import nikaGoldberg from "$lib/assets/images/team/nika_goldberg.jpg";
	import avaScott from "$lib/assets/images/team/ava_scott.jpg";
	import raykaFarahmand from "$lib/assets/images/team/rayka_farahmand.jpg";
	import tonyZhang from "$lib/assets/images/team/tony_zhang.jpg";
	import ericaKim from "$lib/assets/images/team/erica_kim.jpg";
	import uhaniMainra from "$lib/assets/images/team/ruhani_mainra.jpg";
	import jordinJames from "$lib/assets/images/team/jordin_james.jpg";
	import eugenioCiarlandini from "$lib/assets/images/team/eugenio_ciarlandini.jpg";
	import calebChong from "$lib/assets/images/team/caleb_chong.jpg";
	import adrianChiHongMak from "$lib/assets/images/team/adrian_chi_hong_mak.jpg";
	import rayWu from "$lib/assets/images/team/ray_wu.jpg";
	import aaravDogra from "$lib/assets/images/team/aarav_dogra.jpg";
	import mimiSalman from "$lib/assets/images/team/mimi_salman.jpg";
	import linaBoehmer from "$lib/assets/images/team/lina_boehmer.jpg";
	import devlinMoniz from "$lib/assets/images/team/devlin_moniz.jpg";
	import leahMoore from "$lib/assets/images/team/leah_moore.jpg";

	import wacWLarge from "$lib/assets/images/logos/wac_w_large.jpg";
	import wacWSmall from "$lib/assets/images/logos/wac_w_small.jpg";

	interface TeamMember {
		name: string;
		position: string;
		image: string;
	}

	const chairs: TeamMember[] = [
		{
			name: "Jennifer Yang",
			position: "Executive Chair",
			image: jenniferYang
		},
		{
			name: "Katherine Ma",
			position: "Executive Chair",
			image: katherineMa
		},
		{
			name: "Ray Wu",
			position: "Executive Chair",
			image: rayWu
		},
		{
			name: "Shaya Farahmand",
			position: "Executive Chair",
			image: shayaFarahmand
		}
	];

	const executives: TeamMember[] = [
		{
			name: "Leah Moore",
			position: "Director of Programs",
			image: leahMoore
		},
		{
			name: "Alex Woosley",
			position: "Assistant Chair & Director of Programs and Events",
			image: wacWLarge
		},
		{
			name: "Karen Liu",
			position: "Director of Communications/Secretary",
			image: karenLiu
		},
		{
			name: "Darwin Li",
			position: "Director of Communications/Secretary",
			image: darwinLi
		},
		{
			name: "Aarav Dogra",
			position: "Treasurer",
			image: aaravDogra
		},
		{
			name: "Annie Deng",
			position: "Director of Plenaries",
			image: annieDeng
		},
		{
			name: "Devlin Moniz",
			position: "Director of Plenaries",
			image: devlinMoniz
		},
		{
			name: "Mimi Salman",
			position: "Assistant Director of Plenaries",
			image: mimiSalman
		},
		{
			name: "Eugenio Ciarlandini",
			position: "Director of Keynotes",
			image: eugenioCiarlandini
		},
		{
			name: "Caleb Chong",
			position: "Director of Registration",
			image: calebChong
		},
		{
			name: "Adrian Chi Hong Mak",
			position: "Director of Marketing",
			image: adrianChiHongMak
		},
		{
			name: "Yara Bhaloo",
			position: "Director of Marketing",
			image: yaraBhaloo
		},
		{
			name: "Emerson McQueen",
			position: "Director of Volunteering",
			image: wacWLarge
		},
		{
			name: "Jai Sandhu",
			position: "Director of Facilities",
			image: jaiSandhu
		},
		{
			name: "Samuel Martineau",
			position: "Director of Productions and Technology",
			image: wacWLarge
		},
		{
			name: "Tony Zhang",
			position: "Director of Design",
			image: tonyZhang
		}
	];

	const seniorTeam: TeamMember[] = [
		{
			name: "Lina Boehmer",
			position: "Plenary Head",
			image: linaBoehmer
		},
		{
			name: "Anya Dua",
			position: "Plenary Head",
			image: anyaDua
		},
		{
			name: "Alexa Stewart",
			position: "Plenary Head",
			image: alexaStewart
		},
		{
			name: "Arya Patil",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Alex Chen",
			position: "Plenary Head",
			image: alexChen
		},
		{
			name: "Lincoln Dugas Nishisato",
			position: "Plenary Head",
			image: lincolnDugasNishisato
		},
		{
			name: "Gordon Wu",
			position: "Plenary Head",
			image: gordonWu
		},
		{
			name: "Malek Elhaddad",
			position: "Plenary Head",
			image: malekElhaddad
		},
		{
			name: "Gabe D'Souza",
			position: "Technology and Production Head",
			image: wacWSmall
		},
		{
			name: "Stella Pak-Guenette",
			position: "Communications Head",
			image: stellaPakGuenette
		},
		{
			name: "Nika Goldberg",
			position: "Marketing Head",
			image: nikaGoldberg
		},
		{
			name: "Ava Scott",
			position: "Marketing Head",
			image: avaScott
		},
		{
			name: "Ibby Ilyas",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Rayka Farahmand",
			position: "Marketing Head",
			image: raykaFarahmand
		},
		{
			name: "Jack Myers",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Benedict Wang",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Edward Rogers",
			position: "Keynotes Head",
			image: wacWSmall
		},
		{
			name: "Erica Kim",
			position: "Keynotes Head",
			image: ericaKim
		},
		{
			name: "Ruhani Mainra",
			position: "Keynotes Head",
			image: uhaniMainra
		},
		{
			name: "Jordin James",
			position: "Program Head",
			image: jordinJames
		}
	];
</script>

<svelte:head>
	<title>Team - World Affairs Conference</title>
</svelte:head>

<section class="pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="mb-10 lg:mb-20 mt-6 text-center">
		<h3 class="mb-1 md:mb-2 block md:text-lg font-semibold text-primary">
			Team
		</h3>
		<h1 class="font-bold text-white text-4xl md:text-5xl tracking-tight">
			WAC 2024 Team
		</h1>
	</div>

	<div class="px-6 mx-auto max-w-screen-lg flex flex-col gap-16">
		<div>
			<h2
				class="mb-7 md:mb-10 text-center text-3xl sm:text-4xl font-bold tracking-tight text-white"
			>
				Chairs
			</h2>

			<div
				class="grid gap-5 sm:gap-7 lg:gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4"
			>
				{#each chairs as member}
					<div>
						<div
							class="relative pb-56 mb-4 rounded-md overflow-hidden shadow lg:pb-64"
						>
							<img
								class="absolute object-cover w-full h-full"
								use:lazyLoad={member.image}
								alt="{member.name} Headshot"
							/>
						</div>
						<div class="flex flex-col sm:text-center">
							<p class="text-xl font-bold text-white">
								{member.name}
							</p>
							<p class="mb-5 text-sm text-zinc-400">
								{member.position}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div>
			<h2
				class="mb-7 md:mb-10 text-center text-3xl sm:text-4xl font-bold tracking-tight text-white"
			>
				Executives
			</h2>

			<div
				class="grid gap-5 sm:gap-7 lg:gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4"
			>
				{#each executives as member}
					<div>
						<div
							class="relative pb-56 mb-4 rounded-md overflow-hidden shadow lg:pb-64"
						>
							<img
								class="absolute object-cover w-full h-full"
								use:lazyLoad={member.image}
								alt="{member.name} Headshot"
							/>
						</div>
						<div class="flex flex-col sm:text-center">
							<p class="text-xl font-bold text-white">
								{member.name}
							</p>
							<p class="mb-5 text-sm text-zinc-400">
								{member.position}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="px-6 mt-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
		>
			<h2
				class="mb-7 md:mb-10 text-center text-3xl sm:text-4xl font-bold tracking-tight text-white"
			>
				Senior Team
			</h2>
			<div
				class="grid gap-5 sm:gap-7 lg:gap-10 row-gap-8 mx-auto sm:row-gap-10 sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each seniorTeam as member}
					<div class="flex">
						<img
							class="object-cover w-20 h-20 mr-4 rounded-full shadow"
							use:lazyLoad={member.image}
							alt="Person"
						/>
						<div class="flex flex-col justify-center">
							<p class="text-lg font-bold text-white">
								{member.name}
							</p>
							<p class="text-sm text-zinc-400">
								{member.position}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
