import React from 'react';
// import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <Container className="text-center mt-3">
      <p>
        The World Affairs Conference website, made by the&nbsp;
        <a
          className="text-white"
          href="https://github.com/worldaffairsconference"
        >
          WAC team&nbsp;
        </a>
        with&nbsp;
        <FontAwesomeIcon icon={faHeart} className="red-icon" />
        and
        <a href="https://github.com/worldaffairsconference/world.ac">
          <FontAwesomeIcon icon={faGithub} className="white-icon" />
        </a>
      </p>
      <p>
        Have any questions or concerns? Check out&nbsp;
        <a className="text-white" href="faq/index.html">
          our FAQ&nbsp;
        </a>
        or&nbsp;
        <a className="text-white" href="contact/index.html">
          get in touch with us!
        </a>
      </p>
      <a href="mailto:wac@ucc.on.ca">
        <FontAwesomeIcon icon={faEnvelope} size="2x" className="white-icon" />
      </a>
      <a href="https://www.facebook.com/worldaffairsconference/">
        <FontAwesomeIcon icon={faFacebook} size="2x" className="white-icon" />
      </a>
      <a href="https://instagram.com/WorldAffairsCon">
        <FontAwesomeIcon icon={faInstagram} size="2x" className="white-icon" />
      </a>
      <a href="https://twitter.com/WorldAffairsCon">
        <FontAwesomeIcon icon={faTwitter} size="2x" className="white-icon" />
      </a>
      <a href="https://github.com/worldaffairsconference/world.ac">
        <FontAwesomeIcon icon={faGithub} size="2x" className="white-icon" />
      </a>
    </Container>
  );
};
export default Footer;
