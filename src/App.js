import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import maintenanceMode from "./config";
import PlenaryJSON from "./data/plenary";
import Keynote from "./pages/Keynote";
import Addresses from "./pages/Addresses";
import Plenaries from "./pages/Plenaries";
import Plenary from "./pages/Plenary";
import Team from "./pages/Team";
import Schedule from "./pages/Schedule";
import Additional from "./pages/Additoinal";
import SPRINT from "./pages/SPRINT";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/404";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Maintenance from "./pages/Maintenance";
import Speakers from "./pages/Speakers";

const plenaryRoutes = PlenaryJSON.map((entry) => {
  return (
    <Route exact path={entry.path} key={entry.props.title}>
      <Plenary
        title={entry.props.title}
        text={entry.props.text}
        speaker={entry.props.speakers}
      />
    </Route>
  );
});

const App = () => {
  const location = useLocation();
  useEffect(() => {
    const curr = location.pathname + location.search;
    window.gtag("event", "page_view", {
      page_path: curr,
    });
  }, [location]);
  if (maintenanceMode) {
    return <Maintenance />;
  }
  return (
    <>
      <header>
        <Header />
      </header>
      <TransitionGroup>
        <CSSTransition timeout={400} classNames="page" key={location.key}>
          <Switch location={location}>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/keynote">
              <Keynote />
            </Route>
            <Route exact path="/addresses">
              <Addresses />
            </Route>
            <Route exact path="/plenaries">
              <Plenaries />
            </Route>
            {plenaryRoutes}
            <Route exact path="/faq">
              <FAQ />
            </Route>
            <Route exact path="/schedule">
              <Schedule />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/team">
              <Team />
            </Route>
            <Route exact path="/startups">
              <Additional />
            </Route>
            <Route exact path="/sprint">
              <SPRINT />
            </Route>
            <Route exact path="/success">
              <Success />
            </Route>
            <Route exact path="/speakers">
              <Speakers />
            </Route>
            <Route path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
