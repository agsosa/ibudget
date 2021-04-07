import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "pages/HomePage";
import DashboardPage from "pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import HowItWorksPage from "pages/HowItWorksPage";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/how-it-works">
          <HowItWorksPage />
        </Route>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
