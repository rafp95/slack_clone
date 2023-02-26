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

import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";

import { auth } from "./firebase";

import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducres";
import { setUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    const params = useParams();
    return <Component history={history} {...Component} />;
  };
  return Wrapper;
};

const Root = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoading(false);

        const tmpUser = setUser(user);

        store.dispatch({
          type: tmpUser.type,
          state: tmpUser.payload,
        });

        navigateTo("/");
      }
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        "Ładowanie"
      ) : (
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>
);
