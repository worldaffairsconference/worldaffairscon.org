import React from 'react';
import { Container, CardDeck } from 'react-bootstrap';
import MHasan from '../img/speakers/prev/mhasan.jpg';
import ESnowden from '../img/speakers/prev/esnowden.jpg';
import WAC from '../img/general/wac_logo.svg';
import KeynoteAddresses from '../components/KeynoteAddresses';

import CKHoffler from '../img/speakers/curr/CKHoffler.jpg';
import MLKing from '../img/speakers/curr/MLKing.jpeg';

const Keynote = () => {
  return (
    <Container className="mt-4" id="keynote">
      <KeynoteAddresses
        title="WAC 2023 Closing Keynote Speaker:"
        speaker="Martin Luther King III"
        image={MLKing}
        text={
          <>
            With the past two years’ astounding display of social injustice,
            violence, and confusion around the pandemic, perhaps at no other
            time in recent history has our world needed the clear thinking and
            solutions-oriented voice of civil rights advocate and global
            humanitarian Martin Luther King III.
            <br />
            <br />
            From speaking to thousands at the August 2020 March On Washington to
            his dozens of arrests during peaceful protests, Mr. King is
            shepherding the healing of our nation and the world. He is
            connecting the important lessons of the past with the critical needs
            of our future and motivating a new generation of authentic leaders,
            while empowering others to use their voices to bring about change as
            well.
            <br />
            <br />
            As the oldest son of the late Dr. Martin Luther King Jr. and Mrs.
            Coretta Scott King, Martin Luther King III is a thought leader on
            the world stage, a peace maker, and a negotiator on some of today’s
            most critical national and international platforms for social
            change. Amplifying the work of his father, Mr. King and his wife
            Arndrea have devoted their lives to promoting global human rights
            and eradicating racism, violence, and poverty, earning a reputation
            as a respected international statesman and one of the world’s most
            passionate advocates for the poor and oppressed.
            <br />
            <br />
            Mr. King speaks on a variety of topics such as the importance of
            continuing the struggle for civil rights and taking a stand against
            adversity, emphasizing the importance of individual action in making
            his father’s dream a reality and challenging us all to do better.
            <br />
            <br />
            More recently, Martin and Arndrea launched an effort to fund Black
            and Brown organizers across the country. The first round of funding
            went to 40 organizations whose missions are to mobilize voters in
            key states. By 2024, the Drum Major Coalition will invest $100
            million in grassroots organizations from coast to coast.
            <br />
            <br />
            Martin regularly appears on CNN, MSNBC, NBC News, and ABC News. His
            writings have been published in The Washington Post, The New York
            Times, on CNN.com, and other major news outlets.
          </>
        }
      />

      <KeynoteAddresses
        title="WAC 2023 Opening Keynote Speaker:"
        speaker='Tricia "CK" Hoffler'
        image={CKHoffler}
        text={
          <>
            <br />
            Tricia “CK” Hoffler is the CEO of The CK Hoffler Firm, an
            Atlanta-based law firm that specializes in representing plaintiffs
            in trucking accidents, medical malpractice, wrongful death,
            catastrophic personal injury, civil rights litigation, commercial
            litigation, employment discrimination, opioid litigation, global
            commercial transactions, and “Name, Image, and Likeness (NIL)”
            representation. She is licensed in Georgia, Florida, Virginia, the
            District of Columbia, and Pennsylvania. To date, Ms. Hoffler has
            tried and/or settled cases on behalf of her clients worth over $850
            million. Ms. Hoffler has also lectured extensively nationally and
            internationally on trial strategies and techniques, personal injury,
            medical negligence, First Amendment matters, employment
            discrimination, opioid litigation, and commercial matters. Ms.
            Hoffler brings a diverse set of skills and talents to the practice
            of law. She speaks French fluently and is proficient in Spanish and
            Portuguese.
            <br />
            <br />
            Ms. Hoffler was previously a partner at Edmond, Lindsay & Hoffler,
            LLP, and at Gary, Williams et al., in Florida. While a partner at
            Gary Williams, she led the commercial and international litigation
            practice for 12 years. She is also counsel to civil rights icon The
            Reverend Jesse Jackson and has represented him, and the Rainbow Push
            and related organizations for the past 35 years
            <br />
          </>
        }
      />

      <CardDeck className="mt-4 my-card-deck">
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
      </CardDeck>
      <CardDeck className="other mt-4">
        <KeynoteAddresses
          deck
          title="Previous WAC Speakers"
          speaker=""
          image={WAC}
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
