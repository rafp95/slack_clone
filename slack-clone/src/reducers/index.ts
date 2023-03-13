import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";
import { FirebaseUser } from "../models/FirebaseUser";

const initialUserState = {
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
    default:
      return state as FirebaseUser;
  }
};

const rootReducer = combineReducers({
  user: user_reducer,
});

export default rootReducer;
