import React from 'react';
import { Container, CardDeck } from 'react-bootstrap';
import GClarke from '../img/speakers/gclarke2.png';
import MHasan from '../img/speakers/mhasan.png';
import ESnowden from '../img/snowden.png';
import Avatar from '../img/avatar.png';
import KeynoteAddresses from '../components/KeynoteAddresses';

const Keynote = () => {
  return (
    <Container className="mt-4">
      <KeynoteAddresses
        title="WAC 2021 Keynote Speaker:"
        speaker="Dr. George Elliott Clarke"
        image={GClarke}
        text={
          <>
            <br />
            Poet, novelist, playwright, and critic Dr. George Elliott Clarke was
            born near Windsor, Nova Scotia, and grew up in Halifax. He earned
            his BA from the University of Waterloo, MA from Dalhousie
            University, and Ph.D. from Queen&apos;s University in Kingston,
            Ontario. Dr. Clarke is the recipient of many honors for his work,
            including numerous honorary doctorates; a Doctor of Law (LL.D) from
            Dalhousie University, and 3 Doctors of Letters from the University
            of New Brunswick, the University of Alberta, and Saint Mary’s
            University.
            <br />
            <br />
            He is the author of numerous collections of poetry including
            Saltwater Spirituals and Deeper Blues (1983), Lush Dreams, Blue
            Exile: Fugitive Poems 1978-2993 (1994), Execution Poems: The Black
            Acadian Tragedy of George and Rue (2001), which won the Governor
            General’s Literary Award, Illuminated Verses (2005), Black (2006),
            and the dramatic poem Trudeau: Long March, Shining Path (2007). Dr.
            Clarke’s work reflects his interests in the Black culture of
            Atlantic Canada, an experience and identity he has described as
            &quot;Africadian.&quot; He has explored the cultural and social
            histories of Black Canadians across various genres, frequently
            braiding together archival research and personal experience. He is
            the author of the verse-novel Whylah Falls (1990), which he later
            adapted for the radio and stage. Dr. Clarke has been instrumental in
            promoting the work of writers of African descent, especially those
            of Nova Scotia, publishing Odysseys Home: Mapping African-Canadian
            Literature in 2002.
            <br />
            <br />
            Dr. Clarke has received many awards for his work over the years
            including the Dr. Martin Luther King Jr. Achievement Award, the
            Pierre Elliott Trudeau Fellowship Prize, the Planet Africa
            Renaissance Award, the Governor General’s Award for poetry, and the
            Eric Hoffer Book Award for Poetry. In 2006, Dr. Clarke was appointed
            to the Order of Nova Scotia and later appointed to the Order of
            Canada in 2008 at the rank Officer. In 2009, he was a co-recipient
            of the William P. Hubbard Award for Race Relations from the City of
            Toronto for his outstanding achievements and commitment in making a
            distinct difference in racial relations in Toronto. Dr. Clarke was
            chosen expressly for &quot;his local and national leadership role in
            creating an understanding and awareness of African and black culture
            and excellence in his contribution to redefining culture.&quot; In
            November 2012, Dr. Clarke became Toronto’s fourth Poet Laureate, and
            in 2016, he became Canada&apos;s seventh Parliamentary Poet
            Laureate.
          </>
        }
      />
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
          text="Mehdi Hasan is an award-winning journalist, political commentator, senior contributor at The Intercept, host of the podcast Deconstructed, as well as a presenter for Al Jazeera English. He is known globally for his televised takedowns of world leaders and political proxies. As a British, Muslim immigrant based in Donald Trump's Washington D.C., Mehdi offers a provocative perspective on the ups and downs of global politics and world affairs. At a time when the truth is being denied to the world, in the midst of chaos, moral failure, and when everything seems out of WAC, Mehdi exemplifies tenacity and courage in countering the myths and snowballing used by opponents of transparency, pluralism and democracy. "
        />
        <KeynoteAddresses
          deck
          title="Previous WAC Speakers"
          speaker=""
          image={Avatar}
          text="Mehdi Hasan is an award-winning journalist, political commentator, senior contributor at The Intercept, host of the podcast Deconstructed, as well as a presenter for Al Jazeera English. He is known globally for his televised takedowns of world leaders and political proxies. As a British, Muslim immigrant based in Donald Trump's Washington D.C., Mehdi offers a provocative perspective on the ups and downs of global politics and world affairs. At a time when the truth is being denied to the world, in the midst of chaos, moral failure, and when everything seems out of WAC, Mehdi exemplifies tenacity and courage in countering the myths and snowballing used by opponents of transparency, pluralism and democracy. "
        />
      </CardDeck>
    </Container>
  );
};
export default Keynote;
