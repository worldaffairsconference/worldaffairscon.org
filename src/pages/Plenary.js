import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Speaker = (props) => {
  const data = props;
  return (
    <Row className="pb-2">
      <Col md={4}>
        <Image src={data.img} className="mx-auto d-block" fluid rounded />
      </Col>
      <Col md={8}>
        <h2 className="text-center text-md-left">{data.name}</h2>
        {data.text}
      </Col>
    </Row>
  );
};
const Plenary = (props) => {
  const data = props;
  const speakers = data.speaker.map((entry) => {
    return <Speaker name={entry.name} img={entry.img} text={entry.text} />;
  });
  return (
    <>
      <Container className="mt-4">
        <Card className="mb-2">
          <Card.Body className="text-center">
            <Card.Text>
              <Card.Link
                href="/plenaries"
                as={Link}
                to="/plenaries"
                className="h4"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                View the other plenaries.
              </Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title as="h1" className="text-center">
              {data.title}
            </Card.Title>
            <Card.Text>{data.text}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <Card.Title className="text-center" as="h1">
              Speakers
            </Card.Title>
            <hr />
            {speakers}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default Plenary;
