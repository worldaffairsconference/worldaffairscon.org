import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardDeck } from 'react-bootstrap';

import Education from '../img/plen/education.jpg';
import Tech from '../img/plen/tech.jpg';
import Sustainability from '../img/plen/sustainability.jpg';
import Equality from '../img/plen/equality.jpg';
import Media from '../img/plen/media.png';
import Refugee from '../img/plen/refugee.jpg';
import Health from '../img/plen/health.jpg';

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
            <h1>Plenary Topics</h1>
            <h3>To be announced soon!</h3>
          </Card.Body>
        </Card>
        {/*}
        <Card className="mt-3 hero-section">
          <div className="plenarycard-grid">
            <a className="plenarycard" href="#">
              <div
                className="plenarycard__background"
                style={{ backgroundImage: `url(${Education})` }}
                // style="background-image: url(https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"
              ></div>
              <div className="plenarycard__content">
                <p className="plenarycard__category">Category</p>
                <h3 className="plenarycard__heading">Example Card Heading</h3>
              </div>
            </a>
            <a className="plenarycard" href="#">
              <div
                className="plenarycard__background"
                style={{ backgroundImage: `url(${Tech})` }}
                // style="background-image: url(https://images.unsplash.com/photo-1557187666-4fd70cf76254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"
              ></div>
              <div className="plenarycard__content">
                <p className="plenarycard__category">Category</p>
                <h3 className="plenarycard__heading">Example Card Heading</h3>
              </div>
            </a>
            <a className="plenarycard" href="#">
              <div
                className="plenarycard__background"
                style={{ backgroundImage: `url(${Sustainability})` }}
                // style="background-image: url(https://images.unsplash.com/photo-1556680262-9990363a3e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"
              ></div>
              <div className="plenarycard__content">
                <p className="plenarycard__category">Category</p>
                <h3 className="plenarycard__heading">Example Card Heading</h3>
              </div>
            </a>
            <a className="plenarycard" href="#">
              <div
                className="plenarycard__background"
                style={{ backgroundImage: `url(${Equality})` }}
                // style="background-image: url(https://images.unsplash.com/photo-1557004396-66e4174d7bf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)"
              ></div>
              <div className="plenarycard__content">
                <p className="plenarycard__category">Category</p>
                <h3 className="plenarycard__heading">Example Card Heading</h3>
              </div>
            </a>
          </div>
        </Card>
        */}
      </Container>
    </div>
  );
};
export default Plenaries;
