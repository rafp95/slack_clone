import * as actionTypes from "./types";
import { FirebaseActionWithPayload } from "../models/FirebaseUser";

export const setUser = (user: object) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  } as FirebaseActionWithPayload;
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_UER,
  } as FirebaseActionWithPayload;
};
