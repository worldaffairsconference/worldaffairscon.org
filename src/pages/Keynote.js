import React from 'react';
import { Container, CardDeck } from 'react-bootstrap';
import SGalloway from '../img/speakers/2022/social.jpg';
import MHasan from '../img/speakers/mhasan.png';
import ESnowden from '../img/snowden.png';
import Avatar from '../img/avatar.png';
import KeynoteAddresses from '../components/KeynoteAddresses';

const Keynote = () => {
  return (
    <Container className="mt-4" id="keynote">
      <KeynoteAddresses
        title="WAC 2022 Keynote Speaker:"
        speaker=""
        image={SGalloway}
      >
        <h2 className="announce">To be Announced!</h2>
      </KeynoteAddresses>
      <CardDeck className="mt-4">
        <KeynoteAddresses
          deck
          title="WAC 2020: "
          speaker="Mehdi Hasan"
          image={MHasan}
          text="Mehdi Hasan is an award-winning journalist, political commentator, senior contributor at The Intercept, host of the podcast Deconstructed, as well as a presenter for Al Jazeera English. He is known globally for his televised takedowns of world leaders and political proxies. As a British, Muslim immigrant based in Donald Trump's Washington D.C., Mehdi offers a provocative perspective on the ups and downs of global politics and world affairs. At a time when the truth is being denied to the world, in the midst of chaos, moral failure, and when everything seems out of WAC, Mehdi exemplifies tenacity and courage in countering the myths and snowballing used by opponents of transparency, pluralism and democracy. "
        />
        <KeynoteAddresses
          deck
          title="WAC 2015: "
          speaker="Edward Snowden"
          image={ESnowden}
          text="Five years ago, Edward Snowden gave the WAC 2015 Lionel Gelber Keynote Address. In June 2013, Snowden leaked highly classified information about the scale and scope of NSA and CIA counter-terrorism and counter-intelligence operations around the globe. Since then, he has become a household name and is among the most influential privacy activists in the world. At the Keynote Address, Snowden explained his views on global privacy issues, government involvement in citizens' lives, and the dangers of the digital age."
        />
        <KeynoteAddresses
          deck
          title="Previous WAC Speakers"
          speaker=""
          image={Avatar}
          text="WAC has featured many current, popular, and influential speakers in the past. Here's a quick summary of some big names at WAC: "
          li={[
            'Nanor Balyozian - Syrian political advocate',
            'Dr. Samantha Nutt - Founder of War Child North America',
            'Stephen Lewis - former United Nations ambassador',
            'Ralph Nader - American political activist',
            'Lord David Owen - former British Foreign Secretary',
            'Marc Garneau - astronaut turned politician',
            'John Stackhouse - editor of the Globe and Mail',
          ]}
        />
      </CardDeck>
    </Container>
  );
};
export default Keynote;
