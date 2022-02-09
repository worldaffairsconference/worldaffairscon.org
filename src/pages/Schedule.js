import React, { useState } from 'react';
import { Table, Container, Card, Modal, Button, Form } from 'react-bootstrap';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScheduleData from '../data/schedule';

/*
 * TODO:Add API endpoint support with recaptcha verification(reference home page for example)
 * Send data to process.env.REACT_APP_EMAIL_LIST_API as listed
 * Data in the for of a POST request with body
  {
		 "token":"RECAPTCHA TOKEN",
		 "email":"USER EMAIL"
  }

 *responce in the form of
 {
	"href":"LINK TO HREF"
 }
 If captcha fails, API retunrs 503 ERROR

	const handleReCaptchaVerify = () => {
  setClicked(true);
  if (!executeRecaptcha) {
    setClicked(false);
    return;
  }
  // email regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    setClicked(false);
    setError('Please enter a valid email address.');
    return;
  }
  (async () => {
    const token = await executeRecaptcha('email');
    fetch(process.env.REACT_APP_EMAIL_LIST_API, {
      method: 'POST',
      body: JSON.stringify({
        email,
        token,
      }),
    }).then((res) => {
      if (res.status === 406) {
        setSuccess(true);
        return;
      }
      if (res.status === 200) {
        divRef.current.setAttribute(
          'style',
          `height: ${divRef.current.clientHeight}px;`
        );
        setClicked(false);
        setSuccess(true);
        return;
      }
      setError(
        'There was an error submitting your email. Please try again later or contact support.'
      );
    });
  })();
};
*/

const Entry = (props) => {
  const data = props;
  if (data.recording) {
    return (
      <tr>
        <td>{data.event}</td>
        <td>{data.speaker}</td>
        <td>
          <a
            className="btn btn-outline-danger"
            onClick={() => data.handleShow(data.speaker)}
          >
            <FontAwesomeIcon icon={faDotCircle} className="mr-1" />
            Recording
          </a>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{data.event}</td>
      <td>{data.speaker}</td>
      <td>{data.timeOrRecording}</td>
    </tr>
  );
};

const Schedule = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (speaker) => {
    setShow(true);
  };

  const schedule = ScheduleData.map((entry) => {
    const entries = entry.events.map((events) => {
      return (
        <Entry
          key={events.event}
          event={events.event}
          speaker={events.speaker}
          timeOrRecording={events.timeOrRecording}
          recording={events.recording}
          handleShow={handleShow}
        />
      );
    });
    return (
      <>
        <tr>
          <td>
            <h4>
              <strong>{entry.name}</strong>
            </h4>
          </td>
          <td />
          <td>{entry.time}</td>
        </tr>
        {entries}
      </>
    );
  });

  return (
    <Container className="mt-4" id="schedule">
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            WAC 2022 Schedule
          </Card.Title>
          <Table responsive hover className="my-4">
            <thead className="thead-dark">
              <tr>
                <th>Event</th>
                <th>Speakers</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>{schedule}</tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            WAC 2021
          </Card.Title>
          {/* TODO: Make an onClick that opens the modal and gives last year's recordings */}
          <p>
            Please click the following link to retrieve all recordings for
            WAC2021: Together Towards Tomorrow
          </p>
          <a
            className="btn btn-outline-danger"
            href="https://www.youtube.com/playlist?list=PLrWZUIfx9kEL2K-nqZI9piqImQ7S1d46p"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faDotCircle} className="mr-1" />
            Recording
          </a>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Retrieve Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Get URL
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Schedule;
