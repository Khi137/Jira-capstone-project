import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./redux/reducer/root.js";
import thunk from "redux-thunk";
import { StyleProvider } from "@ant-design/cssinjs";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
     <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </Provider>
);
