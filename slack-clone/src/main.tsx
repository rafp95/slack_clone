import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NotFound } from "./components/NotFound/NotFound";

import { Provider } from "react-redux";

import "semantic-ui-css/semantic.min.css";

import { auth } from "./firebase";

import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser } from "./actions";
import { Spinner } from "./components/Spinner/Spinner";
import { FirebaseActionWithPayload, FirebaseUser } from "./models/FirebaseUser";

const store = createStore(rootReducer, composeWithDevTools());

const Root = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<object>(() => {});

  store.subscribe(() => {
    const firebaseUser: FirebaseUser = store.getState()?.user;

    setIsLoading(firebaseUser.isLoading);
    setUserData(firebaseUser.currentUser);
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const loggedUser: FirebaseActionWithPayload = setUser(user);

        store.dispatch({
          type: loggedUser.type,
          payload: loggedUser.payload,
        });
        navigateTo("/");
      }
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
