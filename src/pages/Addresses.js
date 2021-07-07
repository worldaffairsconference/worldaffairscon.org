import React from 'react';
import { Container } from 'react-bootstrap';
import KeynoteAddresses from '../components/KeynoteAddresses';
import AChisholm from '../img/speakers/achisholm.png';
import ALau from '../img/speakers/alau.png';
import ELau from '../img/speakers/elau.png';

const Addresses = () => {
  return (
    <Container className="mt-4">
      <KeynoteAddresses
        title="Opening Address 2021:"
        speaker=""
        image={AChisholm}
        addressName="Andrew Chisholm"
        addressRole="Corporate Director of RBC"
        text="Andrew Chisholm is a member of the Board of Directors of Royal Bank of Canada. Prior to that, he spent most of his career at Goldman Sachs & Co, which he joined in 1985 in New York. He served in a variety of progressively more senior leadership roles within the organization during his 30-year career including as Senior Strategy Officer of the firm globally from 2012 - 2014, as Head or Co-Head of the Global Financial Institutions Group in both London and New York from 2002 - 2012, and as co- Chair of the Firmwide Commitments Committee (primarily overseeing the firm's equity underwriting activities) from 2011 - 2015. He holds a B. Comm from Queens University (1981) and graduated with an MBA from the Ivey Business School at Western University in 1985. Chisholm is also a Board Member of Evergreen Brickworks. He lives in Toronto with his family. !"
      />
      <div className="mt-4">
        <KeynoteAddresses
          title="Closing Address 2021:"
          image={ALau}
          addressName="Allen Lau"
          addressRole="Co-founder and CEO of Wattpad"
          text="Allen Lau is the CEO and co-founder of Toronto-based Wattpad. Wattpad is a website and app for writers to publish new user-generated stories. Allen leads the company’s efforts to transform how people create and engage with stories across multiple platforms, including the top-rated Wattpad app which boasts over 90 million monthly users. Wattpad has worked with entertainment companies to adapt stories from the platform into blockbuster movies, hit television stories and bestselling books around the world. Since its inception in 2006, Wattpad has raised US$118 million from top VCs in Silicon Valley, New York, Canada and Asia. Allen was previously CEO and co-founder of FeedM8, a mobile advertising company that was acquired by Upstream Systems. In 2001, Allen co-founded Tira Wireless, a venture-backed mobile gaming and technology company. As CTO of Tira, Allen was responsible for its product vision, strategy and R&D. Tira raised over $30 million in funding from US and Canadian VCs. Allen is also the co-founder of Two Small Fish Ventures along with his wife Eva. "
        />
      </div>
      <div className="mt-2">
        <KeynoteAddresses
          title="Closing Address 2021:"
          image={ELau}
          addressName="Eva Lau"
          addressRole="Co-founder and CEO of Two Small Fish"
          text="Eva Lau is an entrepreneur-turned investor who is one of the few women leading a venture fund in Canada. She is the founding partner of Two Small Fish Ventures, a venture fund that invests in early-stage, transformative tech companies with strong network effects. The fund is backed by a network of top product and company creators, high-networth individuals and institutional investors. Before starting Two Small Fish Ventures, Eva was Wattpad’s Head of Community and Content, now the largest consumer internet company in Canada. Along with her husband, Allen Lau, Eva helped to nurture and scale Wattpad from its infancy to become one of the largest online communities with tens of millions of monthly users around the world. Before Wattpad, Eva was the Director of Product Development of Toronto based accelerator, Brightspark Labs. Apart from her work with her venture fund, Eva is immersed in many incubators and accelerators, such as Creative Destruction Lab at Rotman School of Management, University of Toronto’s Entrepreneurship Hatchery, Ryerson’s DMZ, University of Waterloo’s Velocity and Techstars. She also serves on the board of Branksome Hall and a number of startup companies. "
        />
      </div>
    </Container>
  );
};
export default Addresses;
