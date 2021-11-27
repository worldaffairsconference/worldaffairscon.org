import React, { useState, useEffect, useRef } from 'react';
import { isFuture, isPast, formatDistanceToNowStrict } from 'date-fns';
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Form,
  Button,
  Carousel,
} from 'react-bootstrap';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import fetch from 'node-fetch';
import Iframe from 'react-iframe';
import { Checkmark } from 'react-checkmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faUserGraduate,
  faGlobeAmericas,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import ImportAll from '../helpers/ImportAll';

import Logo from '../img/wac_logo.png';
// import Quotes from '../data/quotes';
const Home = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [countDown, setCountDown] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const divRef = useRef(null);
  // const [quote, setQuote] = useState({
  //   quote: 'Quote',
  //   name: 'Name',
  //   role: 'Role 2021',
  // });
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

  const handleReCaptchaVerify = () => {
    setClicked(true);
    if (!executeRecaptcha) {
      setClicked(false);
      return;
    }
    // email regex
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setClicked(false);
      setError('Please enter a valid email address.');
      return;
    }
    (async () => {
      const token = await executeRecaptcha('email');
      fetch(process.env.REACT_APP_EMAIL_LIST_API, {
        method: 'POST',
        body: JSON.stringify({
          email,
          token,
        }),
      }).then((res) => {
        if (res.status === 406) {
          setSuccess(true);
          return;
        }
        if (res.status === 200) {
          divRef.current.setAttribute(
            'style',
            `height: ${divRef.current.clientHeight}px;`
          );
          setClicked(false);
          setSuccess(true);
          return;
        }
        setError(
          'There was an error submitting your email. Please try again later or contact support.'
        );
      });
    })();
  };

  // const handleQuote = () => {
  //   const data = Quotes[Math.floor(Math.random() * Quotes.length)];
  //   setQuote({
  //     quote: data.quote,
  //     name: data.name,
  //     role: `${data.role} ${data.year}`,
  //   });
  // };

  useEffect(() => {
    // handleQuote();
    setCountDown(handleCountDown(wacStartDate, wacEndDate));
    const countDownInterval = setInterval(() => {
      setCountDown(handleCountDown(wacStartDate, wacEndDate));
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  const galleryGenerator = () => {
    const images = ImportAll(
      require.context('../img/home/gallery', false, /\.(png|jpe?g|svg|JPG)$/)
    );
    const items = Object.entries(images).map(([key, value]) => {
      return (
        <Carousel.Item key={key}>
          <img alt={key} src={value.default} className="carousel-img" />
        </Carousel.Item>
      );
    });

    return items;
  };

  // loading spinner for email list css
  const override = css`
    display: block;
    width: 100%
    margin: 0 auto;
    border-color: #fcf8ed;
    border-width: 7px;
  `;

  return (
    <div id="home">
      <div className="landing">
        <Container className="mt-4">
          <div className="text-center text-md-left">
            <h2>Welcome to the 2022</h2>
            <h1>World Affairs Conference</h1>
            <h3 className="display-5">February 5th</h3>
          </div>
          <div className="text-center">
            <h3>This Year&apos;s Theme:</h3>
            <h1 className="display-4">Affairs that Matter</h1>
          </div>
          <div className="text-center text-md-right">
            <h4>The Conference is</h4>
            <h3>
              <span>{countDown}</span>
            </h3>
          </div>
        </Container>
        <div ref={divRef} className="index-welcome text-center">
          {success ? (
            <Container>
              <Row>
                <Col md={8}>
                  <h1>Success!</h1>
                  <h3>
                    We will make sure that the latest WAC news is delivered to
                    your inbox.
                  </h3>
                </Col>
                <Col md={4} className="vertical-center-div">
                  <Checkmark size="xxLarge" color="#44CF6C" />
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="input">
              <Form className="form-container" noValidate validated={validated}>
                <Form.Group className="email-group">
                  <Form.Label htmlFor="input-a"> Subscribe to WAC </Form.Label>
                  <Form.Control
                    id="input-a"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setValidated(true)}
                    onBlur={() => setValidated(false)}
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    required
                  />
                  {error ? (
                    <p className="error">{error}</p>
                  ) : (
                    <p>
                      to receive newest updates on speakers, registration,
                      events and more!
                    </p>
                  )}
                </Form.Group>
                <Button
                  type="button"
                  bsPrefix="b"
                  className={error ? 'error' : ''}
                  onClick={handleReCaptchaVerify}
                >
                  {clicked ? (
                    <ClipLoader
                      color={'#fcf8ed'}
                      loading={clicked}
                      css={override}
                      size={100}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faArrowRight} />
                  )}
                </Button>
              </Form>
            </div>
          )}
          {/* <h2>
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
        </div> */}
        </div>
      </div>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <Row>
              <Col className="mt-5" md={3}>
                <Image src={Logo} fluid />
              </Col>
              <Col md={9}>
                <h4>What&apos;s WAC?</h4>
                <p>
                  The World Affairs Conference (WAC) is North America’s largest
                  and Canada’s oldest annual student-run current events
                  conference that provides high-quality discussion opportunities
                  for thousands of inspired, curious, and globally-minded high
                  school students from around the world. Our mission is to
                  inspire high school students to proactively engage in world
                  affairs and become aware of humanity&apos;s most pressing
                  challenges.
                </p>
                <p>
                  Our mission is to inspire the next generation of leaders to
                  engage in the world’s most pressing issues, innovations, and
                  trends. We do this by exposing students to experienced
                  perspectives and by providing high-quality discussion
                  opportunities.
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <h2 className="text-center">Why WAC?</h2>
            <p className="text-center">WAC has reached over:</p>
            <div className="stats-container text-center">
              <div className="stats-group">
                <span className="text-accent"> 4,000 students </span>
                <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <div className="stats-group">
                <span className="text-accent"> 25 countries</span>
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
              <div className="stats-group">
                <span className="text-accent"> 65 schools</span>
                <FontAwesomeIcon icon={faSchool} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <h2 className="text-center">WAC Gallery</h2>
            <Carousel fade>{galleryGenerator()}</Carousel>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card className="mt-3 mx-3">
          <Card.Body>
            <h2 className="text-center">WAC in 2021</h2>
            <Container>
              <Iframe
                width="100%"
                height="465"
                styles={{ border: '1px solid black', margin: 'auto' }}
                src="https://www.youtube.com/embed/h8VBYlOQEBc"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default Home;
