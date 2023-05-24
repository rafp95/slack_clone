import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  push,
  set,
} from "firebase/database";
import { UserCredential } from "firebase/auth";
import { ChannelDto } from "../models/Channel";
import { DatabaseCollectionName } from "./DatabaseCollectionName";

const db = getDatabase();

export class FirebaseApi {
  private readonly _databaseKeyName: DatabaseCollectionName;
  constructor(databaseKeyName: DatabaseCollectionName) {
    this._databaseKeyName = databaseKeyName;
  }

  databaseRef(childKey?: string) {
    if (childKey?.length) {
      return ref(db, `${this._databaseKeyName}/${childKey}`).ref;
    }

    return ref(db, this._databaseKeyName).ref;
  }

  addChannels = (key: string, newChannel: any) => {
    return set(child(this.databaseRef(), key), {
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

  createMessage = (key: string, message: any) => {
    const newMessage = ref(db, `${this._databaseKeyName}/${key}`).ref;
    const newMessageRef = push(newMessage);

    return set(newMessageRef, {
      ...message,
    });
  };
}
