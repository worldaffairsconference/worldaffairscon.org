import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Cat from '../img/misc/cat.png';

const Maintenance = () => {
  return (
    <div id="maintenance" className="vertical-center">
      <Container>
        <center>
          <Card>
            <Card.Img variant="top" src={Cat} />
            <Card.Body>
              <h2>Sorry, we&rsquo;re down for updates and maintenance.</h2>
              <h1>We will be back with brand new updates!</h1>
            </Card.Body>
          </Card>
        </center>
      </Container>
    </div>
  );
};

export default Maintenance;
