import React from 'react';
import { Card, Container } from 'react-bootstrap';
import KeynoteAddresses from '../components/KeynoteAddresses';

import FQuinn from '../img/speakers/curr/FQuinn.jpg';
import GThunberg from '../img/speakers/curr/GThunberg.jpg';

const Events = () => {
  return (
    <Container id="events" className="mt-4">
      <Card>
        <Card.Body className="text-center">
          <h1>WAC Special Events</h1>
        </Card.Body>
      </Card>
      <KeynoteAddresses
        title='"Environment 💙 Wellness" Special Event'
        text="Ea aute non eiusmod eiusmod aliqua ullamco deserunt ad amet veniam est. Duis eu nostrud duis tempor. Officia et duis enim nostrud in ut Lorem fugiat est voluptate veniam laborum enim dolore voluptate. Commodo ullamco consectetur est sint eiusmod cupidatat sunt et velit velit dolore proident do. Do ex labore anim do tempor nisi eu incididunt nisi. Sunt aliqua nisi nostrud enim proident excepteur nulla laborum Lorem. Officia enim Lorem anim exercitation."
      />
      <div className="mt-4">
        <KeynoteAddresses
          title=""
          speaker=""
          image={GThunberg}
          addressName="Greta Thunberg"
          addressRole="Climate Activist"
          text="Mollit sit exercitation anim excepteur in. Dolor adipisicing amet consectetur cillum. Mollit anim voluptate anim nulla cillum qui dolor adipisicing nisi reprehenderit incididunt adipisicing. Ex excepteur minim dolore laboris mollit occaecat deserunt Lorem eu ipsum cupidatat id reprehenderit amet. Aliqua ipsum anim ullamco irure veniam veniam ipsum laborum. Laboris ea est sunt adipisicing aliqua cupidatat ea in in enim. Do ex non nulla. Veniam cupidatat pariatur aute ex veniam reprehenderit occaecat nulla quis et minim. Lorem qui enim mollit aute irure. Adipisicing est consectetur cupidatat consectetur in quis ullamco adipisicing quis eu enim et ex exercitation adipisicing"
        />
      </div>
      <div className="mt-4">
        <KeynoteAddresses
          title=""
          description=""
          speaker=""
          image={FQuinn}
          addressName="Francisca Quinn"
          addressRole="Role"
          text="Mollit sit exercitation anim excepteur in. Dolor adipisicing amet consectetur cillum. Mollit anim voluptate anim nulla cillum qui dolor adipisicing nisi reprehenderit incididunt adipisicing. Ex excepteur minim dolore laboris mollit occaecat deserunt Lorem eu ipsum cupidatat id reprehenderit amet. Aliqua ipsum anim ullamco irure veniam veniam ipsum laborum. Laboris ea est sunt adipisicing aliqua cupidatat ea in in enim. Do ex non nulla. Veniam cupidatat pariatur aute ex veniam reprehenderit occaecat nulla quis et minim. Lorem qui enim mollit aute irure. Adipisicing est consectetur cupidatat consectetur in quis ullamco adipisicing quis eu enim et ex exercitation adipisicing"
        />
      </div>
    </Container>
  );
};
export default Events;
