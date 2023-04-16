import { child, get, getDatabase, ref, set, onValue } from "firebase/database";
import { UserCredential } from "firebase/auth";
import { ChanelDto } from "../models/Channel";
import { DatabaseCollenctionName } from "./DatabaseCollenctionName";

const db = getDatabase();

export class FirebaseApi {
  private _databaseKeyName?: DatabaseCollenctionName;

  setChannelsRef(_databaseKeyName: DatabaseCollenctionName) {
    this._databaseKeyName = _databaseKeyName;
  }

  channelsRef() {
    return ref(db, this._databaseKeyName).ref;
  }

  addChannels = (key: string, newChannel: any) => {
    return set(child(this.channelsRef(), this._databaseKeyName ?? "channels"), {
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
