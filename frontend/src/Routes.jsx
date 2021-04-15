/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import tw from "twin.macro";
import HomePage from "pages/HomePage";
import DashboardPage from "pages/smart-pages/DashboardPage";
import { RegisterPage, LoginPage } from "pages/smart-pages/AuthPages";
import HowItWorksPage from "pages/HowItWorksPage";
import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import ScrollToTop from "components/misc/ScrollToTop";
import AnimationRevealPage from "components/misc/AnimationRevealPage";
import ContactUsPage from "pages/ContactUsPage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";
import TermsOfServicePage from "pages/TermsOfServicePage";
import TransactionsPage from "pages/smart-pages/TransactionsPage";
import { useAuth } from "lib/Auth";

const MainDiv = tw.div`font-display flex flex-col justify-between h-screen min-w-full text-secondary-500`;

// A wrapper for <Route> that redirects to the login screen if the user is not logged in
// Original ource: react-router docs
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.getIsLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

// A wrapper for <Route> that redirects to the dashboard if the user is logged in
function DashboardRouter({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth.getIsLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Routes() {
  return (
    <Router>
      <MainDiv>
        <ScrollToTop />
        <Navbar />
        <AnimationRevealPage>
          <Switch>
            <DashboardRouter path="/login">
              <LoginPage />
            </DashboardRouter>
            <DashboardRouter path="/register">
              <RegisterPage />
            </DashboardRouter>

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

            <PrivateRoute path="/dashboard">
              <DashboardPage />
            </PrivateRoute>
            <PrivateRoute path="/transactions">
              <TransactionsPage />
            </PrivateRoute>

            <DashboardRouter path="/">
              <HomePage />
            </DashboardRouter>
          </Switch>
        </AnimationRevealPage>
        <Footer />
      </MainDiv>
    </Router>
  );
}

export default Routes;
