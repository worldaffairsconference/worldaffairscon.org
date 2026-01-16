import wacWLarge from "$lib/assets/images/team/wac_w_large.jpg";
import MartinKon from "$lib/assets/images/speakers2026/martin_kon.jpg";
import GregMeredith from "$lib/assets/images/speakers2026/greg_meredith.jpg";
import JackArmstrong from "$lib/assets/images/speakers2026/jack_armstrong.jpg";
import MarkCohon from "$lib/assets/images/speakers2026/mark_cohon.jpg";
import NeilHetherington from "$lib/assets/images/speakers2026/neil_hetherington.jpg";
import TzeporahBerman from "$lib/assets/images/speakers2026/tzeporah_berman.jpg";
import MarciShore from "$lib/assets/images/speakers2026/marci_shore.jpg";
import MyckKabongo from "$lib/assets/images/speakers2026/myck_kabongo.png";
import MalcolmMcAdie from "$lib/assets/images/speakers2026/malcolm_mcadie.png";
import PaulGoddard from "$lib/assets/images/speakers2026/paul_goddard.jpg";
import ArwaDamon from "$lib/assets/images/speakers2026/arwa_damon.jpg";
import MichaelSerbinis from "$lib/assets/images/speakers2026/michael_serbinis.jpg";
import ChrisHadfield from "$lib/assets/images/speakers2026/chris_hadfield.jpg";
import AlaaMurabit from "$lib/assets/images/speakers2026/alaa_murabit.jpg";

