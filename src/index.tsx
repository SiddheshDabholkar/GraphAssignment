import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HomeLayout from "./Layout/Home/HomeLayout";

ReactDOM.render(
  <React.StrictMode>
    <HomeLayout>
      <App />
    </HomeLayout>
  </React.StrictMode>,
  document.getElementById("root")
);
