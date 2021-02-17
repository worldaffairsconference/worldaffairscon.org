import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardDeck } from 'react-bootstrap';
import Justice from '../img/plen/justice.png';
import Media from '../img/plen/media.png';
import Business from '../img/plen/business.png';
import Space from '../img/plen/space.png';

const PlenariesCard = (props) => {
  const data = props;
  return (
    <Card>
      <Link to={data.href}>
        <Card.Img className="plen-image" src={data.image} alt="card image" />
        <Card.ImgOverlay className="text-center text-white">
          <Card.Title as="h3">{data.title}</Card.Title>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};
const Plenaries = () => {
  return (
    <>
      <Container className="mt-4">
        <Card>
          <Card.Body className="text-center">
            <h1>Plenaries</h1>
          </Card.Body>
        </Card>
        <CardDeck className="mt-2">
          <PlenariesCard
            href="plenary/space"
            image={Space}
            title="Commercial Spaceflight: Humanity's Next Steps"
          />
          <PlenariesCard
            href="/plenary/justice"
            image={Justice}
            title="Social Justice: Our History and Future"
          />
        </CardDeck>
        <CardDeck className="mt-2">
          <PlenariesCard
            href="/plenary/social"
            image={Media}
            title="Social Media: We are the Product"
          />
          <PlenariesCard
            href="/plenary/business"
            image={Business}
            title="Buisness in COVID: Sink or Swim"
          />
        </CardDeck>
      </Container>
    </>
  );
};
export default Plenaries;
