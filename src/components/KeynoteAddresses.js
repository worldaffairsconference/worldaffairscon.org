import React from 'react';
import { Image, Row, Col, Card } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

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
            <Col className="mt-2" md={12}>
              {data.li &&
                data.li.map((text) => {
                  return (
                    <li key={uuid()}>
                      <b>{text}</b>
                    </li>
                  );
                })}
            </Col>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Body>
        <h1 className="text-center">{data.title}</h1>
        <h3 className="text-center">{data.speaker}</h3>
        {data.title && <hr />}
        <Row className="pb-2">
          <Col md={12}>
            <Image src={data.image} className="mx-auto d-block" fluid rounded />
            {data.children}
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
