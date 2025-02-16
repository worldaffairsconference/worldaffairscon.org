<script lang="ts">
	import { lazyLoad } from "$lib/lazyLoad";

	// Team Members
	import alexChen from "$lib/assets/images/team/alex_chen.jpg";
	import wacWLarge from "$lib/assets/images/team/wac_w_large.jpg";
	import wacWSmall from "$lib/assets/images/team/wac_w_small.jpg";
	import adrianMak from "$lib/assets/images/team/adrian_mak.jpg";
	import darwinLi from "$lib/assets/images/team/darwin_li.jpg";
	import katherineMa from "$lib/assets/images/team/katherine_ma.jpg";
	import ruhaniMainra from "$lib/assets/images/team/ruhani_mainra.jpg";
	import gordonWu from "$lib/assets/images/team/gordon_wu.jpg";
	import lincolnDugasNishisato from "$lib/assets/images/team/lincoln_dugas.jpg";
	import johnKarakoulas from "$lib/assets/images/team/john_karakoulas.jpg";
	import aariKhagiswale from "$lib/assets/images/team/aari_khagiswale.jpg";
	import kimiZhao from "$lib/assets/images/team/kimi_zhao.jpg";
	import willGreer from "$lib/assets/images/team/will_greer.jpg";
	import matthewChan from "$lib/assets/images/team/matthew_chan.jpg";
	import raykaFarahmand from "$lib/assets/images/team/rayka_farahmand.jpg";
	import charlesPaterson from "$lib/assets/images/team/charles_paterson.jpg";
	import henryDeLuca from "$lib/assets/images/team/henry_deluca.jpg";
	//import benedictWang from "$lib/assets/images/team/benedict_wang.jpg";
	//import bobLiu from "$lib/assets/images/team/bob_liu.jpg";
	import indigoChen from "$lib/assets/images/team/indigo_chen.jpg";
	import zeenLiu from "$lib/assets/images/team/zeen_liu.jpg";
	import danielDing from "$lib/assets/images/team/daniel_ding.jpg";
	import johnathanLee from "$lib/assets/images/team/johnathan_lee.jpg";
	import christopherChung from "$lib/assets/images/team/chris_chung.jpg";
	import tonyZhang from "$lib/assets/images/team/tony_zhang.jpg";
	import yunkaiShi from "$lib/assets/images/team/yunkai_shi.jpg";
	import edmondShen from "$lib/assets/images/team/edmond_shen.jpg";
	import mikeChen from "$lib/assets/images/team/mike_chen.jpg";
	import arthurAu from "$lib/assets/images/team/arthur_au.jpg";
	import simonDeLuca from "$lib/assets/images/team/simon_deluca.jpg";
	import ryanShe from "$lib/assets/images/team/ryan_she.jpg";
	//import morganDeng from "$lib/assets/images/team/morgan_deng.jpg";
	//import junoGoralski from "$lib/assets/images/team/juno_goralski.jpg";
	import nikhilGupta from "$lib/assets/images/team/nikhil_gupta.jpg";
	import rohanGupta from "$lib/assets/images/team/rohan_gupta.jpg";
	import malekElhaddad from "$lib/assets/images/team/malek_elhaddad.jpg";
	import michaelXu from "$lib/assets/images/team/michael_xu.jpg";
	import alexWoosley from "$lib/assets/images/team/alex_woosley.jpg";
	import liyangYin from "$lib/assets/images/team/liyang_yin.jpg";
	//import linaBoehmer from "$lib/assets/images/team/lina_boehmer.jpg";
	import anyaDua from "$lib/assets/images/team/anya_dua.jpg";
	import victoriaLuo from "$lib/assets/images/team/victoria_luo.jpg";
	import naomiNemickas from "$lib/assets/images/team/naomi_nemickas.png";
	import jordinJames from "$lib/assets/images/team/jordin_james.jpg";
	import mayaChen from "$lib/assets/images/team/maya_chen.jpg";
	import katieBuckley from "$lib/assets/images/team/katie_buckley.jpg";
	import chloeChen from "$lib/assets/images/team/chloe_chen.jpg";
	import hazelTang from "$lib/assets/images/team/hazel_tang.jpg";
	import titoluwaMaxwell from "$lib/assets/images/team/titoluwa_maxwell.jpg";
	import aryanaKanji from "$lib/assets/images/team/aryana_kanji.jpg";
	import ariaMiletin from "$lib/assets/images/team/aria_miletin.jpg";
	import aryaPatil from "$lib/assets/images/team/arya_patil.jpg";
	import jennyLiu from "$lib/assets/images/team/jenny_liu.jpg";
	import andreaZeng from "$lib/assets/images/team/andrea_zeng.jpg";
	import ciciXu from "$lib/assets/images/team/cici_xu.jpg";
	import serenaLiu from "$lib/assets/images/team/serena_liu.jpg";
	import anitaYan from "$lib/assets/images/team/anita_yan.jpg";
	import peytonLee from "$lib/assets/images/team/peyton_lee.jpg";
	import meganKwan from "$lib/assets/images/team/megan_kwan.jpg";
	import alexaStewart from "$lib/assets/images/team/alexa_stewart.jpg";
	import alyssaDhanji from "$lib/assets/images/team/alyssa_dhanji.jpg";
	import karenLiu from "$lib/assets/images/team/karen_liu.jpg";
	import morganHooyboer from "$lib/assets/images/team/morgan_hooyboer.jpg";
	import suzanneMonir from "$lib/assets/images/team/suzanne_monir.jpg";
	import alvinJugoon from "$lib/assets/images/team/alvin_jugoon.jpg";
	import jarrodBaker from "$lib/assets/images/team/jarrod_baker.jpg";
	import tracyDalgdish from "$lib/assets/images/team/tracy_dalgdish.jpg";
	
	interface TeamMember {
		name: string;
		position: string;
		image: string;
	}

	const chairs: TeamMember[] = [
		{
			name: "Darwin Li",
			position: "Executive Chair",
			image: darwinLi
		},
		{
			name: "Adrian Mak",
			position: "Executive Chair",
			image: adrianMak
		},
		{
			name: "Katherine Ma",
			position: "Executive Chair",
			image: katherineMa
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
			name: "Arya Patil",
			position: "Director of Technology",
			image: aryaPatil
		},
		{
			name: "Alyssa Dhanji",
			position: "Director of Internal Affairs",
			image: alyssaDhanji
		},
		{
			name: "Alex Woosley",
			position: "Director of Internal Affairs",
			image: alexWoosley
		},
		{
			name: "Alex Chen",
			position: "Director of Registration",
			image: alexChen
		},
		{
			name: "Karen Liu",
			position: "Director of Registration",
			image: karenLiu
		},
		{
			name: "Lina Boehmer",
			position: "Director of Plenaries & Keynotes",
			image: wacWLarge
		},
		{
			name: "Gordon Wu",
			position: "Director of Plenaries & Keynotes",
			image: gordonWu
		},
		{
			name: "Rayka Farahmand",
			position: "Director of Marketing",
			image: raykaFarahmand
		},
		{
			name: "Hazel Tang",
			position: "Director of Marketing",
			image: hazelTang
		},
		{
			name: "Malek Elhaddad",
			position: "Director of Programs & Events",
			image: malekElhaddad
		},
		{
			name: "Megan Kwan",
			position: "Director of Programs & Events",
			image: meganKwan
		},
		{
			name: "Tony Zhang",
			position: "Director of Design & Production",
			image: tonyZhang
		},
		{
			name: "Andrea Zeng",
			position: "Director of Design & Production",
			image: andreaZeng
		}
	];

	const seniorTeam: TeamMember[] = [
		{
			name: "JT Borba",
			position: "Technology Head",
			image: wacWSmall
		},
		{
			name: "Christopher Chung",
			position: "Technology Head",
			image: christopherChung
		},
		{
			name: "Daniel Ding",
			position: "Technology Head",
			image: danielDing
		},
		{
			name: "Johnathan Lee",
			position: "Technology Head",
			image: johnathanLee
		},
		{
			name: "Jenny Liu",
			position: "Technology Head",
			image: jennyLiu
		},

		/////////////////////////////////

		{
			name: "Liyang Yin",
			position: "Internal Affairs Head",
			image: liyangYin
		},

		/////////////////////////////////

		{
			name: "Morgan Hooyboer",
			position: "Assistant Director of Registration",
			image: morganHooyboer
		},

		//////////////////////////

		{
			name: "Anya Dua",
			position: "Assistant Director of Plenaries & Keynotes",
			image: anyaDua
		},
		{
			name: "Katie Buckley",
			position: "Keynote Head",
			image: katieBuckley
		},
		{
			name: "Chloe Chen",
			position: "Keynote Head",
			image: chloeChen
		},
		{
			name: "Matthew Chan",
			position: "Plenary Head",
			image: matthewChan
		},
		{
			name: "Maya Chen",
			position: "Plenary Head",
			image: mayaChen
		},
		{
			name: "Lincoln Dugas-Nishisator",
			position: "Plenary Head",
			image: lincolnDugasNishisato
		},
		{
			name: "Will Greer",
			position: "Plenary Head",
			image: willGreer
		},
		{
			name: "Jordin James",
			position: "Plenary Head",
			image: jordinJames
		},
		{
			name: "John Karakoulas",
			position: "Plenary Head",
			image: johnKarakoulas
		},
		{
			name: "Aari Khagiswale",
			position: "Plenary Head",
			image: aariKhagiswale
		},
		{
			name: "Victoria Luo",
			position: "Plenary Head",
			image: victoriaLuo
		},
		{
			name: "Naomi Nemickas",
			position: "Plenary Head",
			image: naomiNemickas
		},
		{
			name: "Kimi Zhao",
			position: "Plenary Head",
			image: kimiZhao
		},

		//////////////////////////////

		{
			name: "Indigo Chen",
			position: "Marketing Head",
			image: indigoChen
		},
		{
			name: "Henry DeLuca",
			position: "Marketing Head",
			image: henryDeLuca
		},
		{
			name: "Aryana Kanji",
			position: "Marketing Head",
			image: aryanaKanji
		},
		{
			name: "Bob Liu",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Titoluwa Maxwell",
			position: "Marketing Head",
			image: titoluwaMaxwell
		},
		{
			name: "Aria Miletin",
			position: "Marketing Head",
			image: ariaMiletin
		},
		{
			name: "Charles Paterson",
			position: "Marketing Head",
			image: charlesPaterson
		},

		{
			name: "Benedict Wang",
			position: "Marketing Head",
			image: wacWSmall
		},

		/////////////////////////////////

		{
			name: "Morgan Deng",
			position: "Production Head",
			image: wacWSmall
		},
		{
			name: "Juno Goralski",
			position: "Production Head",
			image: wacWSmall
		},
		{
			name: "Nikhil Gupta",
			position: "Production Head",
			image: nikhilGupta
		},
		{
			name: "Rohan Gupta",
			position: "Production Head",
			image: rohanGupta
		},

		/////////////////////////////////

		{
			name: "Alexa Stewart",
			position: "Program Head",
			image: alexaStewart
		},
		{
			name: "Michael Xu",
			position: "Program Head",
			image: michaelXu
		},

		////////////////////////////////

		{
			name: "Arthur Au",
			position: "Design Head",
			image: arthurAu
		},
		{
			name: "Mike Chen",
			position: "Design Head",
			image: mikeChen
		},
		{
			name: "Simon DeLuca",
			position: "Design Head",
			image: simonDeLuca
		},
		{
			name: "Peyton Lee",
			position: "Design Head",
			image: peytonLee
		},
		{
			name: "Serena Liu",
			position: "Design Head",
			image: serenaLiu
		},
		{
			name: "Yunkai Shi",
			position: "Design Head",
			image: yunkaiShi
		},
		{
			name: "Edmond Shen",
			position: "Design Head",
			image: edmondShen
		},
		{
			name: "Ryan She",
			position: "Design Head",
			image: ryanShe
		},
		{
			name: "Cici Xu",
			position: "Design Head",
			image: ciciXu
		},
		{
			name: "Anita Yan ",
			position: "Design Head",
			image: anitaYan
		}
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
			WAC 2025 Team
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
