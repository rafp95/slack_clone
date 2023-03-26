import { createContext } from "react";
import { FirebaseApi } from "./Firebase.Api";

export const context = createContext<FirebaseApi>(new FirebaseApi());
