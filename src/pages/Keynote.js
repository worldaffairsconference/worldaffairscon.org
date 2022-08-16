import React from 'react';
import { Container, CardDeck } from 'react-bootstrap';
import MHasan from '../img/speakers/prev/mhasan.jpg';
import ESnowden from '../img/speakers/prev/esnowden.jpg';
import WAC from '../img/general/wac_logo.svg';
import KeynoteAddresses from '../components/KeynoteAddresses';

const Keynote = () => {
  return (
    <Container className="mt-4" id="keynote">
      <KeynoteAddresses
        title="WAC 2023 Speakers are to be determined"
        speaker=""
        text={<p>Check back later to find out once they are announced.</p>}
      />
      {/* <KeynoteAddresses
        title="WAC 2022 Opening Keynote Speaker:"
        speaker="Professor Scott Galloway"
        image={SGalloway}
        text={
          <>
            <br />
            Scott Galloway is Professor of Marketing at NYU&quot;s Stern School
            of Business and a serial entrepreneur. In 2012, he was named one of
            the world’s best business professors by Poets & Quants. He has
            founded nine companies, including Prophet, Red Envelope, L2, and
            Section4. He is the New York Times bestselling author of The Four,
            The Algebra of Happiness, and most recently, Post Corona: From
            Crisis to Opportunity. He has served on the boards of directors of
            The New York Times Company, Urban Outfitters, and Berkeley&apos;s
            Haas School of Business. His Prof G and Pivot podcasts, No Mercy /
            No Malice blog, and Prof G YouTube channel reach millions. In 2020,
            Adweek named Pivot Business &quot;Podcast of the Year.&quot;
            <br />
            <br />
            Galloway attended the University of California, Los Angeles, where
            he earned a Bachelor of Arts degree in Economics in 1987, and the UC
            Berkeley Haas School of Business, graduating with an MBA in 1992. In
            2018, Recode and the Vox Media Podcast Network launched Pivot, a
            weekly news commentary podcast co-hosted by Kara Swisher and
            Galloway. In February 2020, Galloway launched The Prof G Show, a
            weekly podcast answering listener questions on business, money and
            tech. In 2021, CNN announced that Galloway will be a host on its
            CNN+ streaming platform.
            <br />
          </>
        }
      /> */}
      {/* <KeynoteAddresses
        title="WAC 2022 Closing Keynote Speaker:"
        speaker="The Honourable Ahmed Hussen, Minister of Housing and Diversity and Inclusion"
        image={AHussen}
        text={
          <>
						<br />
						A passionate advocate for his community, the Honourable Ahmed Hussen has been proudly representing the residents of York South—Weston since 2015.
						<br />
						<br />
						Before he started in politics, Minister Hussen worked at the grassroots with neighbours and allies to create “local solutions to local problems.” This would lead to the Minister helping to secure $500 million to revitalise Toronto’s, Regent Park in 2006.
						<br />
						<br />
						Minister Hussen is a firm believer that diversity is a fact and inclusion is a choice. During his time as the National President for the Canadian Somali Congress, he worked with national and regional authorities to advocate on important issues to Canadians of Somali heritage, which helped foster better civic engagement and integration.     
						<br />
						<br />
						Having lived in social housing himself, Canada’s first dedicated Housing minister understands the positive impact of having an affordable, reliable place to live. In his new role, Minister Hussen is focused on bringing home ownership back within reach while ensuring that everyone in Canada has a safe and affordable place to call home.
						<br />
          </>
        }
      /> */}
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
