import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Image,
  Container,
  Card,
  Table,
  Carousel,
} from 'react-bootstrap';
import sprint from '../img/sprint/2020sprint1.jpg';
import sprint1 from '../img/sprint/SPRINTfulllogocolor.png';
import sprint2 from '../img/sprint/2020sprint2.jpg';
import ARodricks from '../img/hackathon/arodricks.jpg';
import CSoo from '../img/hackathon/csoo.jpg';
import BNashman from '../img/hackathon/bnashman.jpg';
import MRomanow from '../img/hackathon/mromanow.jpg';
import KDamen from '../img/hackathon/kdamen.jpg';
import NBardai from '../img/hackathon/nbardai.jpg';

const SPRINT = () => {
  const [countDown, setCountDown] = useState('');
  const handleCountDown = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    if (t > 0) {
      return `in ${days} Days, ${hours} Hours, ${minutes} Minutes, and ${seconds} Seconds`;
    }
    if (t < 0 && t > -86400000) {
      // 86400000 is 1000*60*60*24, one whole day in millis
      return 'Today!';
    }
    return 'Over!';
  };
  const sprintDate = '2/20/2021';
  useEffect(() => {
    setCountDown(handleCountDown(sprintDate));
    const countDownInterval = setInterval(() => {
      setCountDown(handleCountDown(sprintDate));
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);
  return (
    <>
      <div className="index-welcome">
        <Container className="mt-4">
          <div className="text-center text-md-left">
            <h2>Welcome to</h2>
            <h1 className="text-danger">SPRINT</h1>
            <h3 className="display-5">February 20th to April 3rd</h3>
          </div>
          <div className="text-center">
            <h3>This Year&apos;s Theme:</h3>
            <h1 className="display-4">Innovate for Impact</h1>
          </div>
          <div className="text-center text-md-right">
            <h4>The challenge kicks off in</h4>
            <h2>{countDown}</h2>
            <h4>Application Results Come out on Feb. 16th, 19:00 ET</h4>
          </div>
        </Container>
      </div>
      <Container className="mt-4">
        <Card>
          <Card.Body className="mt-3 mx-3">
            <Row>
              <Col sm={3}>
                <Image src={sprint} alt="SPRINT" fluid rounded />
                <Image src={sprint1} alt="SPRINT Logo" fluid rounded />
                <Image src={sprint2} alt="SPRINT" fluid rounded />
              </Col>
              <Col sm={9}>
                <h3>What is SPRINT?</h3>
                <p>
                  A 2-month virtual startup incubator for ambitious high-school
                  students to turn innovative ideas into action and compete for
                  a prize of up to $1,000.
                </p>
                <hr />
                <br />
                <h3>Why SPRINT?</h3>
                <p>
                  In a world filled with Zoom meetings and mask-wearing one
                  constant remains: Innovate for Impact. We must continuously
                  seek ways to ideate, create, and adapt to stay alive - and
                  thrive. At SPRINT, you will be given the opportunity to
                  immerse yourself in an eight-week virtual incubator to
                  reimagine society by bringing your most disruptive ideas to
                  life.
                </p>
                <hr />
                <br />
                <h3>SPRINT Highlights</h3>
                <p>
                  - Collaborate alongside passionate students from diverse walks
                  of life to learn entrepreneurial skills in a startup
                  ecosystem!
                </p>
                <p>
                  - Validate ideas through specialized workshops on Marketing,
                  Tech, and Finance 101!
                </p>
                <p>
                  - Craft a pitch to be presented to a panel of experts judges
                  for prizes up to $1,000!
                </p>
                <hr />
                <br />
                <h3>How can you apply for SPRINT?</h3>
                <p>
                  - As a secondary-school student, you are eligible to apply to
                  our SPRINT cohort, for free!
                </p>
                <p>
                  - Fill out
                  <a
                    href="https://forms.gle/4B1jLSj2BdrQrnCz6"
                    className="mx-1"
                  >
                    our application
                  </a>
                  for either yourself or a team of up to 4 participants.
                </p>
                <p>
                  - Check out our schedule below and
                  <a
                    href="https://www.instagram.com/sprint_wac/"
                    className="mx-1"
                  >
                    follow us on Instagram
                  </a>
                  !
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <Col sm={12}>
                <h3>Commitment Schedule</h3>
                <h5 className="mb-3">
                  <i>
                    Eight Weeks, Eight Speakers. Eight Weekends, Ninety-minutes
                    (x8). Eight Teams, One Winner.
                  </i>
                </h5>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1. Designing and Prototyping a Product/Solution</td>
                  <td>February 20, 2021</td>
                </tr>
                <tr>
                  <td>
                    2. Target Market, Types of Marketing, Developing a Brand
                  </td>
                  <td>February 27, 2021</td>
                </tr>
                <tr>
                  <td>3. Social Media Marketing</td>
                  <td>March 6, 2021</td>
                </tr>
                <tr>
                  <td>4. Financing Your Startup</td>
                  <td>March 13, 2021</td>
                </tr>
                <tr>
                  <td>5. Types of Investors and How to Attract Them</td>
                  <td>March 20, 2021</td>
                </tr>
                <tr>
                  <td>6. Creating an Effective Pitch</td>
                  <td>March 27, 2021</td>
                </tr>
                <tr>
                  <td>7. Demo Day</td>
                  <td>April 3, 2021</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <h3>Speakers&apos; Spotlight</h3>
            <Row>
              <Col sm={6}>
                <h4 className="text-center">Past:</h4>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={MRomanow}
                      alt="Michele Romanow"
                    />

                    <Carousel.Caption>
                      <h3>Michele Romanow</h3>
                      <p>Dragon / Entrepreneur / Venture Capitalist</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={KDamen}
                      alt="Keri Damen"
                    />

                    <Carousel.Caption>
                      <h3>Keri Damen</h3>
                      <p>Managing Director UofT Entrepreneurship</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={NBardai}
                      alt="Naheed Bardai"
                    />

                    <Carousel.Caption>
                      <h3>Naheed Bardai</h3>
                      <p>Head of the Upper School at UCC</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col sm={6}>
                <h4 className="text-center">Present:</h4>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={ARodricks}
                      alt="Adam Rodricks"
                    />

                    <Carousel.Caption>
                      <h3>Adam Rodricks</h3>
                      <p>Senior Manager of Social Media & Community at KPMG</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={CSoo}
                      alt="Cindy Soo"
                    />

                    <Carousel.Caption>
                      <h3>Cindy Soo</h3>
                      <p>
                        Global Innovation Lead / Innovation & Co-Creation Matrix
                        Manager at Ikea
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={BNashman}
                      alt="Ben Nashman"
                    />

                    <Carousel.Caption>
                      <h3>Ben Nashman</h3>
                      <p>Founder and CEO of Synex Medical</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default SPRINT;
