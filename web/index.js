import React from "react";
import { render } from "react-dom";

// import redux things
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import App from "./src/App.js";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("todos-app")
);
