import * as actionTypes from "./types";
import { FirebaseActionWithPayload } from "../models/FirebaseUser";
import { store } from "./reducer";
import { CURRENT_CHANNEL } from "./types";

export const setUser = (user: object) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  } as FirebaseActionWithPayload;
};

export const setChannel = (channel: object) => {
  store.dispatch({
    type: CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  });
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_UER,
  } as FirebaseActionWithPayload;
};
