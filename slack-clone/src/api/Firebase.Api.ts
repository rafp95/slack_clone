import { child, get, getDatabase, ref, set, onValue } from "firebase/database";
import { UserCredential } from "firebase/auth";

const db = getDatabase();
const keyName = "channels";
const channelsRef = ref(db, keyName).ref;

export class FirebaseApi {
  getChannels = () => {
    return get(channelsRef);
  };

  addChannels = (key: string, newChannel: any) => {
    return set(child(channelsRef, key ?? ""), {
      ...newChannel,
    });
  };

  createUser = (createdUser: UserCredential) => {
    return set(ref(db, `users/${createdUser.user.uid}`), {
      username: createdUser.user?.displayName,
      email: createdUser.user?.displayName,
      profile_picture: createdUser.user?.photoURL,
    });
  };
}
