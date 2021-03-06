import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HomeLayout from "./Layout/Home/HomeLayout";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeLayout>
        <App />
      </HomeLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
