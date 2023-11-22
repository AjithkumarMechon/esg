import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./Store/store";

document.getElementsByTagName("html")[0].style.fontSize = `${(
  (document.body.clientWidth * 16) /
  1366
).toFixed(2)}px`;

window.addEventListener("resize", (e) => {
  const width = document.body.clientWidth;
  const size = (width * 16) / 1366;
  document.getElementsByTagName("html")[0].style.fontSize = `${size.toFixed(
    2
  )}px`;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
