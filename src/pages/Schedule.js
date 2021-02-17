import React from 'react';
import { Table, Container, Card } from 'react-bootstrap';
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
          <a className="btn btn-outline-danger" href={data.timeOrRecording}>
            <FontAwesomeIcon icon={faDotCircle} className="mr-1" />
            Recording Available
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

const schedule = ScheduleData.map((entry) => {
  const entries = entry.events.map((events) => {
    return (
      <Entry
        event={events.event}
        speaker={events.speaker}
        timeOrRecording={events.timeOrRecording}
        recording
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
        <td />
      </tr>
      {entries}
    </>
  );
});
const Schedule = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            WAC 2021 Recordings
          </Card.Title>
          <Table responsive hover className="my-4">
            <thead className="thead-dark">
              <tr>
                <th>Event</th>
                <th>Speakers</th>
                <th>Recording</th>
              </tr>
            </thead>
            <tbody>{schedule}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Schedule;
