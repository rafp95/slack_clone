import { createContext } from "react";
import { FirebaseApi } from "./Firebase.Api";
import { DatabaseCollectionName } from "./DatabaseCollectionName";

export const context = (val: DatabaseCollectionName) =>
  createContext<FirebaseApi>(new FirebaseApi(val));
