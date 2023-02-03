import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Container, Card, Carousel } from 'react-bootstrap';
import { formatDistanceToNowStrict, isFuture, isPast } from 'date-fns';
import sprint from '../img/sprint/2020sprint1.jpg';
import sprint1 from '../img/sprint/SPRINTfulllogocolor.png';
import sprint2 from '../img/sprint/2020sprint2.jpg';
import KBambawale from '../img/hackathon/kbambawale.jpg';
import SLakhani from '../img/hackathon/slakhani.jpeg';
import MRomanow from '../img/hackathon/mromanow.jpg';
import KDamen from '../img/hackathon/kdamen.jpg';
import NBardai from '../img/hackathon/nbardai.jpg';
import VTHUSOO from '../img/hackathon/vthusoo.png';
import avatar from '../img/hackathon/avatar.jpg'

const SPRINT = () => {
  const [countDown, setCountDown] = useState('');
  const handleCountDown = (startTime, endTime) => {
    let [month, day, year] = startTime.split('/');
    const startDate = new Date(year, month - 1, day);
    [month, day, year] = endTime.split('/');
    const endDate = new Date(year, month - 1, day);
    if (isFuture(startDate)) {
      return formatDistanceToNowStrict(startDate, {
        addSuffix: true,
      });
    }
    if (isPast(endDate)) {
      return 'Over!';
    }
    return 'In Progress!';
  };
  const sprintStartDate = '2/6/2023';
  const sprintEndDate = '2/9/2023';
  useEffect(() => {
    setCountDown(handleCountDown(sprintStartDate, sprintEndDate));
    const countDownInterval = setInterval(() => {
      setCountDown(handleCountDown(sprintStartDate, sprintEndDate));
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);
  return (
    <div id="sprint">
      <div className="index-welcome">
        <Container className="mt-4">
          <div className="text-center text-md-left">
            <h2>Welcome to</h2>
            <h1 className="text-danger">SPRINT</h1>
            <h3 className="display-5">February 6th to February 9th</h3>
          </div>
          {/* <div className="text-center">
            <h3>This Year&apos;s Theme:</h3>
            <h1 className="display-4">Innovate for Impact</h1>
          </div> */}
          <div className="text-center text-md-right">
            <h4>The challenge is:</h4>
            <h2>{countDown}</h2>
            <h4>Application Due on Feb. 6th</h4>
          </div>
        </Container>
      </div>
      <Container className="mt-4">
        <Card className="mt-4">
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
                  A 2-week virtual entrepreneurial challenge for ambitious
                  high-school students to turn innovative ideas into action and
                  compete for prizes.
                </p>
                <hr />
                <br />
                <h3>Why SPRINT?</h3>
                <p>
                  In a world filled with Zoom meetings and mask-wearing, we must
                  continuously seek ways to ideate, create, and adapt to stay
                  alive and thrive. At SPRINT, you will be given the opportunity
                  to immerse yourself in a two-week virtual challenge to tackle
                  world issues and bring your most disruptive ideas to life.
                </p>
                <hr />
                <br />
                <h3>SPRINT Highlights</h3>
                <p>
                  - Collaborate alongside passionate students from diverse walks
                  of life to tackle real-world issues using entrepreneurial
                  skills
                </p>
                <p>
                  - Validate ideas through guest speakers and specialized
                  workshops
                </p>
                <p>
                  - Craft a pitch to be presented to a panel of expert judges
                  for prizes!
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
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfg3ho-HxVuI3oriTOZkv5HxDdWSVTITmQJnDSHaA7J8hRs8g/viewform"
                    className="mx-1"
                  >
                    our application
                  </a>
                  for either yourself or a team of up to 4 participants.
                </p>
                <p>
                  -
                  <a
                    href="https://www.instagram.com/sprint_wac/"
                    className="mx-1"
                  >
                    Follow us on Instagram
                  </a>
                  for more information and updates!
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* <Card className="mt-4">
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
        </Card> */}
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
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={SLakhani}
                      alt="Shak Lakhani"
                    />

                    <Carousel.Caption>
                      <h3>Shak Lakhani</h3>
                      <p>Founder of Avro Lifesciences</p>
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
                      src={VTHUSOO}
                      alt="Vikas Thusoo"
                    />

                    <Carousel.Caption>
                      <h3>Vikas Thusoo</h3>
                      <p>President of Rainfresh</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 carousel-image"
                      src={avatar}
                      alt="Jeannice Tse"
                    />

                    <Carousel.Caption>
                      <h3>Jeannice Tse</h3>
                      <p>Instructor at Columbia University</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  
                </Carousel>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default SPRINT;
