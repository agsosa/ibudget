import "./style.css";
import "tailwindcss/dist/base.css";
import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom";
import Routes from "pages/Routes";
import store from "lib/Store";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
