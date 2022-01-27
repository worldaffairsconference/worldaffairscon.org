import XLiang from '../img/speakers/current/xliang.jpg';
import JHammond from '../img/speakers/current/jhammond.jpg';
import JLeverton from '../img/speakers/current/jleverton.jpg';
import TSzaky from '../img/speakers/current/tszaky.jpg';

const PlenaryJSON = [
  {
    path: '/plenary/education',
    component: 'Plenary',
    props: {
      title: 'Democratizing Education: New Opportunities, New Possibilities',
      text: '',
      speakers: [
        {
          name: 'Dr. Xiaoyan Liang',
          text: 'Dr. Xiaoyan Liang is a Senior Education Specialist and the World Bank’s Education Team Leader for China, Malaysia, Mongolia, and the Republic of Korea. Dr. Liang joined the World Bank as a Young Professional almost two decades ago, after graduating from Harvard University with a doctor of education degree. Since then, she has led policy analysis and dialogue and managed education programs in African, Latin American, and East Asian countries. Dr. Liang is passionate about development through education and has solid education policy and program expertise in wide-ranging areas, including early childhood education, technical and vocational education and skills development, higher education and science and technology, education finance, and teacher education. She is widely published on various education topics within and outside the World Bank.',
          img: XLiang,
        },
      ],
    },
  },
  {
    path: '/plenary/technology',
    component: 'Plenary',
    props: {
      title: 'Re-Searching Into our Digital Future: A Token For Tomorrow',
      text: '',
      speakers: [
        {
          name: 'John Hammond',
          text: 'John Hammond is a Cybresecurity Research and Educator at Huntress. He is a former member of Defense Threat Reduction Agency of the United States of America and Cybersecurity Content Developer for the United States Department of Defense. John is also a cybersecurity content creator on YouTube and develop cybersecurity video walkthroughs, programming tutorials, and other information security content on the online platform YouTube; he manages community of information sharing to encourage continued education and growth within the cyber security industry.',
          img: JHammond,
        },
        {
          name: 'Jamie Leverton',
          text: 'As CEO of Hut 8, Jaime sets the strategic direction for the company that is defining the digital asset revolution. Jaime is passionate about advancing high-growth and future-forward technology companies, most recently serving as the Chief Commercial Officer at eStruxture Data Centers. Her 20-plus years of leadership experience also includes driving revenue programs as General Manager of Canada and APAC, with data center and cloud provider Cogeco Peer 1 (now Aptum). Previously, she held leadership roles with National Bank, BlackBerry, Bell Canada and IBM Canada. She sits on the boards of the Stratford Festival, Technation and ComKids, and serves as the Chair of IMWomen Canada.',
          img: JLeverton,
        },
      ],
    },
  },
  {
    path: '/plenary/sustainability',
    component: 'Plenary',
    props: {
      title: 'Rethinking Sustainability: Innovations for the Environment',
      text: '',
      speakers: [
        {
          name: 'Tom Sazky',
          text: 'Tom Szaky is the CEO and founder of TerraCycle, a private, US-based business headquartered in Trenton, New Jersey that turns non-recyclable pre-consumer and post-consumer waste into raw material to be used in new products. Szaky\'s parents are medical doctors, and Szaky is an only child. At age four, Szaky left his home in Hungary after the Chernobyl disaster. In 1987, Szaky immigrated to Canada, where he grew up in Toronto. His company TeraCycle has served over 200M recylers, recycled over 7B of waste and donated $45M to charity. TerraCycle is Eliminating the Idea of Waste by recycling the "non-recyclable."',
          img: TSzaky,
        },
      ],
    },
  },
];
export default PlenaryJSON;