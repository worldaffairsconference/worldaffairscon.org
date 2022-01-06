import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardDeck } from 'react-bootstrap';
import Education from '../img/plen/education.jpg';
import Tech from '../img/plen/tech.jpg';
import Sustainability from '../img/plen/sustainability.jpg';

const PlenariesCard = (props) => {
  const data = props;
  return (
    <Card>
      <Link to={data.href}>
        <Card.Img className="plen-image" src={data.image} alt="card image" />
        <Card.ImgOverlay className="text-center text-white p-4">
          <Card.Title as="h3">{data.title}</Card.Title>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};
const Plenaries = () => {
  return (
    <div id="plenaries">
      <Container className="mt-4">
        <Card>
          <Card.Body className="text-center">
            <h1>Plenaries 2022</h1>
          </Card.Body>
        </Card>
        <CardDeck className="mt-2">
          <PlenariesCard
            href="plenary/education"
            image={Education}
            title="Democratizing Education: New Opportunities, New Possibilities"
          />
          <PlenariesCard
            href="/plenary/sustainability"
            image={Sustainability}
            title="Rethinking Sustainability: Innovations for the Environment"
          />
        </CardDeck>
        <CardDeck className="mt-2">
          <PlenariesCard
            href="/plenary/technology"
            image={Tech}
            title="Re-Searching Into our Digital Future: A Token for Tomorrow"
          />
        </CardDeck>
      </Container>
    </div>
  );
};
export default Plenaries;
