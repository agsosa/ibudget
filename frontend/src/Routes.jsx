/* eslint-disable react/prop-types */
import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import tw from "twin.macro";
import HomePage from "pages/HomePage";
import DashboardPage from "pages/smart-pages/DashboardPage";
import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import ScrollToTop from "components/misc/ScrollToTop";
import AnimationRevealPage from "components/misc/AnimationRevealPage";
import TransactionsPage from "pages/smart-pages/TransactionsPage";
import { useAuth } from "lib/Auth";
import AuthPage from "pages/smart-pages/AuthPage";

const MainDiv = tw.div`font-display flex flex-col justify-between h-screen min-w-full text-secondary-500`;

const HowItWorksPageLazy = lazy(() => import("pages/HowItWorksPage"));
const ContactPageLazy = lazy(() => import("pages/ContactUsPage"));
const PrivacyPageLazy = lazy(() => import("pages/PrivacyPolicyPage"));
const TermsPageLazy = lazy(() => import("pages/TermsOfServicePage"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <ScrollToTop />
          <Navbar />
          <AnimationRevealPage>
            <Switch>
              <DashboardRouter path="/login">
                <AuthPage />
              </DashboardRouter>
              <DashboardRouter path="/register">
                <AuthPage isRegister />
              </DashboardRouter>

              <Route path="/how-it-works">
                <HowItWorksPageLazy />
              </Route>
              <Route path="/contact-us">
                <ContactPageLazy />
              </Route>
              <Route path="/terms-of-service">
                <TermsPageLazy />
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPageLazy />
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
        </Suspense>
      </MainDiv>
    </Router>
  );
}

export default Routes;
