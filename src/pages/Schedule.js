import React, { useState } from 'react';
import { Table, Container, Card, Modal, Button, Form } from 'react-bootstrap';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import fetch from 'node-fetch';
import ScheduleData from '../data/schedule';
import Terms from '../components/Terms';

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
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState();
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const [init, setInit] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClose = () => {
    setEmail('');
    setError('');
    setUrl('');
    setValid(false);
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const getURL = async (e) => {
    e.preventDefault();
    setValid(true);
    const token = await executeRecaptcha('email');
    fetch(process.env.REACT_APP_EMAIL_LIST_API, {
      method: 'POST',
      body: JSON.stringify({
        email,
        token: token,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.new) {
          setInit(true);
        }
        setError('');
        setUrl(data.href);
      })
      .catch((err) => {
        setValid(false);
        setError('Access Denied. Please contact us for further information.');
      });
  };

  const schedule = ScheduleData.map((entry) => {
    const entries = entry.events.map((events) => {
      return (
        <Entry
          key={uuid()}
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
        <Form onSubmit={getURL}>
          <Form.Group className="mb-3">
            <Modal.Body>
              {url ? (
                <>
                  {init ? (
                    <>
                      <Form.Text as="p" className="mt-4 terms">
                        <Terms />
                      </Form.Text>
                      <Form.Check
                        type="checkbox"
                        id="checkbox"
                        label="I agree"
                      />
                    </>
                  ) : (
                    <Form.Text as="p" className="mt-4">
                      <h4>Thank you for joining WAC 2022.</h4>
                      <a href={url} target="__blank">
                        WAC 2022 Playlist
                      </a>
                    </Form.Text>
                  )}
                </>
              ) : (
                <>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    isValid={valid}
                    isInvalid={error}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control
                    type="submit"
                    value="Submit"
                    className="d-none"
                  />
                </>
              )}
              {error && <p className="error">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {init ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setInit(false);
                  }}
                >
                  Get URL
                </Button>
              ) : (
                <>
                  {!url && (
                    <Button type="submit" variant="primary">
                      Get URL
                    </Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal>
    </Container>
  );
};
export default Schedule;
