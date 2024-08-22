<script lang="ts">
	import { lazyLoad } from "$lib/lazyLoad";

	// Team Members
	/*import jenniferYang from "$lib/assets/images/team/jennifer_yang.jpg";
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
*/
	import wacWLarge from "$lib/assets/images/logos/wac_w_large.jpg";
	import wacWSmall from "$lib/assets/images/logos/wac_w_small.jpg";

	interface TeamMember {
		name: string;
		position: string;
		image: string;
	}

	const chairs: TeamMember[] = [
		{
			name: "Darwin Li",
			position: "Executive Chair",
			image: wacWLarge
		},
		{
			name: "Adrian Mak",
			position: "Executive Chair",
			image: wacWLarge
		},
		{
			name: "Katherine Ma",
			position: "Executive Chair",
			image: wacWLarge
		},
		{
			name: "Ruhani Mainra",
			position: "Executive Chair",
			image: wacWLarge
		}
	];

	const executives: TeamMember[] = [
		{
			name: "Zeen Liu",
			position: "Director of Technology",
			image: wacWLarge
		},
		{
			name: "Arya Patil",
			position: "Director of Technology",
			image: wacWLarge
		},
		{
			name: "Alyssa Dhanji",
			position: "Director of Internal Affairs",
			image: wacWLarge
		},
		{
			name: "Alex Woosley",
			position: "Director of Internal Affairs",
			image: wacWLarge
		},
		{
			name: "Alex Chen",
			position: "Director of Registration",
			image: wacWLarge
		},
		{
			name: "Karen Liu",
			position: "Director of Registration",
			image: wacWLarge
		},
		{
			name: "Lina Boehmer",
			position: "Director of Plenaries & Keynotes",
			image: wacWLarge
		},
		{
			name: "Gordon Wu",
			position: "Director of Plenaries & Keynotes",
			image: wacWLarge
		},
		{
			name: "Rayka Farahmand",
			position: "Director of Marketing",
			image: wacWLarge
		},
		{
			name: "Hazel Tang",
			position: "Director of Marketing",
			image: wacWLarge
		},
		{
			name: "Malek Elhaddad",
			position: "Director of Programs & Events",
			image: wacWLarge
		},
		{
			name: "Megan Kwan",
			position: "Director of Programs & Events",
			image: wacWLarge
		},
		{
			name: "Tony Zhang",
			position: "Director of Design & Production",
			image: wacWLarge
		},
		{
			name: "Andrea Zeng",
			position: "Director of Design & Production",
			image: wacWLarge
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
			image: wacWSmall
		},
		{
			name: "Daniel Ding",
			position: "Technology Head",
			image: wacWSmall
		},
		{
			name: "Johnathan Lee",
			position: "Technology Head",
			image: wacWSmall
		},
		{
			name: "Jenny Liu",
			position: "Technology Head",
			image: wacWSmall
		},

		/////////////////////////////////

		{
			name: "Liyang Yin",
			position: "Internal Affairs Head",
			image: wacWSmall
		},
		{
			name: "----------",
			position: "Internal Affairs Head",
			image: wacWSmall
		},

		/////////////////////////////////

		{
			name: "Morgan Hooyboer",
			position: "Assistant Director of Registration",
			image: wacWSmall
		},
		{
			name: "----------",
			position: "Assistant Director of Registration",
			image: wacWSmall
		},

		//////////////////////////

		{
			name: "Anya Dua",
			position: "Assistant Director of Plenaries & Keynotes",
			image: wacWSmall
		},
		{
			name: "Katie Buckley",
			position: "Keynote Head",
			image: wacWSmall
		},
		{
			name: "Chloe Chen",
			position: "Keynote Head",
			image: wacWSmall
		},
		{
			name: "Matthew Chan",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Maya Chen",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Lincoln Dugas-Nishisator",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Will Greer",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Jordin James",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "John Karakoulas",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Aari Khagiswale",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Victoria Luo",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Naomi Nemickas",
			position: "Plenary Head",
			image: wacWSmall
		},
		{
			name: "Kimi Zhao",
			position: "Plenary Head",
			image: wacWSmall
		},

		//////////////////////////////

		{
			name: "Indigo Chen",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Henry DeLuca",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Aryana Kanji",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Bob Liu",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Titoluwa Maxwell",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Aria Miletin",
			position: "Marketing Head",
			image: wacWSmall
		},
		{
			name: "Charles Paterson",
			position: "Marketing Head",
			image: wacWSmall
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
			image: wacWSmall
		},
		{
			name: "Rohan Gupta",
			position: "Production Head",
			image: wacWSmall
		},

		/////////////////////////////////

		{
			name: "Alexa Stewart",
			position: "Program Head",
			image: wacWSmall
		},
		{
			name: "Michael Xu",
			position: "Program Head",
			image: wacWSmall
		},

		////////////////////////////////

		{
			name: "Arthur Au",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Mike Chen",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Simon DeLuca",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Peyton Lee",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Serena Liu",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Yunkai Shi",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Edmond Shen",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Ryan She",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Cici Xu",
			position: "Design Head",
			image: wacWSmall
		},
		{
			name: "Anita Yan ",
			position: "Design Head",
			image: wacWSmall
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
			WAC 2025 Team (Updating...)
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
<div style="text-align:center">
<p class="text-sm text-zinc-400" style="width:60%">Please note that the profiles of the World Affairs Conference (WAC) Organizing Committee members displayed on this page are listed in order of rank, followed by alphabetical order of last names within each rank category.
 </p>
</div>
</section>
