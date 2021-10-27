import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

require("dotenv").config();

const sendToAnalytics = ({ id, name, value }) => {
  window.gtag("event", name, {
    event_category: "Web Vitals",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate
  });
};

ReactDOM.render(
  <GoogleReCaptchaProvider
    reCaptchaKey="6LcM168cAAAAANf-coDhhVMxMYJK0VBOpGyI0ACF"
    scriptProps={{
      async: true, // optional, default to false,
      defer: true, // optional, default to false
      appendTo: "head", // optional, default to "head", can be "head" or "body",
      nonce: undefined, // optional, default undefined
    }}
  >
    <React.StrictMode>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </React.StrictMode>
  </GoogleReCaptchaProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToAnalytics);
