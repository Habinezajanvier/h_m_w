import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Relative imports
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import {
  authUser,
  authUserForToken,
  unauthUser,
} from "./redux/modules/user/userAuthSlice";
import store, { persistor } from "./redux/store";
import theme from "./config/theme";
import { BrowserRouter } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
  Provider as URQLProvider,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./utils/Loading";

// subscription ws client connection
const wsClient = createWSClient({
  url: process.env.REACT_APP_GRAPHQL_WSS_ENDPOINT,
});

// graphql client connection
const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});


const token = localStorage.getItem("token");
if (token) {
  store.dispatch(authUserForToken()); // Keep sesstion as token exists
  store.dispatch(authUser()); // Re-fetch session information
} else {
  store.dispatch(unauthUser());
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={Loading} persistor={persistor}>
      <URQLProvider value={client}>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </React.StrictMode>
      </URQLProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
