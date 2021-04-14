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
import ScrollToTop from "components/misc/ScrollToTop";
import AnimationRevealPage from "components/misc/AnimationRevealPage";
import ContactUsPage from "pages/ContactUsPage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";
import TermsOfServicePage from "pages/TermsOfServicePage";
import TransactionsPage from "pages/dashboard/TransactionsPage";

const MainDiv = tw.div`font-display flex flex-col justify-between h-screen min-w-full text-secondary-500`;

function Routes() {
  return (
    <Router>
      <MainDiv>
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
            <Route path="/transactions">
              <TransactionsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </AnimationRevealPage>
        <Footer />
      </MainDiv>
    </Router>
  );
}

export default Routes;
