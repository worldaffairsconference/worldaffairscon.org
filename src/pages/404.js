import React from 'react';
import { Container, Card } from 'react-bootstrap';

const NotFound = () => {
  return (
    <div className="vertical-center">
      <Container>
        <center>
          <Card>
            <Card.Body>
              <h2>Error 404: URL Not Found</h2>
              <h1>
                The page you&apos;re trying to visit is out of this world!
              </h1>
              <h3>
                <a href="/index.html">
                  Maybe going back home will help you find your way.
                </a>
              </h3>
            </Card.Body>
          </Card>
        </center>
      </Container>
    </div>
  );
};

export default NotFound;
