<script lang="ts">
	// Tab state management
	let activeTab = "2025";
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
		"2025": {
			title: "WAC 2025 - WAC To The Future",
			description: "",
			highlights: [
				"Theme: WAC To The Future",
				"Recap video coming soon"
			],
			detailedSpeakers: [
				{
					name: "Dr. Sebastian Maurice",
					title: "Global AI/ML Leader",
					image: "/src/lib/assets/images/team/wac_w_large.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Bill Weir",
					title: "CNN Chief Climate Correspondent",
					image: "/src/lib/assets/images/speakers/billWeir.jpg",
					bio: "",
					tag: "Keynote Speaker"
				},
				{
					name: "Keith Pelley",
					title: "Former CEO of PGA European Tour, Current President & CEO of MLSE",
					image: "/src/lib/assets/images/speakers/keithPelley.jpeg",
					bio: "",
					tag: "Keynote Speaker"
				},
				{
					name: "Dr. James Orbinski",
					title: "Former President of Doctors Without Borders & Nobel Prize Winner",
					image: "/src/lib/assets/images/speakers/jamesOrbinski.jpg",
					bio: "",
					tag: "Keynote Speaker"
				},
				{
					name: "Dr. Justina Ray",
					title: "President and Senior Scientist at Wildlife Conservation Society Canada",
					image: "/src/lib/assets/images/team/wac_w_large.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Dr. Jeremy Wang",
					title: "Aerospace engineer and COO of Ribbit",
					image: "/src/lib/assets/images/speakers/jeremyWang.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Emma Lozhkin",
					title: "2012-17 Junior Olympian & Member of the Canadian National Gymnastics Team, Branksome 2017 Graduate, Software Engineer",
					image: "/src/lib/assets/images/speakers/emmaLozhkin.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Sylvia Torres-Guillen",
					title: "General Counsel of the California ALRB, Executive director of Disability Rights Legal Center, social justice advocate",
					image: "/src/lib/assets/images/speakers/sylviaTorresGuillen.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Curtis VanWalleghem",
					title: "Founder and CEO of Hydrostor",
					image: "/src/lib/assets/images/speakers/curtisVanWelleghem.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Shirley Blumberg",
					title: "Founding partner of KPMB Architects and activist for social transformation and change through architecture",
					image: "/src/lib/assets/images/speakers/shirleyBlumberg.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "John Smol",
					title: "Canadian ecologist, limnologist and paleolimnologist",
					image: "/src/lib/assets/images/speakers/johnSmol.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "James Suh",
					title: "CFO of Florida Panthers",
					image: "/src/lib/assets/images/speakers/jamesSuh.webp",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Michael Kaufman",
					title: "Co-Founder: White Ribbon Campaign, Author: The Guy's Guide to Feminism",
					image: "/src/lib/assets/images/speakers/michaelKaufman.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Wolfgang Schwan",
					title: "Ukraine War Journalist & Photographer",
					image: "/src/lib/assets/images/speakers/wolfgangSchwan.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Yan Boechat",
					title: "Conflict Journalist & War Correspondent",
					image: "/src/lib/assets/images/team/wac_w_large.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "John Sitilides",
					title: "Geopolitical Strategist & Diplomacy Consultant for Bush, Obama and Trump",
					image: "/src/lib/assets/images/speakers/johnSitilides.jpg",
					bio: "",
					tag: "Plenary Speaker"
				},
				{
					name: "Dr. Andrew Healey",
					title: "Medical Director/Chief, Chief of Critical care at St. Joseph's Hamilton",
					image: "/src/lib/assets/images/speakers/andrewHealey.jpg",
					bio: "",
					tag: "Plenary Speaker"
				}
			]
		},
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
				// {
				// 	name: "The Honourable Bob Rae",
				// 	title: "Canada’s Ambassador to the United Nations",
				// 	image: "/src/lib/assets/images/speakers2024/Bob Rae.webp",
				// 	bio: "The Honourable Ambassador Bob Rae is a prominent Canadian figure, distinguished as a diplomat, lawyer, former politician, and author. Ambassador Rae's political career began in the 1970s after completing his law degree at the University of Toronto. In 1982, he won a seat in the Ontario Legislature representing York South, rose to lead the NDP, and in 1990 was elected as the 21st Premier of Ontario, implementing significant social reforms. After provincial politics, he served as special envoy for the Rohingya crisis. In 2008 he returned to federal politics, later becoming interim leader of the Liberal Party (2011–2013). He practiced law specializing in corporate and Indigenous law and was appointed Canada's Ambassador to the United Nations in New York in 2020. Rae is the author of several books including 'From Protest to Power: Personal Reflections on a Life in Politics' and 'What's Happened to Politics?' Throughout his career, he has embodied compassion, integrity, and social justice on both national and international stages."
				// },
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
				},
				{
					name: "Masai Ujiri",
					title: "CEO of the Toronto Raptors; Founder of Giants of Africa",
					image: "/src/lib/assets/images/speakers2024/masai-ujiri.png",
					bio: "Masai Ujiri is the CEO of the Toronto Raptors and founder of Giants of Africa, leveraging basketball to empower African youth and bridge global opportunity gaps."
				},
				{
					name: "Ratna Omidvar",
					title: "Chair of the Senate Committee on Social Affairs, Science and Technology; Advocate for Diversity and Inclusion",
					image: "/src/lib/assets/images/speakers2024/ratna-omidvar.jpg",
					bio: "The Honourable Senator Ratna Omidvar is Chair of the Senate Committee on Social Affairs, Science and Technology, a prominent advocate for diversity and inclusion, Director at the Century Initiative, and Council Member at the World Refugee and Migration Council. She is a Member of the Order of Canada and Order of Ontario for her work supporting immigrants and reducing inequality."
				},
				{
					name: "Donna Dasko",
					title: "National Pollster; Media Commentator; Public Policy Expert",
					image: "/src/lib/assets/images/speakers2024/donna-dasko.png",
					bio: "The Honourable Senator Donna Dasko is a respected national pollster, media commentator, and public policy expert. She has led major research initiatives across government, NGOs, and private sector clients on topics including the economy, health promotion, national unity, and gender equality, championing equity in public life."
				},
				{
					name: "Tom Heintzman",
					title: "Founder of Bullfrog Power; Managing Director & Vice-Chair for Energy Transition & Sustainability at CIBC Capital Markets",
					image: "/src/lib/assets/images/speakers2024/tom-heintzman.png",
					bio: "Tom Heintzman is a leader in sustainability and renewable energy, founder of Bullfrog Power, and Managing Director & Vice-Chair for Energy Transition & Sustainability at CIBC Capital Markets. With legal and consulting roots, he has advised and built initiatives in clean electricity, fuels, electrification, and carbon markets, earning recognition such as Ontario Energy Association Leader of the Year."
				},
				{
					name: "Hudson Sullivan",
					title: "Brand Partnerships Lead at TikTok",
					image: "/src/lib/assets/images/speakers2024/hudson-sullivan.png",
					bio: "Hudson Sullivan is Brand Partnerships Lead at TikTok, helping brands connect with audiences. His background spans lifestyle marketing (including launching a Mountain Dew record label at PepsiCo) and award-winning campaigns. A Forbes 30 Under 30 alumnus, his work has been featured in Business Insider, Ad Age, Rolling Stone, and Billboard."
				}
			]
		},
		"2023": {
			title: "WAC 2023 - Hybrid Thinking",
			description: "",
			highlights: [
				"Coming soon..."
			],
			detailedSpeakers: [
				{
				name: "Rahul Singh",
				title: "Founder & Executive Director, GlobalMedic",
				image: "/src/lib/assets/images/speakers2023/rahul-singh.png",
				bio: "Rahul Singh is the Executive Director of GlobalMedic, a registered Canadian charity which has provided life-saving aid in the aftermath of disasters since 2002.  Since then, Singh’s tireless efforts have created a globally recognized, innovative and efficient organization - earning him a spot on Time Magazine’s List of the 100 Most Influential People in the World in 2010."
				},
				{
				name: "Matthew Ball",
				title: "CEO, Epyllion; Founder, Roundhill Ball Metaverse ETF",
				image: "/src/lib/assets/images/speakers2023/matthew-ball.png",
				bio: "Matthew Ball is the CEO of Epyllion, a diversified holding company which makes angel investments, provides advisory services, and produces television, films, and video games. Ball also founded the Roundhill Ball Metaverse ETF on the New York Stock Exchange, which is the largest gaming or Metaverse ETF globally. Ball is also a Venture Partner at Makers Fund, Senior Advisor to KKR, Senior Advisor to McKinsey & Company, and sits on the board of numerous start-ups. His first book, “The Metaverse”, was published in July 2022 and became an instant national and international bestseller, Ball is also an “Occasional Contributor” to The Economist, holds bylines at Bloomberg, The New York Times, and the Wall Street Journal, and wrote the August 8, 2022 cover story for Time Magazine. He was previously the Global Head of Strategy for Amazon Studios."
				},
				{
				name: "Ismael Loutfi",
				title: "Comedian, Writer, and Actor",
				image: "/src/lib/assets/images/speakers2023/ismael-loutfi.png",
				bio: "Ismael Loutfi is a comedian, writer, and actor who developed his deeply acerbic sense of humor growing up a Muslim in rural North Florida. Ismael was recently writing on the animated Ramy Youssef project. Before that, he wrote for the critically acclaimed Patriot Act with Hasan Minhaj on Netflix for the entirety of its run. Ismael’s Comedy Central Half Hour special, Sound It Out, debuted in early March. His stand up was previously featured on This Week at the Cellar, Jimmy Kimmel Live, and Comedy Central’s The Ringers. He has performed on the FOX Night of Comedy showcase and has been named a New Face of Comedy by the prestigious Just for Laughs comedy festival. Ismael can be seen in HBO’s High Maintenance, the Sarah Silverman-produced Please Understand Me, and multiple episodes of Comedy Central’s Ahamed’s Ramadan Diary."
				},
				{
				name: "Leslie Madden",
				title: "Senior Director, Regulatory Science & Quality Assurance, Moderna (Canada)",
				image: "/src/lib/assets/images/speakers2023/leslie-madden.png",
				bio: "Leslie Madden is a Senior Director of Regulatory Science and Quality Assurance at Moderna. Madden graduated with a Master of Business Administration from the University of Toronto - Rotman School of Management and a Global Professionals Masters of Law from the University of Toronto. She has worked in numerous pharmaceutical and biotechnology companies, including Biogen and Eluvium Life Sciences. Join this panel to learn more about Leslie Madden’s role in Regulatory Science and contribution to Moderna’s mission to revolutionize medicine through mRNA."
				},
				{
				name: "Katherine Tattum",
				title: "Chief Operating Officer, Tali AI",
				image: "/src/lib/assets/images/speakers2023/katherine-tattum.png",
				bio: "Katherine is a graduate from MIT and have since worked in entrepreneurship in the Healthcare Information Technology Industry. Her most recent role at Tali AI aims to create a voice-enabled Physician's Assistant, providing AI scribing, medical search and EHR voice commands to minimize the time HCPs need to spend working in their EMR."
				},
				{
				name: "Martin Luther King III",
				title: "Civil Rights Advocate & Global Humanitarian",
				image: "/src/lib/assets/images/speakers2023/mlk-III.png",
				bio: "With the past two years’ astounding display of social injustice, violence, and confusion around the pandemic, perhaps at no other time in recent history has our world needed the clear thinking and solutions-oriented voice of civil rights advocate and global humanitarian Martin Luther King III. From speaking to thousands at the August 2020 March On Washington to his dozens of arrests during peaceful protests, Mr. King is shepherding the healing of our nation and the world. He is connecting the important lessons of the past with the critical needs of our future and motivating a new generation of authentic leaders, while empowering others to use their voices to bring about change as well. As the oldest son of the late Dr. Martin Luther King Jr. and Mrs. Coretta Scott King, Martin Luther King III is a thought leader on the world stage, a peace maker, and a negotiator on some of today’s most critical national and international platforms for social change. Amplifying the work of his father, Mr. King and his wife Arndrea have devoted their lives to promoting global human rights and eradicating racism, violence, and poverty, earning a reputation as a respected international statesman and one of the world’s most passionate advocates for the poor and oppressed. Mr. King speaks on a variety of topics such as the importance of continuing the struggle for civil rights and taking a stand against adversity, emphasizing the importance of individual action in making his father’s dream a reality and challenging us all to do better. More recently, Martin and Arndrea launched an effort to fund Black and Brown organizers across the country. The first round of funding went to 40 organizations whose missions are to mobilize voters in key states. By 2024, the Drum Major Coalition will invest $100 million in grassroots organizations from coast to coast. Martin regularly appears on CNN, MSNBC, NBC News, and ABC News. His writings have been published in The Washington Post, The New York Times, on CNN.com, and other major news outlets."
				},
				{
				name: "Meghan Roach",
				title: "President & CEO, Roots Corporation",
				image: "/src/lib/assets/images/speakers2023/meghan-roach.png",
				bio: "Meghan Roach leads Roots Corporation as President & CEO, steering the iconic Canadian lifestyle and apparel brand through evolving consumer expectations. With deep expertise in retail strategy, brand storytelling, and organizational transformation, she champions Roots’ heritage while driving innovation, sustainability, and community connection."
				},
				{
				name: "Pooja Handa",
				title: "Morning Radio Co-Host, 98.1 CHFI; Former Host, CP24 Breakfast",
				image: "/src/lib/assets/images/speakers2023/pooja-handa.png",
				bio: "Pooja Handa, a voice you may recognize as the host of Toronto's morning radio show on CHFI. As a natural born storyteller and entertainer, she has spread her talents across various media platforms. As a new mom, she continues to share her personal experiences and never fails to engage her viewers."
				},
				{
				name: "Adrienne Batra",
				title: "Editor-in-Chief, Toronto Sun",
				image: "/src/lib/assets/images/speakers2023/adrienne-batra.png",
				bio: "Adrienne Batra is an award-winning journalist, currently the editor-in-chief for the Toronto Sun. Ms. Batra has an undergraduate degree in political science and a Masters in Public Administration and served as a Lieutenant in the Canadian Armed Forces. She was also the Director of Communications and later the Press Secretary in Mayor Rob Ford’s office. In 2013, she was awarded the Queen’s Diamond Jubilee Medal. Ms. Batra also hosted her own political television show on the Sun News Network and is a frequent contributor on CTV news, CP24 and AM640."
				},
				{
				name: "Francesca Quinn",
				title: "CEO, Quinn+Partners; Board Director, Canada Nickel Company",
				image: "/src/lib/assets/images/speakers2023/francesca-quinn.png",
				bio: "Francesca Quinn is the Chief Executive Officer of Quinn+Partners and serves on the Board of Canada Nickel Company. With extensive experience in corporate strategy and board governance, she brings a forward-thinking, sustainability-focused leadership approach to both advisory and corporate roles."
				},
				{
				name: "Barry McInerney",
				title: "Former CEO, Mackenzie Investments; Board Member, Equitable Life of Canada",
				image: "/src/lib/assets/images/speakers2023/barry-mcinerney.png",
				bio: "Mr. McInerney was raised and educated in Canada and is a dual citizen of Canada and the United States, spending equal time over his 35-year career working and living in both countries. For the past 25 years, Mr. McInerney led Canadian, US and global investment companies based in New York, Chicago, and Toronto. In June of 2022, Mr. McInerney retired as President and Chief Executive Officer of Mackenzie Investments. During his six-year tenure, Mr. McInerney more than tripled assets under management, doubled earnings, experienced record sales, and revitalized the culture, diversity, and purpose of Mackenzie Investments with a modern, future-oriented business model and leadership style. Prior to joining Mackenzie Investments, Mr. McInerney was Co-Chief Executive Officer of BMO Global Asset Management, responsible for BMO’s asset management businesses in the United States, Europe, Middle East, and Asia Pacific. These businesses grew ten-fold via organic growth and several significant acquisitions during his seven years of leadership. Prior to BMO, Mr. McInerney was the Managing Director for Russell Investments’ institutional asset management business in the US and Canada, and Russell’s global consulting business. He also served as a member of Russell’s Global Management Committee and the Russell Trust Company Board. Mr. McInerney began his career at Mercer Inc. where he held a number of senior leadership positions including founding President of Mercer Global Investments in the U.S. and globally, President & Chairman of the Mercer Trust Company, and President of Mercer Investment Consulting in the U.S. and Canada. Recent awards include the Rotman Lifetime Achievement Award in 2022, the Alway Award in 2022 from St. Michael’s College (University of Toronto), the Number One Ranking of CEOs in Canada in 2021 by Glassdoor, the Arbor Award from the University of Toronto in 2020, and Wealth Professional’s CEO of the Year Award in 2020. Mr. McInerney is a graduate of the Master of Business Administration and the Bachelor of Commerce programs at the University of Toronto – Rotman School of Management. He also holds the Chartered Financial Analyst (CFA), Fellow of the Society of Actuaries (FSA) and Fellow of the Canadian Institute of Actuaries (FCIA) designations. Mr. McInerney serves on the Board of Equitable Life of Canada, the Rotman School of Management’s Dean Advisory Board, and the Tobacco Free Portfolios Foundation Board. Mr. McInerney is a frequent speaker on the topics of global investment, demographic, geo-economic and capital market trends."
				}
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
							{#if year === "2025"}
								<div class="relative w-full aspect-video rounded-lg overflow-hidden">
									<!-- svelte-ignore a11y-media-has-caption -->
									<video 
										class="w-full h-full object-cover" 
										controls
									>
										<source src="/src/lib/assets/video/WAC_2025_Recap_Every_Second_Counts_1080.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
							{:else}
								<div class="text-zinc-300">Coming soon...</div>
							{/if}
						</div>

						{#if yearContent[year].detailedSpeakers && yearContent[year].detailedSpeakers.length}
							<div class="mt-12">
								<h3 class="text-2xl font-semibold text-white mb-6 text-center">Speaker Profiles</h3>
								<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{#each yearContent[year].detailedSpeakers as speaker (speaker.name)}
									<div class="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden hover:border-primary transition-all duration-300">
									<div class="aspect-[3/4] overflow-hidden">
										<img
										src={speaker.image}
										alt={speaker.name}
										class="w-full h-full object-cover object-center"
										loading="lazy"
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
										{#if speaker.bio && speaker.bio.split(/\s+/).length > 50}
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
								Learn about WAC 2026
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
