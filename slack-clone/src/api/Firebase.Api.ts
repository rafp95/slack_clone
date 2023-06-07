import { child, getDatabase, push, ref, set } from "firebase/database";
import { UserCredential } from "firebase/auth";
import { DatabaseCollectionName } from "./DatabaseCollectionName";
import {
  getDownloadURL,
  getStorage,
  ref as refStorage,
  uploadBytesResumable,
} from "firebase/storage";

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

  sendPhoto = (
    file: File,
    addPhotoMessage: (photoUrl: string) => void,
    setProgres?: React.Dispatch<React.SetStateAction<number>>,
    setUploadState?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const storage = getStorage();
    const storageRef = refStorage(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgres!(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          addPhotoMessage(downloadURL);
          setUploadState!(false);
        });
      }
    );
  };
}
