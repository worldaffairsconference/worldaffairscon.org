import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import ESnowden from "../img/speakers/old/esnowden.jpg";
import BMasrani from "../img/speakers/old/bmasrani.jpg";
import MRomanow from "../img/speakers/old/mromanow.jpg";
import AChisholm from "../img/speakers/old/achisholm.png";
import ALau from "../img/speakers/old/alau.jpg";
import ELau from "../img/speakers/old/elau.jpg";
import GHinton from "../img/speakers/old/ghinton.jpg";
import JStackhouse from "../img/speakers/old/jstackhouse.jpg";
import RNader from "../img/speakers/old/rnader.jpg";
import JHansen from "../img/speakers/old/jhansen.jpg";
import JIvey from "../img/speakers/old/jivey.jpg";
import LFriedman from "../img/speakers/old/lfriedman.jpg";
import DOwen from "../img/speakers/old/dowen.jpg";
import MGarneau from "../img/speakers/old/mgarneau.jpg";
import MHasan from "../img/speakers/old/mhasan.jpg";

const Speaker = (props) => {
  const data = props;
  return (
    <div className="speaker">
      <img src={data.img} />
      <h4 className="text-center">{data.name}</h4>
      <h5 className="text-center">{data.subtitle}</h5>
    </div>
  );
}

const Speakers = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title as="h1" className="text-center">
            Past Speakers
          </Card.Title>
          <hr />
          <Container>
            <Row>
              <Col md="4">
                <Speaker name={"Bharat Masrani"} img={BMasrani} subtitle={"CEO and Group President of TD Bank"} />
              </Col>
              <Col md="4">
                <Speaker name={"Michele Romanow"} img={MRomanow} subtitle={"President and Co-founder of Clearbanc"} />
              </Col>
              <Col md="4">
                <Speaker name={"Mehdi Hasan"} img={MHasan} subtitle={"British-American Political Journalist, Broadcaster and Author"} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker name={"Edward Snowden"} img={ESnowden} subtitle={"Former National Security Agency subcontractor who leaked top-secret information about NSA surveillance activities."} />
              </Col>
              <Col md="4">
                <Speaker name={"Andrew Chisholm"} img={AChisholm} subtitle={"Board of Directors of Royal Bank of Canada"} />
              </Col>
              <Col md="4">
                <Speaker name={"Marc Garneau"} img={MGarneau} subtitle={"Former Canadian Astronaut"} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker name={"Allen Lau"} img={ALau} subtitle={"CEO and Co-founder of Wattpad"} />
              </Col>
              <Col md="4">
                <Speaker name={"Eva Lau"} img={ELau} subtitle={"Co-founder and CEO of Two Small Fish"} />
              </Col>
              <Col md="4">
                <Speaker name={"Dr. Louis Friedman"} img={LFriedman} subtitle={"Co-founder of The Planetary Society"} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker name={"John Stackhouse"} img={JStackhouse} subtitle={"Former Editor-in-Chief of The Globe and Mail"} />
              </Col>
              <Col md="4">
                <Speaker name={"Dr. James Hansen"} img={JHansen} subtitle={"\"Father of climate change awareness\""} />
              </Col>
              <Col md="4">
                <Speaker name={"Janet Ivey"} img={JIvey} subtitle={"President at Explore Mars and CEO of Janet's Planet"} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker name={"David Owen"} img={DOwen} subtitle={"Former British Foreign Secretary"} />
              </Col>
              <Col md="4">
                <Speaker name={"Dr. Geoffrey Hinton"} img={GHinton} subtitle={"2018 recipient of the Turing Award for Computer Science"} />
              </Col>
              <Col md="4">
                <Speaker name={"Ralph Nader"} img={RNader} subtitle={"Social and Political Activist"} />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Speakers;
