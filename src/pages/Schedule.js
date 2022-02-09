import React, { useState } from 'react';
import { Table, Container, Card, Modal, Button, Form } from 'react-bootstrap';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScheduleData from '../data/schedule';

const Entry = (props) => {
  const data = props;
  if (data.recording) {
    return (
      <tr>
        <td>{data.event}</td>
        <td>{data.speaker}</td>
        <td>
          <a className="btn btn-outline-danger" style={{ display: 'flex', alignItems: 'center' }} onClick={() => data.handleShow(data.speaker)}>
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
  const handleShow = speaker => {
		setShow(true);
	}

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
					<td>
							{entry.time}
					</td>
				</tr>
				{entries}
			</>
		);
	});

  return (
    <Container className="mt-4">
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
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Title as="h1" className="text-center">
            WAC 2021
          </Card.Title>
					{/* TODO: Make an onClick that opens the modal and gives last year's recordings */}
					<Button>Get Recordings</Button>
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
