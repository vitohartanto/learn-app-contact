import React from "react";
import { createRoot } from "react-dom/client";
import ContactApp from "./components/ContactApp";
import "./styles/styles.css";
import { BrowserRouter } from "react-router-dom";

// const element = <h1>Hello, world!</h1>;

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContactApp />
  </BrowserRouter>
);
