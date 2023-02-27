export interface FirebaseUser {
  currentUser: object;
  isLoading: boolean;
}

export interface FirebaseActionWithPayload {
  type: string;
  payload: {
    currentUser: object;
  };
}