export type Speaker2026 = {
	name: string;
	title: string;
	image: string;
	bio: string;
	tag?: string;
	slug: string;
};

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const speakers2026: Speaker2026[] = [
	{
		name: "Paul Goddard",
		title: "CEO and President of Pizza Pizza",
		image: PaulGoddard,
		bio: "Paul Goddard holds a Bachelor of Science degree with Honours, Mechanical Engineering, from Queen's University, is a licensed Professional Engineer, and holds an MBA from London Business School, United Kingdom. Paul joined Pizza Pizza as Chief Information Officer and Vice President, Enterprise Development, before being appointed Chief Executive Officer in 2010.",
		slug: slugify("Paul Goddard")
	},
	{
		name: "Chris Hadfield",
		title:
			"Astronaut and Former Commander of the International Space Station",
		image: ChrisHadfield,
		bio: "Chris Hadfield is a Canadian astronaut, engineer, and former Commander of the International Space Station, becoming the first Canadian to lead the ISS. A retired Royal Canadian Air Force pilot, he flew on three space missions and is known for making space science accessible to the public. Hadfield is also a bestselling author and speaker, sharing insights on leadership, risk, and exploration.",
		tag: "Keynote Speaker",
		slug: slugify("Chris Hadfield")
	},
	{
		name: "Martin Kon",
		title: "Former CFO of YouTube, President Emeritus of Cohere",
		image: MartinKon,
		bio: "Martin Kon is President Emeritus & Strategic Advisor at Cohere and a member of the company’s Board of Directors. Cohere is the leading independent, data-security-focused enterprise AI company, with offices in Toronto, Montreal, San Francisco, New York, London, Paris, and Seoul.",
		slug: slugify("Martin Kon")
	},
	{
		name: "Arwa Damon",
		title:
			"Former CNN Senior International Correspondent, Founder of INARA",
		image: ArwaDamon,
		bio: "Arwa Damon is a five-time Emmy winning former CNN Senior International Correspondent. While her career has taken her across the globe, she is best known for her coverage of the Middle East, especially out of Iraq and Syria, and for the human stories she brings into her reporting. She is also the recipient of numberous Peabody Awards, the Investigative Reporters and Editors award for her coverage of the 2012 attack on the US Consulate in Benghazi, and the prestigious \"Courage in Journalism\" award by the International Women's Media Foundations.",
		slug: slugify("Arwa Damon")
	},
	{
		name: "Marci Shore",
		title: "Chair of Intellectual European History at U of T, Former Yale Professor",
		image: MarciShore,
		bio: "Marci Shore began a position as Chair in European Intellectual History at the Munk School for Global Affairs and Public Policy at the University of Toronto in 2025. She was previously professor of history at Yale University; she has also been a regular visiting fellow at the Institut für die Wissenschaften vom Menschen in Vienna since 2004. Her articles and essays have appeared in The New Yorker, Foreign Policy, Eurozine, the Atlantic, The Yale Review, The New York Review of Books, The Times Literary Supplement, The New York Times, and The Wall Street Journal. She is the recipient of a Guggenheim Fellowship for her book project about phenomenology in East-Central Europe tentatively titled \"In Pursuit of Certainty Lost: Central European Encounters on the Way to Truth.\"",
		slug: slugify("Marci Shore")
	},
	{
		name: "Malcolm McAdie",
		title: "Wildlife Veterinarian, Saved Canada's Most Endangered Mammal",
		image: MalcolmMcAdie,
		bio: "Malcolm McAdie is a wildlife veterinarian known for his work in protecting and restoring Canada’s most endangered species. Through hands-on conservation medicine, rehabilitation, and field research, he has played a direct role in saving at-risk wildlife populations. His work bridges science, animal welfare, and environmental stewardship to support long-term biodiversity conservation.",
		slug: slugify("Malcolm McAdie")
	},
	{
		name: "Myck Kabongo",
		title: "Former NBA Player, D1 College Coach",
		image: MyckKabongo,
		bio: " Myck Kabongo is a former professional basketball player who appeared in the NBA and played internationally after a standout college career at the University of Texas. Following his playing career, he transitioned into coaching and is now a Division I college coach, focusing on player development and team leadership. He is also known for his involvement with Canada Basketball and mentoring young athletes.",
		slug: slugify("Myck Kabongo")
	},
	{
		name: "Neil Hetherington",
		title: "CEO of Daily Bread Food Bank",
		image: NeilHetherington,
		bio: "Neil Hetherington is the Chief Executive Officer of Daily Bread Food Bank, Canada’s largest food bank. He has previously led organizations such as Habitat for Humanity (Toronto and New York City) and Dixon Hall, focusing on housing and community services. Hetherington is a prominent advocate for addressing food insecurity and systemic poverty in Canada.",
		slug: slugify("Neil Hetherington")
	},
	{
		name: "Tzeporah Berman",
		title: "Founder of Fossil Fuel Non-Proliferation Treaty Initiative",
		image: TzeporahBerman,
		bio: "Tzeporah Berman BA, MES, LLD (honoris causa) has been designing climate justice and environmental advocacy campaigns and advising governments for over 30 years. She is the Co-founder and International Program Director at Stand.earth and the Founder and Chair of the Fossil Fuel Non-Proliferation Treaty Initiative.",
		slug: slugify("Tzeporah Berman")
	},
	{
		name: "Mark Cohon",
		title: "Former CFL Commissioner",
		image: MarkCohon,
		bio: "Mark Cohon is a Canadian business executive best known for serving as Commissioner of the Canadian Football League (CFL) from 2007 to 2017. During his tenure, he helped modernize the league, strengthen financial stability, and expand its national profile. He now works as a business leader and speaker, focusing on leadership, governance, and organizational growth.",
		slug: slugify("Mark Cohon")
	},
	{
		name: "Joseph Lace",
		title: "Managing Director of JP Morgan",
		image: wacWLarge,
		bio: "Joseph Lace is a Managing Director at J.P. Morgan based in Toronto, Ontario, where he specializes in investment banking and capital markets. He has extensive experience advising corporate clients on strategic financings, mergers and acquisitions, and market transactions. Lace is known for his leadership in developing financial solutions and driving key client relationships in the Canadian and global markets.",
		slug: slugify("Joseph Lace")
	},
	{
		name: "Jack Armstrong",
		title: "Play by Play Commentator for the Toronto Raptors",
		image: JackArmstrong,
		bio: "Jack Armstrong is a Canadian basketball commentator and former professional player, best known as the longtime radio analyst for the Toronto Raptors. After playing college basketball and professionally in Europe, he transitioned into broadcasting and has become one of the most recognizable voices in Raptors media. Armstrong is known for his energetic commentary, strong basketball insight, and connection with the Canadian basketball community.",
		slug: slugify("Jack Armstrong")
	},
	{
		name: "Isaac Lax",
		title: "Head of Roster Planning for the Toronto Raptors",
		image: wacWLarge,
		bio: "Isaac Lax is the Director of Roster Planning & Analysis for the Toronto Raptors, where he focuses on roster construction, salary-cap strategy, and CBA analysis. He has held multiple roles within the Raptors’ basketball operations department and works as part of the team’s front office in Toronto.",
		slug: slugify("Isaac Lax")
	},
	{
		name: "Greg Meredith",
		title: "Retired NHL Player, Serial Entrepreneur",
		image: GregMeredith,
		bio: "Greg Meredith is a retired NHL player who played for the Calgary Flames after a record-setting college career at the University of Notre Dame. Drafted by the Atlanta Flames in 1978, he played in the NHL in the early 1980s before retiring due to injury. He later earned an MBA from Harvard Business School and became a finance professional and serial entrepreneur.",
		slug: slugify("Greg Meredith")
	},
	{
		name: "Michael Serbinis",
		title:
			"Founder and CEO of League and Three Angels Capital, Former CEO at Kobo, Critical Path, DocSpace, Zip2",
		image: MichaelSerbinis,
		bio: "Michael Serbinis is the Founder and CEO of League and 3Angels Capital, and serves as Board Chair of the Perimeter Institute, as well as a Director at the Vector Institute and Creative Destruction Lab. He is a serial entrepreneur who previously served as CEO of Kobo, Critical Path, DocSpace, and Zip2, helping build and scale globally impactful technology companies. Serbinis is widely recognized for his leadership in Canada’s technology, health, and AI innovation ecosystems.",
		slug: slugify("Michael Serbinis")
	},
	{
		name: "Alaa Murabit",
		title: "Founder of The Voice of Libyan Women",
		image: AlaaMurabit,
		bio: "Alaa Murabit is a Libyan-Canadian physician, peacebuilder, and global advocate for gender equality and sustainable development. She is the founder of The Voice of Libyan Women and has served as a UN High-Level Commissioner on Health Employment and Economic Growth. Murabit is widely recognized for advancing women’s leadership, health equity, and peacebuilding in conflict-affected communities.",
		slug: slugify("Alaa Murabit")
	}
];
