import { useContext } from "react";
import { context } from "./firebase-api.context";

export const useApi = () => {
  return useContext(context);
};
