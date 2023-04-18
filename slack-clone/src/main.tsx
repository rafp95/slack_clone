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
import { CLEAR_UER, CURRENT_CHANNEL, SET_USER } from "./actions/types";

const store = createStore(rootReducer, composeWithDevTools());

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoggedUser } from "./models/LoggedUser";

const Root = () => {
  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  store.subscribe(() => {
    const firebaseUser: FirebaseUser = store.getState()?.user;

    setIsLoading(firebaseUser.isLoading);
  });

  const clearUser = () => {
    store.dispatch({
      type: CLEAR_UER,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const loggedUser: FirebaseActionWithPayload = setUser(user);

        store.dispatch({
          type: loggedUser.type,
          payload: loggedUser.payload?.currentUser,
        });
        navigateTo("/");
      } else {
        setIsLoading(false);
        navigateTo("/login");
        clearUser();
      }
    });
  }, []);

  return (
    <div>
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
      <ToastContainer position="bottom-left" />
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
