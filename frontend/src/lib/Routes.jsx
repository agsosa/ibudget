import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "pages/LandingPage";
import DashboardPage from "pages/DashboardPage";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <DashboardPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
