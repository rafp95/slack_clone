import { child, get, getDatabase, ref, set, onValue } from "firebase/database";
import { UserCredential } from "firebase/auth";
import { ChannelDto } from "../models/Channel";
import { DatabaseCollectionName } from "./DatabaseCollectionName";

const db = getDatabase();

export class FirebaseApi {
  private readonly _databaseKeyName: DatabaseCollectionName;
  constructor(databaseKeyName: DatabaseCollectionName) {
    this._databaseKeyName = databaseKeyName;
  }

  channelsRef() {
    return ref(db, this._databaseKeyName).ref;
  }

  addChannels = (key: string, newChannel: any) => {
    return set(child(this.channelsRef(), key), {
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
    return set(child(this.channelsRef(), key), {
      ...message,
    });
  };

  messagesRef() {
    return ref(db, this._databaseKeyName).ref;
  }
}
