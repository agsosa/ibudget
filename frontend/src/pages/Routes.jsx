/* 
TODO:
Route /
Si no esta logged in redireccionar a /home
Si esta logged in redireccionar a /dashboard
*/

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tw from "twin.macro";

import HomePage from "pages/HomePage";
import DashboardPage from "pages/dashboard/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import HowItWorksPage from "pages/HowItWorksPage";
import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import ScrollToTop from "components/layout/ScrollToTop";
import AnimationRevealPage from "components/layout/AnimationRevealPage";
import ContactUsPage from "./ContactUsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermsOfServicePage from "./TermsOfServicePage";

const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-2 sm:p-6 overflow-hidden`;

function Routes() {
  return (
    <Router>
      <StyledDiv>
        <ScrollToTop />
        <Navbar />
        <AnimationRevealPage>
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
        </AnimationRevealPage>
        <Footer />
      </StyledDiv>
    </Router>
  );
}

export default Routes;
