//TODO: Migrate static data from this file to src/data/speakers.js
import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import PastSpeakersData from '../data/pastSpeakers';

const Speaker = (props) => {
  const data = props;
  return (
    <div className="speaker">
      <div className="speaker-img">
        <img src={data.img} alt={data.name} />
      </div>
      <div className="speaker-info">
        <h4 className="text-center">{data.name}</h4>
        <h5 className="text-center">{data.subtitle}</h5>
      </div>
    </div>
  );
};

const Speakers = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            Past Speakers
          </Card.Title>
          <hr />
          <Container>
            {PastSpeakersData.map((data, index) => {
              return (
                <Row key={index}>
                  {data[0] && (
                    <Col md={4}>
                      <Speaker {...data[0]} />
                    </Col>
                  )}
                  {data[1] && (
                    <Col md={4}>
                      <Speaker {...data[1]} />
                    </Col>
                  )}
                  {data[2] && (
                    <Col md={4}>
                      <Speaker {...data[2]} />
                    </Col>
                  )}
                </Row>
              );
            })}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Speakers;
