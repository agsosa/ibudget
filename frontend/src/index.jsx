// TODO: Remove feather icon and unused dependencies from treact
// TODO: Clean up styled components, optimize bundle size and page load speed
// TODO: Uninstall bulma
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import "tailwindcss/dist/base.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "Routes";
import store from "lib/Store";
import { Provider } from "react-redux";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import NotificationQueueController from "components/smart-components/NotificationsQueueController";

const persistor = getPersistor();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NotificationQueueController />
        <Routes />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
