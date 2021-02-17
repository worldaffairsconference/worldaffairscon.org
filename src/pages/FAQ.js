import React from 'react';
import { Container, Card, Accordion } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import FAQdata from '../data/FAQ';

const FAQEntry = (props) => {
  const data = props;
  const id = uuid();
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as="a" eventKey={id} className="h5">
          {data.question}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{data.response}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const FAQs = FAQdata.map((entry) => {
  const questions = entry.questions.map((question) => {
    return (
      <FAQEntry question={question.question} response={question.response} />
    );
  });
  return (
    <Card className="mt-2">
      <Card.Body>
        <h2>{entry.name}</h2>
        <Accordion defaultActiveKey="0" className="m-2">
          {questions}
        </Accordion>
      </Card.Body>
    </Card>
  );
});

const FAQ = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h1 className="text-xs-center">Frequently Asked Questions</h1>
          <h2 className="text-xs-center">
            Click on a question to expand the answer.
          </h2>
          <p className="lead text-xs-center">
            Is your question not answered?
            <Card.Link as={Link} to="/contact" className="ml-1 mr-1">
              Contact us
            </Card.Link>
            for more information,we&apos;re happy to help!
          </p>
        </Card.Body>
      </Card>
      {FAQs}
    </Container>
  );
};
export default FAQ;
