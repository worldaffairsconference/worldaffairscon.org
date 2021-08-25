import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Success = () => {
  setTimeout(() => {
    window.location.href = '/';
  }, 2000);
  return (
    <div className="vertical-center">
      <Container>
        <center>
          <Card>
            <Card.Body>
              <h2>Success!</h2>
              <h1>Thank you for subscribing.</h1>
            </Card.Body>
          </Card>
        </center>
      </Container>
    </div>
  );
};

export default Success;
