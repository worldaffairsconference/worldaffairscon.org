<script lang="ts">
	import { lazyLoad } from "$lib/lazyLoad";

	// Team Members
	import wacWSmall from "$lib/assets/images/team/wac_w_small.jpg";
	import princeZhang from "$lib/assets/images/team/prince_zhang.jpg";
	import mathisLeveson from "$lib/assets/images/team/mathis_leveson.jpg";
	import ryanSun from "$lib/assets/images/team/ryan_sun.jpg";
	import lincolnDugasNishisato from "$lib/assets/images/team/lincoln_dugasnishisato.jpg";
	import johnKarakoulas from "$lib/assets/images/team/john_karakoulas.jpg";
	import aariKhasgiwale from "$lib/assets/images/team/aari_khasgiwale.jpg";
	import kimiZhao from "$lib/assets/images/team/kimi_zhao.jpg";
	import raykaFarahmand from "$lib/assets/images/team/rayka_farahmand.jpg";
	import charlesPaterson from "$lib/assets/images/team/charles_paterson.jpg";
	import karanMaheshwari from "$lib/assets/images/team/karan_maheshwari.jpg";
	import zeenLiu from "$lib/assets/images/team/zeen_liu.jpg";
	import johnathanLee from "$lib/assets/images/team/johnathan_lee.jpg";
	import christopherChung from "$lib/assets/images/team/christopher_chung.jpg";
	import edmondShen from "$lib/assets/images/team/edmond_shen.jpg";
	import nikhilGupta from "$lib/assets/images/team/nikhil_gupta.jpg";
	import rohanGupta from "$lib/assets/images/team/rohan_gupta.jpg";
	import michaelXu from "$lib/assets/images/team/michael_xu.jpg";
	import liyangYin from "$lib/assets/images/team/liyang_yin.jpg";
	import justinChan from "$lib/assets/images/team/justin_chan.jpg";
	import ruhaniMainra from "$lib/assets/images/team/ruhani_mainra.jpg";
	import alyssaDhanji from "$lib/assets/images/team/alyssa_dhanji.jpg";
	import anyaDua from "$lib/assets/images/team/anya_dua.jpg";
	import jenelleZhang from "$lib/assets/images/team/jenelle_zhang.jpg";
	import titoluwaMaxwell from "$lib/assets/images/team/titoluwa_maxwell.jpg";
	import ariaMiletin from "$lib/assets/images/team/aria_miletin.jpg";
	import jennyLiu from "$lib/assets/images/team/jenny_liu.jpg";
	import haoyueChu from "$lib/assets/images/team/haoyue_chu.jpg";
	import peytonLee from "$lib/assets/images/team/peyton_lee.jpg";
	import miaBerco from "$lib/assets/images/team/mia_berco.jpg";
	import serenaLiu from "$lib/assets/images/team/serena_liu.jpg";
	import hazelTang from "$lib/assets/images/team/hazel_tang.jpg";
	import suzanneMonir from "$lib/assets/images/team/suzanne_monir.jpg";
	import alvinJugoon from "$lib/assets/images/team/alvin_jugoon.jpg";
	import tracyDalgdish from "$lib/assets/images/team/tracy_dalgdish.jpg";
	import jarrodBaker from "$lib/assets/images/team/jarrod_baker.jpg";

	interface TeamMember {
		name: string;
		position: string;
		image: string;
	}

	const chairs: TeamMember[] = [
		{
			name: "Liyang Yin",
			position: "Executive Chair",
			image: liyangYin
		},
		{
			name: "Karan Maheshwari",
			position: "Executive Chair",
			image: karanMaheshwari
		},
		{
			name: "Alyssa Dhanji",
			position: "Executive Chair",
			image: alyssaDhanji
		},
		{
			name: "Ruhani Mainra",
			position: "Executive Chair",
			image: ruhaniMainra
		}
	];

	const executives: TeamMember[] = [
		{
			name: "Zeen Liu",
			position: "Director of Technology",
			image: zeenLiu
		},
		{
			name: "Jenny Liu",
			position: "Director of Technology",
			image: jennyLiu
		},
		{
			name: "Christopher Chung",
			position: "Director of Internal Affairs",
			image: christopherChung
		},
		{
			name: "Hazel Tang",
			position: "Director of Internal Affairs",
			image: hazelTang
		},
		{
			name: "Anya Dua",
			position: "Director of Plenaries & Keynotes",
			image: anyaDua
		},
		{
			name: "Lincoln Dugas-Nishisato",
			position: "Director of Plenaries & Keynotes",
			image: lincolnDugasNishisato

		},
		{
			name: "Aari Khasgiwale",
			position: "Director of Plenaries & Keynotes",
			image: aariKhasgiwale
		},
		{
			name: "Rayka Farahmand",
			position: "Director of Marketing",
			image: raykaFarahmand
		},
		{
			name: "Titoluwa Maxwell",
			position: "Director of Marketing",
			image: titoluwaMaxwell
		},
		{
			name: "John Karakoulas",
			position: "Director of Programs & Events",
			image: johnKarakoulas
		},
		{
			name: "Serena Liu",
			position: "Director of Programs & Events",
			image: serenaLiu
		},
		{
			name: "Edmond Shen",
			position: "Director of Design & Production",
			image: edmondShen
		},
		{
			name: "Peyton Lee",
			position: "Director of Design & Production",
			image: peytonLee
		}
	];

	const seniorTeam: TeamMember[] = [
		{
			name: "Prince Zhang",
			position: "Technology Executive",
			image: princeZhang
		},
		{
			name: "Johnathan Lee",
			position: "Technology Executive",
			image: johnathanLee
		},
		{
			name: "Haoyue Chu",
			position: "Technology Executive",
			image: haoyueChu
		},

		//////////////////////////

		{
			name: "Alex Nitsou",
			position: "Keynote Executive",
			image: wacWSmall
		},
		{
			name: "Bob Liu",
			position: "Keynote Executive",
			image: wacWSmall
		},
		{
			name: "Kimi Zhao",
			position: "Keynote Executive",
			image: kimiZhao
		},
		{
			name: "Ana Luisa Brito Pound",
			position: "Plenary Executive",
			image: wacWSmall
		},
		{
			name: "Jenelle Zhang",
			position: "Plenary Executive",
			image: jenelleZhang
		},
		
		//////////////////////////////

		{
			name: "Justin Chan",
			position: "Marketing Executive",
			image: justinChan
		},
		{
			name: "Charles Paterson",
			position: "Marketing Executive",
			image: charlesPaterson
		},
		{
			name: "Aria Miletin",
			position: "Marketing Executive",
			image: ariaMiletin
		},
		
		/////////////////////////////////

		{
			name: "Nikhil Gupta",
			position: "Production Executive",
			image: nikhilGupta
		},
		{
			name: "Rohan Gupta",
			position: "Production Executive",
			image: rohanGupta
		},

		/////////////////////////////////

		{
			name: "Michael Xu",
			position: "Program Executive",
			image: michaelXu
		},

		////////////////////////////////

		{
			name: "Ryan Sun",
			position: "Design Executive",
			image: ryanSun
		},
		{
			name: "Mathis Leveson",
			position: "Design Executive",
			image: mathisLeveson
		},
		{
			name: "Roger Zhu",
			position: "Design Executive",
			image: wacWSmall
		},
		{
			name: "Joanna Gao",
			position: "Design Executive",
			image: wacWSmall
		},
		{
			name: "Mia Berco",
			position: "Design Executive",
			image: miaBerco
		},
	];

	const facultyChairs: TeamMember[] = [
		{
			name: "Suzanne Monir",
			position: "Faculty Chair",
			image: suzanneMonir
		},
		{
			name: "Alvin Jugoon",
			position: "Faculty Chair",
			image: alvinJugoon
		},
		{
			name: "Jarrod Baker",
			position: "Faculty Chair",
			image: jarrodBaker
		},
		{
			name: "Tracy Dalgdish",
			position: "Faculty Chair",
			image: tracyDalgdish
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
			WAC 2026 Team
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
				Directors
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
		<div
			class="px-6 mt-16 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
		>
			<h2
				class="mb-7 md:mb-10 text-center text-3xl sm:text-4xl font-bold tracking-tight text-white"
			>
				Faculty Chairs
			</h2>
			<div
				class="grid gap-5 sm:gap-7 lg:gap-10 row-gap-8 mx-auto sm:row-gap-10 sm:grid-cols-2 lg:grid-cols-3"
			>
				{#each facultyChairs as member}
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
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<p
		class="text-sm text-zinc-400"
		style="width: 52%; text-align:center; margin: auto; margin-top: 50px;"
	>
		Please note that all profile materials, images, and multimedia of the
		World Affairs Conference (WAC) are the property of the respective
		members and are used on this site with their permission, and the
		profiles of the Organizing Committee members displayed on this page are
		listed in order of rank, followed by alphabetical order of last names
		within each rank category.
	</p>
</section>
