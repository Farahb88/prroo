import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserManager from "./context/AuthContext";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserManager>
      <App />
    </UserManager>
  </BrowserRouter>
);


