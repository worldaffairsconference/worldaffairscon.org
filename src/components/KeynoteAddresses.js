import React from 'react';
import { Image, Row, Col, Card } from 'react-bootstrap';

const KeynoteAddresses = (props) => {
  const data = props;
  if (data.deck === true) {
    return (
      <Card>
        <Card.Img
          variant="top"
          src={data.image}
          className="mx-auto d-block"
          fluid
        />
        <Card.Body>
          <Card.Title as="h3">{`${data.title} ${data.speaker}`}</Card.Title>
          <Card.Text>
            <Col md={12}>{data.text}</Col>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Body>
        <h1 className="text-center">
          {data.title}
          <p>{data.speaker}</p>
        </h1>
        <hr />
        <Row className="pb-2">
          <Col md={12}>
            <Image src={data.image} className="mx-auto d-block" fluid rounded />
            <h2 className="text-center">{data.addressName}</h2>
            <h4 className="text-center">{data.addressRole}</h4>
          </Col>
        </Row>
        <Row className="pb-2">
          <Col md={12}>{data.text}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default KeynoteAddresses;
