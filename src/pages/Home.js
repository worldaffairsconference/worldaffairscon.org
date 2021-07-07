import React, { useState, useEffect } from 'react';
import { isFuture, isPast, formatDistanceToNowStrict } from 'date-fns';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import Iframe from 'react-iframe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Logo from '../img/wac_logo.png';
import ESnowden from '../img/snowden.png';
import Quotes from '../data/quotes';

const Home = () => {
  const [countDown, setCountDown] = useState('');
  const [quote, setQuote] = useState({
    quote: 'Quote',
    name: 'Name',
    role: 'Role 2021',
  });
  const wacStartDate = '2/5/2022';
  const wacEndDate = '2/5/2022'; // Countdown date in MM/DD/YYYY format (no 0's required)
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
  const handleQuote = () => {
    const data = Quotes[Math.floor(Math.random() * Quotes.length)];
    setQuote({
      quote: data.quote,
      name: data.name,
      role: `${data.role} ${data.year}`,
    });
  };
  useEffect(() => {
    handleQuote();
    setCountDown(handleCountDown(wacStartDate, wacEndDate));
    const countDownInterval = setInterval(() => {
      setCountDown(handleCountDown(wacStartDate, wacEndDate));
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);
  return (
    <>
      <Container className="mt-4">
        <div className="text-center text-md-left">
          <h2>Welcome to the 2022</h2>
          <h1>World Affairs Conference</h1>
          <h3 className="display-5">February 5th</h3>
        </div>
        <div className="text-center">
          <h3>This Year&apos;s Theme:</h3>
          <h1 className="display-4">TBD</h1>
        </div>
        <div className="text-center text-md-right">
          <h4>The Conference is</h4>
          <h3>
            <span>{countDown}</span>
          </h3>
        </div>
      </Container>
      <div className="index-welcome text-center">
        <div>
          <h2>
            <FontAwesomeIcon icon={faQuoteLeft} className="mr-1" />
            {quote.quote}
            <FontAwesomeIcon icon={faQuoteRight} className="mr-1" />
          </h2>
          <div>
            <div className="d-flex justify-content-end">
              <h3 className="display-5 mr-5">{quote.name}</h3>
            </div>
            <div className="d-flex justify-content-end">
              <h4 className="mr-5">{quote.role}</h4>
            </div>
          </div>
        </div>
      </div>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <Row>
              <Col sm={3}>
                <Image src={Logo} fluid />
              </Col>
              <Col sm={9}>
                <h4>What&apos;s WAC?</h4>
                <p>
                  The World Affairs Conference (WAC) is North America&apos;s
                  largest annual student-run current affairs conference.
                  Annually held at Upper Canada College in Toronto, Canada, the
                  World Affairs Conference connects over 1000 students, with a
                  common interest in current affairs, typically from across
                  North America. Due to the COVID-19 pandemic, the 2021 World
                  Affairs Conference will be hosted online and available
                  worldwide!
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <h2 className="text-center">WAC Promotional Video</h2>
            <Container>
              <Iframe
                width="100%"
                height="465"
                styles={{ border: '1px solid black', margin: 'auto' }}
                src="https://www.youtube.com/embed/h8VBYlOQEBc"
                frameborder="0"
                positon="relative"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </Container>
            <hr />
            <Row className="pt-5">
              <Col sm={3}>
                <Image src={ESnowden} alt="Edward Snowden" fluid />
              </Col>
              <Col sm={9}>
                <h3>Edward Snowden</h3>
                <p>
                  Six years ago, Edward Snowden gave the WAC 2015 Lionel Gelber
                  Keynote Address. In June 2013, Snowden leaked highly
                  classified information about the scale and scope of NSA and
                  CIA counter-terrorism and counter-intelligence operations
                  around the globe. Since then, he has become a household name
                  and is among the most influential privacy activists in the
                  world. At the Keynote Address, Snowden explained his views on
                  global privacy issues, government involvement in
                  citizen&apos;s lives, and the dangers of the digital age.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
export default Home;
