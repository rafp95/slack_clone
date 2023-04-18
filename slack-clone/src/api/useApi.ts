import { useContext } from "react";
import { context } from "./firebase-api.context";
import { DatabaseCollectionName } from "./DatabaseCollectionName";

export const useApi = (val: DatabaseCollectionName) => {
  return useContext(context(val));
};
