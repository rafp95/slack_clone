import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NotFound } from "./components/NotFound/NotFound";

import { Provider, useSelector } from "react-redux";

import "semantic-ui-css/semantic.min.css";

import { auth } from "./firebase";

import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser } from "./actions";
import { Spinner } from "./components/Spinner/Spinner";

const store = createStore(rootReducer, composeWithDevTools());

const Root = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const loggedUser = setUser(user);

        store.dispatch({
          type: loggedUser.type,
          payload: loggedUser.payload,
        });
        navigateTo("/");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
);
