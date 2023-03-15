import { LoggedUser } from "./LoggedUser";

export interface FirebaseUser {
  currentUser?: LoggedUser;
  isLoading: boolean;
}

export interface FirebaseActionWithPayload {
  type: string;
  payload?: {
    currentUser: object;
  };
}
