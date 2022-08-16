//import React from 'react';
//import { Container, Card, Row, Col } from 'react-bootstrap';

import ESnowden from '../img/speakers/prev/esnowden.jpg';
import BMasrani from '../img/speakers/prev/bmasrani.jpg';
import MRomanow from '../img/speakers/prev/mromanow.jpg';
import AChisholm from '../img/speakers/prev/achisholm.png';
import ALau from '../img/speakers/prev/alau.jpg';
import ELau from '../img/speakers/prev/elau.jpg';
import GHinton from '../img/speakers/prev/ghinton.jpg';
import JStackhouse from '../img/speakers/prev/jstackhouse.jpg';
import RNader from '../img/speakers/prev/rnader.jpg';
import JHansen from '../img/speakers/prev/jhansen.jpg';
import JIvey from '../img/speakers/prev/jivey.jpg';
import LFriedman from '../img/speakers/prev/lfriedman.jpg';
import DOwen from '../img/speakers/prev/dowen.jpg';
import MGarneau from '../img/speakers/prev/mgarneau.jpg';
import MHasan from '../img/speakers/prev/mhasan.jpg';
import GClarke from '../img/speakers/prev/gclarke.png';
import DCarroll from '../img/speakers/prev/dcarroll.png';
import ACharles from '../img/speakers/prev/acharles.png';
import SGalloway from '../img/speakers/prev/sgalloway.jpg';
import AHussen from '../img/speakers/prev/ahussen.jpg';
import SGallagher from '../img/speakers/prev/sgallagher.jpg';
import JHammond from '../img/speakers/prev/jhammond.jpg';

const PastSpeakers = [
  {
    name: 'Scott Galloway',
    img: SGalloway,
    subtitle: 'Professor of Marketing at NYU Stern School of Business',
  },
  {
    name: 'Ahmed Hussen',
    img: AHussen,
    subtitle: 'Minister of Diversity, Inclusion and Youth of Canada',
  },
  {
    name: 'Dr. Sarah Gallagher',
    img: SGallagher,
    subtitle: 'Science Advisor to the Canadian Space Agency',
  },
  {
    name: 'Bharat Masrani',
    img: BMasrani,
    subtitle: 'CEO and Group President of TD Bank',
  },
  {
    name: 'Michele Romanow',
    img: MRomanow,
    subtitle: 'President and Co-founder of Clearbanc',
  },
  {
    name: 'John Hammond',
    img: JHammond,
    subtitle:
      'Cybersecurity Researcher & Content Developer for the United States Department of Defense',
  },
  {
    name: 'Mehdi Hasan',
    img: MHasan,
    subtitle: 'British-American Political Journalist, Broadcaster and Author',
  },
  {
    name: 'Edward Snowden',
    img: ESnowden,
    subtitle:
      'Former National Security Agency Computer Intelligence Consultant & Wistleblower',
  },
  {
    name: 'Andrew Chisholm',
    img: AChisholm,
    subtitle: 'Board of Directors of Royal Bank of Canada',
  },
  {
    name: 'Marc Garneau',
    img: MGarneau,
    subtitle: 'Former Canadian Astronaut',
  },
  {
    name: 'Allen Lau',
    img: ALau,
    subtitle: 'CEO and Co-founder of Wattpad',
  },
  {
    name: 'Eva Lau',
    img: ELau,
    subtitle: 'Co-founder and CEO of Two Small Fish',
  },
  {
    name: 'Dr. Louis Friedman',
    img: LFriedman,
    subtitle: 'Co-founder of The Planetary Society',
  },
  {
    name: 'John Stackhouse',
    img: JStackhouse,
    subtitle: 'Former Editor-in-Chief of The Globe and Mail',
  },
  {
    name: 'Dr. James Hansen',
    img: JHansen,
    subtitle: '"Father of climate change awareness"',
  },
  {
    name: 'Janet Ivey',
    img: JIvey,
    subtitle: "President at Explore Mars and CEO of Janet's Planet",
  },
  {
    name: 'David Owen',
    img: DOwen,
    subtitle: 'Former British Foreign Secretary',
  },
  {
    name: 'Dr. Geoffrey Hinton',
    img: GHinton,
    subtitle: '2018 recipient of the Turing Award for Computer Science',
  },
  {
    name: 'Ralph Nader',
    img: RNader,
    subtitle: 'Social and Political Activist',
  },
  {
    name: 'George E. Clarke',
    img: GClarke,
    subtitle: 'Canadian Poet, Playwright and Literary Critic',
  },
  {
    name: 'David Carroll',
    img: DCarroll,
    subtitle: 'Associate Professor of Media Design at Parsons School of Design',
  },
  {
    name: 'Ajani Charles',
    img: ACharles,
    subtitle: 'Photographer, Director and Producer',
  },
];

let pastSpeakersFormatted = [];

for (let i = 0; i < PastSpeakers.length; i += 3) {
  pastSpeakersFormatted.push([
    PastSpeakers[i] || false,
    PastSpeakers[i + 1] || false,
    PastSpeakers[i + 2] || false,
  ]);
}

export default pastSpeakersFormatted;
