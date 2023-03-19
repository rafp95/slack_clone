import { child, get, getDatabase, ref, set } from "firebase/database";
import { UserCredential } from "firebase/auth";

const db = getDatabase();
const keyName = "channels";
const channelsRef = ref(db, keyName).ref;

export const getChannels = () => {
  return get(channelsRef);
};

export const addChannels = (key: string, newChannel: any) => {
  return set(child(channelsRef, key ?? ""), {
    ...newChannel,
  });
};

export const createUser = (createdUser: UserCredential) => {
  return set(ref(db, `users/${createdUser.user.uid}`), {
    username: createdUser.user?.displayName,
    email: createdUser.user?.displayName,
    profile_picture: createdUser.user?.photoURL,
  });
};
