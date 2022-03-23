import React from "react";
import ReactDOM from "react-dom";
import "theme/index.css";
import App from "core/App";
import reportWebVitals from "./reportWebVitals";
import store from "store/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "theme";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
