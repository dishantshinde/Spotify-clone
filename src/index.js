import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PlayerContextProvider from "./context/Playercontext";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PlayerContextProvider>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
      </PlayerContextProvider>
    </Provider>
  </React.StrictMode>
);
