import React from 'react';
import { Container, Card, Col } from 'react-bootstrap';

const Startup = (props) => {
  const data = props;
  return (
    <Col md={12}>
      <h2 className="text-center text-md-left">{data.title}</h2>
      <p>{data.text}</p>
    </Col>
  );
};

const Additional = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            WAC 2021 Startups
          </Card.Title>
          <h4 className="text-center">
            To be showcased at the Startup Exhibition
          </h4>
          <hr />
          <Startup
            title="Alice Insights"
            text="Alice Insights is an interdisciplinary team of researchers, business professionals, and environmental practitioners, dedicated to the creation of cutting-edge solutions that help navigate climate risk and opportunity. Their platform uses machine learning & earth systems science to predict the future physical impacts of climate change on assets across the globe. "
          />
          <Startup
            title="DreamAI"
            text="Innovating Canadian Immigration. DreamAI is a Toronto-based startup incubated in the DMZ Sandbox at the intersection of AI and immigration. They strive to optimize the potential of future economic immigrants in the Canadian economy, maximizing the opportunity for a sustainable and successful livelihood. "
          />
          <Startup
            title="Ecopia.AI"
            text="Ecopia's mission is to digitize the world using AI, providing foundational information for critical decision-making; improving the welfare of societies, efficiency of economies, and health of environments. They specialize in extracting insight from geospatial big data. Their intelligent systems leverage groundbreaking advancements in artificial intelligence to convert high-resolution imagery of our earth into HD Vector Maps, which are embedded into critical applications around the world. "
          />
          <Startup
            title="Future Fertility"
            text="Future fertility is a startup that assesses the quality of a human egg. It is the first company to develop the AI image analysis technology necessary to do so non-invasively. This is an important addition to clinics for IVF treatment and egg freezing, allowing to make more informed treatment plan decisions to empower women. "
          />
          <Startup
            title="Greenhouse Juice"
            text="Greenhouse Juice is a Canadian beverage company aiming to make healthy and sustainable choices the new normal. They offer widespread access to high-quality plant-based nutrition and wellness in a sustainable manner. "
          />
          <Startup
            t="Hop In"
            text="Hop In provides a logistics software service that offers customized corporate shuttle solutions for the daily commute. As a result, companies are able to retain more talent, save money, and access a larger hiring pool, all while providing an efficient commute to work. "
          />
          <Startup
            title="Peer4Peer"
            text="Peer4Peer is a free, online and interactive peer tutoring platform that connects student tutors and tutees to offer personalized tutoring and mentorship. It serves to bridge the growing inequities in learning and promote virtual companionship during a socially isolating time. A startup incubated during COVID-19, Peer4Peer helps engage fellow students from all backgrounds, across Canada and beyond. Through the Peer4Peer website, any student can sign up to become a tutor or tutee; however, to become a tutor, they must first be validated by an internal team. Upon selection, there is a matchmaking mechanism to optimize the fit and experience between both parties. For tutees, they are able to work 1 on 1, or in a group of up to 5 on a subject or course of their interest at no cost. "
          />
          <Startup
            title="Properly"
            text="Properly is a Canadian real estate technology company that enables homeowners to buy when they find the home they love, move in, and then sell their old home from the comforts of their new one. Properly also offers Canada's most accurate home valuation report - homeowners can obtain a free and instant assessment of their home’s value that is always up-to-date. Since launching in 2018 with the goal of simplifying life’s most important transaction for Canadians, Properly has worked with thousands of homeowners, and has raised more than $100 million in equity and debt capital from leading investors. Properly is headquartered in Toronto (with additional offices in Calgary and Ottawa, and soon to have offices across a number of other Canadian cities). "
          />
          <Startup
            title="Set Scouter"
            text="Set Scouter simplifies the film production process by connecting producers and agencies with spaces to create content such as films and commercials throughout North America. Through Set Scouter, you can book and list filming locations. Canon, Google, Netflix, and Amazon are just some of the companies that have used their services. "
          />
          <Startup
            title="Styll Shirts"
            text="Styll Shirts is an e-commerce clothing brand focused on emphasizing the importance of diversity in Canadian society. Featuring a line of minimal t-shirts each displaying a unique phrase, Styll Shirts is bringing awareness to the multicultural dialects that comprise Canadian pop culture. Today, their shirts can be seen on Canadian influencers, artists, entrepreneurs, and students alike. "
          />
          <Startup
            title="TreesCO2"
            text="TreesCO2 was co-founded by Canadian twins Kaitlin and Lauren Grierson to inspire the world to plant trees through action and education. TreesCO2 issued its call to action for 1,000 trees for each of the world’s youth aged 15-24 at the 2019 United Nations Youth Climate Action Summit and Nature-Based Solutions Weekend Meetings. TreesCO2’s metric of 1,000 trees for every global youth approximates and personalizes the World Economic Forum’s goal of 1 trillion trees. Having exceeded 4500 trees, TreesCO2 is working with other youth to help them reach their personal goals of 1,000 trees. The Student Ambassador Program (SAP) is a leadership program inviting students to join TreesCO2 in action, education and awareness through tree planting field trips in partnership with local tree planting authorities. Due to COVID-19, this year TreesCO2 pivoted from in-person tree planting to virtual tree planting education and climate action programming. "
          />
          <Startup
            title="UnWrapIt"
            text="UnWrapIt is a virtual, corporate gifting platform that helps socially and environmentally conscious companies create unique gift experiences. Their gifts are always experiential, digital, or charitable, and since they are delivered virtually don’t require the hassle of shipping and won’t end up in landfills. With UnWrapIt, companies can gift digital media, real-world experiences, gift cards, subscriptions, charitable donations and much more. "
          />
          <Startup
            title="Wavefrnt"
            text="Wavefrnt is an online platform to build & share innovative projects and startups with global like-minded peers. There are two parts to a great project: The idea, and the execution. One cannot exist without the other, but how do you find both? You need a great team. We’re often either stuck with ideas we don’t feel passionate about or lack the expertise to make them a reality. Wavefrnt brings those two groups together to work on awesome projects and build meaningful connections with other ambitious teenagers. "
          />
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Additional;
