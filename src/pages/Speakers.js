//TODO: Migrate static data from this file to src/data/speakers.js
import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import ESnowden from '../img/speakers/prev/esnowden.jpg';
import BMasrani from '../img/speakers/prev/bmasrani.jpg';
import MRomanow from '../img/speakers/prev/mromanow.jpg';
import AChisholm from '../img/speakers/prev/achisholm.png';
import ALau from '../img/speakers/prev/alau.jpg';
import ELau from '../img/speakers/prev/elau.jpg';
import GHinton from '../img/speakers/prev/ghinton.jpg';
import JStackhouse from '../img/speakers/prev/jstackhouse.jpg';
import RNader from '../img/speakers/prev/rnader.jpg';
import JHansen from '../img/speakers/prev/jhansen.jpg';
import JIvey from '../img/speakers/prev/jivey.jpg';
import LFriedman from '../img/speakers/prev/lfriedman.jpg';
import DOwen from '../img/speakers/prev/dowen.jpg';
import MGarneau from '../img/speakers/prev/mgarneau.jpg';
import MHasan from '../img/speakers/prev/mhasan.jpg';
import GClarke from '../img/speakers/prev/gclarke.png';
import DCarroll from '../img/speakers/prev/dcarroll.png';
import ACharles from '../img/speakers/prev/acharles.png';

const Speaker = (props) => {
  const data = props;
  return (
    <div className="speaker">
      <div className="speaker-img">
        <img src={data.img} alt={data.name} />
      </div>
      <div className="speaker-info">
        <h4 className="text-center">{data.name}</h4>
        <h5 className="text-center">{data.subtitle}</h5>
      </div>
    </div>
  );
};

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
                <Speaker
                  name={'Bharat Masrani'}
                  img={BMasrani}
                  subtitle={'CEO and Group President of TD Bank'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Michele Romanow'}
                  img={MRomanow}
                  subtitle={'President and Co-founder of Clearbanc'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Mehdi Hasan'}
                  img={MHasan}
                  subtitle={
                    'British-American Political Journalist, Broadcaster and Author'
                  }
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker
                  name={'Edward Snowden'}
                  img={ESnowden}
                  subtitle={
                    'Former National Security Agency Computer Intelligence Consultant & Wistleblower'
                  }
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Andrew Chisholm'}
                  img={AChisholm}
                  subtitle={'Board of Directors of Royal Bank of Canada'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Marc Garneau'}
                  img={MGarneau}
                  subtitle={'Former Canadian Astronaut'}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker
                  name={'Allen Lau'}
                  img={ALau}
                  subtitle={'CEO and Co-founder of Wattpad'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Eva Lau'}
                  img={ELau}
                  subtitle={'Co-founder and CEO of Two Small Fish'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Dr. Louis Friedman'}
                  img={LFriedman}
                  subtitle={'Co-founder of The Planetary Society'}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker
                  name={'John Stackhouse'}
                  img={JStackhouse}
                  subtitle={'Former Editor-in-Chief of The Globe and Mail'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Dr. James Hansen'}
                  img={JHansen}
                  subtitle={'"Father of climate change awareness"'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Janet Ivey'}
                  img={JIvey}
                  subtitle={
                    "President at Explore Mars and CEO of Janet's Planet"
                  }
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker
                  name={'David Owen'}
                  img={DOwen}
                  subtitle={'Former British Foreign Secretary'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Dr. Geoffrey Hinton'}
                  img={GHinton}
                  subtitle={
                    '2018 recipient of the Turing Award for Computer Science'
                  }
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Ralph Nader'}
                  img={RNader}
                  subtitle={'Social and Political Activist'}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="4">
                <Speaker
                  name={'George E. Clarke'}
                  img={GClarke}
                  subtitle={'Canadian Poet, Playwright and Literary Critic'}
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'David Carroll'}
                  img={DCarroll}
                  subtitle={
                    'Associate Professor of Media Design at Parsons School of Design'
                  }
                />
              </Col>
              <Col md="4">
                <Speaker
                  name={'Ajani Charles'}
                  img={ACharles}
                  subtitle={'Photographer, Director and Producer'}
                />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Speakers;
