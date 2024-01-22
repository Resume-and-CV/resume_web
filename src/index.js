/* // src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18n from './components/i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root')
);
 */

// src/index.js
import React from "react";
//import ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";
import App from "./App";
import i18n from "./components/i18n";
import { createRoot } from "react-dom/client";

// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById("root"));

// Render your app inside the root
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
