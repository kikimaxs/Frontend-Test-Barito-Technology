import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./app/globals.css";
import App from "./App";

// Jadikan entry sebagai komponen agar bisa dipakai dari Next page
export function MainApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default MainApp;