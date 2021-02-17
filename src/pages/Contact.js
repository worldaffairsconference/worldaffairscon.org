import React from 'react';
import { Container, Card, Button, CardDeck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Email = <FontAwesomeIcon icon={faEnvelope} className="mr-1" />;
const Facebook = <FontAwesomeIcon icon={faFacebook} className="mr-1" />;
const Instagram = <FontAwesomeIcon icon={faInstagram} className="mr-1" />;
const Twitter = <FontAwesomeIcon icon={faTwitter} className="mr-1" />;
const ContactCard = (props) => {
  const data = props;
  if (data.mobile) {
    return (
      <Button href={data.href} variant={data.color} size="lg" block>
        {data.icon}
        {data.text}
      </Button>
    );
  }
  return (
    <Card bg={data.color}>
      <Card.Body className="card-full">
        <Card.Title as="h2">
          <a className="contact-color" href={data.href}>
            {data.icon}
            {data.text}
          </a>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};
const Contact = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h1>Need to talk?</h1>
          <p className="lead">
            The World Affairs Conference has staff ready to talk to you about
            anything, whether i&apos;s registration, conference information, or
            world affairs in general! If you&apos;d like to contact us, you can
            check out all of the down below. We normally respond on social media
            and emails by the next business day.
          </p>
        </Card.Body>
      </Card>
      <div className="d-none d-md-block">
        <CardDeck className="mt-2">
          <ContactCard
            color="danger"
            href="mailto:wac@ucc.on.ca"
            icon={Email}
            text="wac@ucc.on.ca"
          />
          <ContactCard
            color="primary"
            icon={Facebook}
            href="https://www.facebook.com/worldaffairsconference/"
            text="World Affairs Conference"
          />
        </CardDeck>
        <CardDeck className="mt-2">
          <ContactCard
            color="warning"
            href="https://instagram.com/WorldAffairsCon"
            icon={Instagram}
            text="@WorldAffairsCon"
          />
          <ContactCard
            color="info"
            icon={Twitter}
            href="https://twitter.com/WorldAffairsCon"
            text="@WorldAffairsCon"
          />
        </CardDeck>
      </div>
      <div className="d-md-none mt-2">
        <ContactCard
          color="danger"
          href="mailto:wac@ucc.on.ca"
          icon={Email}
          text="wac@ucc.on.ca"
          mobile
        />
        <ContactCard
          color="primary"
          icon={Facebook}
          href="https://www.facebook.com/worldaffairsconference/"
          text="World Affairs Conference"
          mobile
        />
        <ContactCard
          color="warning"
          href="https://instagram.com/WorldAffairsCon"
          icon={Instagram}
          text="@WorldAffairsCon"
          mobile
        />
        <ContactCard
          color="info"
          icon={Twitter}
          href="https://twitter.com/WorldAffairsCon"
          text="@WorldAffairsCon"
          mobile
        />
      </div>
    </Container>
  );
};
export default Contact;
