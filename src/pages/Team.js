import React from 'react';
import { Image, Container, Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import images from '../components/teamImages';
import StaffData from '../data/staff';

const Tile = (props) => {
  const data = props;
  return (
    <Col>
      <Row className="mt-4 mb-4">
        <Col sm={4}>
          <Image
            src={images[data.src].default}
            alt={data.name}
            fluid
            roundedCircle
          />
        </Col>
        <Col sm={8}>
          <Card.Title as="h4">{data.name}</Card.Title>
          <h5>{data.role}</h5>
        </Col>
      </Row>
    </Col>
  );
};

const Staff = StaffData.staff.map((group) => {
  const groupByN = (n, data) => {
    const result = [];
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
    return result;
  };
  let rowsIndex = {};
  if (group.group === 'Chairs' || group.group === 'Executives') {
    rowsIndex = groupByN(2, group.members);
  } else {
    rowsIndex = groupByN(3, group.members);
  }
  const rows = rowsIndex.map((row) => {
    const members = row.map((staff) => {
      return <Tile src={staff.src} name={staff.name} role={staff.role} />;
    });
    return <Row>{members}</Row>;
  });
  return (
    <>
      <h2 className="text-center mt-4">{group.group}</h2>
      <hr />
      {rows}
    </>
  );
});
const Ambassadors = StaffData.ambassadors.map((group) => {
  const groupByN = (n, data) => {
    const result = [];
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
    return result;
  };
  let rowsIndex = {};
  if (group.group === 'Chairs' || group.group === 'Executives') {
    rowsIndex = groupByN(2, group.members);
  } else {
    rowsIndex = groupByN(3, group.members);
  }
  const rows = rowsIndex.map((row) => {
    const members = row.map((staff) => {
      return <Tile src={staff.src} name={staff.name} role={staff.role} />;
    });
    return <Row>{members}</Row>;
  });
  return (
    <>
      <h2 className="text-center mt-4">{group.group}</h2>
      <hr />
      {rows}
    </>
  );
});
const Team = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h1">WAC 2021 Team</Card.Title>
          <Tabs id="uncontrolled-tab-example" defaultActiveKey="team">
            <Tab eventKey="team" title="Staff">
              {Staff}
            </Tab>
            <Tab eventKey="ambassadors" title="Global Ambassadors">
              {Ambassadors}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Team;
