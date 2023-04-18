import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";
import { FirebaseUser } from "../models/FirebaseUser";
import { ChannelActionWithPayload } from "../models/Channel";
import { CLEAR_UER, CURRENT_CHANNEL, SET_USER } from "../actions/types";

/*
User actions
 */

export const initialUserState = {
  currentUser: null,
  isLoading: true,
} as unknown as FirebaseUser;

const user_reducer = (
  state: FirebaseUser = initialUserState,
  action: any
): FirebaseUser => {
  switch (action?.type) {
    case actionTypes?.SET_USER:
      return {
        currentUser: action?.payload?.currentUser,
        isLoading: false,
      } as FirebaseUser;
    case actionTypes?.CLEAR_UER:
      return {
        ...initialUserState,
        isLoading: false,
      };
  }
  return state as FirebaseUser;
};

/*
Channel actions
 */

const initialChannelState = {
  currentChannel: null,
};

const channel_reducer = (
  state = initialChannelState,
  action: ChannelActionWithPayload
) => {
  switch (action.type) {
    case actionTypes.CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload?.currentChannel,
      };
  }
  return state;
};

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});

export default rootReducer;
