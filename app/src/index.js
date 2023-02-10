import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import Constants from "./Constants";
import ErrorBoundary from "./ErrorBoundary";
// import * as serviceWorker from "./serviceWorker";
import { ConfigProvider } from "antd";
import heIL from "antd/lib/locale/he_IL";
import { prodPath } from "./Constants";
ReactDOM.render(
  <React.Fragment>
    <ErrorBoundary>
      <Auth0Provider
        domain={Constants.authDomain}
        clientId={Constants.authClientId}
        audience={prodPath}
        redirectUri={window.location.origin}
      >
        <ConfigProvider locale={heIL} direction="rtl">
          <App />
        </ConfigProvider>
      </Auth0Provider>
    </ErrorBoundary>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
