// TODO: Clean up styled components, optimize bundle size and page load speed
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
import { AuthProvider } from "lib/Auth";

const persistor = getPersistor();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <NotificationQueueController />
          <Routes />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
