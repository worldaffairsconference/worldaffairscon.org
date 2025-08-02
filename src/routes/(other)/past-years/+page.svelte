<script lang="ts">
	// Tab state management
	let activeTab = "2024";
	const setActiveTab = (tab: string) => {
		activeTab = tab;
	};

	// Track expanded state per speaker (by name)
	let expanded: Record<string, boolean> = {};

	const toggleExpanded = (name: string) => {
		expanded[name] = !expanded[name];
	};

	// Content for each year
	const yearContent = {
		"2024": {
			title: "WAC 2024 - Minds in Motion",
			description: "",
			highlights: [
				"Over 2000 students from across Canada and internationally attended",
				"Featured keynote addresses on climate change and global security",
				"Interactive workshops on international diplomacy and global economics",
				"Student-led panels on youth activism and social justice"
			],
			detailedSpeakers: [
				{
					name: "The Honourable Bob Rae",
					title: "Canada’s Ambassador to the United Nations",
					image: "/src/lib/assets/images/speakers2024/Bob Rae.webp",
					bio: "The Honourable Ambassador Bob Rae is a prominent Canadian figure, distinguished as a diplomat, lawyer, former politician, and author. Ambassador Rae's political career began in the 1970s after completing his law degree at the University of Toronto. In 1982, he won a seat in the Ontario Legislature representing York South, rose to lead the NDP, and in 1990 was elected as the 21st Premier of Ontario, implementing significant social reforms. After provincial politics, he served as special envoy for the Rohingya crisis. In 2008 he returned to federal politics, later becoming interim leader of the Liberal Party (2011–2013). He practiced law specializing in corporate and Indigenous law and was appointed Canada's Ambassador to the United Nations in New York in 2020. Rae is the author of several books including 'From Protest to Power: Personal Reflections on a Life in Politics' and 'What's Happened to Politics?' Throughout his career, he has embodied compassion, integrity, and social justice on both national and international stages."
				},
				{
					name: "Dr. Roberta Bondar",
					title: "Astronaut | Physician | Scientist | Photographer",
					image: "/src/lib/assets/images/speakers2024/Roberta_Bondar2.jpg",
					bio: "Dr. Roberta Bondar is the first Canadian woman and neurologist to fly in space, globally recognized for pioneering contributions to space medicine research, fine art photography, and environmental education. On the 1992 Space Shuttle Discovery mission she conducted experiments for 18 countries. She led an international space medicine research team exploring connections between spaceflight recovery and neurological illnesses, with clinical applications at institutions like Harvard-affiliated B. I. Deaconess Medical Center. She served as Chancellor of Trent University and is co-founder and president of The Roberta Bondar Foundation, inspiring connection to nature through photography. Dr. Bondar holds degrees including an MD, PhD in Neurobiology, and is a Board-Certified Neurologist. She has received the NASA Space Medal, is a Companion of the Order of Canada, recipient of the Order of Ontario, a Fellow of the Royal Society of Canada, and holds 28 honorary degrees."
				},
				{
					name: "Francisco Sagasti",
					title: "Former President of Peru",
					image: "/src/lib/assets/images/speakers2024/Sagasti-scaled.jpg",
					bio: "Francisco Sagasti is an affiliated researcher at the Institute of Peruvian Studies and professor at the Universidad del Pacífico. He has served as President of the Republic of Peru, Congressman, Head of Strategic Planning at the World Bank, President of the UN Council on Science and Technology, and taught at institutions including the Wharton School, Instituto de Empresa, and Universidad para la Paz. He holds degrees in industrial engineering and a PhD in operations research and social systems science from the University of Pennsylvania. He is author of over thirty books and more than 200 academic articles, has served on editorial boards of leading journals, and has received honors including the Robert K. Merton Award and the Paul Hoffman Award."
				},
				{
					name: "Esko Aho",
					title: "Former Prime Minister of Finland",
					image: "/src/lib/assets/images/speakers2024/Esko Aho.jpg",
					bio: "Esko Aho served as Prime Minister of Finland from 1991 to 1995, leading Finland into the European Union. He chaired the Center Party, was a Resident Fellow at Harvard, and has been active in academia and global advisory roles. Post-politics, he led SITRA, held executive roles at Nokia, and served on the International Chamber of Commerce Executive Board. Currently he chairs Cinia Oy's Board and advises major institutions through Verbatum Oy."
				},
				{
					name: "Bob Dameron",
					title: "Head of Business Development, Multiverse Computing",
					image: "/src/lib/assets/images/speakers2024/Bob Dameron.png",
					bio: "Bob Dameron is Head of Business Development at Multiverse Computing, one of the top quantum software companies globally. He has over a decade in the startup ecosystem, previously serving as SVP of Sales overseeing a large financial services division, and as President/CEO of a billion-dollar mutual fund company and online learning firm. He mentors entrepreneurs via Futurpreneur and advises cleantech startups on capital markets, with a long-standing interest in mental health advocacy."
				},
				{
					name: "Alex Cui",
					title: "CTO of GPTZero",
					image: "/src/lib/assets/images/speakers2024/Alex Cui.png",
					bio: "Alex Cui is CTO of GPTZero, committed to responsible AI adoption. He has a background in machine learning from Waabi, Uber, and Facebook, co-founded GPTZero, and previously created Open Mind to combat misinformation. He co-founded a chatbot startup and authored Canada's first accredited machine learning high school course. A silver medalist at the International Chemistry Olympiad, he also conducts research applying deep learning to optimize chemistry reactions."
				},
				{
					name: "Caroline Codsi",
					title: "Founder of Women in Governance",
					image: "/src/lib/assets/images/speakers2024/Caroline+Codsi.jpg",
					bio: "Caroline Codsi is the founder of Women in Governance (WiG), a trailblazer for gender equality in corporate sectors. WiG's North American Parity Certification™ has reshaped workplaces by helping women access decision-making roles, and is endorsed by companies like Accenture, Pfizer, and FedEx. She leads global advocacy, delivers TEDx talks, and collaborates with prestigious organizations to champion inclusivity and empowerment."
				},
				{
					name: "Cosmina Morariu",
					title: "Partner at Fragomen",
					image: "/src/lib/assets/images/speakers2024/cosmian-morariu_open-graph.jpg",
					bio: "Cosmina Morariu is a Partner at Fragomen, the world's largest immigration services firm, and serves on the Board of Talent Beyond Boundaries in Canada. She provides strategic immigration counsel to multinational corporations while advancing complementary migration pathways for skilled refugees through collaboration with public and private sectors."
				},
				{
					name: "Kathryn Hume",
					title: "VP of Digital Channels Technology at Royal Bank of Canada",
					image: "/src/lib/assets/images/speakers2024/Kathryn Hume_1.png",
					bio: "Kathryn Hume is the VP of Digital Channels Technology at Royal Bank of Canada, leading software engineering and online platform development. She has helped over 50 Fortune 500 organizations implement AI programs, serves on the board of AI-Redefined, and advises Lytical Ventures. A respected innovation author and educator, she has appeared on TED and in HBR, holds a PhD from Stanford, and speaks seven languages."
				},
				{
					name: "Bruce Kuwabara",
					title: "Founding Partner, KPMB Architects",
					image: "/src/lib/assets/images/speakers2024/moj_eau.bruce kuwabara.web-31.jpg",
					bio: "Bruce Kuwabara is a founding partner of KPMB Architects and Chair of the Board of Trustees at the Canadian Centre for Architecture in Montreal. His commitment to architecture as an agent of positive change earned him the RAIC Gold Medal in 2006 and appointment as an Officer of the Order of Canada in 2012. He has been lead design partner on numerous award-winning projects."
				},
				{
					name: "Sandra Hawken",
					title: "President & CEO, Holland Bloorview Kids Rehabilitation Hospital Foundation",
					image: "/src/lib/assets/images/speakers2024/Sandra_Hawken Headshot.jpg",
					bio: "Sandra Hawken is a values-based leader who has raised over $150 million for equity-focused charities and is a frequent national media spokesperson reframing issues like workplace harassment, disability inclusion, and gender-based violence. She leads the Holland Bloorview Kids Rehabilitation Hospital Foundation and has built viral inclusion movements and record-breaking fundraising campaigns."
				},
				{
					name: "Chris O’Shaughnessy",
					title: "International Speaker, Author, and Comedian",
					image: "/src/lib/assets/images/speakers2024/Chris O_Shaughnessy.jpg",
					bio: "Chris O’Shaughnessy is an international speaker, author, and comedian who blends wit and storytelling to motivate global audiences. He has worked with schools, businesses, and governments across over 100 countries, offering insights on culture and community through dynamic engagement."
				},
				{
					name: "Nikolas Badminton",
					title: "Futurist and Author",
					image: "/src/lib/assets/images/speakers2024/Nikolas_Badminton.jpg",
					bio: "Nikolas Badminton is a world-renowned futurist mentoring executives and leaders to envision desirable futures, anticipate risks, and strengthen strategic planning. He has worked with over 400 organizations including NASA, Disney, Verizon, and the United Nations. His book 'Facing Our Futures' has been recognized as a Next Gen Pick."
				},
				{
					name: "Dr. Fares Kady",
					title: "Head of WHO Sub-Office in Aleppo, Syria",
					image: "/src/lib/assets/images/speakers2024/Dr-Fares-El-Qadi-Aleppo.webp",
					bio: "Dr. Fares Kady is the head of the WHO sub-office in Aleppo, Syria, with a career that began in 1998 through voluntary service with the Red Cross/Red Crescent and evolved into distinguished humanitarian leadership. He emphasizes turning good intentions into decisive action, leads with a collaborative \"team captain\" ethos in crisis settings, and balances field demands with personal resilience. He has faced profound challenges, including family loss during emergency responses, and values trust-building through community connection."
				},
				{
					name: "Oded Galor",
					title: "Founder of Unified Growth Theory; Professor of Economics",
					image: "/src/lib/assets/images/speakers2024/OG.webp",
					bio: "Oded Galor is the founder of Unified Growth Theory, which explores development, prosperity, and inequality across human history. His book 'The Journey of Humanity' has been published in thirty languages. He holds honorary doctorates, and is the Herbert Goldberger Professor of Economics at Brown University."
				}
			]
		},
		"2023": {
			title: "WAC 2023 - Hybrid Thinking",
			description: "Content for WAC 2023 will be available soon. Stay tuned for updates on this past conference.",
			highlights: [
				"Coming soon..."
			],
			speakers: [
				"Coming soon..."
			]
		}
	};
