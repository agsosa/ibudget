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
import NotificationQueueController from "components/dashboard/smart-components/NotificationsQueueController";
import reportWebVitals from "./reportWebVitals"; // TODO: Setup web vitals

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
