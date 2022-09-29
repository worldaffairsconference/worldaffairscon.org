import React from 'react';
import { Image, Container, Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import ImportAll from '../helpers/ImportAll';

import StaffData from '../data/staff';

const images = ImportAll(
  require.context('../img/staff', false, /\.(png|jpe?g|svg)$/)
);

const Tile = (props) => {
  const data = props;
  if (data.src) {
    return (
      <Col md className="text-center">
        <Row className="mt-4 mb-4">
          <Col sm={5} className="team-img-container">
            <Image
              src={images[data.src].default}
              alt={data.name}
              fluid
              roundedCircle
            />
          </Col>
          <Col sm={7} className="mt-3">
            <Card.Title as="h3">{data.name}</Card.Title>
            <h5>{data.role}</h5>
          </Col>
        </Row>
      </Col>
    );
  }
  return (
    <Col md className="text-center">
      <Row className="mt-4 mb-4">
        <Col sm={5}></Col>
        <Col sm={7} className="mt-3">
          <Card.Title as="h3">{data.name}</Card.Title>
          <h5>{data.role}</h5>
        </Col>
      </Row>
    </Col>
  );
};
const CreateGroup = (groups) => {
  return groups.map((group) => {
    const groupByN = (n, data) => {
      const result = [];
      for (let i = 0; i < data.length; i += n)
        result.push(data.slice(i, i + n));
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
        return (
          <Tile
            src={staff.src}
            name={staff.name}
            role={staff.role}
            key={staff.name}
          />
        );
      });
      return (
        <Row className="justify-content-around" key={uuid()}>
          {members}
        </Row>
      );
    });

    return (
      <div key={uuid()}>
        <h2 className="text-center mt-4">{group.group}</h2>
        <hr />
        {rows}
      </div>
    );
  });
};
const Staff = CreateGroup(StaffData.staff);
const Ambassadors = CreateGroup(StaffData.ambassadors);

const Team = () => {
  return (
    <div id="team">
      <Container className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title as="h1" className="text-center">
              WAC 2023 Team
            </Card.Title>
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
    </div>
  );
};
export default Team;