</script>

<svelte:head>
	<title>Past Years - World Affairs Conference</title>
</svelte:head>

<section class="pt-[5rem] md:pt-[7.5rem] lg:pt-[9rem] pb-[5rem] lg:pb-[7rem]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
			Past Conferences
		</h1>
		
		<!-- Tab Navigation -->
		<div class="flex justify-center mb-10">
			<div class="inline-flex rounded-lg p-1 bg-zinc-800 border border-zinc-700">
				{#each Object.keys(yearContent).sort((a, b) => b.localeCompare(a)) as year}
					<button
						class="px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 {activeTab === year ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'text-zinc-300 hover:text-white'}"
						on:click={() => setActiveTab(year)}
					>
						{year}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tab Content -->
		<div class="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg p-6 md:p-8 lg:p-10">
			{#each Object.keys(yearContent) as year}
				{#if activeTab === year}
					<div class="animate-fadeIn">
						<h2 class="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
							{yearContent[year].title}
						</h2>
						
						<p class="text-zinc-300 mb-6">
							{yearContent[year].description}
						</p>
						
						<div class="mb-8">
							<h3 class="text-xl font-semibold text-white mb-4">Highlight Video</h3>
							<div class="text-zinc-300">Coming soon...</div>
						</div>

						{#if year === '2024' && yearContent[year].detailedSpeakers}
							<div class="mt-12">
								<h3 class="text-2xl font-semibold text-white mb-6 text-center">Speaker Profiles</h3>
								<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{#each yearContent[year].detailedSpeakers as speaker}
										<div class="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden hover:border-primary transition-all duration-300">
											<div class="aspect-[3/4] overflow-hidden">
												<img 
													src={speaker.image} 
													alt={speaker.name} 
													class="w-full h-full object-cover object-center"
												/>
											</div>
											<div class="p-4">
												<h4 class="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-1">
													{speaker.name}
												</h4>
												{#if speaker.title}
													<div class="text-zinc-400 text-sm mb-2">{speaker.title}</div>
												{/if}
												<div class="text-zinc-300 text-sm mb-2">
													{#if expanded[speaker.name]}
														{speaker.bio}
													{:else}
														<div class="line-clamp-5">{speaker.bio}</div>
													{/if}
												</div>
												{#if speaker.bio.split(/\s+/).length > 50}
													<button
														class="text-primary text-sm font-medium hover:underline"
														on:click={() => toggleExpanded(speaker.name)}
														aria-label={expanded[speaker.name] ? "Show less" : "Read more"}
													>
														{expanded[speaker.name] ? "Show less" : "Read more"}
													</button>
												{/if}
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
						
						<div class="flex justify-center mt-8">
							<a 
								href="/" 
								class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white hover:brightness-[1.08] transition-all"
							>
								Learn about WAC {new Date().getFullYear()}
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
							</a>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	.animate-fadeIn {
		animation: fadeIn 0.5s ease-in-out;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	/* fallback/clamp if plugin not enabled */
	.line-clamp-5 {
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
