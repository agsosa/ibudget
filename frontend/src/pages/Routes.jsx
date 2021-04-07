import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "pages/HomePage";
import DashboardPage from "pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import HowItWorksPage from "pages/HowItWorksPage";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import ScrollToTop from "components/ScrollToTop";
import ContactUsPage from "./ContactUsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermsOfServicePage from "./TermsOfServicePage";

function Routes() {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path="/contact-us">
          <ContactUsPage />
        </Route>
        <Route path="/terms-of-service">
          <TermsOfServicePage />
        </Route>
        <Route path="/privacy-policy">
          <PrivacyPolicyPage />
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
